
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventTimeline, Event as TimelineEvent } from "@/components/calendar/EventTimeline";
import { DeadlineList, Deadline } from "@/components/calendar/DeadlineList";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("timeline");

  // Sample events data
  const events: TimelineEvent[] = [
    {
      id: 1,
      title: "Website Mockup Review",
      description: "Review website design mockups with client",
      type: "meeting",
      date: new Date(2023, 11, 15, 10, 0) // December 15, 2023, 10:00 AM
    },
    {
      id: 2,
      title: "Python Assignment Progress",
      description: "Work on Python data analysis project",
      type: "task",
      date: new Date(2023, 11, 15, 13, 0) // December 15, 2023, 1:00 PM
    },
    {
      id: 3,
      title: "UI Design Discussion",
      description: "Discuss UI design principles with mentor",
      type: "meeting",
      date: new Date(2023, 11, 15, 15, 0) // December 15, 2023, 3:00 PM
    },
    {
      id: 4,
      title: "Essay Outline Submission",
      description: "Submit outline for humanities essay",
      type: "milestone",
      date: new Date(2023, 11, 15, 23, 59) // December 15, 2023, 11:59 PM
    },
  ];

  // Sample deadlines data
  const deadlines: Deadline[] = [
    {
      id: 1,
      title: "Python Programming Assignment",
      date: new Date(2023, 11, 15),
      status: "pending",
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      date: new Date(2023, 11, 20),
      status: "pending",
    },
    {
      id: 3,
      title: "Research Paper Review",
      date: new Date(2023, 11, 10),
      status: "pending",
    },
    {
      id: 4,
      title: "Social Media Strategy",
      date: new Date(2023, 11, 25),
      status: "pending",
    },
  ];

  // Navigation between days
  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(date);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-gray-600">Manage your schedule and deadlines</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDay("prev")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{format(date, "PPPP")}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                  />
                </PopoverContent>
              </Popover>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateDay("next")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="timeline">Today's Schedule</TabsTrigger>
                  <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pb-6">
              {activeTab === "timeline" ? (
                <EventTimeline events={events} />
              ) : (
                <DeadlineList deadlines={deadlines} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
