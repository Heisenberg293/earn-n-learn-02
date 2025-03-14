
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Clock, Tag, DollarSign, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  category: string;
  budget: string;
  difficulty: string;
  description: string;
  deadline?: string;
  status?: "available" | "accepted" | "rejected";
}

interface TaskDetailViewProps {
  task: Task | null;
  onClose: () => void;
  onUpdateTaskStatus: (taskId: number, status: "accepted" | "rejected") => void;
}

export const TaskDetailView = ({ task, onClose, onUpdateTaskStatus }: TaskDetailViewProps) => {
  const { toast } = useToast();

  if (!task) return null;

  const handleAccept = () => {
    onUpdateTaskStatus(task.id, "accepted");
    toast({
      title: "Task Accepted",
      description: "You have accepted this task. The poster will be notified.",
    });
  };

  const handleReject = () => {
    onUpdateTaskStatus(task.id, "rejected");
    toast({
      title: "Task Declined",
      description: "You have declined this task.",
    });
  };

  const getStatusBadge = () => {
    switch (task.status) {
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
              <CardTitle className="text-2xl mb-2">{task.title}</CardTitle>
              <div className="flex gap-2 items-center">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                  {task.category}
                </span>
                <span className="text-xs font-medium text-accent">
                  {task.difficulty}
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
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-accent" />
              <span className="font-semibold">Budget:</span>
            </div>
            <span>{task.budget}</span>
          </div>
          
          {task.deadline && (
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-semibold">Deadline:</span>
              </div>
              <span>{task.deadline}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-accent" />
              <span className="font-semibold">Category:</span>
            </div>
            <span>{task.category}</span>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-700">{task.description}</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          {task.status === "available" && (
            <>
              <div className="w-full flex gap-2 justify-end">
                <Button variant="outline" onClick={handleReject} className="gap-2">
                  <X className="h-4 w-4" />
                  Decline Task
                </Button>
                <Button onClick={handleAccept} className="gap-2">
                  <Check className="h-4 w-4" />
                  Accept Task
                </Button>
              </div>
              
              <Link 
                to="/microfinance" 
                state={{ activeTab: "communication", initialChatType: task.status === "accepted" ? "accepted" : "declined" }}
                className="flex items-center justify-center text-sm text-primary hover:underline cursor-pointer w-full"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat with task poster
              </Link>
            </>
          )}
          
          {task.status !== "available" && (
            <>
              <div className="w-full flex justify-end">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
              
              <Link 
                to="/microfinance" 
                state={{ activeTab: "communication", initialChatType: task.status === "accepted" ? "accepted" : "declined" }}
                className="flex items-center justify-center text-sm text-primary hover:underline cursor-pointer w-full"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat with task poster
              </Link>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
