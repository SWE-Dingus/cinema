
"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Using Link for navigation
import Config from "../../../frontend.config";
import "../../app/globals.css"; // Ensure you have necessary styles in globals.css
import { Movie } from "@/app/models/Movie";

const AdminMain: React.FC = () => {
  const [movieCount, setMovieCount] = useState<number>(0);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const movieResponse = await fetch(`${Config.apiRoot}/movies/getAll`);
      const movies: Movie[] = await movieResponse.json();

      setMovieCount(movies.length);
      setRecentMovies(movies.slice(0, 5));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#1b0c1a", // Dark background
      padding: "2rem",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    header: {
      fontSize: "2.5rem",
      color: "#ffffff", // White text
      fontWeight: "bold",
      marginBottom: "2rem",
      textAlign: "center" as const,
    },
    section: {
      background: "#2a1c2a", // Darker section background
      borderRadius: "10px",
      padding: "2rem",
      marginBottom: "2rem",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      width: "100%",
      maxWidth: "800px", // Responsive width
    },
    title: {
      fontSize: "2rem",
      color: "#fadcd5", // Pinkish color for titles
      marginBottom: "1rem",
      textAlign: "left" as const,
    },
    movieCard: {
      background: "#3b2d3b", // Darker card background
      borderRadius: "8px",
      padding: "1rem",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.2s, box-shadow 0.2s",
      textAlign: "center" as const,
    },
    movieTitle: {
      fontSize: "1.5rem",
      color: "#ffffff", // White text for movie titles
      marginBottom: "0.5rem",
    },
    movieCategory: {
      fontSize: "1rem",
      color: "#e2e8f0", // Light gray for category
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontSize: "1.1rem",
      color: "#1b0c1a", // Darker color for text
      background: "#fadcd5", // Pinkish button color
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s",
      marginTop: "1rem",
      width: "100%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    buttonHover: {
      backgroundColor: "#e0c2a0", // Darker shade for hover
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.title}>Manage Movies</h2>
        <p style={{ color: "#e2e8f0" }}>
          Total Movies: <span style={{ fontWeight: "bold" }}>{movieCount}</span>
        </p>

        <h3
          style={{ color: "#ffffff", fontSize: "1.5rem", marginBottom: "1rem" }}
        >
          Recently Added Movies
        </h3>
        {recentMovies.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMovies.map((movie) => (
              <li
                key={movie.id}
                style={styles.movieCard}
                className="hover:shadow-lg transition duration-200"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h4 style={styles.movieTitle}>{movie.title}</h4>
                <p style={styles.movieCategory}>Category: {movie.category}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#e2e8f0" }}>No recently added movies found</p>
        )}

        <Link href="/admin/movies">
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = styles.button.background)
            }
          >
            Manage All Movies
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/promotions">
          <button
            style={{ ...styles.button, background: "#6dd8b2" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#5abfa5")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#6dd8b2")
            }
          >
            Manage Promotions
          </button>
        </Link>
        <Link href="/admin/users">
          <button
            style={{ ...styles.button, background: "#ff4d4d" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff1a1a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff4d4d")
            }
          >
            Manage Users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminMain;
