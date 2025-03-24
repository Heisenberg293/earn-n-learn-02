import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart2, BookmarkCheck, DollarSign, ChevronRight, Activity, Calendar, Package, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const Dashboard = () => {
  const {
    user
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const dashboardCards = [{
    title: "My Exchange",
    description: "Manage your active and completed exchanges",
    icon: <Briefcase className="h-5 w-5 text-green-600" />,
    path: "/my-jobs",
    stats: "2 Active"
  }, {
    title: "Applied Exchange",
    description: "Track your applications",
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
  const recentActivities = [{
    id: 1,
    date: "Oct 25, 2023",
    action: "Accepted",
    title: "Python Tutor",
    type: "job",
    amount: "$50",
    path: "/jobs/101"
  }, {
    id: 2,
    date: "Oct 24, 2023",
    action: "Sold",
    title: "Calculus Textbook",
    type: "item",
    amount: "$30",
    path: "/items/202"
  }, {
    id: 3,
    date: "Oct 23, 2023",
    action: "Applied for",
    title: "Graphic Design",
    type: "skill",
    amount: null,
    path: "/skills/303"
  }];

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

  // Function to get appropriate icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'skill':
        return <Coins className="h-4 w-4" />;
      case 'item':
        return <Package className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  return <div>
      <div className="bg-white border-b mb-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Browse Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome back, {user?.name || "User"}!</p>
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/recent-activity")} className="text-green-600 hover:text-green-700">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => <div key={activity.id} className="flex items-center p-3 border-b last:border-0 hover:bg-gray-50 cursor-pointer rounded-md transition-colors" onClick={() => navigate(activity.path)}>
                  <div className="w-24 text-sm text-gray-500">{activity.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <p className="font-medium">
                        {activity.action} <span className="font-semibold">"{activity.title}"</span>
                      </p>
                      <Badge className={`ml-2 ${getBadgeVariant(activity.type)}`}>
                        {activity.type}
                      </Badge>
                    </div>
                    {activity.amount && <p className="text-sm text-green-600 font-medium">{activity.amount}</p>}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>)}
            </div>
          </CardContent>
        </Card>

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
              <CardTitle className="text-lg font-medium">Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/calendar")} className="text-green-600 hover:text-green-700 p-0 h-auto">
                <Calendar className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 text-red-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Web Development Project</p>
                    <p className="text-xs text-gray-500">Due in 2 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">UI Design Feedback</p>
                    <p className="text-xs text-gray-500">Due in 5 days</p>
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