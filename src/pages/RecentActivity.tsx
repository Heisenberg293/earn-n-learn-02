
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeft, ChevronRight, Clock, DollarSign, Filter, Calendar, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const RecentActivity = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDays, setSelectedDays] = useState("7");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock recent activity data
  const allRecentActivities = [
    {
      id: 1,
      date: "Oct 25, 2023",
      action: "Accepted",
      title: "Python Tutor",
      type: "job",
      amount: "$50",
      path: "/jobs/101"
    },
    {
      id: 2,
      date: "Oct 24, 2023",
      action: "Sold",
      title: "Calculus Textbook",
      type: "item",
      amount: "$30",
      path: "/items/202"
    },
    {
      id: 3,
      date: "Oct 23, 2023",
      action: "Applied for",
      title: "Graphic Design",
      type: "skill",
      amount: null,
      path: "/skills/303"
    },
    {
      id: 4,
      date: "Oct 22, 2023",
      action: "Completed",
      title: "Website Development",
      type: "job",
      amount: "$250",
      path: "/jobs/104"
    },
    {
      id: 5,
      date: "Oct 21, 2023",
      action: "Purchased",
      title: "Programming Book",
      type: "item",
      amount: "$45",
      path: "/items/205"
    },
    {
      id: 6,
      date: "Oct 20, 2023",
      action: "Posted",
      title: "Math Tutoring",
      type: "skill",
      amount: "$25/hr",
      path: "/skills/306"
    },
    {
      id: 7,
      date: "Oct 19, 2023",
      action: "Received payment for",
      title: "Logo Design",
      type: "job",
      amount: "$120",
      path: "/jobs/107"
    },
    {
      id: 8,
      date: "Oct 15, 2023",
      action: "Completed",
      title: "Data Analysis Project",
      type: "job",
      amount: "$180",
      path: "/jobs/108"
    },
    {
      id: 9,
      date: "Oct 10, 2023",
      action: "Started",
      title: "Spanish Language Course",
      type: "skill",
      amount: "$35/hr",
      path: "/skills/309"
    },
    {
      id: 10,
      date: "Oct 5, 2023",
      action: "Listed",
      title: "Chemistry Notes",
      type: "item",
      amount: "$15",
      path: "/items/210"
    }
  ];
  
  // Filter activities based on search, type, and days
  const filterActivities = () => {
    const daysAgo = parseInt(selectedDays);
    const currentDate = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(currentDate.getDate() - daysAgo);
    
    return allRecentActivities.filter(activity => {
      // Filter by search term
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.action.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by type
      const matchesType = selectedType === 'all' || activity.type === selectedType;
      
      // Filter by days
      const activityDate = new Date(activity.date);
      const matchesDate = daysAgo === 0 || activityDate >= cutoffDate;
      
      return matchesSearch && matchesType && matchesDate;
    });
  };
  
  const recentActivities = filterActivities();
  
  // Function to get appropriate badge color based on activity type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'job':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'skill':
        return "bg-purple-100 text-purple-800 border-purple-200";
      case 'item':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-6 py-[35px]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Recent Activity</h1>
                <p className="text-gray-600 mt-1">Your recent interactions and transactions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-medium">Filter Activities</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                          placeholder="Search activities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Activity Type</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="job">Jobs</SelectItem>
                          <SelectItem value="skill">Skills</SelectItem>
                          <SelectItem value="item">Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Period</label>
                      <Select value={selectedDays} onValueChange={setSelectedDays}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="14">Last 14 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 3 months</SelectItem>
                          <SelectItem value="0">All time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSearchTerm("");
                        setSelectedType("all");
                        setSelectedDays("7");
                      }}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity Feed</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selectedDays === "0" ? "All time" : `Last ${selectedDays} days`}
                </Badge>
                {selectedType !== "all" && (
                  <Badge variant="outline" className="capitalize flex items-center gap-1">
                    {selectedType}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                    onClick={() => handleItemClick(activity.path)}
                  >
                    <div className="w-24 text-sm text-gray-500">{activity.date}</div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <p className="font-medium">
                          {activity.action} <span className="font-semibold">"{activity.title}"</span>
                        </p>
                        <Badge className={getBadgeVariant(activity.type)}>
                          {activity.type}
                        </Badge>
                      </div>
                      {activity.amount && (
                        <p className="text-sm text-green-600 font-medium">{activity.amount}</p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
                
                {recentActivities.length === 0 && (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No Activity Found</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                      No activities match your current filter settings. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RecentActivity;
