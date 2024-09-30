"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation for App Router

const SeatSelection: React.FC = () => {
  const router = useRouter();

  const seats = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"]; // Example seat list
  const ageCategories = ["Child", "Adult", "Senior"];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatAgeCategories, setSeatAgeCategories] = useState<{
    [seat: string]: string;
  }>({});

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      const newCategories = { ...seatAgeCategories };
      delete newCategories[seat]; // Remove age category when seat is deselected
      setSeatAgeCategories(newCategories);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleAgeCategoryChange = (seat: string, ageCategory: string) => {
    setSeatAgeCategories({
      ...seatAgeCategories,
      [seat]: ageCategory,
    });
  };

  const handleProceedToOrderSummary = () => {
    const selectedSeatsWithAgeCategories = selectedSeats.map((seat) => ({
      seat,
      ageCategory: seatAgeCategories[seat] || "Adult", // Default to adult if not selected
    }));

    // Example of passing this data to the order summary page
    localStorage.setItem(
      "order",
      JSON.stringify(selectedSeatsWithAgeCategories),
    );

    router.push("/ordersummary");
  };

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Select Your Seats</h1>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeatSelection(seat)}
            className={`p-4 border rounded-lg transition-colors ${
              selectedSeats.includes(seat)
                ? "bg-[#6f42c1] text-white"
                : "bg-[#2a1c2a] text-white"
            } hover:bg-[#5a32a1]`}
          >
            {seat}
          </button>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="bg-[#2a1c2a] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Selected Seats</h2>
          {selectedSeats.map((seat) => (
            <div key={seat} className="flex items-center justify-between mb-2">
              <span className="text-lg">{seat}</span>
              <select
                value={seatAgeCategories[seat] || "Adult"}
                onChange={(e) => handleAgeCategoryChange(seat, e.target.value)}
                className="border border-gray-300 p-2 rounded bg-[#3b2d3b] text-white"
              >
                {ageCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="mt-5 bg-[#28a745] text-white px-6 py-3 rounded hover:bg-[#218838] transition"
            onClick={handleProceedToOrderSummary}
          >
            Proceed to Order Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
