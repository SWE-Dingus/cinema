import React from "react";
import Link from "next/link"; // Import Link component

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav 
      className="flex justify-between items-center p-5 text-white"
      style={{
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
      }}
    >
      {/* Make the title a clickable link */}
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">Cinema E-Booking</h1>
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
            <Link href="/login">
              <button className="mr-4">Login</button>
            </Link>
            <Link href="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
