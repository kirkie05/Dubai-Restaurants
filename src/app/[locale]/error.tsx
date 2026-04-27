'use client'

import { useEffect } from 'react'
import { Link } from '@/navigation'

export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error('[LocaleError]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] border border-slate-100 shadow-xl p-10 space-y-6 text-center">
        <span className="material-symbols-outlined text-5xl text-primary">error_outline</span>
        <h1 className="text-4xl font-headline font-black italic tracking-tighter text-zinc-900">
          Something went wrong.
        </h1>
        <p className="text-slate-500 font-body italic text-sm leading-relaxed">
          An unexpected error occurred. Our team has been notified.
          {error.digest ? (
            <span className="block mt-2 font-mono text-xs text-slate-300">
              ref: {error.digest}
            </span>
          ) : null}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={unstable_retry}
            className="px-8 py-3 rounded-xl bg-zinc-900 text-white font-semibold hover:bg-primary transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
