"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../app/components/Navbar";
import SearchBar from "../app/components/SearchBar";
import MovieCard from "../app/components/MovieCard";
import Config from "../../frontend.config";
import { Movie } from "@/app/models/Movie";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genreTerm, setGenreTerm] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is logged in by checking for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("accountToken");
    const expires = localStorage.getItem("expires");

    if (token && expires) {
      const expiryDate = new Date(expires);
      const currentDate = new Date();

      // Check if the token is still valid
      if (expiryDate > currentDate) {
        setIsLoggedIn(true);
      } else {
        handleLogout(); // Token is expired, log out the user
      }
    }
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

  const handleLogout = () => {
    localStorage.removeItem("accountToken");
    localStorage.removeItem("accountEmail");
    localStorage.removeItem("authorizationLevel");
    localStorage.removeItem("expires");

    setIsLoggedIn(false);
    window.location.replace("/login");
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category
        .join(", ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())) &&
      (movie.category.includes(genreTerm) || genreTerm === "")
  );

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} genreTerm={genreTerm} setGenreTerm={setGenreTerm} />
      
      <section className="p-5">
        <h2 className="text-2xl font-bold">Currently Running</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => movie.isRunning)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>

      <section className="p-5">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredMovies
            .filter((movie) => !movie.isRunning)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
