import React from "react";
import { useRouter } from "next/router";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { title, showtime, seat } = router.query;

  const handleCheckout = () => {
    alert(`Successfully booked ${title} at ${showtime}, Seat: ${seat}`);
    router.push("/orderconfirm"); // After checkout, redirect to the home page or a confirmation page
  };

  const handleCancel = () => {
    router.push("/");
  }

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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Checkout</h1>

      <p style={styles.info}>
        <strong>Movie:</strong> {title}
      </p>

      <p style={styles.info}>
        <strong>Showtime:</strong> {showtime}
      </p>

      <p style={styles.info}>
        <strong>Seat:</strong> {seat}
      </p>

      <button
        onClick={handleCheckout}
        style={styles.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            styles.buttonHover.backgroundColor)
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
          (e.currentTarget.style.backgroundColor =
            styles.buttonHover.backgroundColor)
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
