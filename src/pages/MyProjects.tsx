
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight, Plus } from "lucide-react";
import { MOCK_PROJECTS } from "@/components/projects/mock-data";
import { Project } from "@/components/projects/types";

const MyProjects = () => {
  const navigate = useNavigate();
  
  // Filter to get "my projects" (for demo purposes, we'll just use the first 2 projects)
  const myProjects = MOCK_PROJECTS.slice(0, 2);
  const joinedProjects = MOCK_PROJECTS.slice(2, 4);
  
  const handleViewProject = (projectId: string) => {
    navigate(`/collaborative-projects/${projectId}`);
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Projects</h1>
            <p className="text-muted-foreground max-w-2xl">
              Manage projects you've created or joined
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={() => navigate("/collaborative-projects/create")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </Button>
        </div>
        
        <Tabs defaultValue="created" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="created">Projects I Created</TabsTrigger>
            <TabsTrigger value="joined">Projects I Joined</TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="mt-6">
            {myProjects.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">You haven't created any projects yet</h3>
                <p className="text-muted-foreground mb-4">Start by creating your first collaborative project</p>
                <Button onClick={() => navigate("/collaborative-projects/create")}>
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onViewProject={handleViewProject} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="joined" className="mt-6">
            {joinedProjects.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">You haven't joined any projects yet</h3>
                <p className="text-muted-foreground mb-4">Browse available projects to join a team</p>
                <Button onClick={() => navigate("/collaborative-projects")}>
                  Browse Projects
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onViewProject={handleViewProject} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
}

const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  const statusColors = {
    'recruiting': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800'
  };
  
  const formattedStatus = {
    'recruiting': 'Recruiting',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
          <Badge variant="outline" className={statusColors[project.status]}>
            {formattedStatus[project.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{project.members.length} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Started {new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => onViewProject(project.id)}
        >
          View Project <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyProjects;
