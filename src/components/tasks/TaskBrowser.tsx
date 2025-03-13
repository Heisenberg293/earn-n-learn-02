
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Code,
  Paintbrush,
  TrendingUp,
  Search,
} from "lucide-react";

export const TaskBrowser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: null },
    { id: "academic", name: "Academic Help", icon: BookOpen },
    { id: "coding", name: "Coding", icon: Code },
    { id: "design", name: "Design", icon: Paintbrush },
    { id: "marketing", name: "Marketing", icon: TrendingUp },
  ];

  const tasks = [
    {
      id: 1,
      title: "Python Programming Assignment",
      category: "coding",
      budget: "$150-300",
      difficulty: "Intermediate",
      description: "Need help with a Python data analysis project",
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      category: "design",
      budget: "$200-400",
      difficulty: "Intermediate",
      description: "Create a modern, minimalist logo for a SaaS company",
    },
    {
      id: 3,
      title: "Research Paper Review",
      category: "academic",
      budget: "$100-200",
      difficulty: "Advanced",
      description: "Review and provide feedback on a 20-page research paper",
    },
    {
      id: 4,
      title: "Social Media Strategy",
      category: "marketing",
      budget: "$300-600",
      difficulty: "Beginner",
      description: "Develop a social media content calendar and strategy",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-2xl font-semibold">Available Tasks</h2>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    {category.icon && (
                      <category.icon className="h-4 w-4 text-gray-500" />
                    )}
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                {categories.find((c) => c.id === task.category)?.name}
              </span>
              <span className="text-xs font-medium text-accent">
                {task.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{task.description}</p>
            <p className="text-gray-600 mb-4 text-sm font-medium">
              Budget: {task.budget}
            </p>
            
            <button className="w-full px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-600">
            No tasks found matching your criteria
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};
