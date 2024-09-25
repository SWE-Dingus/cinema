import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css"

interface OrderDetails {
  movieTitle: string;
  showtime: string;
  seatNumbers: string[];
  ticketPrices: number[];
  total: number;
}

const OrderSummary: React.FC = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Simulated order details passed from seat selection
    const savedOrder = {
      movieTitle: 'Transformers One',
      showtime: '7:00 PM',
      seatNumbers: ['A1', 'A2', 'A3'],
      ticketPrices: [10, 10, 10],
      total: 30,
    };

    setOrderDetails(savedOrder);
  }, []);

  const handleProceedToCheckout = () => {
    // Redirect to checkout page
    router.push('/checkout');
  };

  const handleDeleteTicket = (index: number) => {
    if (orderDetails) {
      const updatedSeats = orderDetails.seatNumbers.filter((_, i) => i !== index);
      const updatedPrices = orderDetails.ticketPrices.filter((_, i) => i !== index);
      const updatedTotal = updatedPrices.reduce((sum, price) => sum + price, 0);

      setOrderDetails({
        ...orderDetails,
        seatNumbers: updatedSeats,
        ticketPrices: updatedPrices,
        total: updatedTotal,
      });
    }
  };

  return (
    <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Order Summary</h1>

      {orderDetails ? (
        <div className="bg-[#2a1c2a] border p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">{orderDetails.movieTitle}</h2>
          <p className="mb-2">Showtime: {orderDetails.showtime}</p>
          <p className="mb-2">Seats: {orderDetails.seatNumbers.join(', ')}</p>
          <p className="mb-2">Ticket Prices:</p>
          <ul className="list-disc ml-5">
            {orderDetails.ticketPrices.map((price, index) => (
              <li key={index} className="flex justify-between">
                <span>Seat {orderDetails.seatNumbers[index]}: ${price}</span>
                <button
                  onClick={() => handleDeleteTicket(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${orderDetails.total}</p>

          <button
            className="bg-[#28a745] text-white px-6 py-3 rounded mt-4 hover:bg-[#218838]"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderSummary;
