import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, BellRing, Mail, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    logout,
    user
  } = useContext(AuthContext);
  const isHomePage = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const unauthenticatedLinks = [];
  const authenticatedLinks = [{
    name: "Job Hub",
    path: "/task-hub"
  }, {
    name: "Microfinance",
    path: "/microfinance"
  }, {
    name: "Newsfeed",
    path: "/newsfeed"
  }];
  const links = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;
  const handleMessageClick = () => {
    navigate("/communications");
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-6">
        
      </div>
    </nav>;
};
export default Navigation;