// // RevealOnScroll.jsx

// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const Sample = () => {
//   const headingRef = useRef(null);
//   const revealRef = useRef(null);
//   const endRef = useRef(null);

//   useEffect(() => {
//     const text = ScrollTrigger.create({
//       trigger: headingRef.current,
//       //   endTrigger: endRef.current,
//       start: "center center",
//       // end: "+=150%",
//       end: "bottom top",
//       pin: true,
//       pinSpacing: false,
//     });

//     gsap.to(revealRef.current, {
//       clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)",
//       ease: "none",
//       scrollTrigger: {
//         trigger: headingRef.current,
//         start: "top top", // When the top of the container reaches the top of the viewport
//         end: "bottom top", // When the bottom of the container reaches the top of the viewport
//         scrub: true, // Link animation progress to scrollbar
//       },
//     });
//     return () => {
//       text.kill();
//     };
//   }, []);
//   return (
//     <div>
//       <div className="h-dvh w-screen bg-black"></div>
//       <div ref={headingRef} className="relative h-screen">
//         <div
//           ref={revealRef}
//           className="absolute inset-0 bg-blue-600 flex items-center justify-center"
//           style={{
//             clipPath: "polygon(49.5% 50%, 50% 49.5%, 50.5% 50%, 50% 50.5%)",
//             WebkitClipPath:
//               "polygon(49.5% 50%, 50% 49.5%, 50.5% 50%, 50% 50.5%)",
//           }}
//         >
//           <div className="text-white text-4xl font-semibold">
//             🔷 Revealed Content 🔷
//           </div>
//         </div>
//       </div>

//       <div className="h-dvh bg-black"></div>
//     </div>
//   );
// };

// export default Sample;

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

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InfoSections = () => {
  const redRef = useRef(null);
  const endRef = useRef(null);
  const firstRef = useRef(null);
  const expandRef = useRef(null);
  const headingRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const elem = expandRef.current;

    gsap.to(elem, {
      scale: 100,
      ease: "none",
      scrollTrigger: {
        trigger: elem,
        endTrigger: firstRef.current,
        start: "center center", // when box's center aligns with viewport center
        end: "bottom center", // when box's bottom aligns with viewport center
        scrub: true, // tie tween to scroll progress
        // markers: true,          // uncomment to debug start/end
      },
    });

    // Pin the red section at top for 100vh scroll
    const st = ScrollTrigger.create({
      trigger: redRef.current,
      endTrigger: endRef.current,
      start: "top top",
      // end: "+=150%",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    const text = ScrollTrigger.create({
      trigger: headingRef.current,
      endTrigger: endRef.current,
      start: "center center",
      // end: "+=150%",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      st.kill();
      text.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[300vh] md:h-[450vh] overflow-hidden"
    >
      {/* Red section pinned */}
      <div
        ref={redRef}
        className="h-screen bg-red-500 flex items-center justify-center text-white text-3xl relative z-10"
      >
        Red section (pinned)
      </div>

      {/* Blue section overlaps and scrolls over red */}
      <div ref={endRef} className="absolute w-full" style={{ top: "100vh" }}>
        <div className="relative h-[200vh] md:h-[350vh] bg-blue-500 text-white text-3xl">
          <div
            ref={headingRef}
            className="absolute z-20 h-20 flex items-center justify-center md:h-[20vh] w-screen bg-black text-white"
          >
            <h1 className="md:text-9xl text-5xl text-end w-[45%]">Hello</h1>
            <div
              ref={expandRef}
              className="h-5 w-5 bg-white text-black mx-10 [clip-path:polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)]"
            ></div>

            <h1 className="md:text-9xl text-5xl text-start w-[45%] ">
              {" "}
              World!
            </h1>
          </div>

          <div
            ref={firstRef}
            className="absolute top-26 left-5 md:top-30 md:left-30 z-20 h-40 w-28 md:h-72 md:w-60 bg-yellow-500"
          ></div>

          <div className="absolute top-64 right-5 md:top-70 md:right-30 z-20 h-48 w-36 md:h-96 md:w-72 bg-green-500"></div>

          <div className="absolute top-[430px] left-5 md:top-[600px] md:left-90 z-20 h-36 w-32 md:h-80 md:w-60 bg-blue-500"></div>

          <div className="absolute top-[550px] right-24 md:top-[1100px] md:right-[500px] z-20 h-30 w-24 md:h-80 md:w-60 bg-green-500"></div>
          <div className="absolute bottom-0 z-20 md:h-dvh h-[600px] w-screen bg-green-500"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
