import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import ScrollTextReveal from "./ScrollTextReveal";

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Hostel A - Final Year",
      image: assets.testimonial1,
      quote:
        "I can grab a quick lunch between classes without wasting time in lines. It’s fast, reliable, and student-friendly!",
    },
    {
      name: "Anjali Mehta",
      role: "Lecturer, Dept. of CSE",
      image: assets.testimonial2,
      quote:
        "I appreciate how easy it is to order during my breaks. It’s made my day so much more efficient.",
    },
    {
      name: "Suresh Babu",
      role: "Hostel C - 2nd Year",
      image: assets.testimonial3,
      quote:
        "Great food variety and the delivery is super fast. Perfect after football practice!",
    },
    {
      name: "Priya Das",
      role: "Student Council",
      image: assets.testimonial4,
      quote:
        "Tracking the order in real-time is a cool feature. I always know when my food is coming.",
    },
    {
      name: "Manoj Reddy",
      role: "Hostel B - 3rd Year",
      image: assets.testimonial5,
      quote:
        "Exam week lifesaver! I don’t have to leave my room to eat well. Super convenient.",
    },
    {
      name: "Neha Sharma",
      role: "1st Year - Girls Hostel",
      image: assets.testimonial6,
      quote:
        "Evening snacks, sorted! Love the quick options and smooth UPI payments.",
    },
  ];

  const visibleTestimonials = isMobile
    ? testimonials.slice(0, 2)
    : testimonials;

  return (
    <section className="py-5 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start pt-14 justify-between mb-8 gap-6">
          {/* Left column (stats) */}
          <div className="w-full lg:w-1/2 lg:pt-5 text-center lg:text-left">
            {/* <h2 className="lg:text-8xl text-5xl font-extrabold">250K+</h2> */}
            <ScrollTextReveal
              lines={["250K+"]}
              containerClass=""
              lineWrapperClass="overflow-hidden"
              lineClass="md:text-8xl text-5xl font-extrabold text-green-600"
            />
            <p className="mt-2 text-xl text-gray-600 font-outfit">
              Satisfied students and staff since launch
            </p>
          </div>

          {/* Right column (avatars, text, buttons) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start -space-x-2 mb-4">
              {testimonials.slice(0, 4).map((t, idx) => (
                <img
                  key={idx}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src={t.image}
                  alt={`${t.name} avatar`}
                />
              ))}
            </div>
            <p className="text-lg text-gray-800 mb-4 font-outfit">
              Real stories from real users—find out how we’ve changed the way
              our campus eats.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button className="bg-green-600 font-bold font-outfit text-white px-6 py-2 rounded-md">
                See What Students Say
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
            >
              <p className="text-gray-800 mb-4">“{t.quote}”</p>
              <div className="mt-4 flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-3"
                  src={t.image}
                  alt={`${t.name} avatar`}
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-gray-600 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
