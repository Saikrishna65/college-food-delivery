import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { assets } from "../assets/assets";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div>
      <div className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75">
        <div
          id="video-frame"
          className="absolute left-0 right-0 size-full overflow-hidden"
        >
          <video
            src="/food_hero_video.mp4"
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
            className="size-full object-cover object-center"
          />

          <h1 className="absolute bottom-8 right-5 text-4xl md:text-6xl text-white font-anton">
            ORDER NOW
          </h1>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl mb-2 drop-shadow-lg font-anton">
            Satisfy That Craving
          </h1>
          <p className="text-md md:text-3xl mb-4 font-spartan">
            Cravings don’t wait. Neither should you.
          </p>

          <div>
            <Button
              id="browse-menu"
              title="Browse Menu"
              leftIcon={<TiLocationArrow />}
              containerClass="flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="absolute bottom-8 right-5 text-4xl md:text-6xl text-green-600 font-anton">
        ORDER NOW
      </h1>
    </div>
  );
};

export default HeroSection;
