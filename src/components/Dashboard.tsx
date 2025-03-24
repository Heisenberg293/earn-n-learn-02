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
  const handleViewAllJobs = () => {
    navigate('/task-hub', {
      state: {
        activeTab: 'browse'
      }
    });
  };
  return <div>
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

      
    </div>;
};
export default Dashboard;