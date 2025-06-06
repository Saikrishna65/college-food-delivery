import React, { useState } from "react";
import { restaurentsData } from "../assets/assets.js";
import Navbar from "../components/Navbar.jsx";
import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter restaurants based on the search query.
  const filteredRestaurants = restaurentsData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to the selected restaurant's page.
  const handleOnClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[url('./assets/restaurent-page-hero.jpg')] bg-cover bg-center text-gray-700 p-6 mt-10 min-h-[30vh] md:min-h-[50vh] lg:min-h-screen relative flex items-center justify-center">
        <div className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              From Kitchen <br /> to Table
            </h1>
            {/* Search Bar */}
            <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 px-4 md:static md:translate-y-0 md:px-0 lg:relative lg:mt-4">
              <div className="flex items-center bg-white rounded-full shadow-lg p-3 md:p-4 max-w-md md:max-w-sm mx-auto lg:min-w-[500px] lg:h-14">
                <Search className="text-gray-400 w-5 h-5 md:w-6 md:h-6 ml-2" />
                <input
                  type="text"
                  placeholder="Search food, restaurant, etc"
                  className="flex-1 ml-2 outline-none text-gray-700 md:text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="p-2">
                  <SlidersHorizontal className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Section */}
      <div className="max-w-screen-xl mx-auto p-4 mt-16">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Restaurants with Online Food Delivery
          </h1>
        </div>

        <div className="min-h-screen p-2">
          <div className="mx-auto">
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                {filteredRestaurants.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                    onClick={() => handleOnClick(item.id)}
                  >
                    <div className="relative p-1.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[120px] sm:h-[160px] md:h-[200px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-1.5 pt-0">
                      <h3 className="font-semibold text-sm md:text-lg truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs md:text-sm truncate">
                          {item.address}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                No restaurants found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
