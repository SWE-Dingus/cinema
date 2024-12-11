"use client";
import React, { useState, useEffect } from "react";
import Config from "../../../frontend.config";
import { useRouter } from "next/navigation";

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
  wantsMarketingEmails: boolean;
  userCards: PaymentCard[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]); // For saved payment methods
  const [error, setError] = useState<string | null>(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false); // For handling 401 errors
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const accountEmail = localStorage.getItem("accountEmail");

    if (!accountEmail) {
      setError("You are not logged in.");
      setIsUnauthorized(true); // Set to true if the user is not logged in
      return;
    }

    const fetchUserData = async () => {
      const queryParams = new URLSearchParams({
        email: accountEmail,
      });

      try {
        const response = await fetch(`${Config.apiRoot}/account/fetchUser?${queryParams.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setIsUnauthorized(true);
            router.push("/401"); // Redirect to the 401 page
            return;
          }
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch user data.");
          return;
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        const errorMessage = (error as Error).message || "There was a problem connecting to the server.";
        setError(errorMessage);
      }
    };

    const fetchPaymentCards = async () => {
      try {
        const response = await fetch(`${Config.apiRoot}/paymentCards/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          setError(errorMessage || "Failed to fetch payment cards.");
          return;
        }

        const cards: PaymentCard[] = await response.json();
        setPaymentCards(cards);
      } catch (error) {
        const errorMessage = (error as Error).message || "There was a problem connecting to the server.";
        setError(errorMessage);
      }
    };

    fetchUserData();
    fetchPaymentCards(); // Fetch payment cards on mount
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

  if (isUnauthorized) {
    return null; // Return null to avoid rendering anything while redirecting
  }

  if (!isMounted || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
        <p>{error ? error : "Loading profile..."}</p>
      </div>
    );
  }
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">401 - Unauthorized</h1>
          <p className="text-red-600">
            You are not authorized to view this page. Please{" "}
            <a href="/login" className="text-blue-500 underline">
              login
            </a>{" "}
            to access your account.
          </p>
        </div>
      </div>
    );
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
          <div className="text-gray-900">
            <p className="mb-4">
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p className="mb-4">
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="mb-4">
              <strong>Phone Number:</strong> {userData.phoneNumber || "Not provided"}
            </p>
            <p className="mb-4">
              <strong>Home Address:</strong> {userData.address || "Not provided"}
            </p>
            <p className="mb-4">
              <strong>Marketing Emails:</strong> {userData.wantsMarketingEmails ? "Subscribed" : "Not subscribed"}
            </p>

            {/* Saved Payment Methods */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Saved Payment Methods</h2>
              {paymentCards.length > 0 ? (
                paymentCards.map((card, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50 text-gray-900">
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
                ))
              ) : (
                <p>No saved payment methods available.</p>
              )}
            </div>

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
