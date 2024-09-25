import React, { useState } from "react";
import { useRouter } from "next/router";

const OrderSummary = () => {
  const router = useRouter();

  // Sample ticket data - this would be fetched from the backend in a real app
  const [tickets, setTickets] = useState([
    { id: 1, type: "Adult", price: 15, quantity: 1 },
    { id: 2, type: "Child", price: 10, quantity: 1 },
    { id: 3, type: "Senior", price: 12, quantity: 1 },
  ]);

  // Calculate order total
  const orderTotal = tickets.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0,
  );

  // Handle updating ticket quantity
  const updateTicketQuantity = (id: number, newQuantity: number) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, quantity: newQuantity } : ticket,
    );
    setTickets(updatedTickets);
  };

  // Handle deleting a ticket
  const deleteTicket = (id: number) => {
    const filteredTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(filteredTickets);
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    // Logic to proceed to checkout (e.g., navigate to the checkout page)
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>

        {/* Order Summary Table */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Ticket Type</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-4 py-2 border-b">{ticket.type}</td>
                <td className="px-4 py-2 border-b">${ticket.price}</td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) =>
                      updateTicketQuantity(ticket.id, parseInt(e.target.value))
                    }
                    min={1}
                    className="border p-2 w-16"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  ${ticket.price * ticket.quantity}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => deleteTicket(ticket.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Total */}
      <div className="text-right mb-8">
        <h2 className="text-xl font-bold">Order Total: ${orderTotal}</h2>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Update Order
        </button>
        <button
          onClick={proceedToCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirm and Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
