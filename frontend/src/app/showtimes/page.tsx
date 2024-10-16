"use client"

import React from 'react';
// import { useSearchParams } from "next/navigation"; // Use useSearchParams to get query parameters
import Link from "next/link";

const ShowtimesPage: React.FC = () => {
  // const searchParams = useSearchParams();
  const movieId = "123";
  const title = "Hardcoded Movie Title";

  // Hard-coded showtimes for now
  const showtimes = ["1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"];

  // Check if title is available
  const movieTitle = title || "Movie";

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1b0c1a, #1b0c1a)", // Aesthetic purple gradient
      padding: "2rem",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#fadcd5", // Light color for better contrast
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textAlign: "center" as const, // Fixed typing
    },
    subheading: {
      fontSize: "1.5rem",
      color: "#fadcd5", // Consistent subheading color
      marginBottom: "2rem",
      textAlign: "center" as const, // Fixed typing
    },
    list: {
      listStyleType: "none", // No bullets
      padding: 0,
      textAlign: "center" as const, // Fixed typing
    },
    listItem: {
      marginBottom: "1rem",
    },
    button: {
      background: "#fadcd5", // Pinkish button color
      color: "#1b0c1a", // Darker text color
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1.1rem",
      transition: "background-color 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#e0c2a0", // Slightly darker shade for hover
      transform: "scale(1.05)", // Scale effect on hover
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Showtimes for {movieTitle}</h1>
      <p style={styles.subheading}>Select a showtime:</p>

      <ul style={styles.list}>
        {showtimes.map((time, index) => (
          <li key={index} style={styles.listItem}>
            <Link
              href={`/seat-selection?movieId=${movieId}&title=${encodeURIComponent(movieTitle)}&showtime=${time}`}
            >
              <button
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    styles.buttonHover.backgroundColor;
                  e.currentTarget.style.transform =
                    styles.buttonHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    styles.button.background;
                  e.currentTarget.style.transform = "scale(1)"; // Reset scale
                }}
              >
                {time}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowtimesPage;