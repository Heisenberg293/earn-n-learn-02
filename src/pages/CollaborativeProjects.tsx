
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users, Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_PROJECTS } from "@/components/projects/mock-data";
import { Project } from "@/components/projects/types";
import { useNavigate } from "react-router-dom";

const CollaborativeProjects = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter projects based on search and filters
  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleViewProject = (projectId: string) => {
    navigate(`/collaborative-projects/${projectId}`);
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Collaborative Projects Hub</h1>
            <p className="text-muted-foreground max-w-2xl">
              Team up with other users to work on exciting projects, share skills, and build your portfolio
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={() => navigate("/collaborative-projects/create")}
          >
            Create New Project
          </Button>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-md">
              <TabsTrigger value="browse">Browse Projects</TabsTrigger>
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="team-finder">Team Finder</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="mt-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search projects by title, description or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => setCategoryFilter(value || null)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setStatusFilter(value || null)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="recruiting">Recruiting</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onViewProject={handleViewProject} 
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-projects" className="mt-6">
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">My Projects</h3>
                <p className="text-muted-foreground mb-4">View projects you've created or joined</p>
                <Button onClick={() => navigate("/collaborative-projects/my-projects")}>
                  View My Projects
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="team-finder" className="mt-6">
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Team Finder</h3>
                <p className="text-muted-foreground mb-4">Find team members that match your project needs based on skills and availability</p>
                <Button onClick={() => navigate("/collaborative-projects/team-finder")}>
                  Open Team Finder
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
        <CardDescription className="line-clamp-2 mt-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
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
            <span>{project.members.length} members · {project.openRoles.filter(role => !role.filled).length} open roles</span>
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

export default CollaborativeProjects;
