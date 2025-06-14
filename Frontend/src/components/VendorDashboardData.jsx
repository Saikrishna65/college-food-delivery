import React, { useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppContext } from "../context/AppContext"; // Adjust if needed

const VendorDashboardData = () => {
  const { vendorDashboardData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("weekly");

  if (!vendorDashboardData?.data) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  const {
    weeklyData,
    monthlyData,
    totalRevenue,
    totalOrders,
    totalFoodItems,
    processingOrders,
    topOrderedItems,
  } = vendorDashboardData.data;

  const salesData = activeTab === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="p-4 text-gray-800 min-h-screen">
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-lg font-semibold">
          <span>Dashboard & Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-4">
          {/* Sales Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sales</h2>
              <div className="text-sm">
                <span
                  className={`cursor-pointer ${
                    activeTab === "weekly"
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("weekly")}
                >
                  Weekly
                </span>
                <span
                  className={`ml-4 cursor-pointer ${
                    activeTab === "monthly"
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("monthly")}
                >
                  Monthly
                </span>
              </div>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#3B82F6" />
                  <Bar dataKey="cancelled" name="Cancelled" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Card Section: Total Earnings, Orders, Processing Orders, Food Items */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-700">
                ₹{totalRevenue}
              </div>
              <div className="text-sm text-green-600">Total Earnings</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-700">
                {totalOrders}
              </div>
              <div className="text-sm text-red-600">Total Orders</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-700">
                {processingOrders}
              </div>
              <div className="text-sm text-blue-600">Processing Orders</div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {totalFoodItems}
              </div>
              <div className="text-sm text-yellow-600">Total Food Items</div>
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Top Best Sellers</h2>
            <ul className="text-sm space-y-1">
              {topOrderedItems?.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.totalQuantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardData;
