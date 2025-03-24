
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, ChevronRight, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface JobApplication {
  id: number;
  title: string;
  category: string;
  status: string;
  appliedAt: string;
  rejectedAt?: string;
  budget: string;
  company: string;
}

interface JobApplicationListProps {
  applications: JobApplication[];
  type: "pending" | "rejected";
}

const JobApplicationList = ({ applications, type }: JobApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <BookmarkCheck className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type === "pending" ? "Pending" : "Rejected"} Job Applications
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {type === "pending"
              ? "You don't have any pending job applications. Browse available jobs to apply."
              : "You don't have any rejected job applications."}
          </p>
          {type === "pending" && (
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
      {applications.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
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
              <Badge className={type === "pending" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-red-100 text-red-800 border-red-200"}>
                {type === "pending" ? "Pending" : "Rejected"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Applied: {job.appliedAt}</span>
              </div>
              {type === "rejected" && job.rejectedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Rejected: {job.rejectedAt}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Budget: {job.budget}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline" className="gap-2">
                  View {type === "pending" ? "Application" : "Details"}
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

export default JobApplicationList;
