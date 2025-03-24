
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import JobApplicationList from "@/components/exchanges/applied/JobApplicationList";
import SkillApplicationList from "@/components/exchanges/applied/SkillApplicationList";
import { 
  pendingJobApplications,
  pendingSkillApplications,
  rejectedJobApplications,
  rejectedSkillApplications
} from "@/data/exchange-data";

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeSection, setActiveSection] = useState("jobs");
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16 py-[35px]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <BookmarkCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Applied Exchange</h1>
                <p className="text-gray-600 mt-1">Track the status of your applications</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md">
              <TabsTrigger value="pending">Pending ({pendingJobApplications.length + pendingSkillApplications.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedJobApplications.length + rejectedSkillApplications.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({pendingJobApplications.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({pendingSkillApplications.length})</TabsTrigger>
                </TabsList>
              
                <TabsContent value="jobs" className="mt-6">
                  <JobApplicationList applications={pendingJobApplications} type="pending" />
                </TabsContent>
              
                <TabsContent value="skills" className="mt-6">
                  <SkillApplicationList applications={pendingSkillApplications} type="pending" />
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="rejected">
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md">
                  <TabsTrigger value="jobs">Jobs ({rejectedJobApplications.length})</TabsTrigger>
                  <TabsTrigger value="skills">Skills ({rejectedSkillApplications.length})</TabsTrigger>
                </TabsList>
              
                <TabsContent value="jobs" className="mt-6">
                  <JobApplicationList applications={rejectedJobApplications} type="rejected" />
                </TabsContent>
              
                <TabsContent value="skills" className="mt-6">
                  <SkillApplicationList applications={rejectedSkillApplications} type="rejected" />
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AppliedJobs;
