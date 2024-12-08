import React from "react";
import Link from "next/link";
import Image from "next/image";
import dingusLogo from "../images/dingusCatLogoImg.png"; // Import the logo image

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout?: () => void;
  hideLogin?: boolean;
  hideSignup?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  handleLogout,
  hideLogin,
  hideSignup,
}) => {
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
          <button className="bg-[#fadcd5] text-[#1b0c1a] px-4 py-2 rounded hover:bg-[#e0c2a0] transition duration-200">
            Showtimes
          </button>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        

        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <button className="mr-4">Profile</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {!hideLogin && (
              <Link href="/login">
                <button className="mr-4">Login</button>
              </Link>
            )}
            {!hideSignup && (
              <Link href="/signup">
                <button>Sign Up</button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
