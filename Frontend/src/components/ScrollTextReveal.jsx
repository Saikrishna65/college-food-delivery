import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollTextReveal({
  lines = [],
  containerClass = "",
  lineWrapperClass = "",
  lineClass = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const targets = gsap.utils.toArray(".line-reveal", containerRef.current);

    gsap.fromTo(
      targets,
      {
        y: 100,
        rotateZ: 2,
        skewY: 3,
      },
      {
        y: 0,
        rotateZ: 0,
        skewY: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={containerClass}>
      {lines.map((line, i) => (
        <div key={i} className={lineWrapperClass}>
          <div className={`line-reveal ${lineClass}`}>{line}</div>
        </div>
      ))}
    </div>
  );
}

export default ScrollTextReveal;
