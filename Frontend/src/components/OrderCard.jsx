import React, { useState } from "react";
import { ChevronsUp, ShoppingBag, ChevronsDown } from "lucide-react";
import StarRating from "./StarRating";

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReorder = (orderId) => {
    console.log(`Reordering order ${orderId}`);
  };

  return (
    <div
      key={order.id}
      className="bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col"
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        <div>
          <div className="flex">
            <div className="flex flex-col lg:flex-row p-4 w-[65%] lg:w-[75%] lg:justify-between gap-[0.3rem] lg:gap-[0.7rem]">
              {/* <div className="flex-1">
                <h3 className="restaurant-name">{order.restaurantName}</h3>
              </div> */}
              <div className="flex-1">
                <p className="text-sm">
                  Ordered on {new Date(order.orderedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-1">
                {order.orderType === "delivery" ? (
                  <p className="order-status text-sm">
                    Status:{" "}
                    <span
                      className={
                        order.orderStatus === "delivered"
                          ? "text-[#16a34a]"
                          : "text-[#ffb200]"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                ) : (
                  <p className="order-status text-sm">
                    Type:
                    <span className="text-[#145ede]">
                      {order.orderType === "dineIn" ? " DineIn" : " TakeAway"}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex-1">
                {order.orderType === "Delivery" ? (
                  <p className="text-sm">
                    Delivered at{" "}
                    {order.deliveredTime
                      ? new Date(order.deliveredTime).toLocaleTimeString()
                      : "N/A"}
                  </p>
                ) : (
                  <p className="text-sm">
                    At{" "}
                    {order.dineInTime
                      ? new Date(order.dineInTime).toLocaleTimeString()
                      : "N/A"}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <p className="total-items text-sm whitespace-nowrap">
                  Items: {order.items.length}
                </p>
              </div>
            </div>
            <div className="w-[40%] flex flex-col items-center justify-center gap-[0.3rem] lg:w-[25%] lg:pt-[0.5rem] lg:pr-[0.5rem] lg:flex-row lg:gap-[0.5rem]">
              <div className="w-full text-center flex flex-col">
                <span className="text-lg font-semibold pt-[0.4rem] text-[#111827] whitespace-nowrap">
                  Total: ₹{order.totalAmount}
                </span>
                <span
                  className={`p-[0.3rem] pt-0 ${
                    order.paymentStatus?.toLowerCase() === "paid"
                      ? "text-[#145ede]"
                      : "text-red-600"
                  }`}
                >
                  {order.payment}
                </span>
              </div>
              <div className="flex w-full justify-center">
                <button
                  onClick={() => handleReorder(order.id)}
                  className="bg-[#16a34a] text-white p-[0.5rem] rounded-[0.5rem] inline-flex items-center gap-[0.5rem] cursor-pointer transition-colors duration-300"
                >
                  <ShoppingBag size={20} />
                  Reorder
                </button>
              </div>
            </div>
          </div>
          <div
            onClick={() => setExpanded(!expanded)}
            className="flex justify-center items-center pb-[0.5rem] cursor-pointer"
          >
            {expanded ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
          </div>
        </div>

        {expanded && (
          <div className="grid grid-flow-row max-[690px]:grid-cols-1 grid-cols-2 min-[1165px]:grid-cols-3 justify-items-center">
            {order.items.map((item, id) => (
              <div key={id}>
                <div className={`flex p-4 ${item.rating !== 0 ? "pb-0" : ""}`}>
                  <div className="w-[5.5rem] h-[5.5rem]">
                    <img
                      src={item.foodItem.image}
                      alt={item.foodItem.name}
                      className="w-full h-full rounded-[7px]"
                    />
                  </div>
                  <div className="flex flex-col gap-[0.3rem] pl-4">
                    <div className="flex gap-[0.5rem]">
                      <h4 className="order-food-name">{item.foodItem.name}</h4>
                      <p className="order-item-quantity">x{item.quantity}</p>
                    </div>
                    <div>
                      <p className="order-item-price whitespace-nowrap">
                        single piece: ₹{item.foodItem.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-[2rem]">
                      <div className="flex flex-col gap-[0.3rem]">
                        {/* <p className="order-onions whitespace-nowrap">
                          Onions: {item.onions}
                        </p> */}
                        <p className="order-item-total-price whitespace-nowrap">
                          Total: ₹{item.foodItem.price * item.quantity}
                        </p>
                      </div>
                      <div>
                        <div className="w-full">
                          <button
                            onClick={() => handleReorder(item.id)}
                            className="bg-[#16a34a] text-white p-[0.5rem] mb-2 rounded-[0.5rem] inline-flex items-center gap-[0.5rem] cursor-pointer transition-colors duration-300"
                          >
                            <ShoppingBag size={20} />
                            Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {order.orderStatus === "Delivered" && item.rating === 0 && (
                  <div>
                    <StarRating />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
