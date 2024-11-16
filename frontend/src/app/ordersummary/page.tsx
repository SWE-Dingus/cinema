"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SeatSelection {
  seat: string;
  ageCategory: string;
  price: number;
}

interface OrderDetails {
  movieTitle: string;
  showtime: string;
  selectedSeats: SeatSelection[];
  total: number;
}

const OrderSummary: React.FC = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");
    if (!accountEmail) {
      setIsUnauthorized(true);
    } else {
      // Load order details if authorized
      const savedOrderDetails = localStorage.getItem("orderDetails");
      if (savedOrderDetails) {
        setOrderDetails(JSON.parse(savedOrderDetails));
      }
    }
  }, []);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  const handleDeleteTicket = (index: number) => {
    if (orderDetails) {
      const updatedSeats = [...orderDetails.selectedSeats];
      updatedSeats.splice(index, 1);

      const updatedOrderDetails = {
        ...orderDetails,
        selectedSeats: updatedSeats,
        total: updatedSeats.reduce((sum, seat) => sum + seat.price, 0),
      };

      setOrderDetails(updatedOrderDetails);
      localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
    }
  };

  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">
          401 - Unauthorized
        </h1>
        <p className="text-center text-red-600">
          You are not authorized to view this page. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to access order summary.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Order Summary</h1>

      {orderDetails ? (
        <div className="bg-[#2a1c2a] border p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">{orderDetails.movieTitle}</h2>
          <p className="mb-2">Showtime: {orderDetails.showtime}</p>
          <p className="mb-2">
            Seats: {orderDetails.selectedSeats.map(seat => seat.seat).join(", ")}
          </p>
          <p className="mb-2 font-semibold">Ticket Details:</p>
          <ul className="list-disc ml-5">
            {orderDetails.selectedSeats.map((seat, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>
                  Seat {seat.seat} ({seat.ageCategory}): ${seat.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDeleteTicket(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${orderDetails.total.toFixed(2)}</p>

          <button
            className="bg-[#28a745] text-white px-6 py-3 rounded mt-4 hover:bg-[#218838] transition-all duration-200"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p className="text-center text-white">Loading order details...</p>
      )}
    </div>
  );
};

export default OrderSummary;