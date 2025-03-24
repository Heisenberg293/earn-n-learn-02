
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobExchangeList from "./JobExchangeList";
import SkillExchangeList from "./SkillExchangeList";
import MaterialExchangeList from "./MaterialExchangeList";
import { useState } from "react";

// Define common types for exchange data
interface Job {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  deadline?: string;
  completedAt?: string;
  budget: string;
  client: string;
  feedback?: number;
}

interface Skill {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  sessions: number;
  rate?: string;
  student: string;
  feedback?: number;
}

interface Material {
  id: number;
  title: string;
  category: string;
  status: string;
  listedAt: string;
  soldAt?: string;
  price: string;
  condition?: string;
  buyer?: string;
}

interface ExchangeSectionsProps {
  activeJobs: Job[];
  activeSkills: Skill[];
  activeMaterials: Material[];
  completedJobs: Job[];
  completedSkills: Skill[];
  completedMaterials: Material[];
  activeTab: string;
  onSectionChange: (section: string) => void;
}

const ExchangeSections = ({
  activeJobs,
  activeSkills,
  activeMaterials,
  completedJobs,
  completedSkills,
  completedMaterials,
  activeTab,
  onSectionChange,
}: ExchangeSectionsProps) => {
  const [activeSection, setActiveSection] = useState("jobs");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <>
      <Tabs value={activeSection} onValueChange={handleSectionChange} className="w-full mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto max-w-md">
          <TabsTrigger value="jobs">
            Jobs ({activeTab === "active" ? activeJobs.length : completedJobs.length})
          </TabsTrigger>
          <TabsTrigger value="skills">
            Skills ({activeTab === "active" ? activeSkills.length : completedSkills.length})
          </TabsTrigger>
          <TabsTrigger value="materials">
            Materials ({activeTab === "active" ? activeMaterials.length : completedMaterials.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="jobs" className="mt-0">
        {activeTab === "active" ? (
          <JobExchangeList jobs={activeJobs} type="active" />
        ) : (
          <JobExchangeList jobs={completedJobs} type="completed" />
        )}
      </TabsContent>

      <TabsContent value="skills" className="mt-0">
        {activeTab === "active" ? (
          <SkillExchangeList skills={activeSkills} type="active" />
        ) : (
          <SkillExchangeList skills={completedSkills} type="completed" />
        )}
      </TabsContent>

      <TabsContent value="materials" className="mt-0">
        {activeTab === "active" ? (
          <MaterialExchangeList materials={activeMaterials} type="active" />
        ) : (
          <MaterialExchangeList materials={completedMaterials} type="completed" />
        )}
      </TabsContent>
    </>
  );
};

export default ExchangeSections;
