import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { assets } from "../assets/assets";
import AnimatedText from "./AnimatedText";
import ScrollTextReveal from "./ScrollTextReveal";
import {
  Search,
  SlidersHorizontal,
  Pizza,
  Cookie,
  Wine,
  Grid3X3,
  Star,
  Heart,
  IceCream,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const tabs = ["main", "snacks", "drinks", "desserts"];

gsap.registerPlugin(ScrollTrigger);

const InfoSections = () => {
  const {
    favourites,
    addToFavourites,
    removeFromFavourites,
    addToCart,
    foodItems,
  } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("Main");
  const [favorites, setFavorites] = useState(new Set());

  const filteredItems = foodItems.filter((item) => item.category === activeTab);

  const redRef = useRef(null);
  const endRef = useRef(null);
  const expandRef = useRef(null);
  const headingRef = useRef(null);
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const toggleFavorite = (item) => {
    const exists = favourites.some((fav) => fav._id === item._id);
    if (exists) removeFromFavourites(item._id);
    else addToFavourites(item);
  };

  const handleOnClick = (id) => {
    navigate(`/food/${id}`);
  };

  useEffect(() => {
    // Animate from tiny center dot ➔ huge overflowing circle
    gsap.to(expandRef.current, {
      clipPath: "circle(200% at 50% 50%)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Pin the red section so it stays fixed until you scroll past the blue block
    const pinRed = ScrollTrigger.create({
      trigger: redRef.current,
      endTrigger: endRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    // Pin the heading (so the circle expansion happens while the heading is fixed)
    const pinHeading = ScrollTrigger.create({
      trigger: headingRef.current,
      endTrigger: endRef.current,
      start: "center center",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      pinRed.kill();
      pinHeading.kill();
    };
  }, []);

  return (
    <>
      <div className="relative pb-8 pt-20 flex flex-col items-center bg-white gap-5">
        <div ref={containerRef}>
          <AnimatedText
            text="Hungry? Let’s fix that."
            triggerRef={containerRef}
            className="mt-5 text-4xl md:text-7xl text-green-500"
          />
          {/* <ScrollTextReveal
            lines={["HELLO WORLD", "SCROLL TO REVEAL"]}
            containerClass="flex flex-col justify-center items-center space-y-4"
            lineWrapperClass="overflow-hidden"
            lineClass="text-4xl font-bold text-center opacity-0"
          /> */}
        </div>

        <div>
          <p className="text-gray-500 px-4 text-center md:p-0 font-outfit">
            Why settle for boring food? Get bold, delicious meals delivered fast
            — wherever you are on campus.
          </p>
        </div>
      </div>
      <div ref={wrapperRef} className="relative h-[400vh] md:h-[550vh]">
        <div
          ref={redRef}
          className="h-screen flex items-center justify-center bg-cover bg-center relative z-10"
          style={{ backgroundImage: `url(${assets.foodShow})` }}
        ></div>

        {/* Blue section overlaps and scrolls over red */}
        <div ref={endRef} className="absolute w-full" style={{ top: "100vh" }}>
          <div className="relative h-[300vh] md:h-[450vh] text-white text-3xl">
            {/* Heading + expanding circle */}
            <div
              ref={headingRef}
              className="absolute top-0 right-0 z-20 h-dvh flex items-center justify-center w-screen text-white"
            >
              {/* Left half of the heading */}
              <h1 className="md:text-8xl text-[45px] text-end text-white w-[50%] pr-8 font-outfit">
                EXPLORE
              </h1>

              {/* Expanding white circle shape */}
              <div
                ref={expandRef}
                className="absolute inset-0 bg-gray-100 flex items-center justify-center"
                style={{
                  /* Initial tiny dot at center: 1% radius */
                  clipPath: "circle(1% at 50% 50%)",
                  WebkitClipPath: "circle(1% at 50% 50%)",
                }}
              >
                {/* Content inside the circle */}
                <h1 className="md:text-8xl text-[45px] font-bold text-end text-green-400 w-[50%] pr-8 font-outfit">
                  EXPLORE
                </h1>
                <h1 className="md:text-8xl text-[45px] font-bold text-start text-green-400 w-[50%] pl-8 font-outfit">
                  TASTES
                </h1>
              </div>

              {/* Right half of the heading (visible above the expanding circle) */}
              <h1 className="md:text-8xl text-[45px] text-start text-white w-[50%] pl-8 font-outfit">
                TASTES
              </h1>
            </div>

            {/* Floating colored boxes for visual context */}
            <div
              className="absolute top-[600px] left-5 md:top-[500px] md:left-30 z-20 h-40 w-28 md:h-72 md:w-60 bg-cover bg-center"
              style={{ backgroundImage: `url(${assets.foodShow1})` }}
            ></div>
            <div
              className="absolute top-[750px] right-5 md:top-[700px] md:right-30 z-20 h-48 w-36 md:h-96 md:w-72 bg-cover bg-center"
              style={{ backgroundImage: `url(${assets.foodShow2})` }}
            ></div>
            <div
              className="absolute top-[930px] left-5 md:top-[1000px] md:left-90 z-20 h-36 w-32 md:h-80 md:w-60 bg-cover bg-center"
              style={{ backgroundImage: `url(${assets.foodShow3})` }}
            ></div>
            <div
              className="absolute top-[1050px] right-24 md:top-[1500px] md:right-[500px] z-20 h-30 w-24 md:h-80 md:w-60 bg-cover bg-center"
              style={{ backgroundImage: `url(${assets.foodShow4})` }}
            ></div>
            <div className="absolute bottom-0 z-20 md:h-[500px] h-[600px] w-screen">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Main", category: "main", Icon: Pizza },
                  { label: "Snacks", category: "snacks", Icon: Cookie },
                  { label: "Drinks", category: "drinks", Icon: Wine },
                  { label: "Desserts", category: "dessert", Icon: IceCream },
                ].map(({ label, category, Icon }) => {
                  const isActive = filteredItems === category;
                  const padding = isActive ? "p-5" : "p-4";
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveTab(category)}
                      className={`flex flex-col items-center group transition-transform cursor-pointer ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                    >
                      <div
                        className={`bg-red-100 text-red-600 ${padding} rounded-2xl mb-1 group-hover:shadow-md transition-shadow`}
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

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10"> */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-16 px-5 bg-gray-100">
                {filteredItems.slice(0, 4).map((item) => (
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
                          addToCart(item._id, 1);
                        }}
                        className="mt-2 w-[85%] mx-auto flex justify-center items-center text-sm py-1 px-3 border border-red-600 text-red-600 bg-red-100 hover:bg-red-600 hover:text-white transition-colors rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSections;
