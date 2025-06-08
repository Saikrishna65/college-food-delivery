import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiBell, FiUser } from "react-icons/fi";

const VendorSidebar = () => {
  const location = useLocation();

  const navLinks = [
    {
      path: "/vendor/dashboard/dashboard",
      name: "Dashboard",
      icon: <FiHome />,
    },
    { path: "/vendor/dashboard/orders", name: "Orders", icon: <FiBox /> },
    {
      path: "/vendor/dashboard/notifications",
      name: "Notifications",
      icon: <FiBell />,
    },
    { path: "/vendor/dashboard/profile", name: "Profile", icon: <FiUser /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Vendor Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-md transition-all ${
              location.pathname === link.path
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default VendorSidebar;
