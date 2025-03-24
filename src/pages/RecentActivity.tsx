
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeft, ChevronRight, Clock, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";

const RecentActivity = () => {
  const navigate = useNavigate();
  
  // Mock recent activity data
  const recentActivities = [
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
    }
  ];
  
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
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Recent Activity</h1>
                <p className="text-gray-600 mt-1">Your recent interactions and transactions</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed (Last 7 Days)</CardTitle>
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
                      <div className="flex items-center">
                        <p className="font-medium">
                          {activity.action} <span className="font-semibold">"{activity.title}"</span>
                        </p>
                        <Badge className={`ml-2 ${getBadgeVariant(activity.type)}`}>
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
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No Recent Activity</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                      Your recent actions will appear here once you start engaging with jobs, skills, and items.
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
