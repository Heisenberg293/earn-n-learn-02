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
  return <nav className="bg-white mx-0 px-0 rounded-none py-[15px]">
      <div className="container flex items-center justify-between mx-[123px] px-[65px]">
        <div className="flex items-center py-0 px-0 mx-[240px]">
          <Link to="/" className="text-2xl font-bold my-0 px-0 py-[11px] mx-0">Earn-n-Learn</Link>
          
          <div className="hidden md:flex ml-12 space-x-8">
            
            
            
            
            
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
                <Link to="/signup" className="mx-0">
                  Sign up
                </Link>
              </Button>
            </>}
        </div>
      </div>
    </nav>;
};
export default Navigation;