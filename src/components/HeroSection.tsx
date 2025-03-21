import { Link } from "react-router-dom";
const HeroSection = () => {
  return <section className="flex-1 flex items-center justify-center bg-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Find Freelance Jobs, <span className="text-green-500">Earn & Learn!</span>
        </h1>
        
        <p className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto">
          Join our community of freelancers and businesses. Learn while you earn, grow your skills, and
          build your portfolio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/login" className="w-full sm:w-auto px-10 py-4 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">Log in</Link>
          <Link to="/login" className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-gray-900 font-medium border border-gray-200 hover:bg-gray-50 transition-colors">Sign in</Link>
          
        </div>
      </div>
    </section>;
};
export default HeroSection;