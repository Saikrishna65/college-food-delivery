// import React, { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { TiLocationArrow } from "react-icons/ti";
// import { assets } from "../assets/assets";

// import Button from "./Button";
// import Loading from "./Loading";

// const FeaturedSection = () => {
//   const containerRef = useRef(null);
//   const marqueeRef = useRef(null);
//   const imagesRef = useRef([]);

//   useEffect(() => {
//     const marquee = marqueeRef.current;
//     const images = imagesRef.current;

//     // Duplicate content for seamless looping
//     if (marquee && marquee.children.length > 0) {
//       marquee.innerHTML += marquee.innerHTML;
//     }

//     let currentTween = null;

//     const handleScroll = (e) => {
//       if (currentTween) currentTween.kill();

//       if (e.deltaY > 0) {
//         // Scroll down → move left
//         currentTween = gsap.to(marquee, {
//           x: "-200%",
//           duration: 10,
//           ease: "none",
//           repeat: -1,
//         });
//         gsap.to(".pizza", {
//           rotate: 0,
//           duration: -0.5,
//           transformOrigin: "center center", // pivot around center
//           ease: "none",
//         });
//       } else {
//         currentTween = gsap.to(marquee, {
//           x: "0%",
//           duration: 10,
//           ease: "none",
//           repeat: -1,
//         });
//         gsap.to(".pizza", {
//           rotate: 180,
//           duration: -0.5,
//           transformOrigin: "center center", // pivot around center
//           ease: "none",
//         });
//       }
//     };

//     window.addEventListener("wheel", handleScroll);

//     return () => {
//       window.removeEventListener("wheel", handleScroll);
//       if (currentTween) currentTween.kill();
//     };
//   }, []);

//   useGSAP(
//     () => {
//       gsap.utils.toArray(".move-top").forEach((el) => {
//         gsap.to(el, {
//           y: -150,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".hero-scroll-section",
//             start: "start center",
//             end: "center top",
//             scrub: true,
//           },
//         });
//       });

//       gsap.utils.toArray(".move-down").forEach((el) => {
//         gsap.to(el, {
//           y: 150,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".hero-scroll-section",
//             start: "start center",
//             end: "center top",
//             scrub: true,
//           },
//         });
//       });
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef}>
//       <div className="overflow-hidden py-4">
//         <div
//           className="flex items-center gap-10 whitespace-nowrap px-4 will-change-transform"
//           ref={marqueeRef}
//         >
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="flex items-center gap-10">
//               <span className="text-lg md:text-4xl font-bold pl-20 text-amber-500 font-bebas">
//                 {i % 2 === 0
//                   ? "Fuel Your Study Time"
//                   : "Skip The Line, Order Online!"}
//               </span>
//               <img
//                 src="/pizza_piece.png"
//                 alt="pizza"
//                 className="pizza h-20 w-auto object-contain transition-transform"
//                 ref={(el) => (imagesRef.current[i] = el)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Scroll-triggered section */}
//       <section className="hero-scroll-section">
//         <h2 className="text-5xl text-center my-10 font-anton text-green-600">
//           Tastes You Can’t Miss
//         </h2>
//         <div className="relative flex h-dvh w-screen flex-wrap justify-center gap-6 overflow-hidden">
//           <div className="absolute -top-90 -right-36 h-[1000px] flex flex-col gap-4 w-56 overflow-hidden rotate-[-60deg]">
//             <div
//               className="move-top flex gap-3 flex-col"
//               style={{ willChange: "transform" }}
//             >
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem11}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem12}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem13}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="absolute -top-[590px] h-[1500px] right-[300px] flex flex-col gap-4 w-56 overflow-hidden rotate-[-60deg]">
//             <div
//               className="move-down flex gap-3 flex-col"
//               style={{ willChange: "transform" }}
//             >
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem10}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem7}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem8}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem9}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem11}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="absolute -top-[695px] h-[2000px] flex flex-col gap-4 w-56 overflow-hidden rotate-[-60deg]">
//             <div
//               className="move-top flex gap-3 flex-col"
//               style={{ willChange: "transform" }}
//             >
//               <div className="w-56 h-72 bg-white"></div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem13}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem2}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem3}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem6}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem5}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem14}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="absolute -left-1 -bottom-[640px] h-[1900px] flex flex-col gap-4 w-56 overflow-hidden rotate-[-60deg]">
//             <div
//               className="move-down flex gap-3 flex-col"
//               style={{ willChange: "transform" }}
//             >
//               <div className="w-56 h-[500px] bg-white"></div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem10}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem11}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem14}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem13}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem4}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="absolute -left-10 -top-[70px] h-[1200px] flex flex-col gap-4 w-56 overflow-hidden rotate-[-60deg]">
//             <div
//               className="move-top flex gap-3 flex-col"
//               style={{ willChange: "transform" }}
//             >
//               <div className="w-56 h-40 bg-white"></div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem4}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem15}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="w-56 h-72 bg-white">
//                 <img
//                   loading="lazy"
//                   src={assets.foodItem16}
//                   alt="Dish"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FeaturedSection;

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { assets } from "../assets/assets";

