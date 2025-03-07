
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskPost } from "../../types/financial-types";
import { toast } from "@/hooks/use-toast";
import { ClipboardList, Clock, DollarSign, Briefcase, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskListProps {
  filteredTasks: TaskPost[];
  setTaskPosts: React.Dispatch<React.SetStateAction<TaskPost[]>>;
  taskPosts: TaskPost[];
}

const TaskList = ({ filteredTasks, setTaskPosts, taskPosts }: TaskListProps) => {
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

  const getStatusClass = (status: TaskPost["status"]): string => {
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

  if (filteredTasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No tasks match your search or filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredTasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{task.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getStatusClass(task.status)}`}>
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
  );
};

export default TaskList;
