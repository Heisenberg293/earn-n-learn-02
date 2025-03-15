
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedTasks from "@/components/FeaturedTasks";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeatureHighlights from "@/components/FeatureHighlights";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect authenticated users to task-hub
  if (isAuthenticated) {
    return <Navigate to="/task-hub" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeatureHighlights />
      <FeaturedTasks />
      <TestimonialsSection />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
