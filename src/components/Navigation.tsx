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
  return;
};
export default Navigation;