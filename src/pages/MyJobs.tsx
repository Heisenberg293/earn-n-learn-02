
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExchangeHeader from "@/components/exchanges/ExchangeHeader";
import ExchangeSections from "@/components/exchanges/ExchangeSections";

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeSection, setActiveSection] = useState("jobs");
  
  // Active jobs data
  const activeJobs = [{
    id: 1,
    title: "Website Development for E-commerce",
    category: "Web Development",
    status: "in-progress",
    startedAt: "2023-11-15",
    deadline: "2023-12-15",
    budget: "$750",
    client: "TechVentures Inc."
  }, {
    id: 2,
    title: "Mobile App UI Design",
    category: "UI/UX Design",
    status: "in-progress",
    startedAt: "2023-11-20",
    deadline: "2023-12-10",
    budget: "$500",
    client: "AppSolutions"
  }];
  
  // Active skills data
  const activeSkills = [{
    id: 101,
    title: "Python Programming Tutoring",
    category: "Education",
    status: "active",
    startedAt: "2023-11-10",
    sessions: 5,
    rate: "$40/hr",
    student: "Alex Johnson"
  }];
  
  // Active materials data
  const activeMaterials = [{
    id: 201,
    title: "Programming Textbooks (3)",
    category: "Books",
    status: "for-sale",
    listedAt: "2023-11-05",
    price: "$75",
    condition: "Like New"
  }];
  
  // Completed jobs data
  const completedJobs = [{
    id: 3,
    title: "Content Writing for Blog",
    category: "Writing",
    status: "completed",
    startedAt: "2023-10-01",
    completedAt: "2023-10-15",
    budget: "$200",
    client: "BlogMasters",
    feedback: 4.8
  }, {
    id: 4,
    title: "Logo Design",
    category: "Graphic Design",
    status: "completed",
    startedAt: "2023-09-15",
    completedAt: "2023-09-30",
    budget: "$150",
    client: "StartupBrands",
    feedback: 5.0
  }];
  
  // Completed skills data
  const completedSkills = [{
    id: 102,
    title: "JavaScript Mentorship",
    category: "Education",
    status: "completed",
    startedAt: "2023-09-01",
    completedAt: "2023-10-30",
    sessions: 8,
    student: "Maria Garcia",
    feedback: 4.9
  }];
  
  // Completed materials data
  const completedMaterials = [{
    id: 202,
    title: "Computer Science Notes",
    category: "Academic",
    status: "sold",
    listedAt: "2023-10-01",
    soldAt: "2023-10-12",
    price: "$25",
    buyer: "Chris Williams"
  }];
  
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
