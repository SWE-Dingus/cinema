"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../app/components/Navbar";
import SearchBar from "../app/components/SearchBar";
import MovieCard from "../app/components/MovieCard";
import Config from "../../frontend.config";
import { Movie } from "@/app/models/Movie";

const HomePage: React.FC = () => {
  const [runningMovies, setRunningMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [genreTerm, setGenreTerm] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>([]);

  const runningMoviesRef = useRef<HTMLDivElement>(null);
  const comingSoonMoviesRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
  }, []);

  const fetchRunningMovies = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/running`);
      const data = await response.json();
      setRunningMovies(data);
    } catch (error) {
      console.error("Error fetching running movies:", error);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/upcoming`);
      const data = await response.json();
      setUpcomingMovies(data);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/genres`);
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
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
    fetchRunningMovies();
    fetchUpcomingMovies();
    fetchGenres();
  }, []);

  const filterMovies = (movies: Movie[]) =>
    movies.filter(
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
      <Navbar isLoggedIn={isLoggedIn} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreTerm={genreTerm}
        setGenreTerm={setGenreTerm}
        genreOptions={genres}
      />

      {/* Currently Running Section */}
      <section className="p-12 relative">
        <h2 className="text-2xl font-bold mb-6">Currently Running</h2>
        <div className="relative overflow-visible px-12">
          <button
            onClick={() => scrollLeft(runningMoviesRef)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
          >
            &#9664;
          </button>
          <div
            ref={runningMoviesRef}
            className="flex overflow-x-auto space-x-12 scrollbar-hide"
          >
            {filterMovies(runningMovies).map((movie) => (
              <MovieCard key={movie.id} movie={movie} isCurrentlyRunning={true}/>
            ))}
          </div>
          <button
            onClick={() => scrollRight(runningMoviesRef)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
          >
            &#9654;
          </button>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="p-12 relative">
        <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
        <div className="relative overflow-visible px-12">
          <button
            onClick={() => scrollLeft(comingSoonMoviesRef)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
          >
            &#9664;
          </button>
          <div
            ref={comingSoonMoviesRef}
            className="flex overflow-x-auto space-x-12 scrollbar-hide"
          >
            {filterMovies(upcomingMovies).map((movie) => (
              <MovieCard key={movie.id} movie={movie} isCurrentlyRunning={false} />
            ))}
          </div>
          <button
            onClick={() => scrollRight(comingSoonMoviesRef)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
          >
            &#9654;
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
