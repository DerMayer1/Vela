import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

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

function main() {
  loadEnvironmentFile()

  const [command, ...args] = process.argv.slice(2)

  if (!command) {
    throw new Error('No command provided')
  }

  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env
  })

  child.on('exit', (code) => {
    process.exit(code ?? 0)
  })

  child.on('error', (error) => {
    console.error(error)
    process.exit(1)
  })
}

main()
