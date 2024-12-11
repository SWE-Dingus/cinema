"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Manage Movies", path: "/admin/movies" },
    { name: "Manage Promotions", path: "/admin/promotions" },
    { name: "Manage Showtimes", path: "/admin/showtimes" },
    { name: "Manage Users", path: "/admin/users" },
  ];

  return (
    <div
      style={{
        width: "250px", // Fixed width for the sidebar
        padding: "20px",
        backgroundColor: "#f9fafb", // Light gray background
        borderRight: "1px solid #e5e7eb", // Subtle border
        height: "100vh", // Full height
        position: "fixed", // Sticky sidebar
        top: 0,
        left: 0,
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#111827", // Dark gray text
        }}
      >
        Admin Panel
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
                  color: pathname === item.path ? "#ffffff" : "#374151", // White for active, dark gray for inactive
                  backgroundColor:
                    pathname === item.path ? "#1f2937" : "transparent", // Dark background for active
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pathname === item.path ? "#111827" : "#e5e7eb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    pathname === item.path ? "#1f2937" : "transparent")
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

export default AdminSidebar;
