
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Layers, User, Search, Bell, MessageCircle } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout
  } = useContext(AuthContext);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">earn-n-learn</span>
          </Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/task-hub" 
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === '/task-hub' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              Job Hub
            </Link>
            <Link 
              to="/collaborative-projects" 
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === '/collaborative-projects' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/microfinance" 
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === '/microfinance' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              Microfinance
            </Link>
            <Link 
              to="/communications" 
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                location.pathname === '/communications' ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              Messages
            </Link>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600" onClick={() => navigate('/communications')}>
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-green-600" onClick={() => navigate('/profile')}>
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>Log in</Button>
                <Button onClick={() => navigate('/signup')}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
