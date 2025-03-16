
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { JobBrowser } from "@/components/tasks/TaskBrowser";
import { JobPostForm } from "@/components/tasks/TaskPostForm";
import { JobDetailView } from "@/components/tasks/TaskDetailView";

const TaskHub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Read query parameters
  const jobId = searchParams.get("job");
  const showPostForm = searchParams.get("post") === "true";
  
  useEffect(() => {
    // If "post=true" is in the URL, switch to the post tab
    if (showPostForm) {
      setActiveTab("post");
    }
    
    // If there's a job ID in the URL, find the job and show details
    if (jobId) {
      // This is a mock implementation - in a real app, you'd fetch the job from an API
      const jobs = [
        {
          id: 1,
          title: "Python Programming Assignment",
          category: "coding",
          budget: "$150-300",
          difficulty: "Intermediate",
          description: "Need help with a Python data analysis project involving pandas, matplotlib, and data visualization. The project requires cleaning a dataset, performing exploratory data analysis, and creating visualizations to communicate findings effectively.",
          deadline: "2023-12-15",
          status: "available",
        },
        {
          id: 2,
          title: "Logo Design for Tech Startup",
          category: "design",
          budget: "$200-400",
          difficulty: "Intermediate",
          description: "Create a modern, minimalist logo for a SaaS company focusing on productivity tools. The logo should convey innovation and efficiency while maintaining a clean, professional appearance. Please include at least 3 concepts and be prepared for 2 rounds of revisions.",
          deadline: "2023-12-20",
          status: "available",
        },
        {
          id: 3,
          title: "Research Paper Review",
          category: "academic",
          budget: "$100-200",
          difficulty: "Advanced",
          description: "Review and provide feedback on a 20-page research paper in the field of environmental science. Looking for someone to check methodology, analysis, and conclusions while providing constructive feedback on structure and clarity. Knowledge of climate science preferred.",
          deadline: "2023-12-10",
          status: "available",
        },
      ];
      
      const foundJob = jobs.find(job => job.id === parseInt(jobId));
      if (foundJob) {
        setSelectedJob(foundJob);
      }
    }
  }, [jobId, showPostForm]);
  
  const handleCloseDetails = () => {
    setSelectedJob(null);
    // Remove the job query parameter
    searchParams.delete("job");
    setSearchParams(searchParams);
  };
  
  const handleUpdateJobStatus = (jobId: number, status: "accepted" | "rejected") => {
    if (!selectedJob) return;
    
    setSelectedJob({
      ...selectedJob,
      status
    });
  };
  
  const handlePostSuccess = () => {
    // Switch to browse tab after posting
    setActiveTab("browse");
    // Clear the post parameter
    searchParams.delete("post");
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container pt-24 pb-16 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Job Hub</h1>
          <p className="text-muted-foreground mb-8">
            Find the perfect task or offer your skills to others
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
              <TabsTrigger value="post">Post a Job</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <JobBrowser />
            </TabsContent>

            <TabsContent value="post">
              <JobPostForm onSuccess={handlePostSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {selectedJob && (
        <JobDetailView 
          job={selectedJob} 
          onClose={handleCloseDetails}
          onUpdateJobStatus={handleUpdateJobStatus}
        />
      )}
    </div>
  );
};

export default TaskHub;
