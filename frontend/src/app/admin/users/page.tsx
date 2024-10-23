"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/app/models/User";
import Config from "@/../frontend.config";
import UserControl from "@/app/components/UserControl";

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUserData = async () => {
    try {
      const usersResponse = await fetch(`${Config.apiRoot}/admin/getAllUsers`);
      const users: User[] = await usersResponse.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

      <div style={styles.userList}>
        <h2 style={{ ...styles.heading, fontSize: "1.5rem" }}>
          Existing Users
        </h2>
        <ul style={{ padding: 0 }}>
          {users.map((user, index) => (
            <UserControl user={user} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageUsers;
