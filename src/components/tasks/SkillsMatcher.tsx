
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftRight, Book, Box, Code, Paintbrush, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SwapType = "skill" | "material";

interface SwapItem {
  id: number;
  user: string;
  title: string;
  offering: string;
  seeking: string;
  description: string;
  type: SwapType;
  category: string;
}

export const SkillsMatcher = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | SwapType>("all");
  const [swapType, setSwapType] = useState<SwapType>("skill");
  
  // Form data
  const [title, setTitle] = useState("");
  const [offering, setOffering] = useState("");
  const [seeking, setSeeking] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  
  const [swapItems, setSwapItems] = useState<SwapItem[]>([
    {
      id: 1,
      user: "Alex_Student",
      title: "Python for Graphic Design",
      offering: "Python Programming",
      seeking: "Graphic Design Basics",
      description: "I can help you learn Python basics including data structures, functions, and simple applications. Looking for someone to teach me Adobe Photoshop and Illustrator basics.",
      type: "skill",
      category: "coding",
    },
    {
      id: 2,
      user: "DesignPro42",
      title: "Essay Writing for UI Design",
      offering: "UI/UX Design",
      seeking: "Essay Writing and Editing",
      description: "I'm a UI/UX designer willing to teach design principles, wireframing, and prototyping. Need help with academic writing, especially for humanities subjects.",
      type: "skill",
      category: "design",
    },
    {
      id: 3,
      user: "MarketingMaster",
      title: "Marketing for Math Tutoring",
      offering: "Social Media Marketing",
      seeking: "Advanced Calculus Tutoring",
      description: "Can teach you how to grow your personal brand through social media. Looking for help with calculus III and differential equations.",
      type: "skill",
      category: "marketing",
    },
    {
      id: 4,
      user: "BookWorm99",
      title: "Computer Science Textbooks",
      offering: "Data Structures & Algorithms Textbook (2022 edition)",
      seeking: "Machine Learning Textbook",
      description: "I have a barely used Data Structures and Algorithms textbook. Looking to swap for any recent Machine Learning or AI textbooks.",
      type: "material",
      category: "academic",
    },
    {
      id: 5,
      user: "DesignKit23",
      title: "Design Tools for Lab Equipment",
      offering: "Adobe Creative Cloud License (6 months)",
      seeking: "Chemistry Lab Equipment",
      description: "I have an extra Adobe CC license valid for 6 more months. Looking for basic chemistry lab equipment for home experiments.",
      type: "material",
      category: "design",
    }
  ]);
  
  const categories = [
    { id: "academic", name: "Academic", icon: Book },
    { id: "coding", name: "Coding", icon: Code },
    { id: "design", name: "Design", icon: Paintbrush },
    { id: "marketing", name: "Marketing", icon: Paintbrush },
  ];
  
  const handleCreateSwap = () => {
    if (!title || !offering || !seeking || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
      });
      return;
    }
    
    const newSwap: SwapItem = {
      id: swapItems.length + 1,
      user: "CurrentUser",
      title,
      offering,
      seeking,
      description,
      type: swapType,
      category,
    };
    
    setSwapItems([newSwap, ...swapItems]);
    
    // Reset form
    setTitle("");
    setOffering("");
    setSeeking("");
    setDescription("");
    
    toast({
      title: "Exchange Created",
      description: `Your ${swapType} exchange has been posted successfully!`,
    });
    
    setActiveTab("browse");
  };
  
  const filteredSwaps = swapItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.offering.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seeking.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || item.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  const contactUser = (item: SwapItem) => {
    toast({
      title: "Contact Request Sent",
      description: `You've sent a request to connect with ${item.user} about their exchange offer.`,
    });
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold">Skills & Materials Exchange</h2>
          <TabsList>
            <TabsTrigger value="browse">Browse Exchanges</TabsTrigger>
            <TabsTrigger value="create">Create Exchange</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="browse">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search exchanges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              className="md:w-48 h-10 rounded-md border border-input px-3 py-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">All Types</option>
              <option value="skill">Skills Only</option>
              <option value="material">Materials Only</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSwaps.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{item.title}</CardTitle>
                    <Badge variant={item.type === "skill" ? "default" : "secondary"}>
                      {item.type === "skill" ? "Skill" : "Material"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">Posted by {item.user}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    {item.category === "coding" && <Code className="h-4 w-4 text-blue-500" />}
                    {item.category === "design" && <Paintbrush className="h-4 w-4 text-purple-500" />}
                    {item.category === "academic" && <Book className="h-4 w-4 text-green-500" />}
                    {item.category === "marketing" && <Paintbrush className="h-4 w-4 text-orange-500" />}
                    <span className="text-sm font-medium">
                      {categories.find(c => c.id === item.category)?.name || item.category}
                    </span>
                  </div>
                
                  <div className="flex items-center justify-between mb-3 bg-gray-50 p-3 rounded-md">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Offering</p>
                      <p className="font-medium text-sm">{item.offering}</p>
                    </div>
                    <ArrowLeftRight className="h-4 w-4 text-gray-400 mx-2" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Seeking</p>
                      <p className="font-medium text-sm">{item.seeking}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => contactUser(item)}
                  >
                    Contact to Exchange
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredSwaps.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">
                No exchanges found matching your criteria
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or create a new exchange
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Exchange</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Button
                  variant={swapType === "skill" ? "default" : "outline"}
                  onClick={() => setSwapType("skill")}
                  className="flex items-center gap-2"
                >
                  <Code className="h-4 w-4" />
                  Skill Exchange
                </Button>
                <Button
                  variant={swapType === "material" ? "default" : "outline"}
                  onClick={() => setSwapType("material")}
                  className="flex items-center gap-2"
                >
                  <Box className="h-4 w-4" />
                  Material Exchange
                </Button>
              </div>
            
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  placeholder="Give your exchange a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {swapType === "skill" ? "Skill You're Offering" : "Material You're Offering"}
                  </label>
                  <Input
                    placeholder={swapType === "skill" ? "e.g. Python Programming" : "e.g. Calculus Textbook"}
                    value={offering}
                    onChange={(e) => setOffering(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {swapType === "skill" ? "Skill You're Seeking" : "Material You're Seeking"}
                  </label>
                  <Input
                    placeholder={swapType === "skill" ? "e.g. Graphic Design" : "e.g. Statistics Software"}
                    value={seeking}
                    onChange={(e) => setSeeking(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  className="w-full h-10 rounded-md border border-input px-3 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-20"
                  placeholder="Describe what you're offering and what you're looking for in more detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => setActiveTab("browse")}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSwap}>
                  Create Exchange
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
