
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BarChart3, BookmarkCheck, CreditCard, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "My Jobs",
      description: "Manage your active and completed jobs",
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
      path: "/my-jobs",
      stats: "2 Active",
    },
    {
      title: "Applied Jobs",
      description: "Track your job applications",
      icon: <BookmarkCheck className="h-5 w-5 text-green-600" />,
      path: "/applied-jobs",
      stats: "5 Pending",
    },
    {
      title: "Earnings",
      description: "View your financial summary",
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      path: "/profile/earnings",
      stats: "$1,250",
    },
    {
      title: "Post a Job",
      description: "Create a new job listing",
      path: "/task-hub",
      action: () => navigate("/task-hub", { state: { activeTab: "post" }}),
      stats: "New",
      icon: <PlusCircle className="h-5 w-5 text-green-600" />,
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Website Development for E-commerce",
      category: "Web Development",
      status: "new",
      postedAt: "2 hours ago",
      budget: "$500-750",
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      category: "Graphic Design",
      status: "new",
      postedAt: "5 hours ago",
      budget: "$100-200",
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      category: "Writing",
      status: "new",
      postedAt: "1 day ago",
      budget: "$50-100",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "User"}!</h2>
        <p className="text-gray-600">Here's what's happening with your jobs and opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardCards.map((card, index) => (
          <div key={index} onClick={card.action ? card.action : () => navigate(card.path)}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-2">{card.description}</CardDescription>
                <p className="text-lg font-semibold text-green-600">{card.stats}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Jobs For You</h3>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                    <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <span className="mr-4">{job.category}</span>
                    <span>{job.postedAt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-600">{job.budget}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/jobs/${job.id}`);
                      }}
                      className="text-sm font-medium px-3 py-1.5 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link
              to="/task-hub"
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              View all jobs →
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6">Earnings Summary</h3>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div 
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => navigate("/profile/earnings/history")}
                >
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-semibold">$1,250</span>
                </div>
                <div 
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => navigate("/profile/earnings/pending")}
                >
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold">$350</span>
                </div>
                <div 
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                  onClick={() => navigate("/profile/earnings/withdrawn")}
                >
                  <span className="text-gray-600">Withdrawn</span>
                  <span className="font-semibold">$900</span>
                </div>
                <div className="h-40 flex items-center justify-center">
                  <BarChart3 className="h-32 w-32 text-gray-300" />
                </div>
                <Link
                  to="/profile/earnings"
                  className="block w-full text-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
