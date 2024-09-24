"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../app/components/Navbar";
import SearchBar from "../app/components/SearchBar";
import MovieCard from "../app/components/MovieCard";

interface Movie {
  id: number;
  title: string;
  category: string[];
  posterUrl: string;
  trailerUrl: string;
  isRunning: boolean;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // State to store movies fetched from API
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to track the search input

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movies/getAll"); // Replace with your actual endpoint
      const data = await response.json();
      setMovies(data); // Store the fetched movies in the state
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Filter movies based on the search term
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="p-5">
        <h2 className="text-2xl font-bold">Currently Running</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => movie.isRunning)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  poster: movie.posterUrl,
                  trailer: movie.trailerUrl, // Embedded trailer
                }}
              />
            ))}
        </div>
      </section>

      <section className="p-5">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => !movie.isRunning)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  poster: movie.posterUrl,
                  trailer: movie.trailerUrl, // Embedded trailer
                }}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
