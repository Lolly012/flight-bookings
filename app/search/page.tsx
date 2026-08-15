"use client";

import Link from "next/link";
import { ArrowRight, CalendarRange, Filter, MapPin, SlidersHorizontal, Star, TicketPercent } from "lucide-react";
import { useMemo, useState } from "react";
import { airports, defaultSearchState, flightOffers, type FlightOffer } from "@/lib/flight-data";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";

const sortOptions = ["Recommended", "Cheapest", "Fastest", "Earliest departure", "Latest departure"] as const;

export default function SearchPage() {
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]>("Recommended");
  const [selectedFlight, setSelectedFlight] = useState<string | null>(flightOffers[0]?.id ?? null);
  const [cabinFilter, setCabinFilter] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(1500000);

  const visibleFlights = useMemo(() => {
    let results = [...flightOffers];

    results = results.filter((flight) => flight.finalPrice <= maxPrice);
    if (cabinFilter !== "All") results = results.filter((flight) => flight.cabin === cabinFilter);

    switch (sortBy) {
      case "Cheapest":
        results.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "Fastest":
        results.sort((a, b) => a.durationMinutes - b.durationMinutes);
        break;
      case "Earliest departure":
        results.sort((a, b) => new Date(a.departureAt).getTime() - new Date(b.departureAt).getTime());
        break;
      case "Latest departure":
        results.sort((a, b) => new Date(b.departureAt).getTime() - new Date(a.departureAt).getTime());
        break;
      default:
        results.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
    }

    return results;
  }, [cabinFilter, maxPrice, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white" />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="rounded-3xl bg-[#0b1f44] p-6 text-white shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Flight search</p>
              <h1 className="mt-2 text-3xl font-bold">{defaultSearchState.from} to {defaultSearchState.to}</h1>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <button className="rounded-full bg-white/10 px-4 py-2">Round trip</button>
              <button className="rounded-full border border-white/20 px-4 py-2">15 Jan - 22 Jan</button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              <button type="button" className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Airline</label>
                <div className="space-y-2 text-sm text-slate-700">
                  {Array.from(new Set(flightOffers.map((flight) => flight.airline))).slice(0, 5).map((airline) => (
                    <label key={airline} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300" />
                      {airline}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price range</label>
                <input
                  type="range"
                  min={150000}
                  max={1500000}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-[#0b1f44]"
                />
                <div className="mt-2 text-sm text-slate-600">Up to {formatCurrency(maxPrice, "NGN")}</div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Cabin class</label>
                <select value={cabinFilter} onChange={(e) => setCabinFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                  <option value="All">All cabins</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-sky-700" />
                {flightOffers.length} flights found
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-600">Sort by</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as (typeof sortOptions)[number])} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {visibleFlights.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-2xl font-bold text-slate-900">No flights found</p>
                <p className="mt-3 text-slate-600">We couldn&apos;t find flights matching your search. Try changing your dates, destination, or cabin class.</p>
                <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">Modify Search</Link>
              </div>
            ) : (
              visibleFlights.map((flight) => {
                const isSelected = selectedFlight === flight.id;
                return (
                  <article key={flight.id} className={`rounded-3xl border bg-white p-5 shadow-sm transition ${isSelected ? "border-sky-500 shadow-lg shadow-sky-100" : "border-slate-200"}`}>
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div className="flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                          <span className="rounded-full bg-[#edf6ff] px-2.5 py-1 font-semibold text-sky-700">{flight.airline}</span>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{flight.flightNumber}</span>
                          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-600">{flight.cabin}</span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                          <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Departure</div>
                            <div className="mt-1 text-2xl font-black text-slate-900">{new Date(flight.departureAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                            <div className="mt-1 text-sm text-slate-600">{flight.origin}</div>
                          </div>

                          <div className="flex items-center gap-3 text-slate-500">
                            <div className="h-px w-12 bg-slate-300" />
                            <div className="text-center text-xs font-semibold uppercase tracking-[0.18em]">
                              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                            </div>
                            <div className="h-px w-12 bg-slate-300" />
                          </div>

                          <div className="text-left md:text-right">
                            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Arrival</div>
                            <div className="mt-1 text-2xl font-black text-slate-900">{new Date(flight.arrivalAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                            <div className="mt-1 text-sm text-slate-600">{flight.destination}</div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                          <span className="inline-flex items-center gap-2"><CalendarRange className="h-4 w-4" />{formatDate(flight.departureAt)}</span>
                          <span>Duration: {getDurationLabel(flight.durationMinutes)}</span>
                          <span>Baggage: {flight.baggage}</span>
                          <span>{flight.refundable ? "Refundable" : "Non-refundable"}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 xl:min-w-[230px] xl:items-end">
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Total</div>
                          <div className="mt-1 text-3xl font-black text-[#0b1f44]">{formatCurrency(flight.finalPrice, flight.currency)}</div>
                          <div className="text-xs text-slate-500">Taxes & fees included</div>
                        </div>

                        <div className="flex gap-2">
                          <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">View Details</button>
                          <Link href="/booking" onClick={() => setSelectedFlight(flight.id)} className="inline-flex items-center gap-2 rounded-full bg-[#0b1f44] px-4 py-2 text-sm font-semibold text-white">
                            Select Flight
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
