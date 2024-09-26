import React, { useState, useEffect } from "react";

const OrderConfirm: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<{
    movieTitle: string;
    showtime: string;
    seatNumbers: string[];
  } | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderDetails) {
    return <div className="text-white">Loading order details...</div>;
  }

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Order Confirmation
      </h1>

      <div className="bg-[#2a1c2a] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#fadcd5]">
          Movie: {orderDetails.movieTitle}
        </h2>
        <p className="text-lg">
          Showtime:{" "}
          <span className="font-semibold">{orderDetails.showtime}</span>
        </p>
        <p className="text-lg">
          Seats:{" "}
          <span className="font-semibold">
            {orderDetails?.seatNumbers && orderDetails.seatNumbers.length > 0
            ? orderDetails.seatNumbers.join(", ")
            : "No seats selected"}
          </span>
        </p>
        <p className="mt-4 text-lg font-bold text-[#fadcd5]">
          Total Price: $X.XX
        </p>
      </div>

      {/* Line that informs the user about the email */}
      <div className="mt-4">
        <p className="text-green-600 font-semibold text-center">
          An order summary has been sent to your email.
        </p>
      </div>

      {/* Option to delete the order */}
      <div className="text-center mt-6">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("order"); // Clear order
            setOrderDetails(null); // Reset order state
          }}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
