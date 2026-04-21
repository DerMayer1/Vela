import { sql } from 'drizzle-orm'
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core'

export const genderEnum = pgEnum('gender', [
  'male',
  'female',
  'other',
  'prefer-not-to-say'
])

export const consultationStatusEnum = pgEnum('consultation_status', [
  'scheduled',
  'in-progress',
  'completed',
  'cancelled'
])

export const tenants = pgTable(
  'tenants',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    primaryColor: text('primary_color').default('#0A6EBD').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    slugUnique: uniqueIndex('tenants_slug_unique').on(table.slug)
  })
)

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'restrict' }),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    tenantEmailUnique: uniqueIndex('users_tenant_email_unique').on(table.tenantId, table.email)
  })
)

export const patientProfiles = pgTable('patient_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  dateOfBirth: text('date_of_birth'),
  gender: genderEnum('gender'),
  phone: text('phone'),
  chiefComplaint: text('chief_complaint'),
  symptomDuration: text('symptom_duration'),
  symptomSeverity: text('symptom_severity'),
  conditions: text('conditions')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  medications: text('medications')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  allergies: text('allergies')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  hasRecentSurgery: boolean('has_recent_surgery').default(false).notNull(),
  onboardingCompleted: boolean('onboarding_completed').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
})

export const consultations = pgTable('consultations', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  patientProfileId: uuid('patient_profile_id')
    .notNull()
    .references(() => patientProfiles.id, { onDelete: 'cascade' }),
  status: consultationStatusEnum('status').default('scheduled').notNull(),
  specialty: text('specialty').notNull(),
  physicianName: text('physician_name').notNull(),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }).notNull(),
  chiefComplaint: text('chief_complaint').notNull(),
  notes: text('notes'),
  prescription: text('prescription'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
})
