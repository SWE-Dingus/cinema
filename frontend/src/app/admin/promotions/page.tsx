"use client"

import React, { useState, useEffect } from "react";
import Config from "../../../../frontend.config";
import { Promotion } from "../../models/Promotion";

const ManagePromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [newPromotion, setNewPromotion] = useState<string>("");
  const [newDiscount, setNewDiscount] = useState("");
  const [handleError, setError] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const response = await fetch(`${Config.apiRoot}/promotions/getAll`, {
        method: "GET",
        headers: {
          "CinemaAccountEmail":String(localStorage.getItem("accountEmail")),
          "CinemaAccountToken":String(localStorage.getItem("accountToken")),
        },
      });
      const data = await response.json();

      const initializedPromos = data.map((promotion: Promotion) => ({
        ...promotion,
        code: promotion.code,
        discountPercent: promotion.discountPercent || [],
        sent: promotion.sent || []
      }));
      setPromotions(initializedPromos);
    } catch (error) {
      console.error("Error fetching promos:", error);
    }
  };

  const addPromotion = async() => {
    try {
      let response;
      if (newPromotion == "") {
        setError("Invalid Promotional Code.");      
      } else if(newDiscount == "" || Number.isNaN(newDiscount)) {
        setError("Invalid discount number");        
      } else if (promoExists(newPromotion) && editIndex < 0) {
        setError("Promotion already exists");
      } else if (editIndex >= 0) {
        setError("");
        if (confirm("You are replacing promotion "+promotions[editIndex].code+" with "+promotions[editIndex].discountPercent+"% off to:\nPromotion code: "+promotions[editIndex].code+"\nwith "+newDiscount+"% off.")) {
          const newPromo: Promotion = {
            code: promotions[editIndex].code,
            discountPercent: parseFloat(newDiscount),
            sent: false,
          }
          response = await fetch(`${Config.apiRoot}/promotions/update/${promotions[editIndex].code}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "CinemaAccountEmail":String(localStorage.getItem("accountEmail")),
              "CinemaAccountToken":String(localStorage.getItem("accountToken"))
            },
            body: JSON.stringify(newPromo),
          });
          if (!response.ok) {
            throw new Error("Failed to send promotions");
          }
          fetchPromos();
          setEditIndex(-1);
          setNewPromotion("");
          setNewDiscount("");
        }
      } else {
        setError("")
        if (confirm("You are about to set a new promotion: "+newPromotion+" with "+newDiscount+"% off.")) {
          const newPromo: Promotion = {
            code: newPromotion,
            discountPercent: parseFloat(newDiscount),
            sent: false
          }
          response = await fetch(`${Config.apiRoot}/promotions/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "CinemaAccountEmail":String(localStorage.getItem("accountEmail")),
              "CinemaAccountToken":String(localStorage.getItem("accountToken"))
            },
            body: JSON.stringify(newPromo),
          })
          if (!response.ok) {
            throw new Error("Failed to send promotions:\n" + String(response.statusText));
          }
          fetchPromos();
          setEditIndex(-1);
          setNewPromotion("");
          setNewDiscount("");
        }
      }
    } catch (error) {
      console.error("Error adding promotion:", error);
      setError("Failed to add promotion, please try again later.")
    }
  };

  const deletePromotion = async(index: number) => {
    try {
      const response = await fetch(
        `${Config.apiRoot}/promotions/delete/${promotions[index].code}`,
        {
          method: "DELETE",
          headers: {
            "CinemaAccountEmail":String(localStorage.getItem("accountEmail")),
            "CinemaAccountToken":String(localStorage.getItem("accountToken"))
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete promotion");
      }
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
    fetchPromos();
  };

  const sendPromotion = async(code: string) => {
    try{
      const response = await fetch(`${Config.apiRoot}/promotions/send/${code}`, {
        method: "POST",
        headers: {
          "CinemaAccountEmail":String(localStorage.getItem("accountEmail")),
          "CinemaAccountToken":String(localStorage.getItem("accountToken"))
        },
        }
      )
      fetchPromos();
      if (!response.ok) {
        throw new Error("Failed to send promotions");
      }
    } catch (error) {
      console.error("Error sending the promotion(s):", error);
    }
  };

  const editPromotion = (index: number) => {
    console.log(promotions[index].sent == true)
    console.log(promotions[index].sent == false)
    if (promotions[index].sent == true) {
      setError("Promotion already sent and cannot be edited.")
    } else {
      setEditIndex(index)
      setNewDiscount(String(promotions[index].discountPercent))
      setNewPromotion(String(promotions[index].code))
    }
  };

  const cancelEdit = () => {
    setEditIndex(-1)
    setNewDiscount("")
    setNewPromotion("")
  };

  const promoExists = (codeToFind:string) => {
    let found = false;
    promotions.forEach((promo) => {
      if (promo.code == codeToFind) {
        found = true;
      }
    });
    return found;
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
          disabled={editIndex>=0}
        />
        <input
          type="text"
          placeholder="Enter discount amount"
          value={newDiscount}
          onChange={(e) => setNewDiscount(e.target.value)}
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
        {(editIndex >= 0) &&
          <button
            onClick={cancelEdit}
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = styles.button.background)
            }
            >
              Cancel Edit
            </button>
        }
      </div>
        
      <div>
      <h3 className="text-red-700">{handleError}</h3>
      </div> 

      <div style={styles.promotionList}>
        <h2 style={{ ...styles.heading, fontSize: "1.5rem" }}>
          Existing Promotions
        </h2>
        <ul style={{ padding: 0 }}>
          {promotions.map((promotion, index) => (
            <li key={index} style={styles.promotionItem}>
              <p>{promotion.code} with {promotion.discountPercent}% off</p>
              <button
                onClick={() => deletePromotion(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>

              <button
                onClick={() => editPromotion(index)}
                style={styles.deleteButton}
                >
                Edit
              </button>
              {promotion.sent == false ?
                <button
                  onClick={() => sendPromotion(String(promotion.code))}>
                  Send
                </button> : <button disabled>
                  Sent
                </button>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePromotions;
