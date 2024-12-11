"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const BookingHistory: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authorized by verifying the token
    const token = localStorage.getItem("accountToken");

    if (!token) {
      // Redirect to the 401 page if unauthorized
      router.push("/401");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Booking History</h1>
      <p>Here is a list of your bookings.</p>
    </div>
  );
};

export default BookingHistory;
