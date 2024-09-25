import React, { useState, useEffect } from "react";
import MovieCard from "../../app/components/MovieCard";
import Config from "../../../frontend.config";
import { Movie } from "@/app/models/Movie";

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/getAll`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const currentlyRunningMovies = filteredMovies.filter(
    (movie) => movie.isRunning,
  );
  const comingSoonMovies = filteredMovies.filter((movie) => !movie.isRunning);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-100 p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-800 text-center mb-6">
          Movie Theater
        </h1>
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-white border border-orange-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </header>

      <main className="space-y-12">
        <MovieSection
          title="Currently Running"
          movies={currentlyRunningMovies}
        />
        <MovieSection title="Coming Soon" movies={comingSoonMovies} />
      </main>
    </div>
  );
};

const MovieSection: React.FC<{ title: string; movies: Movie[] }> = ({
  title,
  movies,
}) => (
  <section>
    <h2 className="text-2xl sm:text-3xl font-semibold text-orange-700 mb-6">
      {title}
    </h2>
    {movies.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    ) : (
      <p className="text-lg text-orange-600 bg-orange-100 p-4 rounded-lg shadow">
        No {title.toLowerCase()} movies available
      </p>
    )}
  </section>
);

export default AllMoviesPage;
