"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    setError("Invalid email or password. Please try again.");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    },
    form: {
      background: "#ffffff",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      color: "#333333",
      fontSize: "1.875rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textAlign: "center" as const,
    },
    subtitle: {
      color: "#555555",
      marginBottom: "1.5rem",
      textAlign: "center" as const,
    },
    inputGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      color: "#333333",
      marginBottom: "0.5rem",
      fontSize: "0.875rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid #cccccc",
      fontSize: "1rem",
    },
    passwordContainer: {
      position: "relative" as const,
    },
    togglePassword: {
      position: "absolute" as const,
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      background: "#ff6a00",
      color: "white",
      border: "none",
      borderRadius: "0.375rem",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    error: {
      background: "#ffe5e5",
      borderLeft: "4px solid #ff4d4d",
      color: "#c53030",
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "0.375rem",
    },
    signup: {
      textAlign: "center" as const,
      marginTop: "1rem",
      fontSize: "0.875rem",
      color: "#555555",
    },
    signupLink: {
      color: "#ff6a00",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your credentials to login</p>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            aria-label="Email input"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <div style={styles.passwordContainer}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              aria-label="Password input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.togglePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div style={styles.error} role="alert">
            {error}
          </div>
        )}

        <button type="submit" style={styles.button}>
          {"🔑"} Login
        </button>

        <p style={styles.signup}>
          Don&apos;t have an account?{" "}
          <a href="signup" style={styles.signupLink}>
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
