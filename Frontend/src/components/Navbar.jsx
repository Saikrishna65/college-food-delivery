import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const navbarItems = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Food", path: "/fooditems" },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // A single handler for all nav items
  const handleNavClick = (path) => {
    navigate(path);

    // Scroll to the top if user clicked "Home"
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate to user profile
  const onClickUser = () => {
    navigate("/my-profile");
  };

  // Navigate to cart page
  const onClickCart = () => {
    navigate("/my-profile/cart");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-lg z-50 px-8 py-2 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="whitespace-nowrap text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF6B6B] transition-all duration-500">
          Campus Cravings
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-10 text-lg font-medium">
            {navbarItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavClick(item.path)}
                className="text-black hover:text-[#E63946] transition duration-300 cursor-pointer hover:scale-105 transform hover:drop-shadow-lg"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="flex space-x-6 text-black">
            <FaShoppingCart
              size={20}
              className="cursor-pointer hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
              onClick={onClickCart}
            />
            <FaUser
              size={20}
              className="cursor-pointer hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
              onClick={onClickUser}
            />
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-3 bg-gradient-to-r from-[#E63946] to-[#FF6B6B] text-white rounded-full shadow-lg focus:outline-none transition-transform transform hover:scale-110 hover:drop-shadow-lg"
          >
            {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar (slides in from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white bg-opacity-95 text-black shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Logo in Sidebar */}
          <h2 className="whitespace-nowrap text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF6B6B] mb-8">
            Campus Cravings
          </h2>

          {/* Mobile Navbar Links */}
          <nav className="space-y-6 text-lg">
            {navbarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleNavClick(item.path);
                  toggleSidebar();
                }}
                className="block text-black hover:text-[#E63946] transition duration-300 cursor-pointer hover:pl-4 hover:drop-shadow-lg"
              >
                {item.name}
              </div>
            ))}
          </nav>

          {/* Icons (Cart and Profile) */}
          <div className="mt-8 flex space-x-6">
            <FaShoppingCart
              size={24}
              className="cursor-pointer text-black hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
              onClick={() => {
                onClickCart();
                toggleSidebar();
              }}
            />
            <FaUser
              size={24}
              className="cursor-pointer text-black hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
              onClick={() => {
                onClickUser();
                toggleSidebar();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
