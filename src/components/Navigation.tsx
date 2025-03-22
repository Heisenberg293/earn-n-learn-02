
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
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 h-16">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold text-green-600">earn-n-learn</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/task-hub" 
              className={`text-sm font-medium ${location.pathname === '/task-hub' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Browse Jobs
            </Link>
            <Link 
              to="/collaborative-projects" 
              className={`text-sm font-medium ${location.pathname === '/collaborative-projects' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Projects
            </Link>
            <Link 
              to="/microfinance" 
              className={`text-sm font-medium ${location.pathname === '/microfinance' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Microfinance
            </Link>
            <Link 
              to="/communications" 
              className={`text-sm font-medium ${location.pathname === '/communications' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              Messages
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-green-600"
                  onClick={() => navigate('/communications')}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-gray-700 hover:text-green-600"
                  onClick={() => navigate('/communications?tab=notifications')}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">3</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-green-600"
                  onClick={() => navigate('/profile')}
                >
                  <User className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
