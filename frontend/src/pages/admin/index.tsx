import React, { useState, useEffect } from "react";
import Link from "next/link"; // Using Link for navigation
import Config from "../../../frontend.config";

interface Movie {
  id?: number;
  title: string;
  category: string;
  posterUrl: string;
  trailerId: string;
  isRunning: boolean;
}

const AdminMain: React.FC = () => {
  const [movieCount, setMovieCount] = useState<number>(0);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);

  // Fetch movie data when the component mounts
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      // Fetch all movies from the backend
      const movieResponse = await fetch(`${Config.apiRoot}/movies/getAll`);
      const movies: Movie[] = await movieResponse.json();

      // Set movie count
      setMovieCount(movies.length);

      // Set recent movies (show the first 5 movies, for example)
      setRecentMovies(movies.slice(0, 5)); // Adjust the number as needed
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      {/* Manage Movies Section */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-2">Manage Movies</h2>

        {/* Display movie count */}
        <p>Total Movies: {movieCount}</p>

        {/* Display recent movies */}
        <h3 className="text-xl font-bold mt-3">Recently Added Movies</h3>
        {recentMovies.length > 0 ? (
          <ul>
            {recentMovies.map((movie) => (
              <li key={movie.id}>
                {movie.title} (Category: {movie.category})
              </li>
            ))}
          </ul>
        ) : (
          <p>No recently added movies found</p>
        )}

        {/* Button to navigate to Manage Movies page */}
        <Link href="/admin/movies">
          <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded">
            Manage All Movies
          </button>
        </Link>
      </div>

      {/* Keeping the rest of the Admin Dashboard unchanged for now */}
      <div className="space-y-4">
        <Link href="/admin/promotions">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Manage Promotions
          </button>
        </Link>
        <Link href="/admin/users">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Manage Users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminMain;
