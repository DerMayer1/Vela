# Vela Health

Vela Health is a patient-first telehealth platform built with Next.js, TypeScript, and PostgreSQL, focused on a clean onboarding, scheduling, and consultation workflow.

This repository contains the MVP foundation and product flows implemented across phases 0-3.

## Stack

- Next.js 14
- TypeScript (strict)
- Tailwind CSS
- Drizzle ORM
- PostgreSQL
- NextAuth v5
- TanStack Query
- React Hook Form + Zod
- Framer Motion
- Zustand

## Features

- Auth (`credentials`) - `done`
- Onboarding (3-step persisted flow) - `done`
- Dashboard with real consultation data - `done`
- Scheduling flow - `done`
- Consultation room/detail with notes and status transitions - `done`

## Running Locally

```bash
pnpm install
copy .env.example .env.local
docker compose up -d
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The local PostgreSQL container is published on `127.0.0.1:65432`.

## Architecture

The app keeps `app/.../page.tsx` files focused on composition only. Layout components remain structural and do not hold business logic. Zod is the source of truth for validation, React Hook Form owns form state, and TanStack Query is used only for server state and cache orchestration.
