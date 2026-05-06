'use client'

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center max-w-md">
        <span className="material-symbols-outlined text-5xl text-red-500 mb-4">error</span>
        <h2 className="text-2xl font-headline font-black italic mb-2">Something went wrong!</h2>
        <p className="text-slate-500 mb-6 text-sm">{error.message || "An unexpected error occurred."}</p>
        <button 
          onClick={() => reset()}
          className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
