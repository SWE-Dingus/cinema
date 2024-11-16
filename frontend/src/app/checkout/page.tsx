"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");
    if (!accountEmail) {
      setIsUnauthorized(true);
    }
  }, []);

  const title = "Superbad";
  const showtime = "3:00 P.M";
  const seat = "B5";

  const handleCheckout = () => {
    router.push("/orderconfirm");
  };

  const handleCancel = () => {
    router.push("/");
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
          to access checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#1b0c1a] p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Checkout</h1>

      <div className="bg-[#2d1f2d] p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-200 mb-4">
          <strong>Movie:</strong> {title || "N/A"}
        </p>

        <p className="text-lg text-gray-200 mb-4">
          <strong>Showtime:</strong> {showtime || "N/A"}
        </p>

        <p className="text-lg text-gray-200 mb-4">
          <strong>Seat:</strong> {seat || "N/A"}
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 text-lg bg-[#fadcd5] text-[#1b0c1a] rounded-lg 
                     hover:bg-[#e0c2a0] transition-colors duration-300"
          >
            Confirm and Pay
          </button>

          <button
            onClick={handleCancel}
            className="px-6 py-3 text-lg bg-[#fadcd5] text-[#1b0c1a] rounded-lg 
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