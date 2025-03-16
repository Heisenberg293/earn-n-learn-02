
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeHeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white to-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Connect, Work & <span className="text-green-600">Grow Together</span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-8 animate-fade-in delay-100">
            Find freelance opportunities, post jobs, and build your career on our secure
            platform designed for professionals of all experience levels.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in delay-200">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="300" fill="currentColor" className="text-green-600" />
        </svg>
      </div>
    </section>
  );
};

export default HomeHeroSection;
