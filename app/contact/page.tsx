import { Mail, MapPin, Phone, Clock3 } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Contact</p>
          <h1 className="mt-3 text-4xl font-bold">Let’s plan your next trip</h1>
          <div className="mt-8 space-y-5 text-slate-600">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-sky-700" /> <span>+234 XXX XXX XXXX</span></div>
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-sky-700" /> <span>info@rhematravels.com.ng</span></div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-sky-700" /> <span>Website: www.rhematravels.com.ng</span></div>
            <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-sky-700" /> <span>Mon - Sat: 8:00 AM - 6:00 PM</span></div>
          </div>

          <form className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="Full name" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
              <input placeholder="Email address" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
            </div>
            <input placeholder="Subject" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
            <textarea rows={5} placeholder="Your message" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" />
            <button className="rounded-full bg-[#0b1f44] px-5 py-3 text-sm font-semibold text-white">Send message</button>
          </form>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-[#0b1f44] p-8 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">WhatsApp</p>
          <h2 className="mt-3 text-2xl font-bold">Speak with a travel specialist</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">Use WhatsApp for quick assistance with bookings, visa support, or itinerary questions.</p>
          <button className="mt-6 rounded-full bg-[#ff9f43] px-5 py-3 text-sm font-semibold text-slate-900">Chat on WhatsApp</button>
          <div className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-slate-200">
            Office address placeholder: to be updated by the administrator.
          </div>
        </aside>
      </div>
    </main>
  );
}
