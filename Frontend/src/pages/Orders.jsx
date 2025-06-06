import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import OrderCard from "../components/OrderCard";

const Orders = () => {
  const { allOrders } = useContext(AppContext);

  const handleReorder = (orderId) => {
    console.log(`Reordering order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f2] p-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#111827] mb-4">
          Your Orders
        </h2>
        <div className="flex flex-col justify-center gap-4">
          {allOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
