"use client";

import React, { useState, useEffect } from "react";
import Config from "../../../../frontend.config";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar"; // Import the Navbar component

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
  userCards: PaymentCard[];
}

const EditProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to check if the user is logged in

    const postUpdates = async () => {
      const updates = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      await fetch(`${Config.apiRoot}/account/edit`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(updates),
      })
    };

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");

    if (!accountEmail) {
      setError("You are not logged in. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    setIsLoggedIn(true); // Set logged-in state to true if user is logged in

    const fetchUserData = async () => {
      const queryParams = new URLSearchParams({
        email: accountEmail!,
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

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber || "");
        setHomeAddress(data.address || "");

        if (data.userCards.length > 0) {
          const card = data.userCards[0]; 
          setCardNumber(card.cardNumber);
          setBillingAddress(card.billingAddress);
          setExpirationDate(card.expirationDate);
        }
      } catch (error) {
        const errorMessage = (error as Error).message || "There was a problem connecting to the server.";
        setError(errorMessage);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveChanges = () => {
    // Implement save changes logic
  };

  const handleLogout = () => {
    localStorage.removeItem("accountEmail");
    localStorage.removeItem("accountToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      {/* Navbar at the top of the page */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
        <form onSubmit={handleSaveChanges} className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Your Profile</h2>
            <p className="text-gray-600">Update your details and save the changes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded-md text-inputText"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded-md text-inputText"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded-md text-inputText"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full p-2 border rounded-md text-inputText bg-gray-200"
                />
              </div>
            </div>

            {/* Payment & Address Info */}
            <div className="space-y-4">
              {/* Home Address */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Home Address</h3>
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="Enter your home address"
                  className="w-full p-2 border rounded-md text-inputText"
                />
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Information</h3>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full p-2 border rounded-md text-inputText"
                />
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Billing Address"
                  className="w-full p-2 border rounded-md text-inputText"
                />
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="Expiration Date"
                  className="w-full p-2 border rounded-md text-inputText"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <button
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium"
              onClick={postUpdates}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfilePage;
