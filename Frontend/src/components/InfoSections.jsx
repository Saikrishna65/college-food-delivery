// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react"; // Corrected import path
// import { ScrollTrigger } from "gsap/all";
// import { assets } from "../assets/assets";
// import Button from "./Button";
// import AnimatedText from "./AnimatedText";

// gsap.registerPlugin(ScrollTrigger);

// const InfoSections = () => {
//   const containerRef = useRef(null);

//   // Animate H2 words on scroll
//   // useEffect(() => {
//   //   const ctx = gsap.context(() => {
//   //     const titleAnimation = gsap.timeline({
//   //       scrollTrigger: {
//   //         trigger: containerRef.current,
//   //         start: "100 bottom",
//   //         end: "center bottom",
//   //         toggleActions: "play none none reverse",
//   //       },
//   //     });

//   //     titleAnimation.to(
//   //       ".animated-word",
//   //       {
//   //         opacity: 1,
//   //         transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
//   //         ease: "power2.inOut",
//   //         stagger: 0.05,
//   //       },
//   //       0
//   //     );
//   //   }, containerRef);

//   //   return () => ctx.revert();
//   // }, []);

//   // Video clip animation
//   useGSAP(() => {
//     const clipAnimation = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#clip",
//         start: "center center",
//         end: "+=800 center",
//         scrub: 0.5,
//         pin: true,
//         pinSpacing: true,
//       },
//     });

//     clipAnimation.to(".mask-clip-path", {
//       width: "100vw",
//       height: "100vh",
//       borderRadius: 0,
//     });
//   });

//   // const titleText = "Hungry? Let’s fix that.";
//   // const words = titleText.split(" ").map((word, i) => (
//   //   <span
//   //     key={i}
//   //     className="animated-word inline-block opacity-0 transform translate-y-10 rotateX(15deg)"
//   //     style={{ marginRight: "0.25ch" }}
//   //   >
//   //     {word}
//   //   </span>
//   // ));

//   return (
//     <div id="about" className="min-h-screen w-screen" ref={containerRef}>
//       <div className="relative mb-8 mt-20 flex flex-col items-center gap-5">
//         {/* <h2 className="mt-5 text-7xl text-center font-bold font-bebas text-green-500">
//           {words}
//         </h2> */}
//         <AnimatedText
//           text="Hungry? Let’s fix that."
//           triggerRef={containerRef}
//           className="mt-5 text-7xl text-green-500"
//         />

//         <div>
//           <p className="text-gray-500">
//             Why settle for boring food? Get bold, delicious meals delivered fast
//             — wherever you are on campus.
//           </p>
//         </div>
//         <div className="absolute bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center font-circular-web text-lg md:max-w-[34rem]">
//           <Button
//             id="browse-menu"
//             title="Order Now"
//             // leftIcon={<TiLocationArrow />}
//             containerClass="flex-center gap-1"
//           />
//         </div>
//       </div>

//       <div className="h-dvh w-screen" id="clip">
//         <div className="mask-clip-path absolute left-1/2 top-0 z-20 h-[60vh] w-screen origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw] [clip-path: polygon(20% 0%, 80% 10%, 95% 95%, 27% 90%)]">
//           <video
//             src={assets.burgerVideo}
//             muted
//             autoPlay
//             loop
//             className="absolute left-0 top-0 size-full object-cover"
//           ></video>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfoSections;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { assets } from "../assets/assets";
import AnimatedText from "./AnimatedText";
import ScrollTextReveal from "./ScrollTextReveal";

const menuData = [
  {
    id: 1,
    category: "Sides",
    title: "Chicken wings",
    price: "$17.00 USD",
    imgSrc: "/images/chicken-wings.jpg",
  },
  {
    id: 2,
    category: "Sides",
    title: "Chicken nuggets",
    price: "$16.00 USD",
    imgSrc: "/images/chicken-nuggets.jpg",
  },
  {
    id: 3,
    category: "Sides",
    title: "French fries",
    price: "$12.00 USD",
    imgSrc: "/images/french-fries.jpg",
  },
  {
    id: 4,
    category: "Sides",
    title: "Mozzarella sticks",
    price: "$15.00 USD",
    imgSrc: "/images/mozzarella-sticks.jpg",
  },
  {
    id: 5,
    category: "Sides",
    title: "Onion rings",
    price: "$16.00 USD",
    imgSrc: "/images/onion-rings.jpg",
  },
  {
    id: 6,
    category: "Sides",
    title: "Tuna salad",
    price: "$18.00 USD",
    imgSrc: "/images/tuna-salad.jpg",
  },
  {
    id: 7,
    category: "Main",
    title: "Grilled Steak",
    price: "$25.00 USD",
    imgSrc: "/images/steak.jpg",
  },
  {
    id: 8,
    category: "Drinks",
    title: "Lemonade",
    price: "$5.00 USD",
    imgSrc: "/images/lemonade.jpg",
  },
  {
    id: 9,
    category: "Desserts",
    title: "Cheesecake",
    price: "$7.00 USD",
    imgSrc: "/images/cheesecake.jpg",
  },
];

const tabs = ["Sides", "Main", "Drinks", "Desserts"];

gsap.registerPlugin(ScrollTrigger);

const InfoSections = () => {
  const [activeTab, setActiveTab] = useState("Sides");

  const filteredItems = menuData.filter((item) => item.category === activeTab);

  const redRef = useRef(null);
  const endRef = useRef(null);
  const expandRef = useRef(null);
  const headingRef = useRef(null);
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

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
              <h1 className="md:text-8xl text-5xl text-end text-white w-[50%] pr-8 font-outfit">
                EXPLORE
              </h1>

              {/* Expanding white circle shape */}
              <div
                ref={expandRef}
                className="absolute inset-0 bg-[#FFFAF0] flex items-center justify-center"
                style={{
                  /* Initial tiny dot at center: 1% radius */
                  clipPath: "circle(1% at 50% 50%)",
                  WebkitClipPath: "circle(1% at 50% 50%)",
                }}
              >
                {/* Content inside the circle */}
                <h1 className="md:text-8xl text-5xl font-bold text-end text-green-400 w-[50%] pr-8 font-outfit">
                  EXPLORE
                </h1>
                <h1 className="md:text-8xl text-5xl font-bold text-start text-green-400 w-[50%] pl-8 font-outfit">
                  TASTES
                </h1>
              </div>

              {/* Right half of the heading (visible above the expanding circle) */}
              <h1 className="md:text-8xl text-5xl text-start text-white w-[50%] pl-8 font-outfit">
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
            <div className="absolute bottom-0 z-20 md:h-[500px] h-[600px] w-screen bg-green-500">
              <div className="flex justify-center space-x-6">
                {tabs.map((tab) => {
                  const isActive = tab === activeTab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={
                        `px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 ` +
                        (isActive
                          ? "bg-white text-black"
                          : "border border-white text-white bg-transparent hover:bg-white hover:text-black")
                      }
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10"> */}
              <div className="flex items-center justify-center gap-6 mt-10">
                {filteredItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className=" rounded-2xl shadow-md h-80 w-60 flex flex-col items-center bg-red-500"
                  >
                    <div className="w-full h-[60%] bg-red-500 rounded-t-2xl">
                      {/* <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-full h-full bg-red-500 object-cover rounded-t-2xl"
                    /> */}
                    </div>

                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500 text-center">
                      {item.desc}
                    </p>
                    <div className="flex justify-between items-center w-full mt-4 px-2">
                      <span className="font-semibold text-black">
                        ${item.price}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full ${
                          item.favorite ? "bg-yellow-400" : "bg-gray-400"
                        }`}
                      ></span>
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
