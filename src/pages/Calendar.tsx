
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeadlineList } from "@/components/calendar/DeadlineList";
import { EventTimeline } from "@/components/calendar/EventTimeline";
import { CalendarDays, ListTodo, Clock } from "lucide-react";

// Mock data for demonstrations
const MOCK_DEADLINES = [
  {
    id: "1",
    title: "Complete Project Proposal",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    course: "Business Management",
    status: "pending"
  },
  {
    id: "2",
    title: "Submit Research Paper Draft",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    course: "Academic Writing",
    status: "pending"
  },
  {
    id: "3",
    title: "Group Presentation",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    course: "Marketing Strategies",
    status: "overdue"
  },
  {
    id: "4",
    title: "Quiz Preparation",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    course: "Statistics",
    status: "completed"
  }
];

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Meeting with Professor",
    date: new Date(new Date().setHours(new Date().getHours() + 3)),
    location: "Faculty Building, Room 302",
    description: "Discuss research project progress",
    type: "meeting"
  },
  {
    id: "2",
    title: "Study Group Session",
    date: new Date(new Date().setHours(new Date().getHours() + 5)),
    location: "Library, Study Room B",
    description: "Prepare for upcoming statistics quiz",
    type: "meeting"
  },
  {
    id: "3",
    title: "Career Fair",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    location: "Student Center, Main Hall",
    description: "Networking opportunity with potential employers",
    type: "milestone"
  },
  {
    id: "4",
    title: "Guest Lecture: AI in Education",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    location: "Science Building, Auditorium",
    description: "Special lecture by Dr. Jane Smith from Tech University",
    type: "task"
  }
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeDeadlines, setActiveDeadlines] = useState(MOCK_DEADLINES);
  
  const handleDeadlineStatusChange = (deadlineId: string | number, newStatus: string) => {
    setActiveDeadlines(
      activeDeadlines.map(deadline => 
        deadline.id === deadlineId 
          ? { ...deadline, status: newStatus } 
          : deadline
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Schedule & Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Events on {date?.toDateString()}</h3>
                <div className="space-y-3">
                  {MOCK_EVENTS
                    .filter(event => 
                      date && 
                      event.date.getDate() === date.getDate() && 
                      event.date.getMonth() === date.getMonth() && 
                      event.date.getFullYear() === date.getFullYear()
                    )
                    .map(event => (
                      <div key={event.id} className="flex p-3 border rounded-lg">
                        <div className="w-1 bg-primary rounded-full mr-3"></div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            {event.location && ` • ${event.location}`}
                          </p>
                          {event.description && (
                            <p className="text-sm mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  }
                  {date && MOCK_EVENTS.filter(event => 
                    event.date.getDate() === date.getDate() && 
                    event.date.getMonth() === date.getMonth() && 
                    event.date.getFullYear() === date.getFullYear()
                  ).length === 0 && (
                    <p className="text-center py-6 text-muted-foreground">
                      No events scheduled for this day
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Deadlines and Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <DeadlineList 
                  deadlines={activeDeadlines}
                  onStatusChange={handleDeadlineStatusChange} 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Today's Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <EventTimeline 
                  events={MOCK_EVENTS.filter(
                    event => 
                      event.date.getDate() === new Date().getDate() &&
                      event.date.getMonth() === new Date().getMonth() &&
                      event.date.getFullYear() === new Date().getFullYear()
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
