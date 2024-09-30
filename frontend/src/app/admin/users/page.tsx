"use client"

import React, { useState } from "react";

interface User {
  name: string;
  email: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  const addUser = () => {
    const newUser: User = {
      name: newUserName,
      email: newUserEmail,
    };
    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserEmail("");
  };

  const deleteUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
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
    userList: {
      marginTop: "1.5rem",
      width: "100%",
      textAlign: "left" as const,
    },
    userItem: {
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
      <h1 style={styles.heading}>Manage Users</h1>

      <div>
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter user email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={addUser}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = styles.button.background)
          }
        >
          Add User
        </button>
      </div>

      <div style={styles.userList}>
        <h2 style={{ ...styles.heading, fontSize: "1.5rem" }}>
          Existing Users
        </h2>
        <ul style={{ padding: 0 }}>
          {users.map((user, index) => (
            <li key={index} style={styles.userItem}>
              {user.name} - {user.email}
              <button
                onClick={() => deleteUser(index)}
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

export default ManageUsers;
