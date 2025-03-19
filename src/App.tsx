
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import AppSidebar from "./components/sidebar/AppSidebar";
import MobileSidebar from "./components/sidebar/MobileSidebar";
import Index from "./pages/Index";
import TaskHub from "./pages/TaskHub";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MicrofinanceSystem from "./pages/MicrofinanceSystem";
import Newsfeed from "./pages/Newsfeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Communications from "./pages/Communications";
import MyJobs from "./pages/MyJobs";
import AppliedJobs from "./pages/AppliedJobs";
import Earnings from "./pages/Earnings";
import JobDetail from "./pages/JobDetail";

const queryClient = new QueryClient();

// Wrapper component to conditionally render the sidebar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/signup"].includes(location.pathname);
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  
  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (event: any) => {
      setSidebarExpanded(event.detail.expanded);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarChange);
    
    // Initialize sidebar state from localStorage
    const savedState = localStorage.getItem('sidebar-expanded');
    if (savedState !== null) {
      setSidebarExpanded(savedState === 'true');
    }
    
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarChange);
    };
  }, []);
  
  if (isPublicPage) {
    return <>{children}</>;
  }
  
  return (
    <>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <MobileSidebar />
      <div 
        className={`transition-all duration-300 pt-6 ${
          sidebarExpanded ? 'md:ml-64' : 'md:ml-16'
        }`}
      >
        {children}
      </div>
    </>
  );
};

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
                <div className="flex min-h-screen">
                  <AppLayout>
                    <TaskHub />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/microfinance" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <MicrofinanceSystem />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/newsfeed" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <Newsfeed />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/communications" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <Communications />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/my-jobs" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <MyJobs />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/applied-jobs" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <AppliedJobs />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/profile/earnings" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <Earnings />
                  </AppLayout>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <AppLayout>
                    <JobDetail />
                  </AppLayout>
                </div>
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
