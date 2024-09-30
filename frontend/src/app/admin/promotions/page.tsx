"use client"

import React, { useState } from "react";

const ManagePromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<string[]>([]);
  const [newPromotion, setNewPromotion] = useState<string>("");

  const addPromotion = () => {
    setPromotions([...promotions, newPromotion]);
    setNewPromotion("");
  };

  const deletePromotion = (index: number) => {
    setPromotions(promotions.filter((_, i) => i !== index));
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
    input: {
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      marginRight: "0.5rem",
      background: "#f8f9fa", // Light background for inputs
      color: "#1b0c1a",
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
    },
    buttonHover: {
      backgroundColor: "#e0c2a0", // Slightly darker shade for hover
    },
    promotionList: {
      marginTop: "1.5rem",
      width: "100%",
      textAlign: "left" as const,
    },
    promotionItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem 0",
      borderBottom: "1px solid #e2e8f0",
      color: "#e2e8f0", // Light color for better visibility
    },
    deleteButton: {
      marginLeft: "1rem",
      color: "#e74c3c", // Red color for delete button
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Promotions</h1>

      <div>
        <input
          type="text"
          placeholder="Enter new promotion"
          value={newPromotion}
          onChange={(e) => setNewPromotion(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={addPromotion}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = styles.button.background)
          }
        >
          Add Promotion
        </button>
      </div>

      <div style={styles.promotionList}>
        <h2 style={{ ...styles.heading, fontSize: "1.5rem" }}>
          Existing Promotions
        </h2>
        <ul style={{ padding: 0 }}>
          {promotions.map((promotion, index) => (
            <li key={index} style={styles.promotionItem}>
              {promotion}
              <button
                onClick={() => deletePromotion(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePromotions;
