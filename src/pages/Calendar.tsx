
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DeadlineList } from "@/components/calendar/DeadlineList";
import { EventTimeline } from "@/components/calendar/EventTimeline";
import { format } from "date-fns";

// Define event and deadline types
export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: "class" | "meeting" | "activity" | "other";
}

export interface Deadline {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: "completed" | "pending" | "overdue";
  priority: "high" | "medium" | "low";
  type: "assignment" | "exam" | "project" | "other";
}

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  // Deadlines and events are normally fetched from an API
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    {
      id: "1",
      title: "Math Assignment Due",
      description: "Complete problems 1-20 in Chapter 5",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      status: "pending",
      priority: "high",
      type: "assignment"
    },
    {
      id: "2",
      title: "History Essay Submission",
      description: "3000 word essay on World War II",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      status: "pending",
      priority: "medium",
      type: "assignment"
    },
    {
      id: "3",
      title: "Science Project",
      description: "Group project presentation on renewable energy",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
      status: "pending",
      priority: "high",
      type: "project"
    },
    {
      id: "4",
      title: "Literature Review",
      description: "Book review submission",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
      status: "overdue",
      priority: "low",
      type: "assignment"
    },
    {
      id: "5",
      title: "Economics Midterm",
      description: "Covers chapters 1-7 of the textbook",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
      status: "pending",
      priority: "high",
      type: "exam"
    },
  ]);
  
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Study Group Meeting",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      time: "14:00 - 16:00",
      location: "Library, Room 204",
      type: "meeting"
    },
    {
      id: "2",
      title: "Math Lecture",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      time: "09:00 - 10:30",
      location: "Science Building, Hall B",
      type: "class"
    },
    {
      id: "3",
      title: "Economic Workshop",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      time: "11:00 - 12:30",
      location: "Business Building, Room 105",
      type: "class"
    },
    {
      id: "4",
      title: "Student Club Meeting",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      time: "16:00 - 17:30",
      location: "Student Center, Room 302",
      type: "activity"
    },
    {
      id: "5",
      title: "Research Group Discussion",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      time: "13:00 - 14:30",
      location: "Science Building, Lab 3",
      type: "meeting"
    },
  ]);
  
  // Filter deadlines and events for the selected date
  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";
  const filteredDeadlines = deadlines.filter(deadline => 
    format(deadline.date, "yyyy-MM-dd") === selectedDateStr
  );
  const filteredEvents = events.filter(event => 
    format(event.date, "yyyy-MM-dd") === selectedDateStr
  );
  
  // Handle deadline status changes
  const handleDeadlineStatusChange = (deadlineId: string, newStatus: "completed" | "pending" | "overdue") => {
    setDeadlines(deadlines.map(deadline => 
      deadline.id === deadlineId 
        ? { ...deadline, status: newStatus } 
        : deadline
    ));
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
            <p className="text-muted-foreground">
              Manage your assignments, exams, and class schedule
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant={view === "calendar" ? "default" : "outline"}
              onClick={() => setView("calendar")}
            >
              Calendar View
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
            >
              List View
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Widget */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Date Selection</CardTitle>
              <CardDescription>Choose a date to view events and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          {/* Events and Deadlines for Selected Date */}
          <div className="md:col-span-2">
            <Tabs defaultValue="events">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold">
                  {date ? format(date, "MMMM d, yyyy") : "Today's"} Events
                </h2>
                {filteredEvents.length > 0 ? (
                  <EventTimeline events={filteredEvents} />
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      No events scheduled for this date
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="deadlines" className="space-y-4 mt-6">
                <h2 className="text-xl font-semibold">
                  {date ? format(date, "MMMM d, yyyy") : "Today's"} Deadlines
                </h2>
                {filteredDeadlines.length > 0 ? (
                  <DeadlineList 
                    deadlines={filteredDeadlines} 
                    onStatusChange={handleDeadlineStatusChange} 
                  />
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      No deadlines for this date
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
