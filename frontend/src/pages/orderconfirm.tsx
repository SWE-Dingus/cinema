import React, { useState, useEffect } from 'react';

interface OrderDetails {
  movieTitle: string;
  showtime: string;
  seatNumbers: string[];
  ticketPrices: number[];
  total: number;
}

const OrderConfirmPage: React.FC = () => {
  // Simulated order details (to be replaced with actual data after checkout)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Simulate fetching order details after checkout (replace this with actual data)
    const savedOrder = {
      movieTitle: 'Transformers One',
      showtime: '7:00 PM',
      seatNumbers: ['A1', 'A2', 'A3'],
      ticketPrices: [10, 10, 10], // Prices for each seat
      total: 30, // Total price
    };

    setOrderDetails(savedOrder);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Order Confirmation</h1>

      {orderDetails ? (
        <div className="border p-5 rounded-md shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-3">{orderDetails.movieTitle}</h2>
          <p className="mb-2">Showtime: {orderDetails.showtime}</p>
          <p className="mb-2">Seats: {orderDetails.seatNumbers.join(', ')}</p>
          <p className="mb-2">Ticket Prices:</p>
          <ul className="list-disc ml-5">
            {orderDetails.ticketPrices.map((price, index) => (
              <li key={index}>Seat {orderDetails.seatNumbers[index]}: ${price}</li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${orderDetails.total}</p>

          {/* Option to go back to main or view tickets */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => {
              window.location.href = '/'; // Redirect back to main page
            }}
          >
            Back to Main
          </button>

          {/* Option to view tickets */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
            onClick={() => {
              alert('You can now view your tickets.');
            }}
          >
            View Tickets
          </button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderConfirmPage;
