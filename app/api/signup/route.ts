import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { hashPassword } from '@/lib/auth/password'
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
    const tenant = await resolveTenantFromRequest(request)

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
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
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
    }

    return NextResponse.json(
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
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid sign up payload' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
