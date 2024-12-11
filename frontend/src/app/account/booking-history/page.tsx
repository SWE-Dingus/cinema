"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Config from "../../../../frontend.config";

interface Ticket {
  ticketType: string;
  seat: number;
}

interface Booking {
  id: number;
  total: number;
  time: string;
  tickets: Ticket[];
  cancelStatus: boolean;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const accountEmail = localStorage.getItem("accountEmail");

      if (!accountEmail) {
        router.push("/401");
        return;
      }

      try {
        const response = await fetch(
          `${Config.apiRoot}/account/fetchBookings?email=${accountEmail}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (err) {
        setError((err as Error).message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleCancelBooking = async (bookingId: number) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this booking? This action cannot be undone."
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(`${Config.apiRoot}/bookings/cancel/${bookingId}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to cancel booking.");
      }

      // Update UI after successful cancellation
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, cancelStatus: true } : booking
        )
      );
    } catch (err) {
      setError((err as Error).message || "Failed to cancel the booking.");
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Booking History</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`p-4 rounded-lg shadow-md ${
              booking.cancelStatus ? "bg-gray-200" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-2 text-gray-900">
              Booking ID: {booking.id}
              {booking.cancelStatus && (
                <span className="text-red-600 text-sm ml-2">(Cancelled)</span>
              )}
            </h2>
            <p>Total: ${booking.total.toFixed(2)}</p>
            <p>Time: {new Date(booking.time).toLocaleString()}</p>
            <button
              onClick={() => handleViewDetails(booking)}
              className="mt-2 text-blue-500 hover:text-blue-700"
            >
              View Details
            </button>
            {!booking.cancelStatus && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Booking Details (ID: {selectedBooking.id})
            </h2>
            <p>Total: ${selectedBooking.total.toFixed(2)}</p>
            <p>Time: {new Date(selectedBooking.time).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-4">Tickets:</h3>
            <ul className="list-disc pl-6">
              {selectedBooking.tickets.map((ticket, index) => (
                <li key={index}>
                  {ticket.ticketType} Seat: {ticket.seat}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
