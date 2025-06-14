import React, { useState, useEffect, useMemo, useContext } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import {
  Search,
  SlidersHorizontal,
  Pizza,
  Cookie,
  Wine,
  IceCream,
  Star,
  Heart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const FoodPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Main Course");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    foodItems,
    loading, // use context’s loading
    addToCart,
    favourites,
    addToFavourites,
    removeFromFavourites,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Sync searchQuery from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  const handleAddingCart = (id) => {
    addToCart(id, 1);
  };

  const toggleFavorite = (item) => {
    const exists = favourites.some((fav) => fav._id === item._id);
    if (exists) removeFromFavourites(item._id);
    else addToFavourites(item);
  };

  const handleOnClick = (id) => {
    navigate(`/food/${id}`);
  };

  const handleSearch = () => {
    navigate(`/fooditems?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Filter by search OR category
  const filteredFoodItems = useMemo(() => {
    let items = foodItems || [];
    if (searchQuery) {
      return items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items.filter((item) => item.category === selectedCategory);
  }, [foodItems, searchQuery, selectedCategory]);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-[url('./assets/food-page-hero.jpg')] bg-cover bg-center text-gray-700 p-6 min-h-[30vh] md:min-h-[50vh] lg:min-h-screen relative">
          <div className="max-w-md mx-auto md:max-w-4xl lg:max-w-6xl md:pt-20 lg:pt-40 lg:pl-10">
            <h1 className="absolute bottom-8 left-5 text-3xl md:static md:text-5xl lg:text-6xl font-bold mb-2">
              Taste the
              <br />
              Campus Vibe
            </h1>
          </div>

          {/* Search Bar */}
          <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 px-4 md:static md:translate-y-0 md:px-0 lg:mt-8 lg:pl-10 lg:relative">
            <div className="flex items-center bg-white rounded-full shadow-lg p-3 md:p-4 max-w-md md:max-w-sm mx-auto md:mx-0 lg:min-w-1/2 lg:h-14">
              <Search className="text-gray-400 w-5 h-5 md:w-6 md:h-6 ml-2" />
              <input
                type="text"
                placeholder="Search food, restaurant, etc"
                aria-label="Search food items"
                className="flex-1 ml-2 outline-none text-gray-700 md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleSearch())
                }
              />
              <button className="p-2" onClick={handleSearch}>
                <SlidersHorizontal className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 mt-12">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Main", category: "Main Course", Icon: Pizza },
              { label: "Snacks", category: "snacks", Icon: Cookie },
              { label: "Drinks", category: "drinks", Icon: Wine },
              { label: "Dessert", category: "dessert", Icon: IceCream },
            ].map(({ label, category, Icon }) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center transition-transform ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  <div
                    className={`bg-red-100 text-red-600 rounded-2xl transition-shadow ${
                      isActive ? "p-5" : "p-4"
                    }`}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span
                    className={`text-sm md:text-base ${
                      isActive ? "font-bold" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Food Items Section */}
        <div className="px-4 mt-8 md:mt-12 lg:mt-16 pb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Food Items
          </h2>
          <div className="min-h-screen p-2">
            {filteredFoodItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFoodItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden pb-1 cursor-pointer"
                    onClick={() => handleOnClick(item._id)}
                  >
                    <div className="relative p-1.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[160px] md:h-[200px] object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3 bg-white rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-red-500 text-red-500" />
                        <span className="text-xs md:text-sm font-semibold">
                          {item.rating}
                        </span>
                      </div>

                      {/* favorite icon wrapper is now a div */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item);
                        }}
                        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-3 h-3 md:w-5 md:h-5 ${
                            favourites.some((fav) => fav._id === item._id)
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                          fill={
                            favourites.some((fav) => fav._id === item._id)
                              ? "red"
                              : "none"
                          }
                        />
                      </div>
                    </div>
                    <div className="p-1.5">
                      <h3 className="font-semibold text-sm md:text-lg truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs md:text-sm truncate">
                          {item.vendor.restaurantName}
                        </span>
                        <span className="font-semibold text-sm md:text-base">
                          ₹{item.price}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddingCart(item._id);
                        }}
                        className="mt-2 w-[85%] mx-auto flex justify-center items-center text-sm py-1 px-3 border border-red-600 text-red-600 bg-red-100 hover:bg-red-600 hover:text-white transition-colors rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No food items found for “{selectedCategory}”
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodPage;
