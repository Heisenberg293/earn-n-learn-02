
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { DeadlineList } from "@/components/calendar/DeadlineList";
import { EventTimeline } from "@/components/calendar/EventTimeline";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Clock, Calendar as CalendarIcon, Plus, List } from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Sample upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Website Development Project",
      deadline: "2023-12-15",
      client: "TechVentures Inc.",
      priority: "high",
      type: "job"
    },
    {
      id: 2,
      title: "Logo Design Feedback",
      deadline: "2023-12-10",
      client: "StartupBrands",
      priority: "medium",
      type: "job"
    },
    {
      id: 3,
      title: "Content Writing Submission",
      deadline: "2023-12-18",
      client: "BlogMasters",
      priority: "low",
      type: "job"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Calendar</h1>
              <p className="text-gray-600">Track your deadlines and upcoming events</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setView("calendar")}>
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
                List
              </Button>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {view === "calendar" ? "Monthly Calendar" : "Timeline View"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {view === "calendar" ? (
                  <div className="flex justify-center">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                ) : (
                  <EventTimeline />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span>Upcoming Deadlines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeadlineList deadlines={upcomingDeadlines} />
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recent">
                  <TabsList className="mb-4 grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="this-week">This Week</TabsTrigger>
                    <TabsTrigger value="this-month">This Month</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="recent" className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="bg-green-100 rounded-full p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Logo Design</h4>
                        <p className="text-sm text-gray-500">Completed yesterday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-md">
                      <div className="bg-green-100 rounded-full p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Content Writing for Blog</h4>
                        <p className="text-sm text-gray-500">Completed 2 days ago</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="this-week">
                    <p className="text-center text-gray-500 py-4">No tasks completed this week yet.</p>
                  </TabsContent>
                  
                  <TabsContent value="this-month">
                    <p className="text-center text-gray-500 py-4">Loading this month's completed tasks...</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
