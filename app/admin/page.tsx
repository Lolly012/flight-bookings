"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

interface Booking {
  id: string;
  booking_reference: string;
  origin_code: string;
  destination_code: string;
  status: string;
  payment_status: string;
  final_customer_price: number;
  currency: string;
  created_at: string;
}

interface BookingDetail extends Booking {
  booking_passengers: Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    passport_number?: string;
  }>;
  payments: Array<{
    id: string;
    provider: string;
    amount: number;
    status: string;
  }>;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/bookings", window.location.origin);
      if (statusFilter) url.searchParams.set("status", statusFilter);

      const res = await fetch(url);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetail = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`);
      const data = await res.json();
      setSelectedBooking(data);
    } catch (error) {
      console.error("Error fetching booking detail:", error);
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingStatus(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          notes: `Status updated to ${newStatus}`,
        }),
      });

      if (res.ok) {
        fetchBookings();
        if (selectedBooking?.id === bookingId) {
          fetchBookingDetail(bookingId);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      ticketed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-slate-100 text-slate-800"}`}>
        {status}
      </span>
    );
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "successful":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-[#0b1f44] p-8 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Admin dashboard</p>
          <h1 className="mt-3 text-4xl font-bold">Booking management</h1>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2">
              {["", "pending", "confirmed", "ticketed", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    statusFilter === status
                      ? "bg-[#0b1f44] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All"}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading bookings...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Reference</th>
                    <th className="px-4 py-3 text-left font-semibold">Route</th>
                    <th className="px-4 py-3 text-left font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-left font-semibold">Payment</th>
                    <th className="px-4 py-3 text-left font-semibold">Created</th>
                    <th className="px-4 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-600">{booking.booking_reference}</td>
                      <td className="px-4 py-3">{`${booking.origin_code} → ${booking.destination_code}`}</td>
                      <td className="px-4 py-3 font-semibold">{`${booking.currency} ${booking.final_customer_price.toLocaleString()}`}</td>
                      <td className="px-4 py-3">{getStatusBadge(booking.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getPaymentStatusIcon(booking.payment_status)}
                          <span className="text-xs text-slate-600">{booking.payment_status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{new Date(booking.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => fetchBookingDetail(booking.id)}
                          className="px-3 py-1 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 text-xs font-semibold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-12 text-slate-500">No bookings found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs text-slate-500 uppercase">Booking Details</p>
                <h2 className="text-2xl font-bold text-slate-900">{selectedBooking.booking_reference}</h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-2xl text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Route</p>
                  <p className="mt-1 text-lg font-bold">{`${selectedBooking.origin_code} → ${selectedBooking.destination_code}`}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Amount</p>
                  <p className="mt-1 text-lg font-bold">{`${selectedBooking.currency} ${selectedBooking.final_customer_price.toLocaleString()}`}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Booking Status</p>
                  <div className="mt-2 flex gap-2">
                    {getStatusBadge(selectedBooking.status)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Payment Status</p>
                  <div className="mt-2 flex items-center gap-2">
                    {getPaymentStatusIcon(selectedBooking.payment_status)}
                    <span className="capitalize">{selectedBooking.payment_status}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Passengers</p>
                <div className="space-y-2">
                  {selectedBooking.booking_passengers?.map((passenger) => (
                    <div key={passenger.id} className="rounded-lg bg-slate-50 p-3">
                      <p className="font-semibold">{`${passenger.first_name} ${passenger.last_name}`}</p>
                      <p className="text-xs text-slate-600">{passenger.email}</p>
                      {passenger.passport_number && (
                        <p className="text-xs text-slate-600">Passport: {passenger.passport_number}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedBooking.payments && selectedBooking.payments.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Payments</p>
                  <div className="space-y-2">
                    {selectedBooking.payments.map((payment) => (
                      <div key={payment.id} className="rounded-lg bg-slate-50 p-3">
                        <p className="font-semibold">{payment.provider}</p>
                        <p className="text-xs text-slate-600">{`${payment.amount} - ${payment.status}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["pending", "confirmed", "ticketed", "completed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedBooking.id, status)}
                      disabled={updatingStatus === selectedBooking.id}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        selectedBooking.status === status
                          ? "bg-[#0b1f44] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
