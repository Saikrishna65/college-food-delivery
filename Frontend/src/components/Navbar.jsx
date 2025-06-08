// import { useState } from "react";
// import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const navbarItems = [
//   { name: "Home", path: "/" },
//   { name: "Restaurants", path: "/restaurants" },
//   { name: "Food", path: "/fooditems" },
// ];

// const Navbar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Toggle sidebar open/close
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // A single handler for all nav items
//   const handleNavClick = (path) => {
//     navigate(path);

//     // Scroll to the top if user clicked "Home"
//     if (path === "/") {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // Navigate to user profile
//   const onClickUser = () => {
//     navigate("/my-profile");
//   };

//   // Navigate to cart page
//   const onClickCart = () => {
//     navigate("/my-profile/cart");
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-lg shadow-lg z-50 px-8 py-2 md:py-4 flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="whitespace-nowrap text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF6B6B] transition-all duration-500">
//           Campus Cravings
//         </h1>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-10">
//           <ul className="flex space-x-10 text-lg font-medium">
//             {navbarItems.map((item, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleNavClick(item.path)}
//                 className="text-black hover:text-[#E63946] transition duration-300 cursor-pointer hover:scale-105 transform hover:drop-shadow-lg"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//           <div className="flex space-x-6 text-black">
//             <FaShoppingCart
//               size={20}
//               className="cursor-pointer hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
//               onClick={onClickCart}
//             />
//             <FaUser
//               size={20}
//               className="cursor-pointer hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
//               onClick={onClickUser}
//             />
//           </div>
//         </div>

//         {/* Mobile Toggle Button */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleSidebar}
//             className="p-3 bg-gradient-to-r from-[#E63946] to-[#FF6B6B] text-white rounded-full shadow-lg focus:outline-none transition-transform transform hover:scale-110 hover:drop-shadow-lg"
//           >
//             {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Sidebar (slides in from right) */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-white bg-opacity-95 text-black shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
//           isSidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-6">
//           {/* Logo in Sidebar */}
//           <h2 className="whitespace-nowrap text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF6B6B] mb-8">
//             Campus Cravings
//           </h2>

//           {/* Mobile Navbar Links */}
//           <nav className="space-y-6 text-lg">
//             {navbarItems.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   handleNavClick(item.path);
//                   toggleSidebar();
//                 }}
//                 className="block text-black hover:text-[#E63946] transition duration-300 cursor-pointer hover:pl-4 hover:drop-shadow-lg"
//               >
//                 {item.name}
//               </div>
//             ))}
//           </nav>

//           {/* Icons (Cart and Profile) */}
//           <div className="mt-8 flex space-x-6">
//             <FaShoppingCart
//               size={24}
//               className="cursor-pointer text-black hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
//               onClick={() => {
//                 onClickCart();
//                 toggleSidebar();
//               }}
//             />
//             <FaUser
//               size={24}
//               className="cursor-pointer text-black hover:text-[#E63946] transition duration-300 hover:scale-105 hover:drop-shadow-lg"
//               onClick={() => {
//                 onClickUser();
//                 toggleSidebar();
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState, useContext } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
  { name: "Food", path: "/fooditems" },
];

const NavBar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // visibility / scroll stuff...
  const [isBgBlack, setIsBgBlack] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // on mount, if we have either context user OR a token, consider logged in
    const token = localStorage.getItem("user token");
    setIsLoggedIn(Boolean(user || token));
  }, [user]);

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
    if (path === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClickUser = () => {
    navigate(isLoggedIn ? "/my-profile" : "/login");
    setMenuOpen(false);
  };

  const onClickCart = () => {
    navigate(isLoggedIn ? "/my-profile/cart" : "/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      setIsBgBlack(false);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setIsBgBlack(false);
    } else {
      setIsNavVisible(true);
      setIsBgBlack(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className={clsx(
          "fixed inset-x-0 top-4 z-50 h-16 mx-2 transition-all duration-700 rounded-[12px] sm:inset-x-6",
          isBgBlack ? "bg-black bg-opacity-90" : "bg-transparent"
        )}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex h-full items-center justify-between px-4">
            {/* Logo */}
            <h1
              className="text-white text-2xl sm:text-4xl font-bold pl-3 cursor-pointer"
              onClick={() => handleNavClick("/")}
            >
              Campus Carvings
            </h1>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {isLoggedIn && (
                <ul className="flex space-x-10 text-lg font-medium">
                  {navItems.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleNavClick(item.path)}
                      className="text-white hover:text-green-500 transition duration-300 cursor-pointer hover:scale-105"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}

              {isLoggedIn ? (
                <div className="flex space-x-6 text-white">
                  <FaShoppingCart
                    size={20}
                    className="cursor-pointer hover:text-green-500 transition duration-300 hover:scale-105"
                    onClick={onClickCart}
                  />
                  <FaUser
                    size={20}
                    className="cursor-pointer hover:text-green-500 transition duration-300 hover:scale-105"
                    onClick={onClickUser}
                  />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden text-white">
              {menuOpen ? (
                <FaTimes size={22} onClick={() => setMenuOpen(false)} />
              ) : (
                <FaBars size={22} onClick={() => setMenuOpen(true)} />
              )}
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex items-center justify-center bg-opacity-70 backdrop-blur-sm transition-all duration-300",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={clsx(
            "bg-white rounded-lg w-3/4 max-w-md mx-auto p-8 transform transition-transform duration-300",
            menuOpen ? "scale-100" : "scale-95"
          )}
        >
          <div className="flex justify-end">
            <FaTimes size={22} onClick={() => setMenuOpen(false)} />
          </div>

          {isLoggedIn && (
            <ul className="mt-6 space-y-6 text-center">
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleNavClick(item.path)}
                  className="text-2xl font-semibold text-gray-800 hover:text-green-500 cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex justify-center space-x-8 text-gray-800">
            {isLoggedIn ? (
              <>
                <FaShoppingCart
                  size={24}
                  onClick={onClickCart}
                  className="cursor-pointer hover:text-green-500"
                />
                <FaUser
                  size={24}
                  onClick={onClickUser}
                  className="cursor-pointer hover:text-green-500"
                />
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border border-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
