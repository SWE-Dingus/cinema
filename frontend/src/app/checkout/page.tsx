"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    // Check for authorization (e.g., based on a token)
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // If no auth token, redirect to login
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const title = "Superbad";
  const showtime = "3:00 P.M";
  const seat = "B5";

  const handleCheckout = () => {
    router.push("/orderconfirm"); // After checkout, redirect to the order confirmation page
  };

  const handleCancel = () => {
    router.push("/");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#1b0c1a", // Darker beige background
      padding: "2rem",
    },
    heading: {
      fontSize: "2rem",
      color: "#ffffff", // White text for contrast
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
    info: {
      fontSize: "1.2rem",
      color: "#e2e8f0", // Light color for better visibility
      marginBottom: "1rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontSize: "1.1rem",
      color: "#1b0c1a", // Darker color for text
      background: "#fadcd5", // Pinkish button color
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "2rem",
    },
    buttonHover: {
      backgroundColor: "#e0c2a0", // Slightly darker shade for hover
    },
  };

  if (!isAuthorized) {
    // If the user is not authorized, render nothing until redirected
    return null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Checkout</h1>

      <p style={styles.info}>
        <strong>Movie:</strong> {title || "N/A"}
      </p>

      <p style={styles.info}>
        <strong>Showtime:</strong> {showtime || "N/A"}
      </p>

      <p style={styles.info}>
        <strong>Seat:</strong> {seat || "N/A"}
      </p>

      <button
        onClick={handleCheckout}
        style={styles.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = styles.button.background)
        }
      >
        Confirm and Pay
      </button>

      <button
        onClick={handleCancel}
        style={styles.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = styles.button.background)
        }
      >
        Cancel
      </button>
    </div>
  );
};

export default CheckoutPage;
