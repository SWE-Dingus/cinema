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
    // Handle form submission logic here
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
    // Add logic to send data to backend and handle validation
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Home Address Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Home Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Street</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Card Type</label>
            <input
              type="text"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Billing Address</label>
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfilePage;
