import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const OrderTable = () => {
  const { vendorOrders, updateOrderStatus } = useContext(AppContext);

  if (!vendorOrders || vendorOrders.length === 0) {
    return <p className="p-4">No orders found.</p>;
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b border-gray-300">
                Order ID
              </th>
              <th className="p-3 text-left border-b border-gray-300">User</th>
              <th className="p-3 text-left border-b border-gray-300">
                Order Type
              </th>
              <th className="p-3 text-left border-b border-gray-300">
                Payment
              </th>
              <th className="p-3 text-left border-b border-gray-300">Status</th>
              <th className="p-3 text-left border-b border-gray-300">Total</th>
              <th className="p-3 text-left border-b border-gray-300">Items</th>
            </tr>
          </thead>
          <tbody>
            {vendorOrders.map((order) => (
              <tr key={order.orderId} className="border-b border-gray-300">
                <td className="p-3">{order.orderId}</td>
                <td className="p-3">
                  {order.user?.name || "Unknown"} <br />
                  <span className="text-xs text-gray-600">
                    {order.user?.email}
                  </span>
                </td>
                <td className="p-3 capitalize">{order.orderType}</td>
                <td className="p-3 capitalize">{order.payment}</td>
                <td className="p-3 capitalize">
                  {order.orderStatus}
                  {order.orderStatus === "Processing" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order.orderId, "Confirmed")
                      }
                      className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      Mark as Confirmed
                    </button>
                  )}
                </td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">
                  <ul>
                    {order.items.map(({ foodItem, quantity, _id }) => (
                      <li key={_id}>
                        {foodItem.name} x {quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {vendorOrders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="text-sm font-semibold mb-2">
              Order ID: {order.orderId}
            </div>
            <div className="text-sm">
              <strong>User:</strong> {order.user?.name || "Unknown"} <br />
              <span className="text-xs text-gray-600">{order.user?.email}</span>
            </div>
            <div className="text-sm capitalize mt-1">
              <strong>Order Type:</strong> {order.orderType}
            </div>
            <div className="text-sm capitalize mt-1">
              <strong>Payment:</strong> {order.payment}
            </div>
            <div className="text-sm mt-1 capitalize">
              <strong>Status:</strong> {order.orderStatus}
              {order.orderStatus === "Processing" && (
                <button
                  onClick={() => updateOrderStatus(order.orderId, "Confirmed")}
                  className="ml-2 mt-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                >
                  Mark as Confirmed
                </button>
              )}
            </div>
            <div className="text-sm mt-1">
              <strong>Total:</strong> ₹{order.totalAmount}
            </div>
            <div className="text-sm mt-2">
              <strong>Items:</strong>
              <ul className="list-disc list-inside">
                {order.items.map(({ foodItem, quantity, _id }) => (
                  <li key={_id}>
                    {foodItem.name} x {quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderTable;
