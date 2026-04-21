'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            alignItems: 'center',
            background: 'linear-gradient(180deg, #f5f9ff 0%, #ffffff 100%)',
            color: '#0a1831',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '24px'
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(214,224,240,0.9)',
              borderRadius: '32px',
              boxShadow: '0 18px 40px rgba(10,24,49,0.08)',
              maxWidth: '720px',
              padding: '32px',
              textAlign: 'center',
              width: '100%'
            }}
          >
            <p
              style={{
                color: '#8192ad',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              Global error
            </p>
            <h1 style={{ fontSize: '40px', lineHeight: 1.05, margin: '12px 0 0' }}>
              The app hit an unexpected error.
            </h1>
            <p style={{ color: '#4e6484', fontSize: '17px', lineHeight: 1.7, margin: '16px 0 0' }}>
              Refresh or retry the page. If it continues, the current screen has a runtime problem
              that still needs to be corrected.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginTop: '24px',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  background: 'linear-gradient(135deg, #1c5cff, #0f42d6)',
                  border: 0,
                  borderRadius: '999px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 700,
                  padding: '14px 22px'
                }}
                type="button"
              >
                Try again
              </button>
              <a
                href="/dashboard"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(214,224,240,0.9)',
                  borderRadius: '999px',
                  color: '#0a1831',
                  fontSize: '16px',
                  fontWeight: 700,
                  padding: '14px 22px',
                  textDecoration: 'none'
                }}
              >
                Open dashboard
              </a>
            </div>
            {error?.digest ? (
              <p style={{ color: '#8192ad', fontSize: '12px', marginTop: '18px' }}>
                Error digest: {error.digest}
              </p>
            ) : null}
          </div>
        </div>
      </body>
    </html>
  )
}
