
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, Clock, DollarSign, ArrowLeft, Coins, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeSection, setActiveSection] = useState("jobs");
  const navigate = useNavigate();
  
  // Active jobs data
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
  
  // Active skills data
  const activeSkills = [{
    id: 101,
    title: "Python Programming Tutoring",
    category: "Education",
    status: "active",
    startedAt: "2023-11-10",
    sessions: 5,
    rate: "$40/hr",
    student: "Alex Johnson"
  }];
  
  // Active materials data
  const activeMaterials = [{
    id: 201,
    title: "Programming Textbooks (3)",
    category: "Books",
    status: "for-sale",
    listedAt: "2023-11-05",
    price: "$75",
    condition: "Like New"
  }];
  
  // Completed jobs data
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
  }];
  
  // Completed skills data
  const completedSkills = [{
    id: 102,
    title: "JavaScript Mentorship",
    category: "Education",
    status: "completed",
    startedAt: "2023-09-01",
    completedAt: "2023-10-30",
    sessions: 8,
    student: "Maria Garcia",
    feedback: 4.9
  }];
  
  // Completed materials data
  const completedMaterials = [{
    id: 202,
    title: "Computer Science Notes",
    category: "Academic",
    status: "sold",
    listedAt: "2023-10-01",
    soldAt: "2023-10-12",
    price: "$25",
    buyer: "Chris Williams"
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
              <TabsTrigger value="active">Active Exchanges</TabsTrigger>
              <TabsTrigger value="completed">Completed Exchanges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({activeJobs.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({activeSkills.length})</TabsTrigger>
                  <TabsTrigger value="materials">Materials ({activeMaterials.length})</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TabsContent value="jobs" className="mt-0">
                <div className="space-y-4">
                  {activeJobs.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Jobs</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You don't have any active jobs at the moment. Browse available jobs to find your next opportunity.
                        </p>
                        <Link to="/task-hub">
                          <Button>Find Jobs</Button>
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
              
              <TabsContent value="skills" className="mt-0">
                <div className="space-y-4">
                  {activeSkills.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Coins className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Skills</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You don't have any active skill exchanges at the moment.
                        </p>
                        <Link to="/task-hub">
                          <Button>Offer Skills</Button>
                        </Link>
                      </CardContent>
                    </Card> : activeSkills.map(skill => <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{skill.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{skill.category}</span>
                                <span>•</span>
                                <span>Student: {skill.student}</span>
                              </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Active
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Started: {skill.startedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Sessions: {skill.sessions}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Rate: {skill.rate}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/skills/${skill.id}`}>
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
              
              <TabsContent value="materials" className="mt-0">
                <div className="space-y-4">
                  {activeMaterials.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Package className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Materials</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You don't have any materials listed for exchange at the moment.
                        </p>
                        <Link to="/task-hub">
                          <Button>List Materials</Button>
                        </Link>
                      </CardContent>
                    </Card> : activeMaterials.map(material => <Card key={material.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{material.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{material.category}</span>
                                <span>•</span>
                                <span>Condition: {material.condition}</span>
                              </div>
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                              For Sale
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Listed: {material.listedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Price: {material.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/materials/${material.id}`}>
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
            </TabsContent>
            
            <TabsContent value="completed">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({completedJobs.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({completedSkills.length})</TabsTrigger>
                  <TabsTrigger value="materials">Materials ({completedMaterials.length})</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TabsContent value="jobs" className="mt-0">
                <div className="space-y-4">
                  {completedJobs.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Jobs</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You haven't completed any jobs yet.
                        </p>
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
              
              <TabsContent value="skills" className="mt-0">
                <div className="space-y-4">
                  {completedSkills.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Coins className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Skills</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You haven't completed any skill exchanges yet.
                        </p>
                      </CardContent>
                    </Card> : completedSkills.map(skill => <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{skill.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{skill.category}</span>
                                <span>•</span>
                                <span>Student: {skill.student}</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Completed
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Completed: {skill.completedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Sessions: {skill.sessions}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Rating: {skill.feedback}/5.0</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/skills/${skill.id}`}>
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
              
              <TabsContent value="materials" className="mt-0">
                <div className="space-y-4">
                  {completedMaterials.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Package className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Material Exchanges</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You haven't completed any material exchanges yet.
                        </p>
                      </CardContent>
                    </Card> : completedMaterials.map(material => <Card key={material.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{material.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{material.category}</span>
                                <span>•</span>
                                <span>Buyer: {material.buyer}</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Sold
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Sold: {material.soldAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Listed: {material.listedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Price: {material.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/materials/${material.id}`}>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>;
};

export default MyJobs;
