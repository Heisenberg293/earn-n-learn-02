
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobPost } from "../../types/financial-types";
import { toast } from "@/hooks/use-toast";
import { ClipboardList, Clock, DollarSign, Briefcase, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobListProps {
  filteredJobs: JobPost[];
  setJobPosts: React.Dispatch<React.SetStateAction<JobPost[]>>;
  jobPosts: JobPost[];
}

const JobList = ({ filteredJobs, setJobPosts, jobPosts }: JobListProps) => {
  const handleUpdateStatus = (jobId: string, newStatus: "open" | "in-progress" | "completed") => {
    const updatedJobs = jobPosts.map(job => {
      if (job.id === jobId) {
        return { ...job, status: newStatus };
      }
      return job;
    });
    setJobPosts(updatedJobs);
    
    toast({
      title: "Status updated",
      description: `Job status changed to ${newStatus}`
    });
  };

  const getStatusClass = (status: JobPost["status"]): string => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (filteredJobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No jobs match your search or filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredJobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getStatusClass(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-lg font-bold">
                <DollarSign className="h-4 w-4" />
                {job.budget.toFixed(2)}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{job.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Due: {new Date(job.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-gray-500" />
                <span>Applicants: {job.applicants}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={job.status === "open" ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateStatus(job.id, "open")}
                disabled={job.status === "open"}
              >
                Open
              </Button>
              <Button
                variant={job.status === "in-progress" ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateStatus(job.id, "in-progress")}
                disabled={job.status === "in-progress"}
              >
                In Progress
              </Button>
              <Button
                variant={job.status === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateStatus(job.id, "completed")}
                disabled={job.status === "completed"}
              >
                Completed
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
