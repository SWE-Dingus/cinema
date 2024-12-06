import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import dingusLogo from "../images/dingusCatLogoImg.png"; // Import the logo image

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout?: () => void;
  hideLogin?: boolean;
  hideSignup?: boolean; // Add hideSignup prop
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout, hideLogin, hideSignup }) => {
  return (
    <nav
      className="flex justify-between items-center p-5 text-white"
      style={{
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
      }}
    >
      {/* Logo with link to homepage */}
      <Link href="/" className="flex items-center">
        <Image 
          src={dingusLogo} 
          alt="Logo" 
          width={210} // Increased width
          height={210} // Increased height
          className="cursor-pointer" // Ensure it looks clickable
        />
      </Link>
      
      <div>
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
