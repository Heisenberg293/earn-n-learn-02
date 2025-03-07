
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Job } from "../escrow/types";
import { Calendar, Clock, DollarSign, Tag, Users } from "lucide-react";
import BidList from "./BidList";
import BidForm from "./BidForm";
import { useToast } from "@/hooks/use-toast";

interface JobDetailsProps {
  job: Job;
  onUpdateJob: (updatedJob: Job) => void;
  currentUser: string;
}

const JobDetails = ({ job, onUpdateJob, currentUser }: JobDetailsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("details");
  
  const isCreator = job.creator === currentUser;
  const hasUserBid = job.bids.some(bid => bid.bidder === currentUser);

  const handleAcceptBid = (bidId: string) => {
    const updatedBids = job.bids.map(bid => 
      bid.id === bidId 
        ? { ...bid, status: "accepted" as const } 
        : bid.id !== bidId && bid.status === "pending" 
          ? { ...bid, status: "rejected" as const } 
          : bid
    );
    
    const updatedJob = { 
      ...job, 
      bids: updatedBids,
      status: "in-progress" as const
    };
    
    onUpdateJob(updatedJob);
    
    toast({
      title: "Bid Accepted",
      description: "You've accepted the bid and the job is now in progress."
    });
  };

  const handleRejectBid = (bidId: string) => {
    const updatedBids = job.bids.map(bid => 
      bid.id === bidId ? { ...bid, status: "rejected" as const } : bid
    );
    
    const updatedJob = { ...job, bids: updatedBids };
    onUpdateJob(updatedJob);
    
    toast({
      title: "Bid Rejected",
      description: "You've rejected this bid."
    });
  };

  const handleSubmitBid = (bidData: any) => {
    // Create a new bid
    const newBid = {
      id: `bid${Math.floor(Math.random() * 10000)}`,
      jobId: job.id,
      bidder: currentUser,
      amount: bidData.bidType === "skill-exchange" ? 0 : bidData.amount,
      message: bidData.message,
      proposedTimeframe: bidData.proposedTimeframe,
      bidType: bidData.bidType,
      skillOffered: bidData.bidType === "skill-exchange" ? bidData.skillOffered : undefined,
      status: "pending" as const,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedJob = {
      ...job,
      bids: [...job.bids, newBid]
    };
    
    onUpdateJob(updatedJob);
    
    toast({
      title: "Bid Submitted",
      description: "Your bid has been successfully submitted!"
    });
    
    setActiveTab("bids");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={job.status === "open" 
                    ? "bg-green-100 text-green-800" 
                    : job.status === "in-progress" 
                    ? "bg-amber-100 text-amber-800" 
                    : "bg-blue-100 text-blue-800"
                  }
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">Posted by {job.creator}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-lg font-bold">
              <DollarSign className="h-5 w-5" />
              {job.budget.toFixed(2)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="bids">
                Bids ({job.bids.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4 space-y-4">
              <p className="text-gray-700">{job.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>Bids: {job.bids.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span>Category: {job.category}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {!isCreator && job.status === "open" && !hasUserBid && (
                <div className="mt-4">
                  <Button 
                    onClick={() => setActiveTab("bids")}
                    className="w-full"
                  >
                    Place a Bid
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bids" className="pt-4 space-y-6">
              {!isCreator && job.status === "open" && !hasUserBid && (
                <BidForm job={job} onSubmitBid={handleSubmitBid} />
              )}
              
              <BidList 
                bids={job.bids} 
                onAcceptBid={handleAcceptBid}
                onRejectBid={handleRejectBid}
                isCreator={isCreator}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
