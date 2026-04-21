import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import type { Config } from 'drizzle-kit'

function loadEnvironmentFile() {
  const filePath = path.join(process.cwd(), '.env.local')

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

loadEnvironmentFile()

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ''
  }
} satisfies Config
