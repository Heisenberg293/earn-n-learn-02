
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobSection } from "./PostJobSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, BookOpen, Code, Paintbrush, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  category: string;
  budget: string;
  difficulty: string;
  description: string;
  deadline?: string;
  status?: "available" | "accepted" | "rejected";
}

export const JobBrowser = () => {
  const [activeTab, setActiveTab] = useState("browse");
  
  const categories = [
    { id: "academic", name: "Academic Help", icon: BookOpen },
    { id: "coding", name: "Coding", icon: Code },
    { id: "design", name: "Design", icon: Paintbrush },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
  ];
  
  const jobs: Job[] = [
    {
      id: 1,
      title: "Python Programming Assignment",
      category: "coding",
      budget: "$150-300",
      difficulty: "Intermediate",
      description: "Need help with a Python data analysis project that involves cleaning data, creating visualizations, and building predictive models.",
      deadline: "2023-12-15",
      status: "available"
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      category: "design",
      budget: "$200-400",
      difficulty: "Intermediate",
      description: "Create a modern, minimalist logo for a SaaS company that reflects innovation and simplicity.",
      deadline: "2023-12-20",
      status: "available"
    },
    {
      id: 3,
      title: "Research Paper Review",
      category: "academic",
      budget: "$100-200",
      difficulty: "Advanced",
      description: "Review and provide feedback on a 20-page research paper in the field of environmental science.",
      deadline: "2023-12-10",
      status: "available"
    },
    {
      id: 4,
      title: "Social Media Strategy",
      category: "marketing",
      budget: "$300-600",
      difficulty: "Beginner",
      description: "Develop a social media content calendar and strategy for a small business in the wellness industry.",
      deadline: "2023-12-25",
      status: "available"
    },
  ];
  
  // Function to get category name from id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Function to get category icon from id
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : null;
  };
  
  const renderJobs = () => {
    if (jobs.length === 0) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Available Jobs
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              There are no jobs available at the moment. Check back later or post your own job.
            </p>
            <Button onClick={() => setActiveTab("post")}>Post a Job</Button>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const CategoryIcon = getCategoryIcon(job.category);
          
          return (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {CategoryIcon && <CategoryIcon className="h-4 w-4 text-gray-500" />}
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                      {getCategoryName(job.category)}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-accent">
                    {job.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-sm font-medium">
                    Budget: {job.budget}
                  </span>
                  {job.deadline && (
                    <span className="text-gray-600 text-sm">
                      Due: {job.deadline}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" className="gap-2">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md rounded-none mx-[240px] px-0 my-[6px] py-0">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          {renderJobs()}
        </TabsContent>
        
        <TabsContent value="post">
          <PostJobSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
