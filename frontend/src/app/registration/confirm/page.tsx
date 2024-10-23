"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Config from "../../../../frontend.config"; 

const RegistrationConfirmation: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(""); // Email will be loaded from localStorage
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5); // Set initial countdown to 5 seconds

  // Load email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("accountEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      setError("Email not found. Please register again.");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmationData = {
      userEmail,
      confirmationCode: parseInt(confirmationCode, 10), // Convert string to number
    };

    try {
      // Send the POST request to confirm the registration
      const response = await fetch(`${Config.apiRoot}/account/confirmRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmationData),
      });

      if (response.ok) {
        setSuccess("Account confirmed successfully! You will be redirected to the login page.");
        setError(null); // Clear any previous errors

        // Start countdown
        const intervalId = setInterval(() => {
          setCountdown(prev => {
            if (prev === 1) {
              clearInterval(intervalId);
              window.location.replace("/login");
            }
            return prev - 1;
          });
        }, 1000); // Countdown updates every second
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Something went wrong. Please try again.");
        setSuccess(null); // Clear the success message
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'There was a problem connecting to the server.';
      setError(errorMessage);
    }
  };

  return (
    <div className="h-full w-full text-2xl m-4">
      <h1 className="text-4xl mb-6">Account Confirmation</h1>
      <p className="mb-4">We sent you a confirmation email. Please enter the code here:</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* No need for the email input field since we have the email in localStorage */}
        <div>
          <label className="block mb-2">Confirmation Code</label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-inputText"
            placeholder="Enter the confirmation code"
          />
        </div>
        
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 text-green-600">
          <p>{success}</p>
          <p>Redirecting to login in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationConfirmation;
