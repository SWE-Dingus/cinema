import React, { useState, useEffect } from "react";
import MovieCard from "../../app/components/MovieCard"; // Import MovieCard component
import Config from "../../../frontend.config";

interface Movie {
  id: number;
  title: string;
  category: string[];
  posterUrl: string; // Assuming the API returns a posterUrl
  trailerId: string; // Assuming the API returns a trailerId
  isRunning: boolean; // Add isRunning to your Movie interface
}

const AllMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // State to store movies fetched from API
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to track the search input

  // Fetch movies from the backend when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/movies/getAll`);
      const data = await response.json();
      console.log("Movies from backend:", data); // Log the fetched data
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

  // Separate movies into Currently Running and Coming Soon
  const currentlyRunningMovies = filteredMovies.filter(
    (movie) => movie.isRunning,
  );
  const comingSoonMovies = filteredMovies.filter((movie) => !movie.isRunning);

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-5"
      />

      <div className="p-5">
        {/* Currently Running Movies */}
        <h2 className="text-2xl font-bold mb-5">Currently Running</h2>
        <div className="grid grid-cols-4 gap-4">
          {currentlyRunningMovies.length > 0 ? (
            currentlyRunningMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  poster: movie.posterUrl, // Adjusting to match MovieCard props
                  trailer: `https://youtube.com/embed/movie.trailerId`, // Assuming API returns trailerUrl
                }}
              />
            ))
          ) : (
            <p>No currently running movies</p>
          )}
        </div>

        {/* Coming Soon Movies */}
        <h2 className="text-2xl font-bold mb-5 mt-10">Coming Soon</h2>
        <div className="grid grid-cols-4 gap-4">
          {comingSoonMovies.length > 0 ? (
            comingSoonMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  poster: movie.posterUrl, // Adjusting to match MovieCard props
                  trailer: `https://youtube.com/embed/movie.trailerId`, // Assuming API returns trailerUrl
                }}
              />
            ))
          ) : (
            <p>No upcoming movies</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;
