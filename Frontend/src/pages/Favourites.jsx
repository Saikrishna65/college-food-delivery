import React, { useContext } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Favourites = () => {
  const { favourites, removeFromFavourites } = useContext(AppContext);

  return (
    <div className="p-6 text-center">
      {favourites.length === 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-4">No Favourites Yet</h1>
          <p className="text-gray-500">Add some items to your favourites!</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Your Favourites</h1>
          <div
            className="grid gap-4 w-[90%] mx-auto"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {favourites.map((food) => (
              <div
                key={food._id}
                className="border border-[#ddd] rounded-[10px] shadow-[2px_2px_10px_rgba(0,0,0,0.1)] p-2 text-center bg-[#f8f9fa] transition-transform duration-300 ease-in-out hover:scale-105 h-auto"
              >
                <div className="relative w-full h-[180px]">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                  <button
                    onClick={() => removeFromFavourites(food._id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer transition-colors duration-200"
                  >
                    <Heart className="w-5 h-5 fill-[#ef4444] stroke-[#ef4444]" />
                  </button>
                </div>
                <h2 className="text-[20px] font-semibold mt-[6px]">
                  {food.name}
                </h2>
                <p className="text-[#4b5563] pt-[3px]">{food.restaurant}</p>
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
        </>
      )}
    </div>
  );
};

export default Favourites;
