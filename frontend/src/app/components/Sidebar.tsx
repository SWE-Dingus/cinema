"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", path: "/account" },
    { name: "Booking History", path: "/account/booking-history" },
    { name: "Edit Profile", path: "/account/edit" },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Account</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name} className="mb-2">
            <Link href={item.path}>
              <a
                className={`block p-2 rounded ${
                  pathname === item.path ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
