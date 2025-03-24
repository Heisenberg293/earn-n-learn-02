
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronRight, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  deadline?: string;
  completedAt?: string;
  budget: string;
  client: string;
  feedback?: number;
}

interface JobExchangeListProps {
  jobs: Job[];
  type: "active" | "completed";
}

const JobExchangeList = ({ jobs, type }: JobExchangeListProps) => {
  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type === "active" ? "Active" : "Completed"} Jobs
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {type === "active"
              ? "You don't have any active jobs at the moment. Browse available jobs to find your next opportunity."
              : "You haven't completed any jobs yet."}
          </p>
          {type === "active" && (
            <Link to="/task-hub">
              <Button>Find Jobs</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
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
              <Badge
                className={
                  type === "active"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {type === "active" ? "In Progress" : "Completed"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {type === "active" ? (
                <>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Started: {job.startedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Deadline: {job.deadline}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Completed: {job.completedAt}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Budget: {job.budget}</span>
              </div>
              {type === "completed" && job.feedback && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Rating: {job.feedback}/5.0</span>
                </div>
              )}
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
        </Card>
      ))}
    </div>
  );
};

export default JobExchangeList;
