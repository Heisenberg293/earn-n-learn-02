
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedTasks from "@/components/FeaturedTasks";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedTasks />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
