import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-primary">Screen not found</h1>
        <p className="mt-3 text-sm text-zinc-600">
          This route is outside the scaffolded screen catalog.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
