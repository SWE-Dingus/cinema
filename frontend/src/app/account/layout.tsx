"use client";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

function AccountLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar isLoggedIn={true} />

      {/* Sidebar and Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 md:h-auto border-b md:border-b-0 md:border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AccountLayout;
