"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Config from "../../../frontend.config";
import Navbar from "../components/Navbar"; // Adjust the path to your Navbar component

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all movies with showtimes
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/getAll`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: Movie[] = await response.json();
        setMovies(data);
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while fetching movies."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
      {/* Include Navbar */}
      <Navbar isLoggedIn={false} handleLogout={() => {}} />
      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold mb-6">All Showtimes</h1>
        {movies.length > 0 ? (
          movies.map((movie) => (
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
                  {movie.shows.map((show) => (
                    <li key={show.showID}>
                      <Link
                        href={`/seat-selection?movieId=${movie.id}&title=${encodeURIComponent(
                          movie.title
                        )}&showtime=${encodeURIComponent(show.showTime)}`}
                      >
                        <button className="bg-[#fadcd5] text-[#1b0c1a] px-6 py-3 rounded transition-transform duration-200 hover:bg-[#e0c2a0] hover:scale-105">
                          {new Date(show.showTime).toLocaleString()}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">No showtimes available yet.</p>
              )}
            </div>
          ))
        ) : (
          <p>No movies or showtimes available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowtimesPage;
