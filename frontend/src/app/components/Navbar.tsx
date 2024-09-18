import React from 'react';
import Link from 'next/link';  // Import Link component

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Cinema E-Booking</h1>
      <div>
        <Link href="/login">
          <button className="mr-4">Login</button>
        </Link>
        <Link href="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
