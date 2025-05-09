import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import AppSidebar from "./components/sidebar/AppSidebar";
import MobileSidebar from "./components/sidebar/MobileSidebar";
import ChatBot from "./components/chatbot/ChatBot";
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
import Calendar from "./pages/Calendar";
import CollaborativeProjects from "./pages/CollaborativeProjects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectCreate from "./pages/ProjectCreate";
import MyProjects from "./pages/MyProjects";
import TeamFinder from "./pages/TeamFinder";
import RecentActivity from "./pages/RecentActivity";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  
  useEffect(() => {
    const handleSidebarChange = (event: any) => {
      setSidebarExpanded(event.detail.expanded);
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarChange);
    
    const savedState = localStorage.getItem('sidebar-expanded');
    if (savedState !== null) {
      setSidebarExpanded(savedState === 'true');
    }
    
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarChange);
    };
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <MobileSidebar />
      <div 
        className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? 'md:ml-64' : 'md:ml-16'
        }`}
      >
        {children}
      </div>
    </div>
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
            
            <Route path="/task-hub" element={
              <ProtectedRoute>
                <AppLayout>
                  <TaskHub />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/microfinance" element={
              <ProtectedRoute>
                <AppLayout>
                  <MicrofinanceSystem />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/newsfeed" element={
              <ProtectedRoute>
                <AppLayout>
                  <Newsfeed />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/communications" element={
              <ProtectedRoute>
                <AppLayout>
                  <Communications />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/my-jobs" element={
              <ProtectedRoute>
                <AppLayout>
                  <MyJobs />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/applied-jobs" element={
              <ProtectedRoute>
                <AppLayout>
                  <AppliedJobs />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile/earnings" element={
              <ProtectedRoute>
                <AppLayout>
                  <Earnings />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute>
                <AppLayout>
                  <JobDetail />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <AppLayout>
                  <Calendar />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/collaborative-projects" element={
              <ProtectedRoute>
                <AppLayout>
                  <CollaborativeProjects />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/collaborative-projects/create" element={
              <ProtectedRoute>
                <AppLayout>
                  <ProjectCreate />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/collaborative-projects/:projectId" element={
              <ProtectedRoute>
                <AppLayout>
                  <ProjectDetail />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/collaborative-projects/my-projects" element={
              <ProtectedRoute>
                <AppLayout>
                  <MyProjects />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/collaborative-projects/team-finder" element={
              <ProtectedRoute>
                <AppLayout>
                  <TeamFinder />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/recent-activity" element={
              <ProtectedRoute>
                <AppLayout>
                  <RecentActivity />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
