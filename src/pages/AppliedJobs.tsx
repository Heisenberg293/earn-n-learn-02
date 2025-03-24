
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, ChevronRight, Clock, DollarSign, ArrowLeft, Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeSection, setActiveSection] = useState("jobs");
  const navigate = useNavigate();
  
  // Pending job applications
  const pendingApplications = [{
    id: 1,
    title: "Frontend Developer for E-commerce Project",
    category: "Web Development",
    status: "pending",
    appliedAt: "2023-11-28",
    budget: "$800-1200",
    company: "TechEcommerce"
  }, {
    id: 2,
    title: "UI/UX Designer for Mobile App",
    category: "Design",
    status: "pending",
    appliedAt: "2023-11-25",
    budget: "$500-700",
    company: "AppSolutions"
  }, {
    id: 3,
    title: "Content Writer for SaaS Blog",
    category: "Content Writing",
    status: "pending",
    appliedAt: "2023-11-20",
    budget: "$300-500",
    company: "SaaSPlatform"
  }];
  
  // Pending skill applications
  const pendingSkillApplications = [{
    id: 101,
    title: "Web Development Tutoring",
    category: "Education",
    status: "pending",
    appliedAt: "2023-11-26",
    rate: "$35/hr",
    provider: "CodeAcademy"
  }, {
    id: 102,
    title: "Graphic Design Collaboration",
    category: "Design",
    status: "pending",
    appliedAt: "2023-11-22",
    compensation: "Skill Exchange",
    partner: "DesignHub"
  }];
  
  // Rejected job applications
  const rejectedApplications = [{
    id: 6,
    title: "WordPress Website Development",
    category: "Web Development",
    status: "rejected",
    appliedAt: "2023-11-10",
    rejectedAt: "2023-11-15",
    budget: "$300-500",
    company: "LocalBusiness"
  }, {
    id: 7,
    title: "Logo Design for Startup",
    category: "Graphic Design",
    status: "rejected",
    appliedAt: "2023-11-05",
    rejectedAt: "2023-11-12",
    budget: "$100-300",
    company: "NewStartup"
  }];
  
  // Rejected skill applications
  const rejectedSkillApplications = [{
    id: 103,
    title: "Data Analysis Workshop",
    category: "Data Science",
    status: "rejected",
    appliedAt: "2023-11-08",
    rejectedAt: "2023-11-14",
    compensation: "Certificate + $100",
    organization: "DataScientists"
  }];
  
  return <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16 py-[35px]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <BookmarkCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Applied Exchange</h1>
                <p className="text-gray-600 mt-1">Track the status of your applications</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md">
              <TabsTrigger value="pending">Pending ({pendingApplications.length + pendingSkillApplications.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedApplications.length + rejectedSkillApplications.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({pendingApplications.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({pendingSkillApplications.length})</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TabsContent value="jobs" className="mt-0">
                <div className="space-y-4">
                  {pendingApplications.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <BookmarkCheck className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Job Applications</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You don't have any pending job applications. Browse available jobs to apply.
                        </p>
                        <Link to="/task-hub">
                          <Button>Find Jobs</Button>
                        </Link>
                      </CardContent>
                    </Card> : pendingApplications.map(job => <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{job.category}</span>
                                <span>•</span>
                                <span>Company: {job.company}</span>
                              </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Pending
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Applied: {job.appliedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Budget: {job.budget}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/jobs/${job.id}`}>
                              <Button variant="outline" className="gap-2">
                                View Application
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
                  {pendingSkillApplications.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Coins className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Skill Applications</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          You don't have any pending skill exchange applications.
                        </p>
                        <Link to="/task-hub">
                          <Button>Find Skill Exchanges</Button>
                        </Link>
                      </CardContent>
                    </Card> : pendingSkillApplications.map(skill => <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{skill.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{skill.category}</span>
                                <span>•</span>
                                <span>{skill.provider ? `Provider: ${skill.provider}` : `Partner: ${skill.partner}`}</span>
                              </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Pending
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Applied: {skill.appliedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Compensation: {skill.rate || skill.compensation}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Link to={`/skills/${skill.id}`}>
                              <Button variant="outline" className="gap-2">
                                View Application
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>)}
                </div>
              </TabsContent>
            </TabsContent>
            
            <TabsContent value="rejected">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({rejectedApplications.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({rejectedSkillApplications.length})</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TabsContent value="jobs" className="mt-0">
                <div className="space-y-4">
                  {rejectedApplications.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <BookmarkCheck className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Rejected Job Applications</h3>
                        <p className="text-gray-500 text-center max-w-md">
                          You don't have any rejected job applications.
                        </p>
                      </CardContent>
                    </Card> : rejectedApplications.map(job => <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{job.category}</span>
                                <span>•</span>
                                <span>Company: {job.company}</span>
                              </div>
                            </div>
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              Rejected
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Applied: {job.appliedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Rejected: {job.rejectedAt}</span>
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
                  {rejectedSkillApplications.length === 0 ? <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Coins className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Rejected Skill Applications</h3>
                        <p className="text-gray-500 text-center max-w-md">
                          You don't have any rejected skill exchange applications.
                        </p>
                      </CardContent>
                    </Card> : rejectedSkillApplications.map(skill => <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{skill.title}</h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span>{skill.category}</span>
                                <span>•</span>
                                <span>Organization: {skill.organization}</span>
                              </div>
                            </div>
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              Rejected
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Applied: {skill.appliedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Rejected: {skill.rejectedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Coins className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium">Compensation: {skill.compensation}</span>
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>;
};

export default AppliedJobs;
