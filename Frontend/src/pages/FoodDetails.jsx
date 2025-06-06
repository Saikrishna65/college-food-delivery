import React, { useEffect, useState } from "react";
import { foodData } from "../assets/assets";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Heart, ArrowLeft } from "lucide-react";

const FoodDetails = () => {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    if (foodData && id) {
      const AboutItem = foodData.find(
        (item) => item.id === (typeof item.id === "number" ? +id : id)
      );
      setTimeout(() => setFoodItem(AboutItem), 1000);
    }
  }, [id]);

  if (!foodItem) {
    return <Loading />;
  }

  // New CartButton component with grouped quantity controls.
  const CartButton = () => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
      setQuantity((prev) => Math.max(prev - 1, 1));
    };

    const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
    };

    return (
      <div className="flex items-center space-x-4 justify-center">
        {/* Grouped quantity control */}
        <div className="inline-flex bg-gray-300">
          <button
            onClick={handleDecrement}
            className="px-3 py-2 border border-gray-300 rounded-l hover:bg-gray-100 focus:outline-none cursor-pointer"
          >
            -
          </button>
          <div className="px-4 py-2 border-t border-b border-gray-300 bg-gray-300 select-none">
            {quantity}
          </div>
          <button
            onClick={handleIncrement}
            className="px-3 py-2 border border-gray-300 rounded-r hover:bg-gray-100 focus:outline-none cursor-pointer"
          >
            +
          </button>
        </div>
        {/* "Add To Cart" button */}
        <button
          onClick={() => alert(`Added ${quantity} item(s) to cart!`)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 focus:outline-none cursor-pointer"
        >
          Add To Cart <span className="ml-1">₹{foodItem.price * quantity}</span>
        </button>
      </div>
    );
  };

  return (
    // On small screens, add top padding equal to the image height.
    <div className="bg-white relative pt-[45vh] lg:pt-0 lg:p-10 lg:overflow-hidden min-h-screen">
      {/* Wrapper: on small screens, stack the image and content; on large screens, use flex layout */}
      <div className="block lg:flex lg:h-[100vh] lg:justify-center lg:pt-10 lg:fixed lg:mx-20">
        {/* IMAGE SECTION */}
        <div
          className="fixed top-0 left-0 w-full h-[45vh] bg-cover bg-center lg:relative lg:w-1/2 lg:h-[85vh] lg:rounded-3xl"
          style={{ backgroundImage: `url(${foodItem.image})` }}
        >
          {/* Back and Favorite Buttons */}
          <div className="flex relative">
            {/* Back Button */}
            <div
              onClick={() => window.history.back()}
              className="flex items-center text-white p-4 text-lg absolute top-0 left-0 cursor-pointer lg:static"
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Back
            </div>
            {/* Favorite Button */}
            <div className="text-white p-4 flex absolute right-1">
              <button
                onClick={() => toggleFavorite(foodItem.id)}
                className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(foodItem.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="relative z-10 bg-white -mt-7 rounded-t-4xl p-4 lg:rounded-none lg:w-1/2 lg:mt-0">
          <div className="pr-2">
            {/* Title & Price */}
            <div className="flex relative">
              <div>
                <h1 className="pl-1.5 text-gray-500">{foodItem.restaurant}</h1>
                <h1 className="text-2xl font-bold pl-1.5 max-w-full lg:max-w-none">
                  {foodItem.name}
                </h1>
              </div>
              <div className="absolute right-6 top-6">
                <p className="text-2xl">₹{foodItem.price}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-5 p-1.5 flex-wrap">
              {foodItem.tags.map((tag) => (
                <div key={tag} className="bg-gray-200 p-1.5 pr-2.5 rounded-lg">
                  {tag}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-1.5">
              <div className="text-xl pb-1">Description</div>
              <div className="text-gray-500">{foodItem.description}</div>
            </div>

            {/* Reviews & Rating */}
            <div className="flex gap-9 justify-center bg-gray-200 rounded-lg mx-1.5 p-2.5 my-4">
              <div className="text-gray-800 text-lg">
                🗨️{" "}
                <span className="text-black font-semibold">
                  {foodItem.reviews}
                </span>{" "}
                Reviews
              </div>
              <div className="h-7 border-r border-gray-800"></div>
              <div className="text-gray-800">
                ✩{" "}
                <span className="text-black font-semibold text-lg">
                  {foodItem.rating}
                </span>{" "}
                Rating
              </div>
            </div>

            {/* Address */}
            <div className="p-1.5 pb-10">
              <div className="text-xl">Address</div>
              <div className="text-gray-500">{foodItem.restaurantAddress}</div>
            </div>

            {/* "Add To Cart" Button for Large Screens (inline within content) */}
            <div className="hidden lg:block">
              <CartButton />
            </div>
          </div>
        </div>
      </div>

      {/* "Add To Cart" Button for Small Screens (fixed at bottom) */}
      <div className="block lg:hidden fixed bottom-1 w-[80vw] left-1/2 transform -translate-x-1/2 z-50">
        <CartButton />
      </div>
    </div>
  );
};

export default FoodDetails;
