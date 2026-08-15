"use client";

import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { mockBooking } from "@/lib/flight-data";
import { formatCurrency } from "@/lib/utils";

const steps = ["Flight", "Passengers", "Extras", "Review", "Payment"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const total = useMemo(() => mockBooking.amount, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Secure booking</p>
            <h1 className="mt-2 text-3xl font-bold">Complete your reservation</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Booking reference: {mockBooking.bookingReference}</div>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-5">
          {steps.map((label, index) => (
            <div key={label} className={`rounded-2xl border p-3 ${index + 1 === step ? "border-[#0b1f44] bg-[#edf6ff]" : "border-slate-200 bg-white"}`}>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</div>
              <div className="mt-2 text-sm font-semibold">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_360px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 rounded-2xl bg-[#f6fbff] p-4">
              <ShieldCheck className="h-6 w-6 text-sky-700" />
              <div>
                <div className="font-bold text-slate-900">Flight selected</div>
                <div className="text-sm text-slate-600">Lagos (LOS) → London (LHR)</div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Passenger title</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm">
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">First name</label>
                  <input defaultValue="John" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Last name</label>
                  <input defaultValue="Adebayo" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                  <input type="email" defaultValue="john@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
                  <input defaultValue="+2348030000000" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Date of birth</label>
                  <input type="date" defaultValue="1990-05-13" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Nationality</label>
                  <input defaultValue="Nigerian" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Link href="/search" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Back to results</Link>
              <button type="button" onClick={() => setStep((current) => Math.min(current + 1, 5))} className="inline-flex items-center gap-2 rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Price summary</h2>
              <Ticket className="h-5 w-5 text-sky-700" />
            </div>

            <div className="mt-5 space-y-4 border-b border-slate-200 pb-5 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Base fare</span><span>{formatCurrency(520000, "NGN")}</span></div>
              <div className="flex items-center justify-between"><span>Taxes</span><span>{formatCurrency(60000, "NGN")}</span></div>
              <div className="flex items-center justify-between"><span>Service fee</span><span>{formatCurrency(12000, "NGN")}</span></div>
              <div className="flex items-center justify-between"><span>Agency markup</span><span>{formatCurrency(25000, "NGN")}</span></div>
            </div>

            <div className="mt-5 flex items-center justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total, "NGN")}</span>
            </div>

            <div className="mt-6 rounded-2xl bg-[#edf6ff] p-4 text-sm text-slate-700">
              <div className="flex items-center gap-2 font-semibold text-sky-700"><Check className="h-4 w-4" /> Secure payment</div>
              <p className="mt-2 leading-6">Provider-hosted payment and webhook verification protect card details.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
