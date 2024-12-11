"use client"

import React, { useState, useEffect } from "react";
import router from "next/router";
import Link from "next/link";

// Configuration file for API endpoints
import Config from "../../../frontend.config";



const OrderConfirm: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<{
    movieTitle: string;
    showtime: string;
    seatNumbers: string[];
    paymentDetails: {
      cardType: string;
      lastFourDigits: string;
      totalAmount: number;
      confirmationNumber: string;
    };
    customerEmail: string;
  } | null>(null);

  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderDetails({
          ...parsedOrder,
          paymentDetails: {
            cardType: parsedOrder.paymentMethod?.cardType || 'Credit Card',
            lastFourDigits: parsedOrder.paymentMethod?.lastFourDigits || '****',
            totalAmount: parsedOrder.totalAmount || 24.99,
            confirmationNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          },
          customerEmail: parsedOrder.customerEmail || "example@email.com"
        });
      } catch (error) {
        console.error('Error parsing order details:', error);
       
      }
    } else {
      // Redirect if no order is found
      router.push('/');
    }
  }, []);

  const handleSendEmail = async () => {
    if (!orderDetails) return;

    // Prevent multiple email sends
    if (isEmailSending) return;

    setIsEmailSending(true);

    try {
      const emailResponse = await fetch(`${Config.apiRoot}/orders/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication token if required
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          email: orderDetails.customerEmail,
          orderDetails: {
            movieTitle: orderDetails.movieTitle,
            showtime: orderDetails.showtime,
            seatNumbers: orderDetails.seatNumbers,
            confirmationNumber: orderDetails.paymentDetails.confirmationNumber,
            totalAmount: orderDetails.paymentDetails.totalAmount,
            paymentMethod: `${orderDetails.paymentDetails.cardType} (ending in ${orderDetails.paymentDetails.lastFourDigits})`
          }
        })
      });

      if (emailResponse.ok) {
        console.log("email successs")
      } else {
        const errorText = await emailResponse.text();
        console.log(errorText)
       
      }
    } catch (error) {
      console.error('Error sending email:', error);
    
    } finally {
      setIsEmailSending(false);
    }
  };

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
        
        <div className="space-y-2">
          <p className="text-lg">
            Showtime: <span className="font-semibold">{orderDetails.showtime}</span>
          </p>
          <p className="text-lg">
            Seats: <span className="font-semibold">
              {orderDetails.seatNumbers && orderDetails.seatNumbers.length > 0
                ? orderDetails.seatNumbers.join(", ")
                : "No seats selected"}
            </span>
          </p>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-xl font-bold text-[#fadcd5]">Payment Details</h3>
          <p className="text-lg">
            Payment Method: <span className="font-semibold">
              {orderDetails.paymentDetails.cardType} 
              &nbsp;(ending in {orderDetails.paymentDetails.lastFourDigits})
            </span>
          </p>
          <p className="text-lg font-bold text-[#fadcd5]">
            Total Price: ${orderDetails.paymentDetails.totalAmount.toFixed(2)}
          </p>
          <p className="text-lg">
            Confirmation Number: <span className="font-semibold">
              {orderDetails.paymentDetails.confirmationNumber}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-green-600 font-semibold text-center">
          An order summary will be sent to {orderDetails.customerEmail}
        </p>
      </div>

      <div className="text-center mt-6 space-x-4">
        <button
          className={`
            ${isEmailSending 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
            } 
            text-white px-6 py-3 rounded transition
          `}
          onClick={handleSendEmail}
          disabled={isEmailSending}
        >
          {isEmailSending ? 'Sending...' : 'Send Confirmation Email'}
          </button>
  <Link href="/" className="inline-block">
    <button
      className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition"
      onClick={() => {
        localStorage.removeItem("order");
        setOrderDetails(null);
      }}
    >
      Go Home
    </button>
  </Link>

      </div>
    </div>
  );
};

export default OrderConfirm;