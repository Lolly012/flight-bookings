import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">This page is unavailable</h1>
        <p className="mt-4 text-slate-600">The page you were trying to reach is not available in this release, or the route has not yet been implemented.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">Return home</Link>
      </div>
    </main>
  );
}
