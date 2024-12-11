// pages/401.tsx
import React from "react";
import Navbar from "../components/Navbar";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-200 flex flex-col">
      <Navbar isLoggedIn={false}></Navbar>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            401 - Unauthorized
          </h1>
          <p className="text-red-600">
            You are not authorized to view this page. Please{" "}
            <a href="/login" className="text-blue-500 underline">
              login
            </a>{" "}
            to access your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
