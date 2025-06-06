import React from "react";
import { ShoppingBag, Heart } from "lucide-react";

const foodItems = [
  {
    id: 1,
    foodName: "Margherita Pizza",
    isFavorite: "true",
    restaurantName: "Italian Delights",
    orderDate: "2024-03-15T18:30:00",
    orderStatus: "Processing",
    deliveredTime: "2024-03-15T18:45:00",
    price: "₹1,330",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    foodName: "Chicken Burger",
    isFavorite: "true",
    restaurantName: "Burger House",
    orderDate: "2024-03-14T12:00:00",
    orderStatus: "Delivered",
    deliveredTime: "2024-03-14T12:30:00",
    price: "₹1,080",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    foodName: "Sushi Roll Set",
    isFavorite: "true",
    restaurantName: "Sushi Master",
    orderDate: "2024-03-13T19:15:00",
    orderStatus: "Processing",
    deliveredTime: null,
    price: "₹2,080",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    foodName: "Caesar Salad",
    isFavorite: "true",
    restaurantName: "Healthy Bites",
    orderDate: "2024-03-15T19:00:00",
    orderStatus: "Delivered",
    deliveredTime: "2024-03-15T19:15:00",
    price: "₹920",
    image:
      "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    foodName: "Spaghetti Carbonara",
    isFavorite: "true",
    restaurantName: "Pasta Palace",
    orderDate: "2024-03-15T17:00:00",
    orderStatus: "Delivered",
    deliveredTime: "2024-03-15T17:30:00",
    price: "₹1,250",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    foodName: "Beef Steak",
    isFavorite: "true",
    restaurantName: "Grill House",
    orderDate: "2024-03-14T20:00:00",
    orderStatus: "Processing",
    deliveredTime: null,
    price: "₹2,500",
    image:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    foodName: "Biryani",
    isFavorite: "true",
    restaurantName: "Spice House",
    orderDate: "2024-03-16T13:30:00",
    orderStatus: "Processing",
    deliveredTime: null,
    price: "₹1,160",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Favourites = () => {
  const toggleFavorite = (id) => {
    console.log(id);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Your Favourites</h1>
      <div
        className="grid gap-4 w-[90%] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="border border-[#ddd] rounded-[10px] shadow-[2px_2px_10px_rgba(0,0,0,0.1)] p-2 text-center bg-[#f8f9fa] transition-transform duration-300 ease-in-out hover:scale-105 h-auto"
          >
            {/* Fixed image container height to preserve image size */}
            <div className="relative w-full h-[180px]">
              <img
                src={food.image}
                alt={food.foodName}
                className="w-full h-full object-cover rounded-[10px]"
              />
              <button
                onClick={() => toggleFavorite(food.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer transition-colors duration-200"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-200 ease-in-out ${
                    food.isFavorite === "true"
                      ? "fill-[#ef4444] stroke-[#ef4444]"
                      : "fill-transparent stroke-[#374151]"
                  }`}
                />
              </button>
            </div>
            <h2 className="text-[20px] font-semibold mt-[6px]">
              {food.foodName}
            </h2>
            <p className="text-[#4b5563] pt-[3px]">{food.restaurantName}</p>
            <p className="text-lg font-semibold text-[#111827] pt-[3px]">
              {food.price}
            </p>
            <button className="w-full p-[5px] flex items-center justify-center bg-[#77b254] gap-[5px] mt-[3px] border-0 rounded-[20px] hover:bg-[#5b913b]">
              <ShoppingBag size={20} />
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
