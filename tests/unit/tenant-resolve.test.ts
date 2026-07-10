import { describe, expect, it } from 'vitest'
import {
  DEFAULT_TENANT_SLUG,
  normalizeTenantSlug,
  resolveTenantSlugFromHost
} from '@/lib/tenant/resolve'

describe('normalizeTenantSlug', () => {
  it('trims and lowercases the slug', () => {
    expect(normalizeTenantSlug('  Acme ')).toBe('acme')
  })

  it('returns an empty string for null or undefined', () => {
    expect(normalizeTenantSlug(null)).toBe('')
    expect(normalizeTenantSlug(undefined)).toBe('')
  })
})

describe('resolveTenantSlugFromHost', () => {
  it('falls back to the default tenant when host is missing', () => {
    expect(resolveTenantSlugFromHost(null)).toBe(DEFAULT_TENANT_SLUG)
    expect(resolveTenantSlugFromHost(undefined)).toBe(DEFAULT_TENANT_SLUG)
    expect(resolveTenantSlugFromHost('')).toBe(DEFAULT_TENANT_SLUG)
  })

  it('falls back to the default tenant for local hosts', () => {
    expect(resolveTenantSlugFromHost('localhost')).toBe(DEFAULT_TENANT_SLUG)
    expect(resolveTenantSlugFromHost('localhost:3000')).toBe(DEFAULT_TENANT_SLUG)
    expect(resolveTenantSlugFromHost('127.0.0.1:3000')).toBe(DEFAULT_TENANT_SLUG)
  })

  it('falls back to the default tenant for apex domains without a subdomain', () => {
    expect(resolveTenantSlugFromHost('example.com')).toBe(DEFAULT_TENANT_SLUG)
    expect(resolveTenantSlugFromHost('example.com:443')).toBe(DEFAULT_TENANT_SLUG)
  })

  it('treats www as no tenant', () => {
    expect(resolveTenantSlugFromHost('www.example.com')).toBe(DEFAULT_TENANT_SLUG)
  })

  it('resolves the first subdomain segment as the tenant slug', () => {
    expect(resolveTenantSlugFromHost('acme.example.com')).toBe('acme')
    expect(resolveTenantSlugFromHost('acme.app.example.com')).toBe('acme')
  })

  it('normalizes casing and ignores the port', () => {
    expect(resolveTenantSlugFromHost('ACME.Example.COM:8443')).toBe('acme')
  })
})
