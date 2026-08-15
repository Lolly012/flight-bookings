import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Login</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Welcome back</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" defaultValue="traveller@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input type="password" defaultValue="password123" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
          </div>
          <button className="w-full rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">Login</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          New to Rhema Travel? <Link href="/register" className="font-semibold text-sky-700">Create account</Link>
        </p>
      </div>
    </main>
  );
}
