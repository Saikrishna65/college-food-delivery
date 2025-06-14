import React, { useContext } from "react";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { cartItems } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  const { cart, updateCartItemQuantity, removeCartItem } =
    useContext(AppContext);

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);

  const deliveryCharge = 10;
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="p-4 flex items-center gap-4">
          <ShoppingCart className="w-8 h-8 text-[#e86417]" />
          <h1 className="text-xl font-semibold text-[#111827]">Your Cart</h1>
        </div>
        <span className="p-4 text-sm text-[#6b7280]">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-12 lg:block lg:relative">
        {/* Cart Items */}
        <div className="border-t border-[#f3f4f6] lg:mr-[340px]">
          {cart.map((item) => (
            <div
              key={item.foodItem._id}
              className="py-8 border-t border-b border-[#a8acb5]"
            >
              {/* Layout for screens 410px and above */}
              <div className="hidden min-[410px]:flex flex-row gap-6 items-center">
                <img
                  src={item.foodItem.image}
                  alt={item.foodItem.name}
                  className="w-24 h-24 ml-4 object-cover rounded-lg bg-[#f9fafb]"
                />
                <div className="flex flex-col justify-center ml-4">
                  <h3 className="text-lg font-semibold text-[#111827]">
                    {item.foodItem.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#6b7280]">
                    Unit price: ₹{item.foodItem.price}
                  </p>
                  <div className="flex items-center gap-6 mt-4">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(
                          item.quantity - 1,
                          item.foodItem._id
                        )
                      }
                      className="p-2 border border-[#e5e7eb] rounded transition-colors duration-200 hover:bg-[#f3f4f6]"
                    >
                      <Minus className="w-4 h-4 text-[#111827]" />
                    </button>
                    <span className="text-base">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(
                          item.quantity + 1,
                          item.foodItem._id
                        )
                      }
                      className="p-2 border border-[#e5e7eb] rounded transition-colors duration-200 hover:bg-[#f3f4f6]"
                    >
                      <Plus className="w-4 h-4 text-[#111827]" />
                    </button>
                    <button
                      onClick={() => removeCartItem(item.foodItem._id)}
                      className="text-[#9ca3af] transition-colors duration-200 hover:text-[#ef4444]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-end items-center pr-4 font-semibold text-lg text-[#111827]">
                  ₹{item.total}
                </div>
              </div>

              {/* Layout for screens less than 410px */}
              <div className="flex flex-col min-[410px]:hidden">
                <div className="flex flex-row gap-6 items-center">
                  <img
                    src={item.foodItem.image}
                    alt={item.foodItem.name}
                    className="w-24 h-24 ml-4 object-cover rounded-lg bg-[#f9fafb]"
                  />
                  <div className="flex flex-col justify-center ml-4">
                    <h3 className="text-lg font-semibold text-[#111827]">
                      {item.foodItem.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#6b7280]">
                      Unit price: ₹{item.foodItem.price}
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.quantity - 1,
                            item.foodItem._id
                          )
                        }
                        className="p-2 border border-[#e5e7eb] rounded transition-colors duration-200 hover:bg-[#f3f4f6]"
                      >
                        <Minus className="w-4 h-4 text-[#111827]" />
                      </button>
                      <span className="text-base">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartItemQuantity(
                            item.quantity + 1,
                            item.foodItem._id
                          )
                        }
                        className="p-2 border border-[#e5e7eb] rounded transition-colors duration-200 hover:bg-[#f3f4f6]"
                      >
                        <Plus className="w-4 h-4 text-[#111827]" />
                      </button>
                      <button
                        onClick={() => removeCartItem(item.foodItem._id)}
                        className="text-[#9ca3af] transition-colors duration-200 hover:text-[#ef4444]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center mt-4 font-semibold text-lg text-[#111827]">
                  ₹{item.total}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#f9fafb] p-8 rounded-[1rem] lg:fixed lg:top-[60%] lg:right-8 lg:w-[300px] lg:transform lg:-translate-y-[60%]">
          <h2 className="text-xl font-semibold text-[#111827]">Summary</h2>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-[#e5e7eb] pt-4 font-semibold text-2xl text-[#111827]">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full mt-8 bg-[#111827] text-white p-4 rounded-[0.75rem] font-medium transition-colors duration-200 hover:bg-[#374151]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
