"use client"; // Marking this as a Client Component

import React, { useState, useEffect } from "react";
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

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Check if the user is logged in
    const accountEmail = localStorage.getItem("accountEmail");
    if (!accountEmail) {
      setIsUnauthorized(true);
      return;
    }

    // Retrieve movie details from localStorage
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      setOrderDetails(JSON.parse(storedOrderDetails));
    }
  }, []);

  const handleCheckout = () => {
    router.push("/orderconfirm"); // Navigate to the order confirmation page
  };

  const handleCancel = () => {
    router.push("/"); // Navigate back to the home page on cancel
  };

  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">401 - Unauthorized</h1>
        <p className="text-center text-red-600">
          You are not authorized to view this page. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to access checkout.
        </p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Order Details Not Found</h1>
        <p className="text-center">Please ensure you have selected your seats and movie before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#1b0c1a] p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Checkout</h1>

      <div className="bg-[#2d1f2d] p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-200 mb-4">
          <strong>Movie:</strong> {orderDetails.movieTitle}
        </p>

        <p className="text-lg text-gray-200 mb-4">
          <strong>Showtime:</strong> {orderDetails.showtime}
        </p>

        <p className="text-lg text-gray-700 mb-4">
          <strong>Seat(s):</strong> {orderDetails.selectedSeats.map((seat) => seat.seat).join(", ")}
        </p>

        <div className="flex justify-between font-bold text-xl mt-4">
          <span>Total:</span>
          <span>${orderDetails.total}</span>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 text-lg bg-[#fadcd5] text-[#000000] rounded-lg 
                     hover:bg-[#e0c2a0] transition-colors duration-300"
          >
            Confirm and Pay
          </button>

          <button
            onClick={handleCancel}
            className="px-6 py-3 text-lg bg-[#fadcd5] text-[#000000] rounded-lg 
                     hover:bg-[#e0c2a0] transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
