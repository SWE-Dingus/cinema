"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import Config from "../../../frontend.config";
import Navbar from "../components/Navbar";
import "../globals.css";

interface ShowTime {
  showID: number;
  movieID: number;
  showRoomID: number;
  showTime: string;
  durationMinutes: number;
}

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  shows: ShowTime[];
}

const ShowtimesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check login state
    const token = localStorage.getItem("accountToken");
    setIsLoggedIn(!!token);

    const fetchMovies = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/getAll`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: Movie[] = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        setError((err as Error).message || "An error occurred while fetching movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filterByDate = (date: Date | null) => {
    if (!date) {
      setFilteredMovies(movies);
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const filtered = movies
      .map((movie) => ({
        ...movie,
        shows: movie.shows.filter((show) => {
          const showDate = new Date(show.showTime).toISOString().split("T")[0];
          return showDate === formattedDate;
        }),
      }))
      .filter((movie) => movie.shows.length > 0);

    setFilteredMovies(filtered);
  };

  const handleDateChange = (value: Date) => {
    setSelectedDate(value);
    filterByDate(value);
  };

  const handleShowAllClick = () => {
    setSelectedDate(null);
    filterByDate(null);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Error</h1>
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1b0c1a] text-white">
      {/* Include Navbar and pass the isLoggedIn state */}
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="p-5">
        <h1 className="text-4xl font-bold mb-6 text-center">Select a Date</h1>
        <div className="flex flex-col items-center text-calendarText">
          <Calendar
            onChange={(date) => handleDateChange(date as Date)}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            className="mx-auto mb-8"
          />
          <button
            onClick={handleShowAllClick}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded transition-transform duration-200 hover:bg-blue-600 hover:scale-105"
          >
            Show All Showtimes
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold mb-6">Showtimes</h1>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="mb-8 w-full max-w-4xl">
              <div className="flex items-center mb-4">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded mr-4"
                />
                <h2 className="text-2xl font-bold">{movie.title}</h2>
              </div>
              {movie.shows.length > 0 ? (
                <ul className="grid grid-cols-2 gap-4">
                  {movie.shows.map((show) => {
                    const showDateTime = new Date(show.showTime);
                    const isPast = showDateTime < new Date();

                    return (
                      <li key={show.showID}>
                        {isPast ? (
                          <button
                            className="bg-gray-400 text-gray-600 px-6 py-3 rounded line-through cursor-not-allowed"
                            disabled
                          >
                            {showDateTime.toLocaleString()}
                          </button>
                        ) : (
                          <Link
                            href={`/seat-selection?movieId=${movie.id}&title=${encodeURIComponent(
                              movie.title
                            )}&showId=${show.showID}`}
                          >
                            <button className="bg-[#fadcd5] text-[#1b0c1a] px-6 py-3 rounded transition-transform duration-200 hover:bg-[#e0c2a0] hover:scale-105">
                              {showDateTime.toLocaleString()}
                            </button>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No showtimes available for this date.</p>
              )}
            </div>
          ))
        ) : (
          <p>No movies or showtimes available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default ShowtimesPage;