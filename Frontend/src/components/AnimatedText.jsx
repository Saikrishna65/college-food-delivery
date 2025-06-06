import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text, triggerRef, className = "", stagger = 0.2 }) => {
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!triggerRef?.current) return;

    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, {
        opacity: 0,
        y: 30,
        rotateX: 45,
      });

      gsap.to(wordsRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power2.out",
        stagger: stagger,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 90%", // when top of trigger hits 90% of viewport
          toggleActions: "play none none reverse",
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [triggerRef, stagger]);

  const wordArray = text.split(" ");

  return (
    <h2 className={`font-bold ${className}`}>
      {wordArray.map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordsRef.current[i] = el)}
          className="inline-block"
          style={{ marginRight: "0.3ch" }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedText;
