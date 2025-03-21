
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  FileText, 
  Users, 
  CalendarDays, 
  ClipboardList, 
  Calendar, 
  Clock,
  Briefcase,
  MessagesSquare,
  PlusCircle
} from "lucide-react";
import { MOCK_PROJECTS } from "@/components/projects/mock-data";
import { Project, ProjectTask, ProjectMember } from "@/components/projects/types";
import ProjectTeam from "@/components/projects/ProjectTeam";
import ProjectTasks from "@/components/projects/ProjectTasks";
import ProjectFiles from "@/components/projects/ProjectFiles";
import ProjectChat from "@/components/projects/ProjectChat";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  // Find the project by ID
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/collaborative-projects")}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }
  
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
  
  // Check if current user is a member of the project
  // For demo purposes, let's assume user is not a member yet
  const isMember = false;
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-3 text-muted-foreground"
          onClick={() => navigate("/collaborative-projects")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {formattedStatus[project.status]}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Created by <span className="font-medium text-foreground">{project.owner.name}</span>
                  </div>
                </div>
              </div>
              
              {project.status === 'recruiting' && !isMember && (
                <Button>Apply to Join</Button>
              )}
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">About this Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Category
                    </h3>
                    <p className="text-muted-foreground">{project.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Timeline
                    </h3>
                    <p className="text-muted-foreground">
                      Started: {new Date(project.startDate).toLocaleDateString()}
                      {project.endDate && (
                        <>
                          <br />
                          Completed: {new Date(project.endDate).toLocaleDateString()}
                        </>
                      )}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="team" className="w-full">
              <TabsList>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="files" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessagesSquare className="h-4 w-4" />
                  Team Chat
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="team" className="mt-6">
                <ProjectTeam project={project} />
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-6">
                <ProjectTasks project={project} />
              </TabsContent>
              
              <TabsContent value="files" className="mt-6">
                <ProjectFiles project={project} />
              </TabsContent>
              
              <TabsContent value="chat" className="mt-6">
                <ProjectChat project={project} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Open Roles Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open Roles</CardTitle>
                <CardDescription>
                  {project.openRoles.filter(role => !role.filled).length} positions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                {project.openRoles.filter(role => !role.filled).length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No open roles at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {project.openRoles.filter(role => !role.filled).map((role, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{role.title}</h3>
                        <div className="mb-3">
                          <h4 className="text-sm text-muted-foreground mb-1">Required skills:</h4>
                          <div className="flex flex-wrap gap-1">
                            {role.requiredSkills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" className="w-full">Apply for Role</Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Project Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.members[0].avatar} alt={project.members[0].name} />
                      <AvatarFallback>{project.members[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{project.members[0].name}</span> created task "{project.tasks[0].title}"
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  
                  {project.members.length > 1 && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.members[1].avatar} alt={project.members[1].name} />
                        <AvatarFallback>{project.members[1].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{project.members[1].name}</span> joined the project
                        </p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.owner.avatar} alt={project.owner.name} />
                      <AvatarFallback>{project.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{project.owner.name}</span> created the project
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
