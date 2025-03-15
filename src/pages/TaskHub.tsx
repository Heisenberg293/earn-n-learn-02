
import { useState, useContext } from "react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobBrowser } from "@/components/tasks/TaskBrowser";
import { JobPostForm } from "@/components/tasks/TaskPostForm";
import { SkillsMatcher } from "@/components/tasks/SkillsMatcher";
import { AuthContext } from "@/context/AuthContext";
import Dashboard from "@/components/Dashboard";

const JobHub = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        {isAuthenticated && <Dashboard />}
        
        <div className="max-w-6xl mx-auto mt-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Skill & Job Hub</h1>
            <p className="text-gray-600 mt-2">Find jobs, post your own, or exchange skills and materials with others</p>
          </div>
          
          <Tabs 
            defaultValue="browse" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
              <TabsTrigger value="post">Post Job</TabsTrigger>
              <TabsTrigger value="match">Skills Exchange</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <JobBrowser />
            </TabsContent>
            
            <TabsContent value="post">
              <JobPostForm onSuccess={() => {
                toast({
                  title: "Job Posted Successfully",
                  description: "Your job has been created and is now live!",
                });
                setActiveTab("browse");
              }}/>
            </TabsContent>
            
            <TabsContent value="match">
              <SkillsMatcher />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default JobHub;
