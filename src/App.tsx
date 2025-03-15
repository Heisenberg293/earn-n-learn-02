
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaskHub from "./pages/TaskHub";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MicrofinanceSystem from "./pages/MicrofinanceSystem";
import Newsfeed from "./pages/Newsfeed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/task-hub" element={<TaskHub />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/microfinance" element={<MicrofinanceSystem />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
