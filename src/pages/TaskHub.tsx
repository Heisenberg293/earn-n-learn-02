
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskBrowser } from "@/components/tasks/TaskBrowser";
import { TaskPostForm } from "@/components/tasks/TaskPostForm";
import { SkillsMatcher } from "@/components/tasks/SkillsMatcher";

const TaskHub = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Skill & Task Hub</h1>
            <p className="text-gray-600 mt-2">Find tasks, post your own, or exchange skills and materials with others</p>
          </div>
          
          <Tabs 
            defaultValue="browse" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="browse">Browse Tasks</TabsTrigger>
              <TabsTrigger value="post">Post Task</TabsTrigger>
              <TabsTrigger value="match">Skills Exchange</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <TaskBrowser />
            </TabsContent>
            
            <TabsContent value="post">
              <TaskPostForm onSuccess={() => {
                toast({
                  title: "Task Posted Successfully",
                  description: "Your task has been created and is now live!",
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

export default TaskHub;
