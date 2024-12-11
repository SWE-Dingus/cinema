"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface Seat {
  seat: string;
  ageCategory: string;
  price: number;
}

interface OrderDetails {
  title: string;
  showtime: string;
  selectedSeats: Seat[];
  total: number;
}

interface CreditCard {
  id: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  billingAddress: string;
}

interface Promotion {
  code: string;
  discount: number; // Assuming discount is a percentage value (0-1)
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [newPromotion, setNewPromotion] = useState<string>("");
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [savedCards, setSavedCards] = useState<CreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [promotions] = useState<Promotion[]>([]);

  const [newCard, setNewCard] = useState<CreditCard>({
    id: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    billingAddress: "",
  });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accountEmail = localStorage.getItem("accountEmail");
    if (!accountEmail) {
      router.replace("/login");
      setIsUnauthorized(true);
      return;
    }

    // Retrieve order details
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      const parsedOrder = JSON.parse(storedOrderDetails);
      const calculatedTotal = parsedOrder.selectedSeats.reduce(
        (sum: number, seat: Seat) => sum + seat.price,
        0
      );
      setOrderDetails({ ...parsedOrder, total: calculatedTotal });
    }

    // Retrieve saved cards from localStorage
    const storedCards = localStorage.getItem("savedCards");
    if (storedCards) {
      setSavedCards(JSON.parse(storedCards));
    }
  }, [router]);

  if (isUnauthorized) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">401 - Unauthorized</h1>
        <p className="text-center text-red-600">Redirecting to login page...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen p-5 bg-[#1b0c1a] text-white">
        <h1 className="text-4xl font-bold mb-6 text-center">Order Details Not Found</h1>
        <p className="text-center">Please select your seats and movie before proceeding to checkout.</p>
      </div>
    );
  }

  const handleApplyPromotion = () => {
    const promotion = promotions.find((promo) => promo.code === newPromotion);
    // const promotion2 = promotions.find((promo) => console.log(promo));
    
    // console.log("new code"+newPromotion)
    // console.log("new disc"+ promotion?.discount)
    // console.log("promo2"+ promotion2)
    if (promotion) {
      const discountAmount = orderDetails ? orderDetails.total * promotion.discount : 0;
      const newTotal = (orderDetails?.total || 0) - discountAmount;
      setOrderDetails({ ...orderDetails!, total: newTotal });
      
    } else {
      setError("Invalid promotion code");
    }
  };

  const handleAddNewCard = () => {
    if (!validateCardDetails(newCard)) {
      setError("Please fill in all card details correctly.");
      return;
    }

    const newCardWithId = {
      ...newCard,
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    const updatedCards = [...savedCards, newCardWithId];

    if (updatedCards.length > 3) {
      setError("You can only save up to 3 credit cards.");
      return;
    }

    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));

    setSelectedCard(newCardWithId);
    setIsAddingCard(false);
    setError(null);

    setNewCard({
      id: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      billingAddress: "",
    });
  };

  const validateCardDetails = (card: CreditCard): boolean => {
    return !!(
      card.cardNumber &&
      card.expirationMonth &&
      card.expirationYear &&
      card.billingAddress &&
      card.cardNumber.length >= 12 &&
      card.expirationMonth.length === 2 &&
      card.expirationYear.length === 4
    );
  };

  const handleRemoveCard = (cardId: string) => {
    const updatedCards = savedCards.filter((card) => card.id !== cardId);
    setSavedCards(updatedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));

    if (selectedCard?.id === cardId) {
      setSelectedCard(null);
    }
  };

  const handleCheckout = () => {
    if (!selectedCard) {
      setError("Please select or add a payment method.");
      return;
    }

    const orderToSave = {
      title: orderDetails?.title || '',
      showtime: orderDetails?.showtime || '',
      seatNumbers: orderDetails?.selectedSeats.map((seat) => seat.seat) || [],
      customerEmail: localStorage.getItem("accountEmail") || '',
      paymentMethod: {
        cardType: selectedCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        lastFourDigits: selectedCard.cardNumber.slice(-4),
      },
    };

    localStorage.setItem('order', JSON.stringify(orderToSave));
    router.push("/orderconfirm");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#1b0c1a] p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Checkout</h1>

      <div className="bg-[#2d1f2d] p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Order Details */}
        <div className="mb-6">
          <p className="text-lg text-gray-200 mb-2">
            <strong>Movie:</strong> {orderDetails.title}
          </p>
          <p className="text-lg text-gray-200 mb-2">
            <strong>Showtime:</strong> {orderDetails.showtime}
          </p>
          <p className="text-lg text-gray-200 mb-4">
            <strong>Seat(s):</strong> {orderDetails.selectedSeats.map((seat) => seat.seat).join(", ")}
          </p>
          <div className="text-lg text-gray-200 mb-4">
            <span>Total:</span>
            <span>${orderDetails.total}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h2 className="text-xl text-white mb-4">Payment Method</h2>
          {savedCards.map((card) => (
            <div
              key={card.id}
              className={`p-3 mb-2 rounded-lg flex justify-between items-center ${
                selectedCard?.id === card.id
                  ? 'bg-[#fadcd5] text-black'
                  : 'bg-[#3d2b3d] text-gray-300 hover:bg-[#4a364a]'
              }`}
            >
              <div onClick={() => setSelectedCard(card)} className="cursor-pointer flex-grow">
                **** **** **** {card.cardNumber.slice(-4)}
                <span className="ml-2 text-sm">
                  Expires {card.expirationMonth}/{card.expirationYear}
                </span>
              </div>
              <button onClick={() => handleRemoveCard(card.id)} className="ml-2 text-red-500 hover:text-red-700">
                🗑️
              </button>
            </div>
          ))}

          {savedCards.length < 3 && (
            <div>
              {!isAddingCard ? (
                <button onClick={() => setIsAddingCard(true)} className="w-full mt-2 px-4 py-2 bg-[#fadcd5] text-black rounded-lg hover:bg-[#e0c2a0]">
                  + Add New Card
                </button>
              ) : (
                <div className="bg-[#3d2b3d] p-4 rounded-lg mt-2">
                  <input
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    className="w-full mb-2 p-2 text-gray-900 rounded-md"
                  />
                  <div className="flex space-x-2">
                    <input
                      placeholder="MM"
                      type="text"
                      value={newCard.expirationMonth}
                      onChange={(e) => setNewCard({ ...newCard, expirationMonth: e.target.value })}
                      className="w-1/2 p-2 text-gray-900 rounded-md"
                    />
                    <input
                      placeholder="YYYY"
                      type="text"
                      value={newCard.expirationYear}
                      onChange={(e) => setNewCard({ ...newCard, expirationYear: e.target.value })}
                      className="w-1/2 p-2 text-gray-900 rounded-md"
                    />
                  </div>
                  <input
                    placeholder="Billing Address"
                    value={newCard.billingAddress}
                    onChange={(e) => setNewCard({ ...newCard, billingAddress: e.target.value })}
                    className="w-full p-2 text-gray-900 rounded-md"
                  />
                  <button
                    onClick={handleAddNewCard}
                    className="mt-2 w-full px-4 py-2 bg-[#fadcd5] text-black rounded-lg hover:bg-[#e0c2a0]"
                  >
                    Add Card
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Promotion Code */}
        <div className="mb-6">
          <h2 className="text-xl text-white mb-2">Apply Promotion</h2>
          <input
            type="text"
            value={newPromotion}
            onChange={(e) => setNewPromotion(e.target.value)}
            placeholder="Enter promo code"
            className="w-full p-2 text-gray-900 rounded-md mb-2"
          />
          <button
            onClick={handleApplyPromotion}
            className="w-full px-4 py-2 bg-[#fadcd5] text-black rounded-lg hover:bg-[#e0c2a0]"
          >
            Apply Promo
          </button>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-between items-center">
          <button onClick={handleCheckout} className="w-full px-4 py-2 bg-[#fadcd5] text-black rounded-lg hover:bg-[#e0c2a0]">
            Checkout
          </button>
        </div>

        {error && (
          <div className="mt-2 text-red-500 text-center">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
