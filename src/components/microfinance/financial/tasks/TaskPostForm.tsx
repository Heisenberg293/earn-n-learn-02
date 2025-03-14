
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { JobPost } from "../../types/financial-types";

interface JobPostFormProps {
  setJobPosts: React.Dispatch<React.SetStateAction<JobPost[]>>;
  jobPosts: JobPost[];
}

const JobPostForm = ({ setJobPosts, jobPosts }: JobPostFormProps) => {
  const [newJob, setNewJob] = useState<Partial<JobPost>>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
    status: "open",
    skills: []
  });
  const [skillInput, setSkillInput] = useState("");

  const handleAddJob = () => {
    if (!newJob.title || !newJob.description || !newJob.budget || !newJob.deadline) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const job: JobPost = {
      id: `tp${Date.now()}`,
      title: newJob.title || "",
      description: newJob.description || "",
      budget: Number(newJob.budget) || 0,
      deadline: newJob.deadline || "",
      status: "open",
      skills: newJob.skills || [],
      applicants: 0
    };

    setJobPosts([job, ...jobPosts]);
    setNewJob({
      title: "",
      description: "",
      budget: 0,
      deadline: "",
      status: "open",
      skills: []
    });
    
    toast({
      title: "Job posted",
      description: "Your job has been successfully posted"
    });
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    
    if (!newJob.skills) {
      setNewJob({ ...newJob, skills: [skillInput.trim()] });
    } else {
      setNewJob({ ...newJob, skills: [...newJob.skills, skillInput.trim()] });
    }
    
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!newJob.skills) return;
    
    setNewJob({
      ...newJob,
      skills: newJob.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>Describe what you need help with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              placeholder="e.g., Website Development for Student Club"
              value={newJob.title || ""}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="job-description">Description</Label>
            <Textarea
              id="job-description"
              placeholder="Describe your job in detail..."
              rows={4}
              value={newJob.description || ""}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-budget">Budget ($)</Label>
              <Input
                id="job-budget"
                type="number"
                placeholder="150"
                value={newJob.budget || ""}
                onChange={(e) => setNewJob({ ...newJob, budget: parseFloat(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job-deadline">Deadline</Label>
              <Input
                id="job-deadline"
                type="date"
                value={newJob.deadline || ""}
                onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="job-skills">Required Skills</Label>
            <div className="flex gap-2">
              <Input
                id="job-skills"
                placeholder="e.g., React, Design, Writing"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newJob.skills?.map((skill, index) => (
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
          
          <Button onClick={handleAddJob} className="w-full">
            Post Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
