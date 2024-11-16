"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ShowtimesPage: React.FC = () => {
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage initial check
  const movieId = "123";
  const title = "Hardcoded Movie Title";

  // Hard-coded showtimes for now
  const showtimes = ["1:00 PM", "3:30 PM", "6:00 PM", "8:30 PM"];

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");

    if (!accountEmail) {
      console.log("User is unauthorized, redirecting to login."); // Debugging log
      setIsUnauthorized(true);
    } else {
      console.log("User is authorized:", accountEmail); // Debugging log
      setIsUnauthorized(false);
    }
    setIsLoading(false); // Mark loading complete once check is done
  }, []);

  // Render loading state to prevent unauthorized screen flash
  if (isLoading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Unauthorized page
  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">401 - Unauthorized</h1>
        <p className="text-center text-red-600">
          You are not authorized to view this page. Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to access showtimes.
        </p>
      </div>
    );
  }

  // Authorized content
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1b0c1a, #1b0c1a)",
      padding: "2rem",
    },
    heading: {
      fontSize: "2.5rem",
      color: "#fadcd5",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textAlign: "center" as const,
    },
    subheading: {
      fontSize: "1.5rem",
      color: "#fadcd5",
      marginBottom: "2rem",
      textAlign: "center" as const,
    },
    list: {
      listStyleType: "none",
      padding: 0,
      textAlign: "center" as const,
    },
    listItem: {
      marginBottom: "1rem",
    },
    button: {
      background: "#fadcd5",
      color: "#1b0c1a",
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1.1rem",
      transition: "background-color 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#e0c2a0",
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Showtimes for {title}</h1>
      <p style={styles.subheading}>Select a showtime:</p>

      <ul style={styles.list}>
        {showtimes.map((time, index) => (
          <li key={index} style={styles.listItem}>
            <Link
              href={`/seat-selection?movieId=${movieId}&title=${encodeURIComponent(
                title
              )}&showtime=${time}`}
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
                  e.currentTarget.style.transform = "scale(1)";
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
