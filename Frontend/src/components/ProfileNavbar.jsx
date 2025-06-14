import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProfileNavbar = ({ toggleSidebar }) => {
  const { logoutUser } = useContext(AppContext);
  const navigate = useNavigate(); // <-- move this here

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login"); // <-- use navigate after declaration
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onClickToHome = () => {
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center fixed top-0 w-full z-[1000] bg-white text-black h-[clamp(60px,10vh,80px)] py-4 px-5 bg-opacity-90 backdrop-blur-lg shadow-lg">
      <div className="flex items-center cursor-pointer" onClick={onClickToHome}>
        <h1 className="whitespace-nowrap text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF6B6B] transition-all duration-500">
          Campus Cravings
        </h1>
      </div>

      <ul className="list-none hidden min-[901px]:flex">
        <li className="flex items-center space-x-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="text-black no-underline transition-colors duration-300 ease hover:text-[#ff0303]"
          >
            Logout
          </a>
          <img src={assets.logout} alt="Logout Icon" className="w-6 h-6" />
        </li>
      </ul>

      <button
        className="bg-transparent border-0 text-black text-[2rem] cursor-pointer hidden max-[900px]:block"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </nav>
  );
};

export default ProfileNavbar;
