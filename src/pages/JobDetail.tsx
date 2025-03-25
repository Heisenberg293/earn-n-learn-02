
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Tag, 
  User, 
  MessageCircle, 
  ChevronLeft,
  Users,
  Star,
  CheckCircle,
  Edit,
  Pause,
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"owner" | "applicant">("owner"); // For demo, this should be determined by backend
  const [activeTab, setActiveTab] = useState("details");
  const [jobStatus, setJobStatus] = useState("in-progress");
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Sample job data
      setJob({
        id: Number(id),
        title: "Website Development for E-commerce",
        category: "Web Development",
        status: "in-progress",
        startedAt: "2023-11-15",
        deadline: "2023-12-15",
        budget: "$750",
        client: "TechVentures Inc.",
        description: "Looking for an experienced web developer to create a responsive e-commerce website with multiple product categories, user accounts, shopping cart functionality, and payment processing integration. The website should be built using React for the frontend and Node.js for the backend. The design should be modern, clean, and user-friendly. The project includes initial design mockups, responsive layouts, product listing pages, product detail pages, user profile section, and order management.",
        skills: ["React", "Node.js", "MongoDB", "UI/UX Design", "API Integration"],
        applicationDate: "2023-11-10",
        contactPerson: "Jane Smith",
        clientRating: 4.5,
        reviewCount: 12,
        applicants: [
          { id: 1, name: "Alex Johnson", skills: ["React", "Node.js"], status: "pending" },
          { id: 2, name: "Maria Rodriguez", skills: ["React", "MongoDB"], status: "pending" },
          { id: 3, name: "David Lee", skills: ["UI/UX Design", "React"], status: "pending" },
        ],
        milestones: [
          { id: 1, title: "Design Approval", dueDate: "2023-11-20", completed: true },
          { id: 2, title: "Backend Completion", dueDate: "2023-12-05", completed: false },
          { id: 3, title: "Final Review", dueDate: "2023-12-12", completed: false },
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Simulate toggling between owner/applicant view (for demo purposes)
  const toggleViewMode = () => {
    setViewMode(viewMode === "owner" ? "applicant" : "owner");
  };

  const handleStatusChange = (newStatus: string) => {
    setJobStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Job status has been changed to ${newStatus}`
    });
  };

  const handleApplicantAction = (applicantId: number, action: "accept" | "reject") => {
    if (job) {
      const updatedApplicants = job.applicants.map((applicant: any) => 
        applicant.id === applicantId 
          ? { ...applicant, status: action === "accept" ? "accepted" : "rejected" } 
          : applicant
      );
      
      setJob({ ...job, applicants: updatedApplicants });
      
      toast({
        title: action === "accept" ? "Applicant Accepted" : "Applicant Rejected",
        description: `You have ${action === "accept" ? "accepted" : "rejected"} the applicant`
      });
    }
  };

  const handleWithdrawApplication = () => {
    toast({
      title: "Application Withdrawn",
      description: "Your application has been successfully withdrawn."
    });
    navigate("/applied-jobs");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                className="gap-2" 
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              {/* For demo purposes only - toggle between views */}
              <Button variant="outline" onClick={toggleViewMode}>
                Switch to {viewMode === "owner" ? "Applicant" : "Owner"} View
              </Button>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge>{job.category}</Badge>
                  {viewMode === "owner" ? (
                    <Select value={jobStatus} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="outline" className={
                      job.status === "completed" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : job.status === "in-progress" 
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-blue-100 text-blue-800 border-blue-200"
                    }>
                      {job.status === "in-progress" ? "In Progress" : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  )}
                </div>
                
                {viewMode === "applicant" && (
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Your Status: Pending
                    </Badge>
                    <span className="text-sm text-gray-500">Applied on: {job.applicationDate}</span>
                  </div>
                )}
              </div>
              <div className="text-xl font-bold text-green-600">{job.budget}</div>
            </div>
            
            {viewMode === "owner" && (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Job
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Pause className="h-4 w-4" />
                  Pause Applications
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Mark Completed
                </Button>
              </div>
            )}
            
            {viewMode === "applicant" && (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleWithdrawApplication}>
                  <AlertTriangle className="h-4 w-4" />
                  Withdraw Application
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message Client
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {viewMode === "owner" ? (
                <Card>
                  <CardHeader>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="details">Job Details</TabsTrigger>
                        <TabsTrigger value="applicants">
                          Applicants ({job.applicants.length})
                        </TabsTrigger>
                        <TabsTrigger value="messages">Messages</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="details" className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Description</h3>
                        <p className="text-gray-700">{job.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="text-gray-500 block">Start Date</span>
                            <span>{job.startedAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="text-gray-500 block">Deadline</span>
                            <span>{job.deadline}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="text-gray-500 block">Budget</span>
                            <span>{job.budget}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-gray-500" />
                          <div>
                            <span className="text-gray-500 block">Category</span>
                            <span>{job.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Progress Tracking</h3>
                        <div className="space-y-3">
                          {job.milestones.map((milestone: any) => (
                            <div key={milestone.id} className="flex items-center gap-3">
                              <div className={`h-5 w-5 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                {milestone.completed ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <span className={milestone.completed ? 'text-gray-700' : 'text-gray-600'}>
                                    {milestone.title}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {milestone.dueDate}
                                  </span>
                                </div>
                                {!milestone.completed && (
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                    <div className="bg-blue-600 h-1.5 rounded-full w-1/3"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="applicants">
                      {job.applicants.length > 0 ? (
                        <div className="space-y-4">
                          {job.applicants.map((applicant: any) => (
                            <Card key={applicant.id} className="border border-gray-200">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                                      <User className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">{applicant.name}</h4>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {applicant.skills.map((skill: string, index: number) => (
                                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge variant={
                                    applicant.status === "accepted" ? "success" : 
                                    applicant.status === "rejected" ? "destructive" : "outline"
                                  }>
                                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                  </Badge>
                                </div>
                                
                                {applicant.status === "pending" && (
                                  <div className="flex justify-end gap-2 mt-4">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleApplicantAction(applicant.id, "reject")}
                                    >
                                      Reject
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => handleApplicantAction(applicant.id, "accept")}
                                    >
                                      Hire
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-600 mb-2">
                            No Applicants Yet
                          </h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            Once users apply for your job, they will appear here.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="messages">
                      <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                          Message Center
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-4">
                          You can communicate with applicants directly from here.
                        </p>
                        <Button>Message All Applicants</Button>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{job.description}</p>
                    
                    <h3 className="font-semibold mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-gray-500 block">Start Date</span>
                          <span>{job.startedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-gray-500 block">Deadline</span>
                          <span>{job.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-gray-500 block">Budget</span>
                          <span>{job.budget}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <div>
                          <span className="text-gray-500 block">Category</span>
                          <span>{job.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h3 className="font-semibold mb-2">Next Steps</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>If hired, the client will contact you within 48 hours.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Ensure your calendar and availability are up to date.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Prepare any relevant portfolio items to share with the client.</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{viewMode === "owner" ? "Client Information" : "About the Client"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{job.client}</h3>
                      <p className="text-sm text-gray-500">Client</p>
                    </div>
                  </div>
                  
                  {viewMode === "owner" ? (
                    <div className="text-sm space-y-3">
                      <div>
                        <p className="text-gray-500">Contact Person</p>
                        <p className="font-medium">{job.contactPerson}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Application Date</p>
                        <p className="font-medium">{job.applicationDate}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm space-y-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="font-medium">{job.clientRating}</span>
                        <span className="text-gray-500">({job.reviewCount} reviews)</span>
                      </div>
                      <p className="text-gray-600">
                        This client has been a member since 2022 and has completed 15 projects.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {viewMode === "owner" ? "Message All Applicants" : "Contact Client"}
                  </Button>
                  
                  {viewMode === "owner" && job.status === "in-progress" && (
                    <Button variant="outline" className="w-full">
                      Update Progress
                    </Button>
                  )}
                  
                  {viewMode === "applicant" && job.status === "open" && (
                    <Button variant="outline" className="w-full">
                      Share Portfolio
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;
