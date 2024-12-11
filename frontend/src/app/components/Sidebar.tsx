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
    <div
      style={{
        width: "250px", // Fixed width for the sidebar
        padding: "20px",
        backgroundColor: "#f3f4f6", // Light gray background
        borderRight: "1px solid #e5e7eb", // Subtle border
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
        height: "100%", // Full height of the parent container
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#1f2937", // Darker gray text
        }}
      >
        Account
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.name} style={{ marginBottom: "15px" }}>
            <Link href={item.path}>
              <a
                style={{
                  display: "block",
                  textDecoration: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  color: pathname === item.path ? "#ffffff" : "#1f2937", // White for active, dark gray for inactive
                  backgroundColor:
                    pathname === item.path ? "#2563eb" : "transparent", // Blue background for active
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pathname === item.path ? "#1d4ed8" : "#e5e7eb")
                } // Lighter hover effect
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pathname === item.path ? "#2563eb" : "transparent")
                }
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
