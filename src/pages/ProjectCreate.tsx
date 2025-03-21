
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProjectCreateForm from "@/components/projects/ProjectCreateForm";

const ProjectCreate = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-3 text-muted-foreground"
          onClick={() => navigate("/collaborative-projects")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create a New Project</h1>
          <p className="text-muted-foreground max-w-2xl">
            Define your project details, required skills, and open roles to attract the perfect team
          </p>
        </div>
        
        <ProjectCreateForm />
      </div>
    </div>
  );
};

export default ProjectCreate;
