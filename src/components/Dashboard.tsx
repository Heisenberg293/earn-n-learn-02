
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart2, BookmarkCheck, DollarSign, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const Dashboard = () => {
  const {
    user
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const dashboardCards = [{
    title: "My Jobs",
    description: "Manage your active and completed jobs",
    icon: <Briefcase className="h-5 w-5 text-green-600" />,
    path: "/my-jobs",
    stats: "2 Active"
  }, {
    title: "Applied Jobs",
    description: "Track your job applications",
    icon: <BookmarkCheck className="h-5 w-5 text-green-600" />,
    path: "/applied-jobs",
    stats: "5 Pending"
  }, {
    title: "Earnings",
    description: "View your financial summary",
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    path: "/profile/earnings",
    stats: "$1,250"
  }];
  const recentJobs = [{
    id: 1,
    title: "Website Development for E-commerce",
    category: "Web Development",
    status: "new",
    postedAt: "2 hours ago",
    budget: "$500-750"
  }, {
    id: 2,
    title: "Logo Design for Tech Startup",
    category: "Graphic Design",
    status: "new",
    postedAt: "5 hours ago",
    budget: "$100-200"
  }, {
    id: 3,
    title: "Content Writing for Blog",
    category: "Writing",
    status: "new",
    postedAt: "1 day ago",
    budget: "$50-100"
  }];
  
  // Update handler for "View All" button
  const handleViewAllJobs = () => {
    navigate('/task-hub', { state: { activeTab: 'browse' } });
  };

  return <div>
      {/* Dashboard Header */}
      <div className="bg-white border-b mb-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Browse Jobs</h1>
            <p className="text-gray-600 text-sm">Welcome back, {user?.name || "User"}!</p>
          </div>
          <div className="flex items-center gap-2">
            
            
          </div>
        </div>
      </div>

      {/* Featured Alert/Banner */}
      

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {dashboardCards.map((card, index) => <Card key={index} onClick={() => navigate(card.path)} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{card.description}</p>
              <p className="text-xl font-semibold text-green-600">{card.stats}</p>
            </CardContent>
          </Card>)}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-medium">Recent Jobs</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-600 hover:text-green-700 p-0 h-auto flex items-center gap-1" 
                onClick={handleViewAllJobs}
              >
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map(job => <div key={job.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{job.title}</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs font-medium">
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <span className="mr-3">{job.category}</span>
                      <span>{job.postedAt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-600">{job.budget}</span>
                      <Button variant="outline" size="sm" className="text-xs font-medium border-gray-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200" onClick={e => {
                    e.stopPropagation();
                    navigate(`/jobs/${job.id}`);
                  }}>
                        View Details
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Summary */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-medium">Earnings Summary</CardTitle>
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0 h-auto">
                <BarChart2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-semibold">$1,250</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold">$350</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <span className="text-gray-600">Withdrawn</span>
                  <span className="font-semibold">$900</span>
                </div>
                
                <div className="mt-4 flex items-center justify-center">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">$1,250</div>
                        <div className="text-xs text-gray-500">Total Earnings</div>
                      </div>
                    </div>
                    <svg className="h-32 w-32" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="2"></circle>
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-green-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="30"></circle>
                    </svg>
                  </div>
                </div>
                
                <Button className="w-full mt-4" onClick={() => navigate("/profile/earnings")}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New job posted</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Dashboard;
