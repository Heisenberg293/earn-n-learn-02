
import React, { createContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "client" | "admin";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login for any email/password
    // or specifically for the demo account
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Success case (for demo)
        const newUser: User = {
          id: "user-123",
          name: email === "demo@example.com" ? "Demo User" : email.split("@")[0],
          email,
          role: "freelancer",
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call to create an account
    // For demo purposes, we'll simulate a successful signup
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser: User = {
          id: "user-" + Date.now(),
          name,
          email,
          role: "freelancer",
        };
        
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
