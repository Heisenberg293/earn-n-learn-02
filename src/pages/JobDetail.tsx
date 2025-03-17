
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Tag, 
  User, 
  MessageCircle, 
  ChevronLeft 
} from "lucide-react";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Just a mock job detail for now, in a real app this would come from an API
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
      });
      setLoading(false);
    }, 500);
  }, [id]);
  
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
            <Button 
              variant="ghost" 
              className="gap-2 mb-4" 
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge>{job.category}</Badge>
                  <Badge variant="outline" className={
                    job.status === "completed" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : job.status === "in-progress" 
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }>
                    {job.status === "in-progress" ? "In Progress" : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">{job.budget}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
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
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contact Client
                  </Button>
                  
                  {job.status === "in-progress" && (
                    <Button variant="outline" className="w-full">
                      Update Progress
                    </Button>
                  )}
                  
                  {job.status === "open" && (
                    <Button variant="outline" className="w-full">
                      Apply for this Job
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
