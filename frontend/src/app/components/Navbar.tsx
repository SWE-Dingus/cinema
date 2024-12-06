// Navbar.tsx
import React from "react";
import Link from "next/link";

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
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">Cinema E-Booking Homepage</h1>
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
