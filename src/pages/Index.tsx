
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeFeatureHighlights from "@/components/home/HomeFeatureHighlights";
import HomeActivitySummary from "@/components/home/HomeActivitySummary";
import HomeSuccessStories from "@/components/home/HomeSuccessStories";
import HomeCategories from "@/components/home/HomeCategories";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect authenticated users to task-hub
  if (isAuthenticated) {
    return <Navigate to="/task-hub" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeHeroSection />
      <HomeFeatureHighlights />
      <HomeActivitySummary />
      <HomeSuccessStories />
      <HomeCategories />
      <Footer />
    </div>
  );
};

export default Index;
