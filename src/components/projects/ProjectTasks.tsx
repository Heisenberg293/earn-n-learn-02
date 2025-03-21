
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar, BarChart, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Project, ProjectTask } from "./types";

interface ProjectTasksProps {
  project: Project;
}

const ProjectTasks = ({ project }: ProjectTasksProps) => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter tasks based on status filter
  const filteredTasks = statusFilter 
    ? project.tasks.filter(task => task.status === statusFilter)
    : project.tasks;
  
  const getTaskStatusColumns = () => {
    const columns = [
      { id: 'todo', title: 'To Do', icon: Clock },
      { id: 'in-progress', title: 'In Progress', icon: BarChart },
      { id: 'review', title: 'Review', icon: AlertCircle },
      { id: 'completed', title: 'Completed', icon: CheckCircle }
    ];
    
    return columns;
  };
  
  const taskColumns = getTaskStatusColumns();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Project Tasks ({project.tasks.length})</h2>
        
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={statusFilter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setStatusFilter(null)}
        >
          All
        </Button>
        {taskColumns.map(column => (
          <Button
            key={column.id}
            variant={statusFilter === column.id ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(column.id)}
          >
            <column.icon className="mr-2 h-4 w-4" />
            {column.title}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taskColumns.map(column => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center text-sm">
                <column.icon className="mr-2 h-4 w-4" />
                {column.title}
              </h3>
              <Badge variant="outline">
                {project.tasks.filter(task => task.status === column.id).length}
              </Badge>
            </div>
            
            {project.tasks
              .filter(task => task.status === column.id)
              .map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  members={project.members}
                />
              ))}
            
            {project.tasks.filter(task => task.status === column.id).length === 0 && (
              <div className="bg-muted/40 rounded-lg p-4 text-center text-sm text-muted-foreground">
                No tasks
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: ProjectTask;
  members: ProjectMember[];
}

const TaskCard = ({ task, members }: TaskCardProps) => {
  const assignedMember = task.assignedTo 
    ? members.find(member => member.id === task.assignedTo)
    : null;
    
  const priorityColors = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-amber-100 text-amber-800',
    'high': 'bg-red-100 text-red-800'
  };
  
  const priorityLabels = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High'
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{task.title}</h4>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {priorityLabels[task.priority]}
          </Badge>
        </div>
        
        {assignedMember ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={assignedMember.avatar} alt={assignedMember.name} />
              <AvatarFallback>{assignedMember.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{assignedMember.name}</span>
          </div>
        ) : (
          <Badge variant="outline" className="bg-muted text-xs">
            Unassigned
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectTasks;
