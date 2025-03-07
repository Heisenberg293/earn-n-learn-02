
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "./escrow/types";
import { getJobsWithBids } from "./escrow/mock-bids";
import JobList from "./bidding/JobList";
import JobDetails from "./bidding/JobDetails";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BiddingSystem = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(getJobsWithBids());
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "my-jobs" | "my-bids">("all");
  
  // For demo purposes, hardcode the current user
  const currentUser = "You";
  
  const selectedJob = selectedJobId 
    ? jobs.find(job => job.id === selectedJobId)
    : null;
  
  const handleViewJob = (jobId: string) => {
    setSelectedJobId(jobId);
  };
  
  const handleBackToJobs = () => {
    setSelectedJobId(null);
  };
  
  const handleUpdateJob = (updatedJob: Job) => {
    const updatedJobs = jobs.map(job =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobs(updatedJobs);
  };
  
  const filteredJobs = (() => {
    switch (activeTab) {
      case "my-jobs":
        return jobs.filter(job => job.creator === currentUser);
      case "my-bids":
        return jobs.filter(job => 
          job.bids.some(bid => bid.bidder === currentUser)
        );
      default:
        return jobs;
    }
  })();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {selectedJobId ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToJobs}
                  className="p-0 h-8 w-8"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                Job Details
              </div>
            ) : (
              "Bidding Marketplace"
            )}
          </CardTitle>
          <CardDescription>
            {selectedJobId 
              ? "View job details and manage bids" 
              : "Browse available jobs and place bids"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedJobId && selectedJob ? (
            <JobDetails 
              job={selectedJob} 
              onUpdateJob={handleUpdateJob}
              currentUser={currentUser}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={(value: typeof activeTab) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="my-jobs">My Posted Jobs</TabsTrigger>
                <TabsTrigger value="my-bids">My Bids</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="pt-4">
                <JobList 
                  jobs={filteredJobs} 
                  onViewJob={handleViewJob}
                  currentUser={currentUser}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BiddingSystem;
