import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { mockTaskPosts } from "../data/financial-data";
import { TaskPost } from "../types/financial-types";
import { ClipboardList, Briefcase, Search, BarChart4, Clock, DollarSign, CheckCircle2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TaskDashboard = () => {
  const [taskPosts, setTaskPosts] = useState<TaskPost[]>(mockTaskPosts);
  const [newTask, setNewTask] = useState<Partial<TaskPost>>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
    status: "open",
    skills: []
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.budget || !newTask.deadline) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const task: TaskPost = {
      id: `tp${Date.now()}`,
      title: newTask.title || "",
      description: newTask.description || "",
      budget: Number(newTask.budget) || 0,
      deadline: newTask.deadline || "",
      status: "open",
      skills: newTask.skills || [],
      applicants: 0
    };

    setTaskPosts([task, ...taskPosts]);
    setNewTask({
      title: "",
      description: "",
      budget: 0,
      deadline: "",
      status: "open",
      skills: []
    });
    
    toast({
      title: "Task posted",
      description: "Your task has been successfully posted"
    });
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    
    if (!newTask.skills) {
      setNewTask({ ...newTask, skills: [skillInput.trim()] });
    } else {
      setNewTask({ ...newTask, skills: [...newTask.skills, skillInput.trim()] });
    }
    
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!newTask.skills) return;
    
    setNewTask({
      ...newTask,
      skills: newTask.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleUpdateStatus = (taskId: string, newStatus: "open" | "in-progress" | "completed") => {
    const updatedTasks = taskPosts.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTaskPosts(updatedTasks);
    
    toast({
      title: "Status updated",
      description: `Task status changed to ${newStatus}`
    });
  };

  const filteredTasks = taskPosts.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const renderStatusBadge = (status: TaskPost["status"]) => {
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

  const getStatusCountByType = (status: string) => {
    return taskPosts.filter(task => task.status === status).length;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="text-blue-500" /> Open Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getStatusCountByType("open")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="text-yellow-500" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getStatusCountByType("in-progress")}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getStatusCountByType("completed")}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Post a New Task</CardTitle>
          <CardDescription>Describe what you need help with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                placeholder="e.g., Website Development for Student Club"
                value={newTask.title || ""}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Describe your task in detail..."
                rows={4}
                value={newTask.description || ""}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-budget">Budget ($)</Label>
                <Input
                  id="task-budget"
                  type="number"
                  placeholder="150"
                  value={newTask.budget || ""}
                  onChange={(e) => setNewTask({ ...newTask, budget: parseFloat(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-deadline">Deadline</Label>
                <Input
                  id="task-deadline"
                  type="date"
                  value={newTask.deadline || ""}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-skills">Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  id="task-skills"
                  placeholder="e.g., React, Design, Writing"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <Button type="button" onClick={handleAddSkill}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newTask.skills?.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button 
                      type="button" 
                      className="ml-1 text-gray-600 hover:text-gray-900"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <Button onClick={handleAddTask} className="w-full">
              Post Task
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Your Tasks</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
              prefix={<Search className="h-4 w-4 mr-2" />}
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
        
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${renderStatusBadge(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-bold">
                      <DollarSign className="h-4 w-4" />
                      {task.budget.toFixed(2)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{task.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>Applicants: {task.applicants}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.skills.map((skill, index) => (
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
                      variant={task.status === "open" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, "open")}
                      disabled={task.status === "open"}
                    >
                      Open
                    </Button>
                    <Button
                      variant={task.status === "in-progress" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, "in-progress")}
                      disabled={task.status === "in-progress"}
                    >
                      In Progress
                    </Button>
                    <Button
                      variant={task.status === "completed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus(task.id, "completed")}
                      disabled={task.status === "completed"}
                    >
                      Completed
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {searchTerm || filterStatus !== "all" 
                  ? "No tasks match your search or filter criteria." 
                  : "You don't have any tasks yet. Post one to get started!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
