// VendorDashboard.jsx
import { useContext, useState } from "react";
import VendorSidebar from "../components/VendorSidebar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const VendorDashboard = () => {
  // Use correct context key (camelCase)
  const { vendorActive } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <VendorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile Topbar */}
      <div className="md:hidden p-4 bg-white shadow flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setIsSidebarOpen(true)}>
          <FiMenu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Vendor Dashboard</h1>
      </div>

      {/* Conditional Warning Banner */}
      {!vendorActive && (
        <div className="fixed inset-x-0 top-0 z-50">
          <div
            className="mx-auto w-lg bg-red-600 border-4 border-red-800 rounded-b-lg 
                          text-white font-black uppercase text-center py-3 px-6 
                          animate-pulse shadow-lg"
          >
            The Vendor is Currently Not Available
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative p-6 overflow-y-auto h-screen md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboard;
