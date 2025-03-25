
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostJobSection } from "./PostJobSection";

export const JobBrowser = () => {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 w-full max-w-md mx-0 my-0 px-0 py-0 rounded-none">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="post">Post a Job</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600">Job listings will appear here</h3>
            <p className="text-gray-500 mt-2">
              Or post your own job by clicking the "Post a Job" tab
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="post">
          <PostJobSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
