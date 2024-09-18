import React from 'react';
import Link from 'next/link';  // Using Link for navigation

const AdminMain: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link href="/admin/movies">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Manage Movies
          </button>
        </Link>
        <Link href="/admin/promotions">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Manage Promotions
          </button>
        </Link>
        <Link href="/admin/users">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Manage Users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminMain;
