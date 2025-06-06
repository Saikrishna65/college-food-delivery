import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sideItems = [
    { name: "Profile", path: "/my-profile", icon: assets.profile },
    {
      name: "Favourites",
      path: "/my-profile/favourites",
      icon: assets.favourites,
    },
    { name: "Orders", path: "/my-profile/orders", icon: assets.orders },
    { name: "Cart", path: "/my-profile/cart", icon: assets.cart },
    { name: "Logout", path: "/my-profile/logout", icon: assets.logout },
  ];

  // Define mobile as viewport width <= 900px
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
        flex flex-col w-[200px] h-full bg-white z-[1000] transition-transform duration-300 ease-in-out fixed bg-opacity-90 backdrop-blur-lg shadow-lg
        ${isMobile ? "right-[-250px]" : "left-0"}
        ${isMobile && isOpen ? "translate-x-[-250px]" : ""}
      `}
    >
      {isMobile
        ? sideItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/my-profile"}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `w-full flex text-black no-underline text-center transition-colors duration-300 ease hover:bg-[#FF6B6B] ${
                  isActive ? "bg-[#f15966]" : ""
                }`
              }
            >
              <div className="flex w-full">
                <div className="flex-grow">
                  <p className="py-[15px] px-[10px] text-[1.2rem]">
                    {item.name}
                  </p>
                </div>
                <div className="flex items-center pr-2">
                  <img src={item.icon} alt="icon" className="w-[1.5rem]" />
                </div>
              </div>
            </NavLink>
          ))
        : sideItems.slice(0, 4).map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/my-profile"}
              onClick={() => isMobile && toggleSidebar()} // Only close sidebar on mobile
              className={({ isActive }) =>
                `w-full flex text-black no-underline text-center transition-colors duration-300 ease hover:bg-[#FF6B6B] ${
                  isActive ? "bg-[#f15966]" : ""
                }`
              }
            >
              <div className="flex w-full">
                <div className="flex-grow">
                  <p className="py-[15px] px-[10px] text-[1.2rem]">
                    {item.name}
                  </p>
                </div>
                <div className="flex items-center pr-2">
                  <img src={item.icon} alt="icon" className="w-[1.5rem]" />
                </div>
              </div>
            </NavLink>
          ))}
    </div>
  );
};

export default Sidebar;
