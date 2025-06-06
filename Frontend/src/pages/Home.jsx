import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import InfoSections from "../components/InfoSections";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="relative z-10 bg-white">
        <HeroSection />
      </div>
      <div className="relative z-10 bg-white">
        <FeaturedSection />
        <InfoSections />
        <Testimonials />
      </div>

      <div className="h-dvh bg-transparent pointer-events-none" />
      <Footer />
    </div>
  );
};

export default Home;
