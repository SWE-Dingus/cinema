"use client"; // Marking this as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Seat {
  seat: string;
  ageCategory: string;
  price: number;
}

interface OrderDetails {
  movieTitle: string;
  showtime: string;
  selectedSeats: Seat[];
  total: number;
}

const OrderSummary: React.FC = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  // Load order details from localStorage and check authorization
  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");
    if (!accountEmail) {
      setIsUnauthorized(true); // User is not logged in
      return;
    }

    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }
  }, []);

  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">401 - Unauthorized</h1>
        <p className="text-center text-red-600">
          You are not authorized to view this page. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to access the order summary.
        </p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Order Summary</h1>
        <p className="text-center text-red-600">No order details found. Please select your seats first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Order Summary</h1>
      <div className="bg-[#2a1c2a] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{orderDetails.movieTitle}</h2>
        <p className="mb-4">Showtime: <span className="font-semibold">{orderDetails.showtime}</span></p>

        <h3 className="text-xl font-bold mb-2">Selected Seats</h3>
        <ul>
          {orderDetails.selectedSeats.map((seat) => (
            <li key={seat.seat} className="flex justify-between mb-1">
              <span>{seat.seat} - {seat.ageCategory}</span>
              <span>${seat.price}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-bold text-xl mt-4">
          <span>Total:</span>
          <span>${orderDetails.total}</span>
        </div>

        <button
          className="mt-6 bg-[#28a745] text-white px-6 py-3 rounded hover:bg-[#218838] transition"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
