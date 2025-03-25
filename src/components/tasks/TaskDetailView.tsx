
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Clock, Tag, DollarSign, MessageCircle, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

interface JobDetailViewProps {
  job: Job | null;
  onClose: () => void;
  onUpdateJobStatus: (jobId: number, status: "accepted" | "rejected") => void;
}

export const JobDetailView = ({ job, onClose, onUpdateJobStatus }: JobDetailViewProps) => {
  const { toast } = useToast();

  if (!job) return null;

  const handleAccept = () => {
    onUpdateJobStatus(job.id, "accepted");
    toast({
      title: "Job Accepted",
      description: "You have accepted this job. The poster will be notified.",
    });
  };

  const handleReject = () => {
    onUpdateJobStatus(job.id, "rejected");
    toast({
      title: "Job Declined",
      description: "You have declined this job.",
    });
  };

  const getStatusBadge = () => {
    switch (job.status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Accepted</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Declined</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Available</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
              <div className="flex gap-2 items-center">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                  {job.category}
                </span>
                <span className="text-xs font-medium text-accent">
                  {job.difficulty}
                </span>
                {getStatusBadge()}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-gray-500 block">Budget</span>
                <span className="font-medium">{job.budget}</span>
              </div>
            </div>
            
            {job.deadline && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-gray-500 block">Deadline</span>
                  <span className="font-medium">{job.deadline}</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-gray-500 block">Category</span>
                <span className="font-medium">{job.category}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-gray-500 block">Difficulty</span>
                <span className="font-medium">{job.difficulty}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-700">{job.description}</p>
          </div>
          
          {job.status === "available" && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold mb-2">What to expect:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Once you accept, the job poster will be notified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>You can communicate with the poster via messaging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Payment is securely held in escrow until completion.</span>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          {job.status === "available" && (
            <>
              <div className="w-full flex gap-2 justify-end">
                <Button variant="outline" onClick={handleReject} className="gap-2">
                  <X className="h-4 w-4" />
                  Decline Job
                </Button>
                <Button onClick={handleAccept} className="gap-2">
                  <Check className="h-4 w-4" />
                  Accept Job
                </Button>
              </div>
              
              <Link 
                to="/communications" 
                state={{ activeTab: "messages", initialChatType: job.status === "available" ? "available" : job.status }}
                className="flex items-center justify-center text-sm text-primary hover:underline cursor-pointer w-full"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat with job poster
              </Link>
            </>
          )}
          
          {job.status !== "available" && (
            <>
              <div className="w-full flex justify-end">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
              
              <Link 
                to="/communications" 
                state={{ activeTab: "messages", initialChatType: job.status }}
                className="flex items-center justify-center text-sm text-primary hover:underline cursor-pointer w-full"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat with job poster
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
