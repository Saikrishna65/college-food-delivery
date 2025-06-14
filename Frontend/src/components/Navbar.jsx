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

  // show/hide + bg control
  const [isBgBlack, setIsBgBlack] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { y: scrollY } = useWindowScroll();
  const [lastY, setLastY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // login state
  useEffect(() => {
    const token = localStorage.getItem("user token");
    setIsLoggedIn(Boolean(user || token));
  }, [user]);

  // hide/show on scroll with threshold
  useEffect(() => {
    const delta = scrollY - lastY;

    if (scrollY <= 0) {
      // at very top → always show, transparent
      setIsVisible(true);
      setIsBgBlack(false);
    } else if (delta > 5) {
      // scrolled down more than 5px → hide
      setIsVisible(false);
    } else if (delta < -5) {
      // scrolled up more than 5px → show + dark bg
      setIsVisible(true);
      setIsBgBlack(true);
    }

    setLastY(scrollY);
  }, [scrollY, lastY]);

  // GSAP slide up/down animation
  useEffect(() => {
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -120,
      opacity: isVisible ? 1 : 0,
      duration: 0.25,
      ease: "power1.out",
    });
  }, [isVisible]);

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
    if (path === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={navRef}
        className={clsx(
          "fixed inset-x-0 top-4 mx-2 z-50 h-16 rounded-[12px] sm:inset-x-6 transition-none",
          isBgBlack ? "bg-black bg-opacity-90" : "bg-transparent"
        )}
      >
        <header className="absolute inset-0 flex items-center px-4">
          <h1
            className="text-white text-2xl sm:text-4xl font-bold cursor-pointer"
            onClick={() => go("/")}
          >
            Campus Carvings
          </h1>

          <div className="ml-auto flex items-center space-x-6">
            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {isLoggedIn && (
                <ul className="flex space-x-6 text-lg font-medium">
                  {navItems.map((it, i) => (
                    <li
                      key={i}
                      onClick={() => go(it.path)}
                      className="text-white hover:text-green-500 transition transform hover:scale-105 cursor-pointer"
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              )}

              {isLoggedIn ? (
                <>
                  <FaShoppingCart
                    size={20}
                    onClick={() => go("/my-profile/cart")}
                    className="text-white hover:text-green-500 transition transform hover:scale-105 cursor-pointer"
                  />
                  <FaUser
                    size={20}
                    onClick={() => go(isLoggedIn ? "/my-profile" : "/login")}
                    className="text-white hover:text-green-500 transition transform hover:scale-105 cursor-pointer"
                  />
                </>
              ) : (
                <button
                  onClick={() => go("/login")}
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
          </div>
        </header>
      </div>

      {/* Mobile Overlay Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={clsx(
            "bg-white rounded-lg w-3/4 max-w-md p-8 transition-transform duration-300",
            menuOpen ? "scale-100" : "scale-95"
          )}
        >
          <div className="flex justify-end">
            <FaTimes size={22} onClick={() => setMenuOpen(false)} />
          </div>
          {isLoggedIn && (
            <ul className="mt-6 space-y-6 text-center">
              {navItems.map((it, i) => (
                <li
                  key={i}
                  onClick={() => go(it.path)}
                  className="text-2xl font-semibold text-gray-800 hover:text-green-500 cursor-pointer"
                >
                  {it.name}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex justify-center space-x-8">
            {isLoggedIn ? (
              <>
                <FaShoppingCart
                  size={24}
                  onClick={() => go("/my-profile/cart")}
                  className="cursor-pointer hover:text-green-500"
                />
                <FaUser
                  size={24}
                  onClick={() => go("/my-profile")}
                  className="cursor-pointer hover:text-green-500"
                />
              </>
            ) : (
              <button
                onClick={() => go("/login")}
                className="border px-4 py-2 rounded-full hover:bg-gray-200 transition"
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
