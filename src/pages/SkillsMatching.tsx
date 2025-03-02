
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Paintbrush,
  TrendingUp,
  UserCircle,
  Heart,
  Plus,
  X,
  Sparkles,
  Search,
  DollarSign,
  BookIcon,
  Settings,
  Laptop,
  Languages,
  Calculator,
  LifeBuoy
} from "lucide-react";

// Mock data for skills categories
const skillCategories = [
  { id: "academic", name: "Academic", icon: BookOpen },
  { id: "coding", name: "Coding", icon: Code },
  { id: "design", name: "Design", icon: Paintbrush },
  { id: "marketing", name: "Marketing", icon: TrendingUp },
  { id: "language", name: "Language", icon: Languages },
  { id: "math", name: "Mathematics", icon: Calculator },
  { id: "support", name: "Tech Support", icon: LifeBuoy },
];

// Mock data for skills
const availableSkills = {
  academic: ["Research", "Essay Writing", "Mathematics", "Physics", "History", "Literature"],
  coding: ["JavaScript", "Python", "React", "Node.js", "CSS", "HTML", "TypeScript"],
  design: ["UI/UX", "Graphic Design", "Logo Design", "Illustration", "Photoshop", "Figma"],
  marketing: ["Social Media", "Content Writing", "SEO", "Email Marketing", "Analytics", "Branding"],
  language: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
  math: ["Calculus", "Statistics", "Algebra", "Geometry", "Trigonometry"],
  support: ["Hardware Troubleshooting", "Network Setup", "Software Installation", "Data Recovery"],
};

// Mock budgets for filtering
const budgetOptions = [
  { value: "any", label: "Any Budget" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "under50", label: "Under $50" },
  { value: "50to100", label: "$50-$100" },
  { value: "over100", label: "Over $100" },
];

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    initials: "AJ",
    skills: ["JavaScript", "React", "CSS"],
    learning: ["Python", "UI/UX", "TypeScript"],
    rating: 4.8,
    matchScore: 92,
  },
  {
    id: 2,
    name: "Taylor Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    initials: "TS",
    skills: ["Python", "Research", "Mathematics"],
    learning: ["JavaScript", "React", "Content Writing"],
    rating: 4.5,
    matchScore: 87,
  },
  {
    id: 3,
    name: "Jordan Lee",
    avatar: "https://i.pravatar.cc/150?img=3",
    initials: "JL",
    skills: ["UI/UX", "Figma", "Graphic Design"],
    learning: ["JavaScript", "React", "HTML"],
    rating: 4.9,
    matchScore: 85,
  },
  {
    id: 4,
    name: "Morgan Rivera",
    avatar: "https://i.pravatar.cc/150?img=4",
    initials: "MR",
    skills: ["Content Writing", "SEO", "Social Media"],
    learning: ["Graphic Design", "UI/UX", "Photoshop"],
    rating: 4.7,
    matchScore: 81,
  },
  {
    id: 5,
    name: "Jamie Smith",
    avatar: "https://i.pravatar.cc/150?img=6",
    initials: "JS",
    skills: ["Design", "Writing"],
    learning: ["Programming", "Math"],
    rating: 4.9,
    matchScore: 92,
  },
  {
    id: 6,
    name: "Morgan Lee",
    avatar: "https://i.pravatar.cc/150?img=7",
    initials: "ML",
    skills: ["Language", "Writing"],
    learning: ["Programming", "Tech Support"],
    rating: 4.7,
    matchScore: 78,
  },
  {
    id: 7,
    name: "Casey Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    initials: "CW",
    skills: ["TypeScript", "Node.js", "React"],
    learning: ["Python", "SEO", "Analytics"],
    rating: 4.6,
    matchScore: 78,
  },
];

// Mock tasks
const mockTasks = [
  {
    id: 1,
    title: "Python Programming Tutoring",
    category: "Tutoring",
    budget: 50,
    creator: "Alex Johnson",
    description: "Need help learning Python basics and data structures",
  },
  {
    id: 2,
    title: "Website Design Project",
    category: "Design",
    budget: 75,
    creator: "Jamie Smith",
    description: "Looking for help creating a personal portfolio website",
  },
  {
    id: 3,
    title: "Computer Setup and Troubleshooting",
    category: "Tech Support",
    budget: 100,
    creator: "Morgan Lee",
    description: "Need assistance setting up a new laptop and transferring data",
  },
];

