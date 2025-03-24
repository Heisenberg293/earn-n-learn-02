import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();
  
  const activeJobs = [{
    id: 1,
    title: "Website Development for E-commerce",
    category: "Web Development",
    status: "in-progress",
    startedAt: "2023-11-15",
    deadline: "2023-12-15",
    budget: "$750",
    client: "TechVentures Inc."
  }, {
    id: 2,
    title: "Mobile App UI Design",
    category: "UI/UX Design",
    status: "in-progress",
    startedAt: "2023-11-20",
    deadline: "2023-12-10",
    budget: "$500",
    client: "AppSolutions"
  }];
  
  const completedJobs = [{
    id: 3,
    title: "Content Writing for Blog",
    category: "Writing",
    status: "completed",
    startedAt: "2023-10-01",
    completedAt: "2023-10-15",
    budget: "$200",
    client: "BlogMasters",
    feedback: 4.8
  }, {
    id: 4,
    title: "Logo Design",
    category: "Graphic Design",
    status: "completed",
    startedAt: "2023-09-15",
    completedAt: "2023-09-30",
    budget: "$150",
    client: "StartupBrands",
    feedback: 5.0
  }, {
    id: 5,
    title: "SEO Optimization",
    category: "Digital Marketing",
    status: "completed",
    startedAt: "2023-08-20",
    completedAt: "2023-09-10",
    budget: "$300",
    client: "GrowthDigital",
    feedback: 4.5
  }];
  
  return <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-[26px] py-[35px]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">My Exchange</h1>
                <p className="text-gray-600 mt-1">Manage your active and completed exchanges</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md">
              <TabsTrigger value="active">Active Exchanges ({activeJobs.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed Exchanges ({completedJobs.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="space-y-4">
                {activeJobs.length === 0 ? <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Exchanges</h3>
                      <p className="text-gray-500 text-center max-w-md mb-6">
                        You don't have any active exchanges at the moment. Browse available exchanges to find your next opportunity.
                      </p>
                      <Link to="/task-hub">
                        <Button>Find Exchanges</Button>
                      </Link>
                    </CardContent>
                  </Card> : activeJobs.map(job => <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                              <span>{job.category}</span>
                              <span>•</span>
                              <span>Client: {job.client}</span>
                            </div>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            In Progress
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Started: {job.startedAt}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Deadline: {job.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Budget: {job.budget}</span>
                          </div>
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
                    </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="space-y-4">
                {completedJobs.length === 0 ? <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Exchanges</h3>
                      <p className="text-gray-500 text-center max-w-md mb-6">
                        You haven't completed any exchanges yet. Start by applying to available exchanges.
                      </p>
                      <Link to="/task-hub">
                        <Button>Find Exchanges</Button>
                      </Link>
                    </CardContent>
                  </Card> : completedJobs.map(job => <Card key={job.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                              <span>{job.category}</span>
                              <span>•</span>
                              <span>Client: {job.client}</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Completed: {job.completedAt}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Budget: {job.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Rating: {job.feedback}/5.0</span>
                          </div>
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
                    </Card>)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>;
};

export default MyJobs;
