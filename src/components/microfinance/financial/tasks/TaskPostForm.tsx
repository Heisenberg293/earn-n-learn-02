
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { TaskPost } from "../../types/financial-types";

interface TaskPostFormProps {
  setTaskPosts: React.Dispatch<React.SetStateAction<TaskPost[]>>;
  taskPosts: TaskPost[];
}

const TaskPostForm = ({ setTaskPosts, taskPosts }: TaskPostFormProps) => {
  const [newTask, setNewTask] = useState<Partial<TaskPost>>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
    status: "open",
    skills: []
  });
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

  return (
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
  );
};

export default TaskPostForm;
