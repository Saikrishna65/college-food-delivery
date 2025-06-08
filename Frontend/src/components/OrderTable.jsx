import React, { useState } from "react";

const OrderTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const orders = [
    {
      id: 1,
      orderId: "2F09",
      date: "May 16, 09:10 AM",
      items: 2,
      total: "160 Kr",
      deliveredBy: "Ravi",
      status: "Completed",
      restaurantAddress:
        "9, 60 Feet Rd, Old Maidanwala, Aduco Nagar, Ist Stage, BTM Layout, Bengaluru, Karnataka 560029",
      customer: {
        name: "Ankita",
        location: "BTM Layout",
        phone: "+91 9062374560",
      },
      itemDetails: [
        { name: "Margherita Pizza", qty: 1, price: 450 },
        { name: "Garlic Bread", qty: 1, price: 120 },
      ],
      adjustedPrice: 20,
      paymentInfo: "Paid (Inclusive of taxes)",
      paymentTotal: "550 Kr",
    },
    {
      id: 2,
      orderId: "2F10",
      date: "May 17, 10:30 AM",
      items: 1,
      total: "90 Kr",
      deliveredBy: "Ravi",
      status: "Completed",
      restaurantAddress: "12, MG Road, Hyderabad, Telangana 500034",
      customer: {
        name: "Rahul",
        location: "Hitech City",
        phone: "+91 9876543210",
      },
      itemDetails: [{ name: "Pepperoni Pizza", qty: 1, price: 90 }],
      adjustedPrice: 0,
      paymentInfo: "Paid (Inclusive of taxes)",
      paymentTotal: "90 Kr",
    },
    {
      id: 3,
      orderId: "2F11",
      date: "May 18, 08:45 PM",
      items: 3,
      total: "300 Kr",
      deliveredBy: "Ravi",
      status: "Cancelled",
      restaurantAddress: "5, Brigade Road, Bengaluru, Karnataka 560025",
      customer: {
        name: "Sneha",
        location: "Koramangala",
        phone: "+91 9123456789",
      },
      itemDetails: [
        { name: "Veg Burger", qty: 2, price: 100 },
        { name: "French Fries", qty: 1, price: 100 },
      ],
      adjustedPrice: 0,
      paymentInfo: "Refunded",
      paymentTotal: "300 Kr",
    },
    {
      id: 4,
      orderId: "2F12",
      date: "May 19, 09:15 AM",
      items: 2,
      total: "550 Kr",
      deliveredBy: "Ravi",
      status: "Completed",
      restaurantAddress:
        "9, 60 Feet Rd, Old Maidanwala, Aduco Nagar, Ist Stage, BTM Layout, Bengaluru, Karnataka 560029",
      customer: {
        name: "Ankita",
        location: "BTM Layout",
        phone: "+91 9062374560",
      },
      itemDetails: [
        { name: "Margherita Pizza", qty: 1, price: 450 },
        { name: "Garlic Bread", qty: 1, price: 120 },
      ],
      adjustedPrice: 20,
      paymentInfo: "Paid (Inclusive of taxes)",
      paymentTotal: "550 Kr",
    },
  ];

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search Order ID"
            className="py-2 pl-10 pr-4 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      {/* Orders Table */}
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              S.No.
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Order ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Items
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Total
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Delivered By
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {order.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {order.items}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {order.total}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <span>{order.deliveredBy}</span>
                    <span className="ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800 px-2 py-1 text-xs rounded"
                        : "bg-red-100 text-red-800 px-2 py-1 text-xs rounded"
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center">
                  <button onClick={() => toggleRow(order.id)}>
                    {expandedRows.includes(order.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(order.id) && (
                <tr>
                  <td colSpan="10" className="px-4 py-4 bg-gray-50">
                    <div className="flex justify-between">
                      <div className="pr-8">
                        <h3 className="text-sm font-semibold mb-2">
                          Restaurant Address
                        </h3>
                        <p className="text-sm text-gray-700">
                          {order.restaurantAddress}
                        </p>
                        <h3 className="text-sm font-semibold mt-4 mb-2">
                          Item Details
                        </h3>
                        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                          {order.itemDetails.map((item, idx) => (
                            <li key={idx}>
                              {item.qty} x {item.name} - {item.price} Kr
                            </li>
                          ))}
                        </ul>
                        {order.adjustedPrice > 0 && (
                          <p className="text-sm text-gray-700 mt-2">
                            Adjusted Price for Garlic Bread:{" "}
                            {order.adjustedPrice} Kr
                          </p>
                        )}
                      </div>
                      <div className="pl-8">
                        <h3 className="text-sm font-semibold mb-2">
                          Customer Details
                        </h3>
                        <p className="text-sm text-gray-700">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.customer.location}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.customer.phone}
                        </p>
                        <h3 className="text-sm font-semibold mt-4 mb-2">
                          Payment Info
                        </h3>
                        <p className="text-sm text-gray-700">
                          {order.paymentInfo}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.paymentTotal}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
