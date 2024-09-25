"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importing Link from next/link

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiration, setCardExpiration] = useState<string>("");
  const [cardBillingAddress, setCardBillingAddress] = useState<string>("");
  const [showPaymentInfo, setShowPaymentInfo] = useState<boolean>(false);

  const [homeAddressStreet, setHomeAddressStreet] = useState<string>("");
  const [homeAddressCity, setHomeAddressCity] = useState<string>("");
  const [homeAddressState, setHomeAddressState] = useState<string>("");
  const [homeAddressZip, setHomeAddressZip] = useState<string>("");
  const [showHomeAddressInfo, setShowHomeAddressInfo] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    // Simulating an error for demonstration
    setError("This email is already registered. Please try another.");
    window.location.replace("/registration-confirm");
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
    login: {
      textAlign: "center" as const,
      marginTop: "1rem",
      fontSize: "0.875rem",
      color: "#555555",
    },
    loginLink: {
      color: "#ff6a00",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>Create an Account</h2>
        <p style={styles.subtitle}>Please fill in your details to sign up</p>

        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="phoneNumber" style={styles.label}>
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={styles.input}
          />
        </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.togglePassword}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label>
            <input type="checkbox" checked={showPaymentInfo} onChange={() => setShowPaymentInfo(!showPaymentInfo)} />
            Enter payment info?
          </label>
          {showPaymentInfo && <div>
            <label>
              <input
                placeholder="Enter your credit card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required={showPaymentInfo}
                style={styles.input}
              />
            </label>
            <label>
              <input
                placeholder="Enter your credit card expiration date"
                type="date"
                value={cardExpiration}
                onChange={(e) => setCardExpiration(e.target.value)}
                required={showPaymentInfo}
                style={styles.input}
              />
            </label>
            <label>
              <input
                placeholder="Enter your billing address"
                value={cardBillingAddress}
                onChange={(e) => setCardBillingAddress(e.target.value)}
                required={showPaymentInfo}
                style={styles.input}
              />
            </label>
          </div>}
        </div>

        <div style={styles.inputGroup}>
          <label>
            <input type="checkbox" checked={showHomeAddressInfo} onChange={() => setShowHomeAddressInfo(!showHomeAddressInfo)} />
            Enter home address info?
          </label>
          {showHomeAddressInfo && <div>
            <label>
              <input
                placeholder="Enter your street"
                value={homeAddressStreet}
                onChange={(e) => setHomeAddressStreet(e.target.value)}
                required={showHomeAddressInfo}
                style={styles.input}
              />
            </label>
            <label>
              <input
                placeholder="Enter your city"
                value={homeAddressCity}
                onChange={(e) => setHomeAddressCity(e.target.value)}
                required={showHomeAddressInfo}
                style={styles.input}
              />
            </label>
            <label>
              <input
                placeholder="Enter your state"
                value={homeAddressState}
                onChange={(e) => setHomeAddressState(e.target.value)}
                required={showHomeAddressInfo}
                style={styles.input}
              />
            </label>
            <label>
              <input
                placeholder="Enter your ZIP code"
                value={homeAddressZip}
                onChange={(e) => setHomeAddressZip(e.target.value)}
                required={showHomeAddressInfo}
                style={styles.input}
              />
            </label>
          </div>}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button type="submit" style={styles.button}>
          ➕ Sign Up
        </button>

        <p style={styles.login}>
          Already have an account?{" "}
          <Link href="/login" style={styles.loginLink}>
            {" "}
            {/* Replacing <a> with <Link> */}
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
