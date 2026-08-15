export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-[#0b1f44] p-8 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Customer dashboard</p>
          <h1 className="mt-3 text-4xl font-bold">Your travel overview</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Upcoming trips", "2 journeys"],
            ["Recent bookings", "5 reservations"],
            ["Total bookings", "12"],
          ].map(([title, value]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{title}</div>
              <div className="mt-4 text-3xl font-black text-slate-900">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
