"use client";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar isLoggedIn={true} />
      </div>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AccountLayout;
