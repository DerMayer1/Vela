import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { hashPassword } from '@/lib/auth/password'
import { auditSecurityEvent } from '@/lib/security/audit'
import { secureJson } from '@/lib/security/headers'
import { consumeRateLimit } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { resolveTenantFromRequest } from '@/lib/tenant/server'
import { signUpSchema } from '@/lib/validations/auth'

interface PostgresError extends Error {
  code?: string
}

function isPostgresError(error: unknown): error is PostgresError {
  return error instanceof Error && 'code' in error
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedBody = signUpSchema.parse(body)
    const clientIp = getClientIp(request)
    const rateLimitResult = consumeRateLimit({
      key: `signup:${clientIp}:${validatedBody.email.toLowerCase()}`,
      limit: 5,
      windowMs: 15 * 60 * 1000
    })

    if (!rateLimitResult.success) {
      auditSecurityEvent({
        action: 'auth.signup.rate_limited',
        metadata: {
          email: validatedBody.email
        },
        request
      })
      return secureJson(
        { error: 'Too many requests. Try again later.' },
        {
          headers: {
            'Retry-After': String(rateLimitResult.retryAfterSeconds)
          },
          status: 429
        }
      )
    }

    const tenant = await resolveTenantFromRequest(request)

    if (!tenant) {
      auditSecurityEvent({
        action: 'auth.signup.tenant_not_found',
        metadata: {
          email: validatedBody.email
        },
        request
      })
      return secureJson({ error: 'Unable to create account' }, { status: 404 })
    }

    const passwordHash = await hashPassword(validatedBody.password)

    const createdUser = await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          email: validatedBody.email,
          firstName: validatedBody.firstName,
          lastName: validatedBody.lastName,
          passwordHash,
          tenantId: tenant.id
        })
        .returning({
          email: users.email,
          firstName: users.firstName,
          id: users.id,
          lastName: users.lastName
        })

      if (!user) {
        throw new Error('Failed to create user')
      }

      await tx.insert(patientProfiles).values({
        tenantId: tenant.id,
        userId: user.id
      })

      return user
    })

    if (!createdUser) {
      return secureJson({ error: 'Unable to create account' }, { status: 500 })
    }

    auditSecurityEvent({
      action: 'auth.signup.success',
      metadata: {
        email: createdUser.email
      },
      request,
      sessionUserId: createdUser.id,
      tenantId: tenant.id
    })

    return secureJson(
      {
        data: {
          email: createdUser.email,
          id: createdUser.id,
          name: `${createdUser.firstName} ${createdUser.lastName}`
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (isPostgresError(error) && error.code === '23505') {
      auditSecurityEvent({
        action: 'auth.signup.duplicate_attempt',
        metadata: {
          error: 'unique_constraint'
        },
        request
      })
      return secureJson({ error: 'Unable to create account' }, { status: 409 })
    }

    if (error instanceof ZodError) {
      return secureJson({ error: 'Invalid sign up payload' }, { status: 400 })
    }

    return secureJson({ error: 'Internal server error' }, { status: 500 })
  }
}
