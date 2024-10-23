"use client";
import React, { useState, useEffect } from "react";
import Config from "../../../frontend.config";
import { useRouter } from "next/navigation"; // Updated router import for Next.js 13

interface PaymentCard {
  cardNumber: string;
  billingAddress: string;
  expirationDate: string;
  userEmail: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string | null;
  state: string;
  authorizationLevel: string;
  lastConfirmationCode: number;
  wantsMarketingEmails: boolean;
  userCards: PaymentCard[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const accountEmail = localStorage.getItem("accountEmail");

    if (!accountEmail) {
      setError("You are not logged in. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    const fetchUserData = async () => {
        const accountEmail = localStorage.getItem("accountEmail");
        
        if (!accountEmail) {
          setError("No account email found.");
          return;
        }
      
        // Correct usage of query params for GET request
        const queryParams = new URLSearchParams({
          email: accountEmail, // This matches the expected email parameter in the backend
        });
      
        try {
          const response = await fetch(`${Config.apiRoot}/account/fetchUser?${queryParams.toString()}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            setError(errorMessage || "Failed to fetch user data.");
            return;
          }
      
          const data: UserData = await response.json();
          setUserData(data);
        } catch (error) {
          const errorMessage = (error as Error).message || 'There was a problem connecting to the server.';
          setError(errorMessage);
        }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accountEmail");
    localStorage.removeItem("accountToken");
    localStorage.removeItem("authorizationLevel");
    localStorage.removeItem("expires");
    router.push("/login");
  };

  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  if (!isMounted) {
    return null;
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
        <p>{error ? error : "Loading profile..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div>
            <p>
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Authorization Level:</strong> {userData.authorizationLevel}
            </p>
            <p>
              <strong>State:</strong> {userData.state}
            </p>
            <p>
              <strong>Home Address:</strong> {userData.address || "Not provided"}
            </p>
            <p>
              <strong>Marketing Emails:</strong> {userData.wantsMarketingEmails ? "Subscribed" : "Not subscribed"}
            </p>

            {/* Display Payment Cards */}
            {userData.userCards.length > 0 ? (
              <div className="mt-4">
                <h2 className="text-2xl font-bold mb-4">Payment Cards</h2>
                {userData.userCards.map((card, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
                    <p>
                      <strong>Card Number:</strong> {card.cardNumber}
                    </p>
                    <p>
                      <strong>Billing Address:</strong> {card.billingAddress}
                    </p>
                    <p>
                      <strong>Expiration Date:</strong> {card.expirationDate}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No payment cards available.</p>
            )}
             <button
              onClick={handleEditProfile}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-4"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
