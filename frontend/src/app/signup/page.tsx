"use client";
import React, { useState, FormEvent } from "react";
import Link from "next/link";

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

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    setError("This email is already registered. Please try another.");
    window.location.replace("/registration-confirm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-200 p-6">
      <form onSubmit={handleSignup} className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
          <p className="text-gray-600">Please fill in your details to sign up</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          </div>

          {/* Optional Sections Container */}
          <div className="space-y-6">
            {/* Payment Section */}
            <div className="border-t pt-4 md:border-t-0 md:pt-0">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
                <input
                  type="checkbox"
                  checked={showPaymentInfo}
                  onChange={() => setShowPaymentInfo(!showPaymentInfo)}
                  className="rounded text-orange-500"
                />
                <span>Payment Information</span>
              </label>
              
              {showPaymentInfo && (
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <input
                    placeholder="Enter your credit card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required={showPaymentInfo}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="date"
                    placeholder="Expiration date"
                    value={cardExpiration}
                    onChange={(e) => setCardExpiration(e.target.value)}
                    required={showPaymentInfo}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    placeholder="Billing address"
                    value={cardBillingAddress}
                    onChange={(e) => setCardBillingAddress(e.target.value)}
                    required={showPaymentInfo}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="border-t pt-4">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
                <input
                  type="checkbox"
                  checked={showHomeAddressInfo}
                  onChange={() => setShowHomeAddressInfo(!showHomeAddressInfo)}
                  className="rounded text-orange-500"
                />
                <span>Home Address</span>
              </label>
              
              {showHomeAddressInfo && (
                <div className="space-y-3 bg-gray-50 p-4 rounded-md">
                  <input
                    placeholder="Street address"
                    value={homeAddressStreet}
                    onChange={(e) => setHomeAddressStreet(e.target.value)}
                    required={showHomeAddressInfo}
                    className="w-full p-2 border rounded-md"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="City"
                      value={homeAddressCity}
                      onChange={(e) => setHomeAddressCity(e.target.value)}
                      required={showHomeAddressInfo}
                      className="w-full p-2 border rounded-md"
                    />
                    <input
                      placeholder="State"
                      value={homeAddressState}
                      onChange={(e) => setHomeAddressState(e.target.value)}
                      required={showHomeAddressInfo}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <input
                    placeholder="ZIP code"
                    value={homeAddressZip}
                    onChange={(e) => setHomeAddressZip(e.target.value)}
                    required={showHomeAddressInfo}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
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
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            ➕ Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;