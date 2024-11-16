"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ShowtimesPage: React.FC = () => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const movieId = "123";
  const title = "Hardcoded Movie Title"; // This could be dynamic as well
  const showtimes = ["1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"];

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");
    setIsUnauthorized(!accountEmail);
    setIsLoading(false);
  }, []);

  const handleShowtimeSelection = (showtime: string) => {
    const orderDetails = {
      movieTitle: title,
      showtime,
      selectedSeats: [],
      total: 0,
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">401 - Unauthorized</h1>
        <p className="text-center text-red-600">
          You are not authorized to view this page. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to access showtimes.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1b0c1a] text-white p-5">
      <h1 className="text-4xl font-bold mb-6">Showtimes for {title}</h1>
      <ul className="space-y-4">
        {showtimes.map((time, index) => (
          <li key={index}>
            <Link href={`/seat-selection?movieId=${movieId}&title=${encodeURIComponent(title)}&showtime=${time}`}>
              <button
                className="bg-[#fadcd5] text-[#1b0c1a] px-6 py-3 rounded transition-transform duration-200 hover:bg-[#e0c2a0] hover:scale-105"
                onClick={() => handleShowtimeSelection(time)}
              >
                {time}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesPage;
