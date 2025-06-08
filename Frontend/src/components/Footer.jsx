import React, { useEffect } from "react";
import gsap from "gsap";

const Footer = () => {
  const initialPath = "M 10 25 Q 650 25 1270 25";
  const finalPath = initialPath;

  useEffect(() => {
    // Select all string containers
    const containers = document.querySelectorAll("#string");

    containers.forEach((container) => {
      const pathEl = container.querySelector("svg path");
      if (!pathEl) return;

      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newD = `M 10 25 Q ${x} ${y} 1270 25`;

        gsap.to(pathEl, {
          attr: { d: newD },
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(pathEl, {
          attr: { d: finalPath },
          duration: 1.5,
          ease: "elastic.out(1, 0.2)",
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Store handlers for cleanup
      container._gsapMove = handleMouseMove;
      container._gsapLeave = handleMouseLeave;
    });

    return () => {
      containers.forEach((container) => {
        if (container._gsapMove)
          container.removeEventListener("mousemove", container._gsapMove);
        if (container._gsapLeave)
          container.removeEventListener("mouseleave", container._gsapLeave);
      });
    };
  }, []);

  return (
    <footer className="w-full h-dvh bg-red-600 text-white fixed bottom-0 left-0 z-0">
      <div className="flex items-center px-8 pt-5 ">
        <div className="text-[33px] md:text-4xl font-bungee font-bold">
          CampusCravings
        </div>
        <div id="string" className="ml-4">
          <svg width="1300" height="50">
            <path d={initialPath} stroke="white" fill="transparent" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row px-8 mt-5 gap-16">
        <div className="flex-1">
          <h3 className="font-bold text-3xl mb-4">About Us ↗</h3>
          <ul className="space-y-2">
            {[
              "Media Center",
              "Our Foundation",
              "Investors",
              "Policies",
              "Careers",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-3xl mb-4">Need Help ↗</h3>
          <ul className="space-y-2">
            {["FAQ", "Contact Us", "International"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-8 mt-12">
        <div className="flex space-x-6 text-xl">
          {["Twitter", "Facebook", "YouTube", "Instagram", "LinkedIn"].map(
            (item) => (
              <a key={item} href="#" className="hover:underline">
                {item}
              </a>
            )
          )}
        </div>
        <div className="mt-4 md:mt-0">
          <a href="#" className="hover:underline text-xl">
            About Us ↗
          </a>
        </div>
      </div>

      <div id="string" className="mt-8">
        <svg width="1300" height="50">
          <path d={initialPath} stroke="white" fill="transparent" />
        </svg>
      </div>

      <div className="w-full overflow-hidden">
        <h1 className="font-bold -mt-16 md:text-[14rem] text-center font-bebas">
          CAMPUS CARVINGS
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
