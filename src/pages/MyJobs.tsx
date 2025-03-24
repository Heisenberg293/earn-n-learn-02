
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

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeSection, setActiveSection] = useState("jobs");
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-[26px] py-[35px]">
        <div className="max-w-6xl mx-auto">
          <ExchangeHeader 
            title="My Exchange" 
            subtitle="Manage your active and completed exchanges" 
          />
          
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md">
              <TabsTrigger value="active">Active Exchanges</TabsTrigger>
              <TabsTrigger value="completed">Completed Exchanges</TabsTrigger>
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
        </div>
      </main>
    </div>
  );
};

export default MyJobs;
