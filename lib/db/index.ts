import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/lib/db/schema'

function createDb() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const pool = new Pool({
    connectionString
  })

  return drizzle(pool, { schema })
}

type Database = ReturnType<typeof createDb>

let dbInstance: Database | null = null

function getDb() {
  if (!dbInstance) {
    dbInstance = createDb()
  }

  return dbInstance
}

export const db = new Proxy({} as Database, {
  get(_target, property, receiver) {
    return Reflect.get(getDb() as object, property, receiver)
  }
})
