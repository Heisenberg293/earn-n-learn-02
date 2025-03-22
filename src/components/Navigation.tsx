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
  return <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 h-16">
      <div className="container mx-auto h-full px-4">
        
      </div>
    </nav>;
};
export default Navigation;