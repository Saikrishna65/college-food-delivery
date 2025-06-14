// VendorSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiBell, FiUser, FiX } from "react-icons/fi";
import { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { AppContext } from "../context/AppContext";

const VendorSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const sidebarRef = useRef();
  const { logoutVendor, vendorActive, loadingActive, toggleVendorActive } =
    useContext(AppContext);

  const navLinks = [
    { path: "/vendor/dashboard", name: "Dashboard", icon: <FiHome /> },
    { path: "/vendor/orders", name: "Orders", icon: <FiBox /> },
    { path: "/vendor/notifications", name: "Notifications", icon: <FiBell /> },
    { path: "/vendor/add-food", name: "Add Food", icon: <FiBox /> },
    { path: "/vendor/food-items", name: "Food Items", icon: <FiBox /> },
    { path: "/vendor/profile", name: "Profile", icon: <FiUser /> },
    { name: "Logout", icon: <FiX />, type: "button" },
  ];

  useEffect(() => {
    gsap.to(sidebarRef.current, {
      x: isOpen ? 0 : "-100%",
      duration: 0.3,
      ease: isOpen ? "power2.out" : "power2.in",
    });
  }, [isOpen]);

  const renderToggle = () => (
    <label className="flex items-center space-x-2 mb-4">
      <span className="text-sm text-gray-300">Active</span>
      {loadingActive ? (
        <span className="ml-2">Loading...</span>
      ) : (
        <input
          type="checkbox"
          checked={vendorActive}
          onChange={toggleVendorActive}
          className="h-5 w-10 bg-gray-600 rounded-full appearance-none cursor-pointer transition-colors checked:bg-green-500"
        />
      )}
    </label>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:h-screen md:fixed md:top-0 bg-gray-900 text-white shadow-lg z-20">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Vendor Panel</span>
          </div>
          {renderToggle()}
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link, index) =>
            link.type === "button" ? (
              <button
                key={index}
                onClick={logoutVendor}
                className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
              >
                {link.icon}
                {link.name}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-md ${
                  location.pathname === link.path
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg p-4 flex flex-col space-y-4 md:hidden"
        style={{ transform: "translateX(-100%)" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Vendor Panel</h2>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        {renderToggle()}
        {navLinks.map((link, index) =>
          link.type === "button" ? (
            <button
              key={index}
              onClick={() => {
                logoutVendor();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
            >
              {link.icon}
              {link.name}
            </button>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-md ${
                location.pathname === link.path
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default VendorSidebar;
