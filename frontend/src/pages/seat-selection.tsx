import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SeatSelection: React.FC = () => {
  const router = useRouter();
  
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5']; // Example seat list, you can replace with actual data
  const ageCategories = ['Child', 'Adult', 'Senior']; // Age categories for pricing
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatAgeCategories, setSeatAgeCategories] = useState<{ [seat: string]: string }>({});

  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      const newCategories = { ...seatAgeCategories };
      delete newCategories[seat]; // Remove age category when seat is deselected
      setSeatAgeCategories(newCategories);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleAgeCategoryChange = (seat: string, ageCategory: string) => {
    setSeatAgeCategories({
      ...seatAgeCategories,
      [seat]: ageCategory,
    });
  };

  const handleProceedToOrderSummary = () => {
    const selectedSeatsWithAgeCategories = selectedSeats.map((seat) => ({
      seat,
      ageCategory: seatAgeCategories[seat] || 'Adult', // Default to adult if not selected
    }));

    // Example of passing this data to the order summary page
    localStorage.setItem('order', JSON.stringify(selectedSeatsWithAgeCategories));

    router.push('/ordersummary');
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Select Your Seats</h1>

      <div className="grid grid-cols-5 gap-2">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeatSelection(seat)}
            className={`p-2 border ${selectedSeats.includes(seat) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {seat}
          </button>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-5">
          <h2 className="text-xl font-bold">Selected Seats</h2>
          {selectedSeats.map((seat) => (
            <div key={seat} className="flex items-center justify-between mt-2">
              <span>{seat}</span>
              <select
                value={seatAgeCategories[seat] || 'Adult'}
                onChange={(e) => handleAgeCategoryChange(seat, e.target.value)}
                className="border p-2"
              >
                {ageCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="mt-5 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleProceedToOrderSummary}
          >
            Proceed to Order Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
