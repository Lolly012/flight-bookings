"use client";

import Link from "next/link";
import { Plane, MapPin, Calendar, Users, Shield, Award, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SkyBook</span>
            </div>
            <div className="flex gap-4">
              <Link href="/search" className="hover:text-blue-400 transition">
                Search Flights
              </Link>
              <Link href="/manage-booking" className="hover:text-blue-400 transition">
                Manage Booking
              </Link>
              <Link href="/login" className="hover:text-blue-400 transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Fly Anywhere, Anytime
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Book your next flight in seconds. Find the best deals on thousands of routes worldwide.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition"
          >
            <Plane className="h-5 w-5" />
            Start Searching
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <Shield className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
            <p className="text-slate-400">
              Your payments and personal information are encrypted and secure.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <Award className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-slate-400">
              Compare and find the lowest fares across all airlines.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <Zap className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
            <p className="text-slate-400">
              Get your booking confirmation immediately after payment.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">Quick Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">From</p>
                <p className="font-semibold">Select Departure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">To</p>
                <p className="font-semibold">Select Destination</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Date</p>
                <p className="font-semibold">Select Date</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Passengers</p>
                <p className="font-semibold">1 Passenger</p>
              </div>
            </div>
          </div>
          <Link
            href="/search"
            className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-lg font-semibold transition"
          >
            Search Flights
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold mb-4">Company</p>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Services</p>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/search" className="hover:text-white transition">Search Flights</Link></li>
                <li><Link href="/manage-booking" className="hover:text-white transition">Manage Booking</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Account</p>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                <li><Link href="/register" className="hover:text-white transition">Register</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4">Support</p>
              <ul className="space-y-2 text-slate-400">
                <li><a href="mailto:support@skybook.com" className="hover:text-white transition">Email Support</a></li>
                <li><a href="tel:+1234567890" className="hover:text-white transition">Call Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SkyBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
