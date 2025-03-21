
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
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">SkillSwap</Link>
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/task-hub">
                <Button variant="outline">Browse Jobs</Button>
              </Link>
              <Button variant="ghost" onClick={() => logout()}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
