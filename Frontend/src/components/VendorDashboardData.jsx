import React, { useState } from "react";
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
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const VendorDashboardData = () => {
  const weeklyData = [
    { name: "Mon", completed: 40, cancelled: 10 },
    { name: "Tue", completed: 85, cancelled: 25 },
    { name: "Wed", completed: 70, cancelled: 5 },
    { name: "Thu", completed: 65, cancelled: 15 },
    { name: "Fri", completed: 75, cancelled: 5 },
    { name: "Sat", completed: 50, cancelled: 0 },
    { name: "Sun", completed: 80, cancelled: 20 },
  ];

  const monthlyData = [
    { name: "Week 1", completed: 210, cancelled: 45 },
    { name: "Week 2", completed: 180, cancelled: 30 },
    { name: "Week 3", completed: 220, cancelled: 50 },
    { name: "Week 4", completed: 250, cancelled: 40 },
  ];

  const [activeTab, setActiveTab] = useState("weekly");

  const salesData = activeTab === "weekly" ? weeklyData : monthlyData;

  const totalEarnings = 2360;
  const totalOrders = 237;
  const deliveryBreakdown = {
    juxtDelivery: 198,
    ownDelivery: 19,
    takeAway: 20,
  };

  const bestSellers = [
    { name: "Chicken Burger", count: 56 },
    { name: "White Sauce Pasta", count: 52 },
    { name: "Margherita Pizza", count: 44 },
    { name: "Pizza alla Pala", count: 39 },
    { name: "Garlic Naan", count: 20 },
  ];

  const avgRating = 4.8;
  const totalRatings = 178;
  const totalReviews = 24;
  const ratingBreakdown = [
    { star: 5, count: 169 },
    { star: 4, count: 26 },
    { star: 3, count: 9 },
    { star: 2, count: 2 },
    { star: 1, count: 0 },
  ];

  const serviceQuality = {
    overall: 80,
    thumbsUp: 216,
    thumbsDown: 21,
    taste: 87,
    temperature: 94,
    quantity: 60,
    presentation: 30,
  };

  return (
    <div className="p-4 bg-white text-gray-800 min-h-screen">
      {/* Dashboard Title */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-lg font-semibold">
          <span className="cursor-pointer text-indigo-600 mr-2">&#8592;</span>
          <span>Dashboard & Analytics</span>
          <span className="ml-2 text-sm text-gray-500">Store ID: 45342</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-4">
          {/* Sales Section */}
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
            <div className="mt-2 text-right text-sm text-gray-500">Today</div>
          </div>

          {/* Customer Satisfaction Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              Customer Satisfaction
            </h2>
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold">{avgRating}</div>
              <FaStar className="text-yellow-400 ml-2" />
              <div className="ml-4 text-sm text-gray-500">
                {totalRatings} ratings & {totalReviews} reviews
              </div>
            </div>
            <div className="space-y-1">
              {ratingBreakdown.map(({ star, count }) => {
                let bgColor = "bg-gray-300";
                if (star === 5 || star === 4) bgColor = "bg-green-500";
                if (star === 1) bgColor = "bg-red-500";
                const percentage = Math.round((count / totalRatings) * 100);
                return (
                  <div key={star} className="flex items-center">
                    <span className="w-5 text-sm">{star}★</span>
                    <div className="flex-1 mx-2 bg-gray-200 h-2 rounded">
                      <div
                        className={`${bgColor} h-2 rounded`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Total Earnings & Orders Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-700">
                {totalEarnings} ₹
              </div>
              <div className="text-sm text-green-600">Total Earnings</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-700">
                {totalOrders}
              </div>
              <div className="text-sm text-red-600">Total Orders</div>
            </div>
          </div>

          {/* Delivery Breakdown */}
          <div className="bg-white p-4 rounded-lg shadow text-sm">
            <div className="font-semibold mb-2">Delivery Breakdown</div>
            <div className="flex justify-between">
              <span>Juxt Delivery</span>
              <span>{deliveryBreakdown.juxtDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span>Own Delivery</span>
              <span>{deliveryBreakdown.ownDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span>Take Away</span>
              <span>{deliveryBreakdown.takeAway}</span>
            </div>
          </div>

          {/* Top 5 Best Sellers */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Top 5 Best Sellers</h2>
            <ul className="text-sm space-y-1">
              {bestSellers.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Quality */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Service Quality</h2>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-3xl font-bold">
                  {serviceQuality.overall}%
                </div>
                <div className="text-sm text-gray-500">Overall</div>
              </div>
              <div className="text-center">
                <FaThumbsUp className="text-green-500 mr-1 inline" />
                <span className="text-sm">{serviceQuality.thumbsUp}</span>
                <FaThumbsDown className="text-red-500 ml-4 mr-1 inline" />
                <span className="text-sm">{serviceQuality.thumbsDown}</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              {["taste", "temperature", "quantity", "presentation"].map(
                (key) => (
                  <div className="flex items-center" key={key}>
                    <span className="w-24 capitalize">{key}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded mr-2">
                      <div
                        className={`h-2 rounded ${
                          key === "quantity"
                            ? "bg-yellow-500"
                            : key === "presentation"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${serviceQuality[key]}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right">
                      {serviceQuality[key]}%
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardData;
