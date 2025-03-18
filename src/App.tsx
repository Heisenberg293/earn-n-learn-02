
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarNavigation } from "@/components/SidebarNav";
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
import PostTask from "./pages/PostTask";
import SkillsMatching from "./pages/SkillsMatching";

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
                <SidebarNavigation>
                  <TaskHub />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/post-task" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <PostTask />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/skills-matching" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <SkillsMatching />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <Profile />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/microfinance" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <MicrofinanceSystem />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/newsfeed" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <Newsfeed />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/communications" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <Communications />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/my-jobs" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <MyJobs />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/applied-jobs" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <AppliedJobs />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/profile/earnings" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <Earnings />
                </SidebarNavigation>
              </ProtectedRoute>
            } />
            <Route path="/jobs/:id" element={
              <ProtectedRoute>
                <SidebarNavigation>
                  <JobDetail />
                </SidebarNavigation>
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
