# Security Overview

Vela handles patient identity, onboarding data, scheduling context, consultation notes, and prescription content. The application is built with a secure-by-default posture for tenant isolation, session handling, response hardening, and auditability.

## Implemented Controls

- Tenant-aware authentication and authorization for patient data access
- `NextAuth` sessions with shorter rotation windows and secure cookies in production
- Response security headers across app pages and APIs
- No-store caching headers for authenticated and sensitive API responses
- Rate limiting on sign in, sign up, onboarding updates, and consultation mutations
- Security audit events for authentication attempts and clinical record reads and writes
- Input validation through `Zod` for auth, onboarding, scheduling, notes, and prescription payloads
- Password hashing with `scrypt` and timing-safe verification
- Consistent tenant filtering in patient and consultation database queries

## Security Headers

The application applies:

- `Content-Security-Policy` in production
- `Strict-Transport-Security` in production
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Origin-Agent-Cluster: ?1`
- `Permissions-Policy` with restricted device access

Sensitive pages and APIs also send:

- `Cache-Control: no-store, no-cache, must-revalidate, private, max-age=0`
- `Pragma: no-cache`
- `Expires: 0`

## Audit Logging

Vela logs security-relevant events for:

- sign in failures and successes
- sign up failures and successes
- onboarding view and update events
- patient profile access
- consultation list access
- consultation detail access
- consultation creation and updates
- rate-limit triggers on sensitive endpoints

Audit payloads intentionally avoid raw clinical text and mask email addresses when present in metadata.

## Production Recommendations

These controls are still recommended before a production launch:

- move rate limiting from in-memory storage to Redis or another shared store
- add MFA for internal/admin surfaces
- centralize audit logs in a SIEM or managed log pipeline
- add automated dependency and container vulnerability scanning
- test backup restore procedures on a fixed cadence
- formalize incident response, retention, and access review processes

## Reporting

If you discover a security issue in Vela, do not open a public issue with exploit details. Share it privately with the repository maintainers first so the issue can be triaged and remediated safely.
