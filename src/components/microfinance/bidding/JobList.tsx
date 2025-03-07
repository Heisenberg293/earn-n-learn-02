
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "../escrow/types";
import { Calendar, DollarSign, Search, Tag, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

interface JobListProps {
  jobs: Job[];
  onViewJob: (jobId: string) => void;
  currentUser: string;
}

const JobList = ({ jobs, onViewJob, currentUser }: JobListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || job.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(jobs.map(job => job.category))];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" 
                ? "All Categories" 
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="bg-gray-50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No jobs found matching your criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
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
                      <span className="text-xs text-gray-500">
                        {job.creator === currentUser ? "Posted by You" : `Posted by ${job.creator}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-bold">
                    <DollarSign className="h-5 w-5" />
                    {job.budget.toFixed(2)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {job.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="h-3 w-3" />
                    Bids: {job.bids.length}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Tag className="h-3 w-3" />
                    {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button 
                  onClick={() => onViewJob(job.id)}
                  variant="outline" 
                  className="w-full"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