const SkillsMatching = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("coding");
  const [userSkills, setUserSkills] = useState<string[]>(["JavaScript", "React"]);
  const [learningGoals, setLearningGoals] = useState<string[]>(["Python", "UI/UX"]);
  const [newSkill, setNewSkill] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [recommendations, setRecommendations] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [activeTab, setActiveTab] = useState("profile");

  // Function to add a new skill
  const handleAddSkill = () => {
    if (newSkill && !userSkills.includes(newSkill)) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill("");
      
      // Recalculate recommendations
      updateRecommendations([...userSkills, newSkill], learningGoals);
      
      toast({
        title: "Skill added",
        description: `${newSkill} has been added to your skills.`,
      });
    }
  };

  // Function to remove a skill
  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = userSkills.filter((s) => s !== skill);
    setUserSkills(updatedSkills);
    
    // Recalculate recommendations
    updateRecommendations(updatedSkills, learningGoals);
  };

  // Function to add a new learning goal
  const handleAddLearningGoal = () => {
    if (newGoal && !learningGoals.includes(newGoal)) {
      setLearningGoals([...learningGoals, newGoal]);
      setNewGoal("");
      
      // Recalculate recommendations
      updateRecommendations(userSkills, [...learningGoals, newGoal]);
      
      toast({
        title: "Learning goal added",
        description: `${newGoal} has been added to your learning goals.`,
      });
    }
  };

  // Function to remove a learning goal
  const handleRemoveLearningGoal = (goal: string) => {
    const updatedGoals = learningGoals.filter((g) => g !== goal);
    setLearningGoals(updatedGoals);
    
    // Recalculate recommendations
    updateRecommendations(userSkills, updatedGoals);
  };

  // Function to update recommendations based on skills and learning goals
  const updateRecommendations = (skills: string[], goals: string[]) => {
    // Simple matching algorithm:
    // 1. Find users who have skills that match your learning goals
    // 2. Find users who want to learn skills that you have
    // 3. Calculate a match score based on the number of matches

    const updatedRecommendations = mockUsers.map(user => {
      let matchScore = 0;
      
      // Check if user has skills that match your learning goals
      goals.forEach(goal => {
        if (user.skills.includes(goal)) {
          matchScore += 10;
        }
      });
      
      // Check if user wants to learn skills that you have
      skills.forEach(skill => {
        if (user.learning.includes(skill)) {
          matchScore += 10;
        }
      });
      
      return {
        ...user,
        matchScore: Math.min(matchScore, 100)
      };
    });
    
    // Sort recommendations by match score (highest first)
    updatedRecommendations.sort((a, b) => b.matchScore - a.matchScore);
    
    setRecommendations(updatedRecommendations);
  };

  // Function to handle user connections
  const handleConnect = (userId: number) => {
    toast({
      title: "Connection request sent",
      description: "The user will be notified of your interest to connect",
    });
  };

  // Initialize recommendations on component mount
  useEffect(() => {
    updateRecommendations(userSkills, learningGoals);
  }, []);

  // Filter tasks based on search query and budget
  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = searchQuery === "" || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesBudget = true;
    if (selectedBudget === "free") {
      matchesBudget = task.budget === 0;
    } else if (selectedBudget === "paid") {
      matchesBudget = task.budget > 0;
    } else if (selectedBudget === "under50") {
      matchesBudget = task.budget < 50;
    } else if (selectedBudget === "50to100") {
      matchesBudget = task.budget >= 50 && task.budget <= 100;
    } else if (selectedBudget === "over100") {
      matchesBudget = task.budget > 100;
    }
    
    return matchesSearch && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Student Skill Swap</h1>
            <p className="text-gray-600 mt-2">Find help or offer your skills to fellow students</p>
          </div>
          
          <Tabs 
            defaultValue="profile" 
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-8">
              <TabsTrigger value="profile">My Skills Profile</TabsTrigger>
              <TabsTrigger value="recommendations">Recommended Matches</TabsTrigger>
              <TabsTrigger value="tasks">Available Tasks</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Skill Preferences</CardTitle>
                  <CardDescription>
                    Set your preferences to find the best skill swap matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Skills I can teach Section */}
                    <div>
                      <h3 className="text-md font-medium mb-4">Skills I can teach:</h3>
                      <div className="mb-4">
                        <div className="flex gap-2 mb-6">
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  <div className="flex items-center gap-2">
                                    <category.icon className="h-4 w-4 text-gray-500" />
                                    <span>{category.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select
                            value={newSkill}
                            onValueChange={setNewSkill}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select skills to teach" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSkills[selectedCategory as keyof typeof availableSkills].map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            onClick={handleAddSkill}
                            disabled={!newSkill}
                            size="icon"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {userSkills.map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="secondary"
                              className="px-3 py-1 flex items-center gap-1"
                            >
                              {skill}
                              <button 
                                className="ml-1 hover:text-destructive"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                          
                          {userSkills.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No skills added yet
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills I want to learn Section */}
                    <div>
                      <h3 className="text-md font-medium mb-4">Skills I want to learn:</h3>
                      <div className="mb-4">
                        <div className="flex gap-2 mb-6">
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  <div className="flex items-center gap-2">
                                    <category.icon className="h-4 w-4 text-gray-500" />
                                    <span>{category.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select
                            value={newGoal}
                            onValueChange={setNewGoal}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select skills to learn" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSkills[selectedCategory as keyof typeof availableSkills].map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            onClick={handleAddLearningGoal}
                            disabled={!newGoal}
                            size="icon"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {learningGoals.map((goal) => (
                            <Badge 
                              key={goal} 
                              variant="outline"
                              className="px-3 py-1 flex items-center gap-1"
                            >
                              {goal}
                              <button 
                                className="ml-1 hover:text-destructive"
                                onClick={() => handleRemoveLearningGoal(goal)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                          
                          {learningGoals.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                              No learning goals added yet
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("recommendations")}>
                    Find Matches
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Recommended Skill Matches</h2>
                <p className="text-gray-600">Connect with students who can teach what you want to learn and learn what you can teach</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((user) => (
                  <Card key={user.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {user.initials}
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <div className="flex items-center gap-1 text-amber-500">
                            <span>★</span>
                            <span className="text-sm">{user.rating}</span>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            {user.matchScore}% Match
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Can teach:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {user.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Wants to learn:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {user.learning.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-sm">{user.matchScore}% Match</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleConnect(user.id)}
                      >
                        <Heart className="h-4 w-4" />
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {recommendations.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-600">
                    No matches found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Add more skills or learning goals to find potential matches
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Tasks Tab */}
            <TabsContent value="tasks">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>
                <p className="text-gray-600">Browse tasks posted by other students that match your skills</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search tasks..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select
                    value={selectedBudget}
                    onValueChange={setSelectedBudget}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <Card key={task.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          ${task.budget}
                        </Badge>
                      </div>
                      <CardDescription>Posted by {task.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                        {task.category}
                      </Badge>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t pt-4">
                      <Button variant="default" size="sm">
                        Apply
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-600">
                    No tasks match your search
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria or budget filter
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SkillsMatching;
