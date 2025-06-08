import VendorSidebar from "../components/VendorSidebar";
import OrderTable from "../components/OrderTable";
import { Outlet } from "react-router-dom";

const VendorDashboard = () => {
  return (
    <div className="flex">
      <VendorSidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        {/* <OrderTable /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default VendorDashboard;
