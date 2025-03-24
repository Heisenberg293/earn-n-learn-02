
import { useState } from "react";
import { JobPost } from "../types/financial-types";
import { mockTaskPosts } from "../data/financial-data";
import JobStats from "./tasks/TaskStats";
import JobPostForm from "./tasks/TaskPostForm";
import JobList from "./tasks/TaskList";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const JobDashboard = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(mockTaskPosts);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobPosts.filter(job => {
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusCountByType = (status: string) => {
    return jobPosts.filter(job => job.status === status).length;
  };

  return (
    <div className="space-y-8">
      {/* Exchange Statistics */}
      <JobStats getStatusCountByType={getStatusCountByType} />
      
      {/* Exchange Post Form */}
      <JobPostForm setJobPosts={setJobPosts} jobPosts={jobPosts} />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Your Exchanges</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Search exchanges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        {/* Exchange List */}
        <JobList 
          filteredJobs={filteredJobs} 
          setJobPosts={setJobPosts} 
          jobPosts={jobPosts} 
        />
      </div>
    </div>
  );
};

export default JobDashboard;
