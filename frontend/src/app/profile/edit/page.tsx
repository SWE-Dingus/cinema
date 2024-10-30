"use client";

import React, { useState, useEffect } from "react";
import Config from "../../../../frontend.config";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar"; // Import the Navbar component

interface PaymentCard {
  cardNumber: string;
  expirationDate: string;
  userEmail: string;
}

interface UserData {
  wantsMarketingEmails: boolean;
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
  const [wantsMarketingEmails, setWantsMarketingEmails] = useState<boolean>(false);
  const [homeAddress, setHomeAddress] = useState("");
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>([]);
  const [newCard, setNewCard] = useState<PaymentCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to check if the user is logged in


  const postProfileUpdates = async () => {
    try {
      const updates = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        billingAddr: homeAddress,  // Home address also serves as billing address
        wantsMarketingEmails: wantsMarketingEmails,
      };

      const response = await fetch(`${Config.apiRoot}/account/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile information.");
      }
    } catch (err) {
      setError((err as Error).message || "Something went wrong while updating profile.");
    }
  };

  const postPaymentCardUpdates = async (newCard: PaymentCard) => {
    try {
      const response = await fetch(`${Config.apiRoot}/paymentCards/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error("Failed to add payment card.");
      }
    } catch (err) {
      setError((err as Error).message || "Something went wrong while adding the payment card.");
    }
  };

  const handleRemovePaymentCard = async (cardNumber: string) => {
    try {
      const response = await fetch(`${Config.apiRoot}/paymentCards/delete/${cardNumber}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove payment card.");
      }

      setPaymentCards(paymentCards.filter((card) => card.cardNumber !== cardNumber));
    } catch (err) {
      setError((err as Error).message || "There was a problem removing the payment card.");
    }
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
        setPaymentCards(data.userCards);
        setWantsMarketingEmails(data.wantsMarketingEmails || false); // Load the marketing email preference
      } catch (err) {
        setError((err as Error).message || "There was a problem connecting to the server.");
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from reloading the page
    setError(null); // Clear previous errors
    postProfileUpdates(); // Call the postProfileUpdates function to submit data
  };

  const handleSavePaymentCard = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (newCard) {
      postPaymentCardUpdates(newCard); // Submit new card info
    }
  };

  return (
    <>
      {/* Navbar at the top of the page */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={() => router.push("/login")} />

      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Profile Form */}
          <form onSubmit={handleSaveProfileChanges}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Your Profile</h2>
              <p className="text-gray-600">Update your personal details</p>
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
            </div>

            <div className="pt-4">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={wantsMarketingEmails}
                  onChange={() => setWantsMarketingEmails(!wantsMarketingEmails)}
                  className="rounded text-orange-500"
                />
                <span>Sign up for promotional emails</span>
              </label>
            </div>

            <div className="mt-8 space-y-4">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
          
          

          {/* Payment Cards Form */}
          <form onSubmit={handleSavePaymentCard} className="mt-16">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>

            {paymentCards.length > 0 ? (
              paymentCards.map((card, index) => (
                <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
                  <p><strong>Card Number:</strong> {card.cardNumber}</p>
                  <p><strong>Expiration Date:</strong> {card.expirationDate}</p>
                  <button
                    type="button"
                    onClick={() => handleRemovePaymentCard(card.cardNumber)}
                    className="bg-red-500 text-white py-1 px-4 rounded mt-2"
                  >
                    Remove Card
                  </button>
                </div>
              ))
            ) : (
              <p>No saved payment methods available.</p>
            )}

            {/* Add new card section */}
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Add a new payment card</h3>
            <input
              type="text"
              value={newCard?.cardNumber || ""}
              onChange={(e) => setNewCard({ ...newCard!, cardNumber: e.target.value })}
              placeholder="New Card Number"
              className="w-full p-2 border rounded-md text-inputText"
            />
            <input
              type="text"
              value={newCard?.expirationDate || ""}
              onChange={(e) => setNewCard({ ...newCard!, expirationDate: e.target.value })}
              placeholder="New Expiration Date"
              className="w-full p-2 border rounded-md text-inputText"
            />

            <div className="mt-8 space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Add Payment Card
              </button>
            </div>
          </form>
        </div>

        {/* Display Error */}
        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfilePage;
