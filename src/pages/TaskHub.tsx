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
import { Activity, Bell, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
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

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  useEffect(() => {
    // Check if location state contains activeTab
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);
  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    // Pass filter values to child components via context or props
    // For now we'll just close the popover
    toast({
      title: "Filters Applied",
      description: "Results have been filtered based on your criteria."
    });
  };
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSelectedBudget("all");
  };
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
                  <Input placeholder="Search..." className="h-9 w-[200px] md:w-[300px] pl-10 pr-4 rounded-md bg-gray-50 border-gray-200" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                </Button>
                
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Filter className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h3 className="font-medium">Filter Options</h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Difficulty</label>
                        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Difficulties</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Budget Range</label>
                        <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Budgets</SelectItem>
                            <SelectItem value="0-50">$0 - $50</SelectItem>
                            <SelectItem value="50-100">$50 - $100</SelectItem>
                            <SelectItem value="100-250">$100 - $250</SelectItem>
                            <SelectItem value="250+">$250+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleResetFilters}>
                          Reset
                        </Button>
                        <Button size="sm" onClick={handleApplyFilters}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Link to="/recent-activity" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  <Activity className="h-4 w-4" />
                  View Recent Activity
                </Link>
              </div>
              
              <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md mx-0 my-0 px-0 py-0 rounded-none">
                  <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
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