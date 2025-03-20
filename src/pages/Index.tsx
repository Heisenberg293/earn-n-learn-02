
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Redirect authenticated users to task-hub
  if (isAuthenticated) {
    return <Navigate to="/task-hub" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Index;
