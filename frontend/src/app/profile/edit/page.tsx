"use client"

import React, { useState } from "react";

const EditProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleSaveChanges = () => {
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      street,
      city,
      state,
      zipCode,
      cardType,
      cardNumber,
      expirationDate,
      billingAddress,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-balance">Edit Profile</h1>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
        </div>
      </div>

      {/* Home Address Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Home Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Street</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Card Type</label>
            <input
              type="text"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Expiration Date</label>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Billing Address</label>
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="border border-gray-400 p-3 rounded w-full bg-[#1a1a1a] text-white"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="bg-[#28a745] text-white px-6 py-3 rounded hover:bg-[#218838] transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfilePage;