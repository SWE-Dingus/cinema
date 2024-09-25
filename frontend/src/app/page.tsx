"use client";
import React, { useState, useEffect } from "react";
import '../app/globals.css';
import Navbar from "../app/components/Navbar";
import SearchBar from "../app/components/SearchBar";
import MovieCard from "../app/components/MovieCard";
import Config from "../../frontend.config";

interface Movie {
  id: number;
  title: string;
  category: string[];
  posterUrl: string;
  trailerId: string;
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
      const response = await fetch(`${Config.apiRoot}/movies/getAll`); // Replace with your actual endpoint
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
                  trailer: `https://youtube.com/embed/${movie.trailerId}`, // Embedded trailer
                  isRunning: movie.isRunning
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
                  trailer: `https://youtube.com/embed/${movie.trailerId}`, // Embedded trailer
                  isRunning: movie.isRunning
                }}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
