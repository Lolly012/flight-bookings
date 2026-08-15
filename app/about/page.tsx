export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">About us</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Travel planning built around confidence and care</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          Rhema Travel & Tours helps individuals, families, and businesses plan international and domestic journeys with trusted guidance, flexible fares, and efficient booking support.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Visa guidance", "Support for travel documentation and application questions."],
            ["Corporate travel", "Managed booking support for business trips and teams."],
            ["End-to-end support", "From search to ticketing and itinerary management."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
