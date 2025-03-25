
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Code, Paintbrush, TrendingUp, Upload } from "lucide-react";

export const PostJobSection = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !budget || !deadline || !difficulty) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
      });
      return;
    }

    // Here you would typically save the job to a database
    toast({
      title: "Job Posted",
      description: "Your job has been posted successfully!",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setBudget("");
    setDeadline("");
    setDifficulty("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="E.g., Logo Design for Tech Startup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Choose a clear, specific title for your job.
            </p>
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md min-h-[120px]"
              placeholder="Provide detailed information about the job requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Be specific about deliverables, timeline, and requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>Academic Help</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="coding">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-gray-500" />
                      <span>Coding</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="design">
                    <div className="flex items-center gap-2">
                      <Paintbrush className="h-4 w-4 text-gray-500" />
                      <span>Design</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="marketing">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span>Marketing</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="budget">Budget Range (USD)</Label>
              <Input
                id="budget"
                placeholder="E.g., $100-200"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter a specific amount or range
              </p>
            </div>

            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Post Job
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
