
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import TaskHub from "./pages/TaskHub";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MicrofinanceSystem from "./pages/MicrofinanceSystem";
import Newsfeed from "./pages/Newsfeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Communications from "./pages/Communications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/task-hub" element={
              <ProtectedRoute>
                <TaskHub />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/microfinance" element={
              <ProtectedRoute>
                <MicrofinanceSystem />
              </ProtectedRoute>
            } />
            <Route path="/newsfeed" element={
              <ProtectedRoute>
                <Newsfeed />
              </ProtectedRoute>
            } />
            <Route path="/communications" element={
              <ProtectedRoute>
                <Communications />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
