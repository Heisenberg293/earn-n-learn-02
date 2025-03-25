
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExchangeHeader from "@/components/exchanges/ExchangeHeader";
import ExchangeSections from "@/components/exchanges/ExchangeSections";
import { 
  activeJobs, 
  activeSkills, 
  activeMaterials, 
  completedJobs, 
  completedSkills, 
  completedMaterials 
} from "@/data/exchange-data";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MyJobs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [activeSection, setActiveSection] = useState("jobs");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <ExchangeHeader 
              title="My Exchange" 
              subtitle="Manage your active and completed exchanges" 
            />
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="space-y-4">
                    <h3 className="font-medium">Filter Exchanges</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="writing">Writing</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedCategory("all")}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setIsFilterOpen(false)}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md">
                  <TabsTrigger value="active" className="font-medium">Active Exchanges</TabsTrigger>
                  <TabsTrigger value="completed" className="font-medium">Completed Exchanges</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  <ExchangeSections 
                    activeJobs={activeJobs}
                    activeSkills={activeSkills}
                    activeMaterials={activeMaterials}
                    completedJobs={completedJobs}
                    completedSkills={completedSkills}
                    completedMaterials={completedMaterials}
                    activeTab="active"
                    onSectionChange={handleSectionChange}
                  />
                </TabsContent>
                
                <TabsContent value="completed">
                  <ExchangeSections 
                    activeJobs={activeJobs}
                    activeSkills={activeSkills}
                    activeMaterials={activeMaterials}
                    completedJobs={completedJobs}
                    completedSkills={completedSkills}
                    completedMaterials={completedMaterials}
                    activeTab="completed"
                    onSectionChange={handleSectionChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MyJobs;
