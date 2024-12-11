"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // For routing
import dingusLogo from "../images/dingusCatLogoImg.png"; // Import the logo image

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // For navigation

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("accountEmail");
    localStorage.removeItem("accountToken");
    localStorage.removeItem("authorizationLevel");
    localStorage.removeItem("expires");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <nav
      className="flex justify-between items-center p-5 text-white"
      style={{
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
      }}
    >
      <div className="flex items-center space-x-4">
        {/* Logo with link to homepage */}
        <Link href="/" className="flex items-center">
          <Image
            src={dingusLogo}
            alt="Logo"
            width={210}
            height={210}
            className="cursor-pointer"
          />
        </Link>

        {/* Showtimes button */}
        <Link href="/showtimes">
          <button className="text-white text-lg hover:text-gray-300 transition duration-200">
            Showtimes
          </button>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            {/* Account and Logout buttons for logged-in users */}
            <Link href="/account">
              <button className="text-white text-lg hover:text-gray-300 transition duration-200">
                Account
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white text-lg hover:text-gray-300 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Conditional Login/Signup buttons based on the current path */}
            {pathname !== "/login" && (
              <Link href="/login">
                <button className="text-white text-lg hover:text-gray-300 transition duration-200">
                  Login
                </button>
              </Link>
            )}
            {pathname !== "/signup" && (
              <Link href="/signup">
                <button className="text-white text-lg hover:text-gray-300 transition duration-200">
                  Sign Up
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
