
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-white -z-10" />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-down text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Find Freelance Tasks,{" "}
            <span className="text-accent">Earn & Learn!</span>
          </h1>
          
          <p className="animate-fade-up text-gray-600 text-lg md:text-xl mb-12 delay-100">
            Join our community of freelancers and businesses. Learn while you earn,
            grow your skills, and build your portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-200">
            <Link
              to="/tasks"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Browse Tasks
            </Link>
            <Link
              to="/post-task"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-gray-900 font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Post a Task
            </Link>
            <Link
              to="/microfinance"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-gray-900 font-medium border border-gray-200 hover:bg-accent/10 transition-colors"
            >
              Get Funding
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
