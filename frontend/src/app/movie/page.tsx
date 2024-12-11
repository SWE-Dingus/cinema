"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Config from "../../../frontend.config";
import { Movie } from "@/app/models/Movie";

interface ShowTime {
  showID: number;
  movieID: number;
  showRoomID: number;
  showTime: string;
  durationMinutes: number;
}

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showtimes, setShowtimes] = useState<ShowTime[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accountToken");
    localStorage.removeItem("accountEmail");
    localStorage.removeItem("authorizationLevel");
    localStorage.removeItem("expires");

    setIsLoggedIn(false);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("accountToken");
    const expires = localStorage.getItem("expires");

    if (token && expires) {
      const expiryDate = new Date(expires);
      const currentDate = new Date();

      if (expiryDate > currentDate) {
        setIsLoggedIn(true);
      } else {
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/movies/get/${id}`);
        if (!response.ok) throw new Error("Movie not found");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        router.push("/");
      }
    };

    if (id) fetchMovieDetails();
  }, [id, router]);

  const fetchShowtimes = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/shows/getAll`);
      if (!response.ok) throw new Error("Failed to fetch showtimes");
      const data = await response.json();
      const filteredShowtimes = data.filter(
        (showtime: ShowTime) => showtime.movieID === parseInt(id || "")
      );
      setShowtimes(filteredShowtimes);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const handleShowtimeSelect = (showtime: ShowTime) => {
    setShowModal(false);
    router.push(
      `/seat-selection?showID=${showtime.showID}&movieID=${showtime.movieID}`
    );
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="p-5">
        <div className="flex">
          <div className="relative w-1/3 h-96">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={300} // Explicitly set width
              height={450} // Explicitly set height
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="ml-5 flex-1">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg mt-2">
              <strong>MPAA Rating:</strong> {movie.ageRating}
            </p>
            <p className="text-lg mt-2">
              <strong>Director:</strong> {movie.director}
            </p>
            <p className="text-lg mt-2">
              <strong>Cast:</strong> {movie.cast.join(", ")}
            </p>
            <p className="text-lg mt-2">
              <strong>Release Date:</strong>{" "}
              {movie.releaseDate
                ? new Date(movie.releaseDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Not Available"}
            </p>
            <p className="text-lg mt-4">{movie.synopsis}</p>
            <div className="mt-5">
              <h3 className="text-2xl font-bold mb-2">Watch Trailer</h3>
              {movie.trailerId ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://youtube.com/embed/${movie.trailerId}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Trailer not available.</p>
              )}
            </div>
            <div className="mt-5">
              <button
                onClick={() => {
                  setShowModal(true);
                  fetchShowtimes();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              >
                View Showtimes
              </button>

              <Link href="/">
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                  Back to Main
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Select a Showtime</h2>
            {showtimes.length > 0 ? (
              <ul className="space-y-2">
                {showtimes.map((showtime) => (
                  <li key={showtime.showID}>
                    <button
                      onClick={() => handleShowtimeSelect(showtime)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {new Date(showtime.showTime).toLocaleString()} -{" "}
                      {showtime.durationMinutes} mins
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No showtimes available.</p>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MovieDetailsPageWrapper = () => (
  <React.Suspense fallback={<p>Loading...</p>}>
    <MovieDetailsPage />
  </React.Suspense>
);

export default MovieDetailsPageWrapper;
