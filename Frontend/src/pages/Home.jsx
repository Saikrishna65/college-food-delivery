// src/pages/Home.jsx
import React, { Suspense, lazy } from "react";
import Loading from "../components/Loading";

// Lazy‐load each section
const Navbar = lazy(() => import("../components/Navbar"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const FeaturedSection = lazy(() => import("../components/FeaturedSection"));
const InfoSections = lazy(() => import("../components/InfoSections"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  return (
    // Wrap everything in one Suspense so that the fallback shows
    // until all lazy‐loaded components have finished loading
    <Suspense fallback={<Loading />}>
      <div>
        <Navbar />

        <div className="relative z-10 bg-white">
          <HeroSection />
        </div>

        <div className="relative z-10 bg-white">
          <FeaturedSection />
          <InfoSections />
          <Testimonials />
        </div>

        {/* spacer div */}
        <div className="h-dvh bg-transparent pointer-events-none" />

        <Footer />
      </div>
    </Suspense>
  );
};

export default Home;
