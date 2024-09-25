import React, { useState, useEffect } from 'react';

const OrderConfirm: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<{ movieTitle: string; showtime: string; seatNumbers: string[] } | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Order Confirmation</h1>

      <div>
        <h2 className="text-xl font-bold">Movie: {orderDetails.movieTitle}</h2>
        <p>Showtime: {orderDetails.showtime}</p>

        {/* Conditional check for seatNumbers */}
        <p>Seats: {orderDetails.seatNumbers ? orderDetails.seatNumbers.join(', ') : 'No seats selected'}</p>

        <p className="mt-4 font-bold">Total Price: $X.XX</p>
      </div>

      {/* Line that informs the user about the email */}
      <div className="mt-4">
        <p className="text-green-600 font-semibold">
          An order summary has been sent to your email.
        </p>
      </div>

      {/* Option to delete the order */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          localStorage.removeItem('order'); // Clear order
          setOrderDetails(null); // Reset order state
        }}
      >
        Delete Order
      </button>
    </div>
  );
};

export default OrderConfirm;
