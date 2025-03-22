
import { useState } from "react";
import { 
  Calendar as CalendarComponent, 
  CalendarProps 
} from "@/components/ui/calendar";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { DeadlineList, Deadline } from "@/components/calendar/DeadlineList";
import { EventTimeline, Event } from "@/components/calendar/EventTimeline";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ListTodo, 
  Calendar as CalendarClock 
} from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "deadlines" | "timeline">("calendar");

  const handleDateSelect: CalendarProps["onDayClick"] = (day, modifiers) => {
    if (!modifiers.disabled) {
      setDate(day);
    }
  };

  const handleStatusChange = (id: string | number, newStatus: Deadline["status"]) => {
    // In a real app, you would update the deadline status in your data source
    console.log(`Updating deadline ${id} to status: ${newStatus}`);
    
    // For demo purposes, we're updating the status locally
    const updatedDeadlines = deadlines.map(deadline => 
      deadline.id === id 
        ? { ...deadline, status: newStatus } 
        : deadline
    );
    
    console.log("Updated deadlines:", updatedDeadlines);
    // In a real app, you would set the updated deadlines here
  };

  // Deadlines data
  const deadlines: Deadline[] = [
    {
      id: "1",
      title: "Complete Web Development Project",
      date: new Date(2023, 10, 15), // November 15, 2023
      status: "pending",
      description: "Web Development Bootcamp"
    },
    {
      id: "2",
      title: "Submit Design Mockups",
      date: new Date(2023, 10, 18), // November 18, 2023
      status: "completed",
      description: "UI/UX Design Course"
    },
    {
      id: "3",
      title: "Research Paper Draft",
      date: new Date(2023, 10, 20), // November 20, 2023
      status: "pending",
      description: "Research Methodology"
    },
    {
      id: "4",
      title: "Final Project Presentation",
      date: new Date(2023, 10, 10), // November 10, 2023 (past)
      status: "missed",
      description: "Data Science Fundamentals"
    },
    {
      id: "5",
      title: "Group Assignment",
      date: new Date(2023, 10, 25), // November 25, 2023
      status: "pending",
      description: "Team Management"
    }
  ];

  // Events data
  const events: Event[] = [
    {
      id: "1",
      title: "Team Meeting",
      date: new Date(2023, 10, 16, 10, 0), // November 16, 2023, 10:00 AM
      location: "Virtual Conference Room",
      description: "Weekly team sync-up to discuss project progress.",
      type: "meeting"
    },
    {
      id: "2",
      title: "Project Milestone: Frontend Complete",
      date: new Date(2023, 10, 20, 9, 0), // November 20, 2023, 9:00 AM
      location: "Project Management Tool",
      description: "Complete all frontend tasks and perform initial testing.",
      type: "milestone"
    },
    {
      id: "3",
      title: "Coding Session",
      date: new Date(2023, 10, 17, 14, 0), // November 17, 2023, 2:00 PM
      location: "Study Room 3",
      description: "Collaborative coding session to tackle the backend API integration.",
      type: "task"
    },
    {
      id: "4",
      title: "Mentor Review",
      date: new Date(2023, 10, 22, 13, 30), // November 22, 2023, 1:30 PM
      location: "Office 201",
      description: "Code review and feedback session with the senior developer.",
      type: "meeting"
    },
    {
      id: "5",
      title: "Project Milestone: MVP Ready",
      date: new Date(2023, 10, 25, 9, 0), // November 25, 2023, 9:00 AM
      location: "Project Management Tool",
      description: "Minimum viable product ready for internal testing.",
      type: "milestone"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Calendar & Deadlines</h1>
        <p className="text-muted-foreground">
          Keep track of your events, meetings, and assignment deadlines
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onDayClick={handleDateSelect}
                className="rounded-md border"
              />
              
              {date && (
                <div className="mt-6">
                  <h3 className="font-medium">
                    {format(date, "EEEE, MMMM do, yyyy")}
                  </h3>
                  <div className="mt-2 space-y-2">
                    {events
                      .filter(event => 
                        format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                      )
                      .map(event => (
                        <div key={event.id} className="p-2 rounded-md bg-muted flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(event.date, "h:mm a")} · {event.location}
                            </p>
                          </div>
                        </div>
                      ))
                    }
                    
                    {deadlines
                      .filter(deadline => 
                        format(deadline.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                      )
                      .map(deadline => (
                        <div key={deadline.id} className="p-2 rounded-md bg-muted flex items-start gap-2">
                          <ListTodo className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{deadline.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {deadline.description} · Due today
                            </p>
                          </div>
                        </div>
                      ))
                    }
                    
                    {events.filter(event => 
                      format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                    ).length === 0 && 
                    deadlines.filter(deadline => 
                      format(deadline.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                    ).length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No events or deadlines scheduled for this day.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="deadlines" value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="deadlines" className="flex items-center gap-1">
                <ListTodo className="h-4 w-4" />
                <span className="hidden sm:inline">Deadlines</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-1">
                <CalendarClock className="h-4 w-4" />
                <span className="hidden sm:inline">Timeline</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="deadlines">
              <DeadlineList deadlines={deadlines} onStatusChange={handleStatusChange} />
            </TabsContent>
            
            <TabsContent value="timeline">
              <EventTimeline events={events} />
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly View</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    A more detailed calendar view is coming soon. In the meantime,
                    you can use the deadlines and timeline views to manage your schedule.
                  </p>
                  
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onDayClick={handleDateSelect}
                    className="rounded-md border w-full"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
