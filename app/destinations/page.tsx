import { popularDestinations } from "@/lib/flight-data";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Popular destinations</p>
          <h1 className="mt-3 text-4xl font-bold">Discover where your next trip can take you</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {popularDestinations.map((destination) => (
            <article key={destination.name} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-52 bg-slate-200">
                <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900">{destination.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{destination.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
