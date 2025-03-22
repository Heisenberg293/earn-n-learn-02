
import { useState } from "react";
import { Project, ProjectTask, ProjectMember } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface ProjectTasksProps {
  project: Project;
}

const ProjectTasks = ({ project }: ProjectTasksProps) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<ProjectTask[]>(project.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  
  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed",
        description: task.title,
      });
    }
  };
  
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Task title required",
        description: "Please provide a title for the task",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: ProjectTask = {
      id: String(Date.now()),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      assigneeId: newTaskAssignee || undefined,
      dueDate: newTaskDueDate ? new Date(newTaskDueDate) : undefined,
      createdAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskAssignee("");
    setNewTaskDueDate("");
    
    toast({
      title: "Task added",
      description: `"${newTaskTitle}" has been added to the project`
    });
  };
  
  const getStatusBadge = (task: ProjectTask) => {
    const today = new Date();
    if (task.completed) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    }
    if (task.dueDate && task.dueDate < today) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
    }
    if (task.dueDate && task.dueDate.getTime() - today.getTime() < 86400000 * 2) { // 2 days
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Due Soon</Badge>;
    }
    return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
  };
  
  const findAssignee = (assigneeId?: string) => {
    if (!assigneeId) return null;
    return project.members.find(member => member.id === assigneeId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Tasks</h3>
        <div className="text-sm text-muted-foreground">
          {tasks.filter(task => task.completed).length} of {tasks.length} completed
        </div>
      </div>
      
      {/* Task List */}
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="p-4 border rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={task.completed} 
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-1" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div>{getStatusBadge(task)}</div>
                  </div>
                  
                  <div className="flex mt-3 gap-4 text-sm">
                    {task.assigneeId && (
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={findAssignee(task.assigneeId)?.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {findAssignee(task.assigneeId)?.name.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">
                          {findAssignee(task.assigneeId)?.name || 'Unassigned'}
                        </span>
                      </div>
                    )}
                    
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {task.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-muted-foreground">
            No tasks created yet. Add a task to get started.
          </p>
        )}
      </div>
      
      {/* Add Task Form */}
      <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium">Add a new task</h4>
        <div className="space-y-3">
          <Input 
            placeholder="Task title" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          
          <Textarea 
            placeholder="Description (optional)" 
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="h-20"
          />
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                  {project.members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Input 
                type="date" 
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                placeholder="Due date (optional)"
              />
            </div>
          </div>
          
          <Button onClick={handleAddTask} className="w-full">
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTasks;
