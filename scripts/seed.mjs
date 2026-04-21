import { randomBytes, scryptSync, randomUUID } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import pg from 'pg'

const { Client } = pg

function loadEnvironmentFile() {
  const cwd = process.cwd()
  const filePath = path.join(cwd, '.env.local')

  if (!existsSync(filePath)) {
    return
  }

  const content = readFileSync(filePath, 'utf8')

  for (const line of content.split(/\r?\n/)) {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmedLine.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim()
    const normalizedValue = rawValue.replace(/^"(.*)"$/, '$1')

    process.env[key] = normalizedValue
  }
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(password, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

async function main() {
  loadEnvironmentFile()

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  await client.connect()

  const sampleEmail = 'patient@velahealth.test'
  const samplePassword = 'VelaHealth123'
  const passwordHash = hashPassword(samplePassword)
  const tenantResult = await client.query(
    `
      INSERT INTO tenants (id, slug, name, primary_color, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT (slug)
      DO UPDATE SET
        name = EXCLUDED.name,
        primary_color = EXCLUDED.primary_color,
        updated_at = NOW()
      RETURNING id
    `,
    [randomUUID(), 'vela', 'Vela Health', '#0A6EBD']
  )

  const tenantId = tenantResult.rows[0]?.id

  if (!tenantId) {
    throw new Error('Failed to create or update default tenant')
  }

  const userResult = await client.query(
    `
      INSERT INTO users (
        id,
        tenant_id,
        first_name,
        last_name,
        email,
        password_hash,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (tenant_id, email)
      DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        password_hash = EXCLUDED.password_hash,
        updated_at = NOW()
      RETURNING id
    `,
    [randomUUID(), tenantId, 'Alex', 'Johnson', sampleEmail, passwordHash]
  )

  const userId = userResult.rows[0]?.id

  if (!userId) {
    throw new Error('Failed to create or update sample user')
  }

  const profileResult = await client.query(
    `
      INSERT INTO patient_profiles (
        id,
        tenant_id,
        user_id,
        date_of_birth,
        gender,
        phone,
        chief_complaint,
        symptom_duration,
        symptom_severity,
        conditions,
        medications,
        allergies,
        has_recent_surgery,
        onboarding_completed,
        created_at,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10::text[], $11::text[], $12::text[],
        $13, $14, NOW(), NOW()
      )
      ON CONFLICT (user_id)
      DO UPDATE SET
        date_of_birth = EXCLUDED.date_of_birth,
        gender = EXCLUDED.gender,
        phone = EXCLUDED.phone,
        chief_complaint = EXCLUDED.chief_complaint,
        symptom_duration = EXCLUDED.symptom_duration,
        symptom_severity = EXCLUDED.symptom_severity,
        conditions = EXCLUDED.conditions,
        medications = EXCLUDED.medications,
        allergies = EXCLUDED.allergies,
        has_recent_surgery = EXCLUDED.has_recent_surgery,
        onboarding_completed = EXCLUDED.onboarding_completed,
        updated_at = NOW()
      RETURNING id
    `,
    [
      randomUUID(),
      tenantId,
      userId,
      '1991-05-12',
      'prefer-not-to-say',
      '+1 (555) 018-2049',
      'Follow-up for intermittent chest discomfort after exercise.',
      '1 week',
      'moderate',
      ['Hypertension'],
      ['Atorvastatin'],
      ['Penicillin'],
      false,
      true
    ]
  )

  const patientProfileId = profileResult.rows[0]?.id

  if (!patientProfileId) {
    throw new Error('Failed to create or update patient profile')
  }

  await client.query('DELETE FROM consultations WHERE patient_profile_id = $1', [
    patientProfileId
  ])

  await client.query(
    `
      INSERT INTO consultations (
        id,
        tenant_id,
        patient_profile_id,
        status,
        specialty,
        physician_name,
        scheduled_at,
        chief_complaint,
        notes,
        created_at,
        updated_at
      )
      VALUES
        ($1, $2, $3, 'scheduled', $4, $5, NOW() + INTERVAL '1 day', $6, $7, NOW(), NOW()),
        ($8, $2, $3, 'completed', $9, $10, NOW() - INTERVAL '7 day', $11, $12, NOW(), NOW())
    `,
    [
      randomUUID(),
      tenantId,
      patientProfileId,
      'Cardiology',
      'Dr. Sarah Chen',
      'Follow-up for intermittent chest discomfort after exercise.',
      'Patient requested a follow-up focused on exertion symptoms.',
      randomUUID(),
      'General Practice',
      'Dr. Maya Patel',
      'General fatigue and blood pressure check.',
      'Prior consultation completed with conservative follow-up guidance.'
    ]
  )

  await client.end()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
