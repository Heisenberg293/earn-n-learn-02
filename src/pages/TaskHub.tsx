
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobBrowser } from "@/components/tasks/TaskBrowser";
import { JobPostForm } from "@/components/tasks/TaskPostForm";
import { SkillsMatcher } from "@/components/tasks/SkillsMatcher";
import { AuthContext } from "@/context/AuthContext";
import Dashboard from "@/components/Dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TaskHub = () => {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const {
    isAuthenticated,
    user
  } = useContext(AuthContext);
  const location = useLocation();
  
  useEffect(() => {
    // Check if location state contains activeTab
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);
  
  return <div className="min-h-screen bg-gray-50 p-6">
      <main>
        {isAuthenticated && <Dashboard />}
        
        <div className="mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Explore & Exchange</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search..." className="h-9 w-[200px] md:w-[300px] pl-10 pr-4 rounded-md bg-gray-50 border-gray-200" />
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Filter className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="browse">Browse</TabsTrigger>
                  <TabsTrigger value="match">Skills &amp; Materials Exchange</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browse">
                  <JobBrowser />
                </TabsContent>
                
                <TabsContent value="match">
                  <SkillsMatcher />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
};

export default TaskHub;
