"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Download, XCircle, PencilLine } from "lucide-react";

export default function ManageBookingPage() {
  const [bookingRef, setBookingRef] = useState("RRT-8F4K29");
  const [searched, setSearched] = useState(true);

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-[#0b1f44] p-8 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Manage booking</p>
          <h1 className="mt-3 text-3xl font-bold">Retrieve your itinerary</h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.5fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Booking reference</label>
                <input value={bookingRef} onChange={(e) => setBookingRef(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Passenger surname</label>
                <input defaultValue="Adebayo" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
              </div>
              <button onClick={() => setSearched(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">
                <Search className="h-4 w-4" />
                Retrieve booking
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {searched ? (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Booking</p>
                    <h2 className="mt-2 text-2xl font-bold">{bookingRef}</h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Confirmed</span>
                </div>

                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Passenger</span><strong className="text-slate-900">John Adebayo</strong></div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Route</span><strong className="text-slate-900">Lagos → London</strong></div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Flight</span><strong className="text-slate-900">RH210</strong></div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Departure</span><strong className="text-slate-900">15 Jan 2026</strong></div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Payment</span><strong className="text-slate-900">Successful</strong></div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"><Download className="h-4 w-4" />Download ticket</button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"><PencilLine className="h-4 w-4" />Request modification</button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600"><XCircle className="h-4 w-4" />Cancel booking</button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">No booking has been looked up yet.</div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
