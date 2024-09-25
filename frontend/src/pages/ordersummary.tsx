import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Order Summary</h1>

      {orderDetails ? (
        <div className="border p-5 rounded-md shadow-lg max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-3">{orderDetails.movieTitle}</h2>
          <p className="mb-2">Showtime: {orderDetails.showtime}</p>
          <p className="mb-2">Seats: {orderDetails.seatNumbers.join(', ')}</p>
          <p className="mb-2">Ticket Prices:</p>
          <ul className="list-disc ml-5">
            {orderDetails.ticketPrices.map((price, index) => (
              <li key={index}>
                Seat {orderDetails.seatNumbers[index]}: ${price}
                <button
                  onClick={() => handleDeleteTicket(index)}
                  className="text-red-500 ml-4"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${orderDetails.total}</p>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
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
