"use client";
import React, { useState, useEffect } from "react";
import Config from "../../../frontend.config"; // If you need to use the config API root
import Navbar from "../components/Navbar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Retrieve email from localStorage if redirected from confirmation page
  useEffect(() => {
    const storedEmail = localStorage.getItem("accountEmail");
    if (storedEmail) {
      setEmail(storedEmail); // Autofill email field if it exists
    }
  }, []);

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the login data
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Send the POST request to the login API endpoint
      const response = await fetch(`${Config.apiRoot}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accountToken", data.token); // Assuming the response contains a token
        localStorage.setItem("accountEmail", email); // Optionally, store email too
        localStorage.setItem("expires", data.expires);

        if (data.authorizationLevel == "ADMIN") {
          window.location.replace("/admin")
        } else {
          window.location.replace("/"); // Redirect to the dashboard or home page after login
        }
      } else {
        const errorMessage = (await response.json()).message;
        setError(errorMessage || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'There was a problem connecting to the server.';
      setError(errorMessage);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      // Send the POST request to the reset password API endpoint
      const response = await fetch(`${Config.apiRoot}/account/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setResetMessage("A password reset link has been sent to your email.");
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Something went wrong. Please try again.");
        setResetMessage(null);
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'There was a problem connecting to the server.';
      setError(errorMessage);
      setResetMessage(null);
    }
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
    resetPasswordButton: {
      width: "100%",
      padding: "0.75rem",
      background: "#6a5eff",
      color: "white",
      border: "none",
      borderRadius: "0.375rem",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1rem",
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
    resetMessage: {
      background: "#e5ffe5",
      borderLeft: "4px solid #4dff4d",
      color: "#2c7a2c",
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
    <>
     <Navbar isLoggedIn={false}/>
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
            className="w-full p-2 border rounded-md text-inputText"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            aria-label="Email input"
          />
        </div>

        {!showResetPassword && (
          <>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded-md text-inputText"
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
          </>
        )}

        {
          !showResetPassword && (
          <button
            type="button"
            onClick={() => setShowResetPassword(true)}
            style={styles.button}
          >
             Forgot Password?
         </button>
          )
        }

        {showResetPassword && (
          <>
            <p style={styles.subtitle}>
              Enter your email, and a password reset link will be sent.
            </p>
            {resetMessage && (
              <div style={styles.resetMessage}>
                {resetMessage}
              </div>
            )}
            <button
              type="button"
              onClick={handlePasswordReset}
              style={styles.resetPasswordButton}
            >
              Reset Password
            </button>

            {resetMessage && (
        <button
          type="button"
          onClick={() => setShowResetPassword(false)}
          style={styles.button}
        >
          Go Back to Login
        </button>
      )}
   
          </>
        )}

        <p style={styles.signup}>
          Don&apos;t have an account?{" "}
          <a href="signup" style={styles.signupLink}>
            Sign up
          </a>
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
