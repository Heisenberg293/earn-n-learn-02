
import { useState } from "react";
import { TaskPost } from "../types/financial-types";
import { mockTaskPosts } from "../data/financial-data";
import TaskStats from "./tasks/TaskStats";
import TaskPostForm from "./tasks/TaskPostForm";
import TaskList from "./tasks/TaskList";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TaskDashboard = () => {
  const [taskPosts, setTaskPosts] = useState<TaskPost[]>(mockTaskPosts);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = taskPosts.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusCountByType = (status: string) => {
    return taskPosts.filter(task => task.status === status).length;
  };

  return (
    <div className="space-y-8">
      {/* Task Statistics */}
      <TaskStats getStatusCountByType={getStatusCountByType} />
      
      {/* Task Post Form */}
      <TaskPostForm setTaskPosts={setTaskPosts} taskPosts={taskPosts} />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Your Tasks</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Search tasks..."
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
        
        {/* Task List */}
        <TaskList 
          filteredTasks={filteredTasks} 
          setTaskPosts={setTaskPosts} 
          taskPosts={taskPosts} 
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
