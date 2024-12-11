"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Config from "../../../frontend.config";

const SeatSelection: React.FC = () => {
  const router = useRouter();
  const [movieDetails, setMovieDetails] = useState<{ movieId: string; title: string; showId: string }>({
    movieId: '',
    title: '',
    showId: '',
  });
  
  const [seats, setSeats] = useState<{seatNumber: string; booked: boolean;}[]>([]);
  const ageCategories = ["Child", "Adult", "Senior"];
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatAgeCategories, setSeatAgeCategories] = useState<{ [seat: string]: string }>({});
  const [childPrice, setChild] = useState<number>(0);
  const [adultPrice, setAdult] = useState<number>(0);
  const [seniorPrice, setSenior] = useState<number>(0);
  const [movieTitle, setMovieTitle] = useState<string>()

  useEffect(() => {
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    const movieId = urlParams.get('movieId') || '';
    const showId = urlParams.get('showId') || '';
    let title;
    const fetchAllData = async() => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/get/${Number(movieId)}`);
          if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setChild(data.childPrice);
        setAdult(data.adultPrice);
        setSenior(data.seniorPrice);
        setMovieTitle(data.title);
        const seatResp = await fetch(`${Config.apiRoot}/shows/get/${Number(showId)}`);
          if (!seatResp.ok) throw new Error("Showtime not found");
        const seatData = await seatResp.json();
        const seatCount = seatData.showRoomID==3 ? 30 : 20;
        const alphabets = ['A','B','C','D','E','F']
        let tempArr : {seatNumber: string; booked: boolean;}[];
        tempArr = [];
        for (let i = 0; i < seatCount; i++) {
          const tempSeatNum = alphabets[Math.floor(i/5)]+(i%5 + 1).toString();
          tempArr = [...tempArr, {seatNumber:tempSeatNum, booked: seatData.seatsList[i]}]
          console.log(tempSeatNum)
        }
        setSeats(tempArr);
      } catch (e) {
        console.log("Error fetching the movie and/or seat details:", e);
      }
    }
    fetchAllData();
    title = movieTitle || '';
    setMovieDetails({ movieId, title, showId });
  }, []);

useEffect(() => {
  
})

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      const updatedCategories = { ...seatAgeCategories };
      delete updatedCategories[seat];
      setSeatAgeCategories(updatedCategories);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleAgeCategoryChange = (seat: string, ageCategory: string) => {
    setSeatAgeCategories((prev) => ({
      ...prev,
      [seat]: ageCategory,
    }));
  };

  const handleProceedToOrderSummary = () => {
    const selectedSeatsWithAgeCategories = selectedSeats.map((seat) => {
      const ageCategory = seatAgeCategories[seat] || "Adult";
      const price = ageCategory === "Child" ? childPrice : ageCategory === "Senior" ? seniorPrice : adultPrice;
      return { seat, ageCategory, price };
    });

    const orderDetails = {
      movieTitle: movieDetails.title || "Default Movie Title", // Fallback if title is not found
      showtime: movieDetails.showId || "Default Showtime", // Fallback if showtime is not found
      selectedSeats: selectedSeatsWithAgeCategories,
      total: selectedSeatsWithAgeCategories.reduce((sum, s) => sum + s.price, 0),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    router.push("/ordersummary");
  };

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Select Your Seats</h1>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {seats.map((seat) => (
          <button
            key={seat.seatNumber}
            disabled={seat.booked}
            onClick={() => !seat.booked ? toggleSeatSelection(seat.seatNumber) : seat.booked=seat.booked}
            className={`p-4 border rounded-lg transition-colors ${
              !seat.booked ?
                selectedSeats.includes(seat.seatNumber) ? 
                  "bg-[#6f42c1] hover:bg-[#5a32a1]" 
                  : "bg-[#2a1c2a] hover:bg-[#5a32a1]"
              : "bg-[#7A7A7A]"
            }`}> 
            {seat.seatNumber}
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
