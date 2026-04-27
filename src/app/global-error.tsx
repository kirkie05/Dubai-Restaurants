'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f8fafc' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              maxWidth: '28rem',
              width: '100%',
              background: '#fff',
              borderRadius: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 60px -10px rgba(0,0,0,0.1)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#bc0100', fontWeight: 900, marginBottom: '0.5rem' }}>
              Critical Error
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#18181b', marginBottom: '1rem' }}>
              Something went wrong.
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              A critical error occurred. Please try again or return to the homepage.
            </p>
            {error.digest ? (
              <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                ref: {error.digest}
              </p>
            ) : null}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={unstable_retry}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.75rem',
                  background: '#18181b',
                  color: '#fff',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <a
                href="/en"
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
