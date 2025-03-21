
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { DeadlineList } from "@/components/calendar/DeadlineList";
import { EventTimeline } from "@/components/calendar/EventTimeline";

// Define types for our data structures
type DeadlineStatus = "pending" | "completed" | "missed";

type Deadline = {
  id: number;
  title: string;
  date: Date;
  status: DeadlineStatus;
};

type Event = {
  id: number;
  title: string;
  date: Date;
  type: "milestone" | "task" | "meeting";
};

// Helper function to get a random status
const getRandomStatus = (): DeadlineStatus => {
  const statuses: DeadlineStatus[] = ["pending", "completed", "missed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Helper function to get random dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddingDeadline, setIsAddingDeadline] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    title: "",
    date: new Date(),
    status: "pending" as DeadlineStatus
  });
  
  // Sample deadlines data
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    {
      id: 1,
      title: "Submit Website Design",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      status: "pending"
    },
    {
      id: 2,
      title: "Client Meeting - Project Review",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      status: "pending"
    },
    {
      id: 3,
      title: "Complete Frontend Development",
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      status: "completed"
    },
    {
      id: 4,
      title: "Send Invoice for Logo Design",
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      status: "missed"
    }
  ]);
  
  // Sample timeline events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Project Kickoff",
      date: new Date(new Date().setDate(new Date().getDate() - 10)),
      type: "milestone"
    },
    {
      id: 2,
      title: "First Prototype",
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      type: "task"
    },
    {
      id: 3,
      title: "Client Feedback",
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      type: "meeting"
    },
    {
      id: 4,
      title: "Final Delivery",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      type: "milestone"
    }
  ]);
  
  // Get deadlines for selected date
  const getDateDeadlines = () => {
    if (!date) return [];
    
    return deadlines.filter(deadline => 
      deadline.date.toDateString() === date.toDateString()
    );
  };
  
  // Check if a date has any deadlines
  const hasDeadlines = (date: Date) => {
    return deadlines.some(deadline => 
      deadline.date.toDateString() === date.toDateString()
    );
  };
  
  // Handle adding a new deadline
  const handleAddDeadline = () => {
    if (!newDeadline.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a deadline title",
        variant: "destructive"
      });
      return;
    }
    
    const deadline: Deadline = {
      id: deadlines.length + 1,
      title: newDeadline.title,
      date: newDeadline.date,
      status: newDeadline.status
    };
    
    setDeadlines([...deadlines, deadline]);
    setNewDeadline({
      title: "",
      date: new Date(),
      status: "pending"
    });
    setIsAddingDeadline(false);
    
    toast({
      title: "Success",
      description: "Deadline has been added",
    });
  };
  
  // Mark a deadline as completed
  const markDeadlineComplete = (id: number) => {
    setDeadlines(deadlines.map(deadline => 
      deadline.id === id ? { ...deadline, status: "completed" } : deadline
    ));
    
    toast({
      title: "Success",
      description: "Deadline marked as completed",
    });
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar & Deadlines</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Calendar</h2>
              <Dialog open={isAddingDeadline} onOpenChange={setIsAddingDeadline}>
                <DialogTrigger asChild>
                  <Button>Add Deadline</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Deadline</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Deadline Title</Label>
                      <Input 
                        id="title" 
                        value={newDeadline.title}
                        onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                        placeholder="Enter deadline title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <CalendarComponent
                        mode="single"
                        selected={newDeadline.date}
                        onSelect={(date) => date && setNewDeadline({...newDeadline, date})}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <RadioGroup 
                        value={newDeadline.status}
                        onValueChange={(value) => setNewDeadline({...newDeadline, status: value as DeadlineStatus})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pending" id="pending" />
                          <Label htmlFor="pending">Pending</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="completed" id="completed" />
                          <Label htmlFor="completed">Completed</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingDeadline(false)}>Cancel</Button>
                    <Button onClick={handleAddDeadline}>Add Deadline</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasDeadline: (date) => hasDeadlines(date),
              }}
              modifiersClassNames={{
                hasDeadline: "bg-green-100 font-bold text-green-600",
              }}
            />
            
            {date && (
              <div className="mt-6">
                <h3 className="font-medium">{format(date, "MMMM d, yyyy")}</h3>
                <div className="mt-2">
                  {getDateDeadlines().length > 0 ? (
                    getDateDeadlines().map((deadline) => (
                      <div key={deadline.id} className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">{deadline.title}</p>
                          <p className="text-sm text-gray-500">{format(deadline.date, "h:mm a")}</p>
                        </div>
                        <div>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              deadline.status === "completed" ? "bg-green-100 text-green-800" : 
                              deadline.status === "missed" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {deadline.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No deadlines for this date</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Deadline & Timeline Section */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <Tabs defaultValue="deadlines">
              <TabsList className="mb-4">
                <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="deadlines">
                <DeadlineList 
                  deadlines={deadlines} 
                  onMarkComplete={markDeadlineComplete} 
                />
              </TabsContent>
              
              <TabsContent value="timeline">
                <EventTimeline events={events} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
