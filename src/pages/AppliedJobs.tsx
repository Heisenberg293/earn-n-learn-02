
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCheck, ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobApplicationList from "@/components/exchanges/applied/JobApplicationList";
import SkillApplicationList from "@/components/exchanges/applied/SkillApplicationList";
import { pendingJobApplications, pendingSkillApplications, rejectedJobApplications, rejectedSkillApplications } from "@/data/exchange-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [activeSection, setActiveSection] = useState("jobs");
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <BookmarkCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Applied Exchange</h1>
                <p className="text-gray-600 mt-1">Track the status of your applications</p>
              </div>
            </div>
            <div className="flex gap-2">
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
                    <h3 className="font-medium">Filter Applications</h3>
                    
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
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 grid grid-cols-2 w-full md:w-auto max-w-md mx-auto">
                  <TabsTrigger value="pending" className="font-medium">
                    Pending ({pendingJobApplications.length + pendingSkillApplications.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected" className="font-medium">
                    Rejected ({rejectedJobApplications.length + rejectedSkillApplications.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending">
                  <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-6">
                    <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md mx-auto">
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
                    <TabsList className="grid grid-cols-2 w-full md:w-auto max-w-md mx-auto">
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AppliedJobs;
