import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Create account</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Join Rhema Travel & Tours</h1>
        <form className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">First name</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Last name</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
          </div>
          <button className="w-full rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">Create account</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">
          Already a member? <Link href="/login" className="font-semibold text-sky-700">Login</Link>
        </p>
      </div>
    </main>
  );
}
