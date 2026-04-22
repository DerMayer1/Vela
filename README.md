# Vela

Vela is a patient-first telehealth product focused on one thing: making digital care feel clear, calm, and operationally trustworthy from the first click.

This repository contains the patient-facing application for the Vela experience, including authentication, onboarding, scheduling, consultations, profile management, and the core patient workspace.

## What Vela Solves

Most healthcare software gets the workflow right but the experience wrong. Patients are pushed through fragmented steps, generic forms, and unclear navigation at the exact moment they need reassurance.

Vela is designed to fix that.

It brings the core patient journey into a single coherent flow:

- secure sign in and account creation
- guided onboarding and intake
- consultation scheduling
- dashboard overview of next actions
- consultation room with notes and prescription handling
- patient profile and medical summary

The product goal is not just functional telehealth. It is a telehealth experience that feels premium, legible, and operationally dependable.

## Product Scope

The current application includes:

- marketing landing page
- auth flows for sign in and sign up
- patient onboarding flow
- dashboard overview
- consultation scheduling flow
- consultation detail room with status transitions
- patient profile
- tenant-aware auth/session handling

## Core Experience Principles

- clarity over noise
- operational actions always visible
- trust cues before speed
- one patient workspace across the care journey
- clean separation between marketing, auth, and authenticated product surfaces

## Tech Stack

- `Next.js 14`
- `React 18`
- `TypeScript` in strict mode
- `Tailwind CSS`
- `Framer Motion`
- `NextAuth v5`
- `Drizzle ORM`
- `PostgreSQL`
- `TanStack Query`
- `React Hook Form`
- `Zod`
- `Zustand`

## Architecture

The app follows a simple product-oriented structure:

- `app/`
  Next.js App Router entrypoints and route groups
- `components/`
  product surfaces, layout primitives, UI components, and feature modules
- `lib/`
  database, auth, validation, constants, tenant logic, and shared utilities
- `hooks/`
  data-fetching and product hooks
- `types/`
  shared TypeScript contracts

### Route Groups

- `app/(marketing)`
  landing and public product presentation
- `app/(auth)`
  sign in and sign up
- `app/(app)`
  authenticated patient workspace

### Design System Direction

The UI is intentionally built around:

- calm light surfaces
- restrained cobalt and deep navy accents
- clear spacing and hierarchy
- strong primary actions
- reduced visual noise inside operational screens

## Authentication and Tenant Model

Vela uses `NextAuth` with a credentials provider.

Authentication is tenant-aware. During sign in, the app resolves the tenant from the request host and validates the user against that tenant context. This keeps session and patient state aligned with the active workspace.

Relevant areas:

- [`auth.ts`](./auth.ts)
- `lib/auth/*`
- `lib/tenant/*`

## Main User Flows

### 1. Access

Patients can:

- create an account
- sign in securely
- enter a branded care workspace

### 2. Onboarding

The onboarding flow captures patient identity and intake context so the first consultation starts with better information.

### 3. Scheduling

Patients move through a structured consultation scheduler:

1. choose a specialty
2. choose a physician
3. choose a time slot
4. confirm the consultation and chief complaint

### 4. Consultation Workspace

Each consultation has an operational room where the product supports:

- status changes
- patient context review
- consultation notes
- prescription capture
- access to previous consultations

### 5. Patient Profile

The profile centralizes:

- personal details
- contact data
- gender and birth date
- chief complaint
- conditions, medications, and allergies

## Local Development

### Prerequisites

- `Node.js`
- `pnpm`
- `Docker`
- a local PostgreSQL container via Docker Compose

### Setup

```bash
pnpm install
cp .env.example .env.local
docker compose up -d
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Windows `cmd` can use:

```bat
copy .env.example .env.local
```

The default database container is exposed on `127.0.0.1:5432`.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm db:generate
pnpm db:migrate
pnpm db:studio
pnpm db:seed
```

## Development Notes

- validation is driven by `Zod`
- form state is handled with `React Hook Form`
- server state and cache orchestration are handled with `TanStack Query`
- layout components stay structural
- route pages stay focused on composition

## Repository Highlights

- `components/pages/LandingPage.tsx`
  marketing experience
- `components/consultations/ConsultationScheduler.tsx`
  multi-step consultation creation flow
- `components/consultations/ConsultationRoom.tsx`
  consultation operations and documentation
- `components/dashboard/DashboardOverview.tsx`
  authenticated patient workspace overview
- `components/profile/ProfileOverview.tsx`
  patient record view

## Status

This repository represents an actively refined MVP with a strong focus on:

- visual quality
- patient UX
- operational coherence
- implementation cleanliness

## Vision

Vela is not trying to be a generic appointment app.

It is intended to become the interface layer for a modern health product: one that treats trust, clarity, and workflow quality as product features, not cosmetic afterthoughts.
