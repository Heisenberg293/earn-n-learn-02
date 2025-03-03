
import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SkillsSection = () => {
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "UI Design"]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  // Skills management
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      toast.success("Skill added!");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Add skills that you want to showcase</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsEditingSkills(!isEditingSkills)}
        >
          {isEditingSkills ? <Save className="h-4 w-4 mr-2" /> : <Pencil className="h-4 w-4 mr-2" />}
          {isEditingSkills ? "Done" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`px-3 py-1 rounded-full text-sm bg-primary/10 text-primary flex items-center gap-1 ${
                isEditingSkills ? "pr-1" : ""
              }`}
            >
              {skill}
              {isEditingSkills && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1 text-primary hover:text-destructive hover:bg-transparent"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {isEditingSkills && (
          <div className="flex gap-2">
            <Input
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill}>Add</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