import Button from "./Button";
import Loading from "./Loading";
import AnimatedText from "./AnimatedText";

const FeaturedSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const marqueeRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const images = imagesRef.current;

    // Duplicate content for seamless looping
    if (marquee && marquee.children.length > 0) {
      marquee.innerHTML += marquee.innerHTML;
    }

    let currentTween = null;

    const handleScroll = (e) => {
      if (currentTween) currentTween.kill();

      if (e.deltaY > 0) {
        // Scroll down → move left
        currentTween = gsap.to(marquee, {
          x: "-200%",
          duration: 10,
          ease: "none",
          repeat: -1,
        });
        gsap.to(".pizza", {
          rotate: 0,
          duration: -0.5,
          transformOrigin: "center center", // pivot around center
          ease: "none",
        });
      } else {
        currentTween = gsap.to(marquee, {
          x: "0%",
          duration: 10,
          ease: "none",
          repeat: -1,
        });
        gsap.to(".pizza", {
          rotate: 180,
          duration: -0.5,
          transformOrigin: "center center", // pivot around center
          ease: "none",
        });
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (currentTween) currentTween.kill();
    };
  }, []);

  useGSAP(
    () => {
      gsap.utils.toArray(".move-top").forEach((el) => {
        gsap.to(el, {
          x: -150,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-scroll-section",
            start: "start center",
            end: "center top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray(".move-down").forEach((el) => {
        gsap.to(el, {
          x: 150,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-scroll-section",
            start: "start center",
            end: "center top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="overflow-hidden py-4">
        <div
          className="flex items-center gap-10 whitespace-nowrap px-4 will-change-transform"
          ref={marqueeRef}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-lg md:text-4xl font-bold pl-20 text-amber-500 font-bebas">
                {i % 2 === 0
                  ? "Fuel Your Study Time"
                  : "Skip The Line, Order Online!"}
              </span>
              <img
                src="/pizza_piece.png"
                alt="pizza"
                className="pizza h-20 w-auto object-contain transition-transform"
                ref={(el) => (imagesRef.current[i] = el)}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="hero-scroll-section">
        {/* <h2 className="text-5xl text-center my-10 font-anton text-green-600">
          Tastes You Can’t Miss
        </h2> */}
        <div ref={textRef}>
          <AnimatedText
            text="Gallery of Delights"
            triggerRef={textRef}
            className="text-5xl md:text-7xl text-center my-10 font-bebas text-green-600"
          />
        </div>

        <div className="relative flex justify-center items-center h-dvh min-w-scree overflow-hidden">
          <div className="flex flex-col gap-3 absolute h-[500vw] md:h-[200vw] w-[250vw] rotate-[25deg]">
            <div className="h-32 md:h-36 w-[100%] bg-yellow-500"></div>
            <div className="h-32 md:h-36 w-[100%] bg-yellow-500"></div>
            <div className="h-32 md:h-36 w-[100%] bg-yellow-500"></div>
            <div className="h-32 md:h-36 w-[100%] bg-yellow-500"></div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem3}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem10}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem13}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem5}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem8}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem6}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem5}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem2}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem3}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem4}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem3}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem12}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem11}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem10}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem13}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem14}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem15}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem14}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem13}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem4}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem15}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem16}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem8}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem3}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem10}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem15}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem6}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem8}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem11}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem5}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem3}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem10}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem16}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem2}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem4}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem1}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem11}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem16}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem13}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem5}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem6}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%]">
              <div
                className="move-down flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem8}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem7}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem9}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
            <div className="h-32 md:h-36 w-[100%] bg-red-500">
              <div
                className="move-top flex gap-3"
                style={{ willChange: "transform" }}
              >
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white"></div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem12}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 w-72 bg-white">
                  <img
                    loading="lazy"
                    src={assets.foodItem15}
                    alt="Dish"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
                <div className="h-32 md:h-36 md:block hidden w-72 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSection;
