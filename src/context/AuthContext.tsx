
import React, { createContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "client" | "admin";
  studentId?: string;
  university?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, studentId?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, studentId?: string) => Promise<void>;
  logout: () => void;
  isUniversityEmail: (email: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isUniversityEmail: () => false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// List of approved university domains
const UNIVERSITY_DOMAINS = [
  "university.edu",
  "college.edu",
  "edu.org",
  "student.edu",
  "campus.edu",
  "school.edu",
  // Add more university domains as needed
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Validate if email is from an approved university domain
  const isUniversityEmail = (email: string): boolean => {
    if (!email) return false;
    const domain = email.split('@')[1]?.toLowerCase();
    return UNIVERSITY_DOMAINS.some(uniDomain => domain === uniDomain);
  };

  const login = async (email: string, password: string, studentId?: string): Promise<void> => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login for any email/password
    // or specifically for the demo account
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@example.com" || isUniversityEmail(email)) {
          // Extract university domain
          const domain = email.split('@')[1];
          const universityName = domain ? domain.split('.')[0] : '';
          
          // Success case (for demo)
          const newUser: User = {
            id: "user-123",
            name: email === "demo@example.com" ? "Demo User" : email.split("@")[0],
            email,
            role: "freelancer",
            studentId: studentId || undefined,
            university: universityName || undefined
          };
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve();
        } else {
          // Non-university email
          reject(new Error("Please use a valid university email address"));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string, studentId?: string): Promise<void> => {
    // In a real app, this would make an API call to create an account
    // For demo purposes, we'll simulate a successful signup if email is from university domain
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify if email is from an approved university domain
        if (email === "demo@example.com" || isUniversityEmail(email)) {
          // Extract university domain
          const domain = email.split('@')[1];
          const universityName = domain ? domain.split('.')[0] : '';
          
          const newUser: User = {
            id: "user-" + Date.now(),
            name,
            email,
            role: "freelancer",
            studentId: studentId || undefined,
            university: universityName || undefined
          };
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(newUser));
          resolve();
        } else {
          // Non-university email
          reject(new Error("Please use a valid university email address"));
        }
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
    isUniversityEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
