import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout
  } = useContext(AuthContext);
  return <nav className="bg-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            earn-n-learn
          </Link>
          
          <div className="hidden md:flex ml-12 space-x-8">
            
            <Link to="/task-hub" className="text-gray-600 hover:text-gray-900 font-medium">
              Task Hub
            </Link>
            <Link to="/microfinance" className="text-gray-600 hover:text-gray-900 font-medium">
              Microfinance
            </Link>
            <Link to="/newsfeed" className="text-gray-600 hover:text-gray-900 font-medium">
              Newsfeed
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
              Profile
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? <Button variant="ghost" onClick={logout}>
              Log out
            </Button> : <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Log in
              </Link>
              <Button asChild className="bg-green-500 hover:bg-green-600 rounded-full">
                <Link to="/signup">
                  Sign up
                </Link>
              </Button>
            </>}
        </div>
      </div>
    </nav>;
};
export default Navigation;