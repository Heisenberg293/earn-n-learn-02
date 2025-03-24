
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobExchangeList from "./JobExchangeList";
import SkillExchangeList from "./SkillExchangeList";
import MaterialExchangeList from "./MaterialExchangeList";
import { useState, useEffect } from "react";
import { Job, Skill, Material } from "./types";

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

  // Initialize activeSection with "jobs" whenever the component mounts
  useEffect(() => {
    setActiveSection("jobs");
    onSectionChange("jobs");
  }, []);

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
      </Tabs>
    </>
  );
};

export default ExchangeSections;
