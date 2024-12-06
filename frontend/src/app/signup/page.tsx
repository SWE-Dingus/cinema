"use client";
import React, { useState, FormEvent } from "react";
import Config from "../../../frontend.config";
import Link from "next/link";
import Navbar from "../components/Navbar";

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpirationMonth, setCardExpirationMonth] = useState<string>("");
  const [cardExpirationYear, setCardExpirationYear] = useState<string>("");
  const [cardBillingAddress, setCardBillingAddress] = useState<string>("");
  const [showPaymentInfo, setShowPaymentInfo] = useState<boolean>(false);
  const [homeAddressStreet, setHomeAddressStreet] = useState<string>("");
  const [homeAddressCity, setHomeAddressCity] = useState<string>("");
  const [homeAddressState, setHomeAddressState] = useState<string>("");
  const [homeAddressZip, setHomeAddressZip] = useState<string>("");
  const [showHomeAddressInfo, setShowHomeAddressInfo] = useState<boolean>(false);
  const [wantsMarketingEmails, setWantsMarketingEmails] = useState<boolean>(false); // New state for promotional emails
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the registration data to be sent to the API
    const registrationData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      wantsMarketingEmails, // Include the promotional email preference
      paymentCard: showPaymentInfo
        ? {
            cardNumber: cardNumber,
            expirationDate: `${cardExpirationMonth}/${cardExpirationYear}`,
            billingAddress: cardBillingAddress,
          }
        : null,
      homeAddress: showHomeAddressInfo
        ? {
            street: homeAddressStreet,
            city: homeAddressCity,
            state: homeAddressState,
            zip: homeAddressZip,
          }
        : null,
    };

    try {
      // Send the POST request to your API endpoint
      const response = await fetch(`${Config.apiRoot}/account/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        localStorage.setItem('accountEmail', email);
        // If registration is successful, redirect to the confirmation page
        window.location.replace('/registration/confirm');
      } else {
        // Handle non-200 responses
        const errorMessage = await response.text();
        setError(errorMessage || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'There was a problem connecting to the server.';
      setError(errorMessage);
    }
  };

  return (
    <>
    <Navbar isLoggedIn={false} hideSignup={true} />
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md text-inputText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full p-2 border rounded-md text-inputText"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full p-2 border rounded-md text-inputText"
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
                className="w-full p-2 border rounded-md text-inputText"
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
                  className="w-full p-2 border rounded-md text-inputText"
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
            
            {/* Checkbox for Promotional Emails */}
            <div className="pt-4">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-4">
                <input
                  type="checkbox"
                  checked={wantsMarketingEmails}
                  onChange={() => setWantsMarketingEmails(!wantsMarketingEmails)}
                  className="rounded text-orange-500"
                />
                <span>Sign up for promotional emails</span>
              </label>
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
                    className="w-full p-2 border rounded-md text-inputText"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Month</label>
                  <input
                    type="text"
                    value={cardExpirationMonth}
                    onChange={(e) => {
                      // Allow only numbers and limit to 2 characters
                      const input = e.target.value;
                      if (/^\d*$/.test(input) && input.length <= 2) {
                        setCardExpirationMonth(input);
                      }
                    }}
                    placeholder="MM"
                    maxLength={2}
                    inputMode="numeric"
                    className="w-full p-2 border rounded-md text-inputText"
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Year</label>
                  <input
                    type="text"
                    value={cardExpirationYear}
                    onChange={(e) => {
                      // Allow only numbers and limit to 4 characters
                      const input = e.target.value;
                      if (/^\d*$/.test(input) && input.length <= 4) {
                        setCardExpirationYear(input);
                      }
                    }}
                    placeholder="YYYY"
                    maxLength={4}
                    inputMode="numeric"
                    className="w-full p-2 border rounded-md text-inputText"
                  />

                  <input
                    placeholder="Billing address"
                    value={cardBillingAddress}
                    onChange={(e) => setCardBillingAddress(e.target.value)}
                    required={showPaymentInfo}
                    className="w-full p-2 border rounded-md text-inputText"
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
                    className="w-full p-2 border rounded-md text-inputText"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="City"
                      value={homeAddressCity}
                      onChange={(e) => setHomeAddressCity(e.target.value)}
                      required={showHomeAddressInfo}
                      className="w-full p-2 border rounded-md text-inputText"
                    />
                    <input
                      placeholder="State"
                      value={homeAddressState}
                      onChange={(e) => setHomeAddressState(e.target.value)}
                      required={showHomeAddressInfo}
                      className="w-full p-2 border rounded-md text-inputText"
                    />
                  </div>
                  <input
                    placeholder="ZIP code"
                    value={homeAddressZip}
                    onChange={(e) => setHomeAddressZip(e.target.value)}
                    required={showHomeAddressInfo}
                    className="w-full p-2 border rounded-md text-inputText"
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
    </>
  );
};

export default SignupPage;
