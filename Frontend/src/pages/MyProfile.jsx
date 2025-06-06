import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileNavbar from "../components/ProfileNavbar";
import Sidebar from "../components/Sidebar";

const MyProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ProfileNavbar toggleSidebar={toggleSidebar} />
      <div className="flex w-full mt-[clamp(60px,10vh,100px)]">
        <div className="h-[calc(100vh_-_clamp(60px,10vh,100px))]">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="grow min-[900px]:ml-[200px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
