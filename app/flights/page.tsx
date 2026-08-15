import Link from "next/link";
import { ArrowRight, Plane, ShieldCheck } from "lucide-react";

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-[#0b1f44] p-8 text-white shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Flights</p>
              <h1 className="mt-3 text-4xl font-bold">Global flights, expertly managed</h1>
            </div>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[#ff9f43] px-5 py-3 text-sm font-semibold text-slate-900">
              Search Flights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Lagos", "London", "Economy & Business"],
            ["Abuja", "Dubai", "Premium and flexible fares"],
            ["Port Harcourt", "New York", "Multi-city options"],
            ["Lagos", "Paris", "Managed flights"],
            ["Abuja", "Johannesburg", "Business travel"],
            ["Lagos", "Nairobi", "Safari-ready routes"],
          ].map(([from, to, detail]) => (
            <div key={`${from}-${to}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-sky-700"><Plane className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-[0.2em]">Route</span></div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{from} → {to}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Flexible support</span>
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
