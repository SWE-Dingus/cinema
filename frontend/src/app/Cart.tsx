"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the CartContext type
interface CartContextType {
  cartCount: number;
  addToCart: () => void;
  clearCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
  clearCart: () => {},
});

// Create a provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const clearCart = () => {
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);