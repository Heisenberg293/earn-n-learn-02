// Fix only the DeadlineList import and its usage to include onMarkComplete prop
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeadlineList } from "@/components/calendar/DeadlineList";
import { EventTimeline } from "@/components/calendar/EventTimeline";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Deadline = {
  id: number;
  title: string;
  description: string;
  date: Date;
  category: string;
  completed: boolean;
};

type Event = {
  id: number;
  title: string;
  time: string;
  description: string;
};

const categories = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Mobile App Development",
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    {
      id: 1,
      title: "Website Development for E-commerce",
      description: "Develop a responsive e-commerce website with user accounts and payment integration.",
      date: new Date("2023-12-15"),
      category: "Web Development",
      completed: false,
    },
    {
      id: 2,
      title: "Logo Design for Tech Startup",
      description: "Create a modern and minimalist logo for a tech startup.",
      date: new Date("2023-12-20"),
      category: "Graphic Design",
      completed: false,
    },
    {
      id: 3,
      title: "Content Writing for SaaS Blog",
      description: "Write engaging blog posts about SaaS trends and best practices.",
      date: new Date("2023-12-10"),
      category: "Content Writing",
      completed: false,
    },
  ]);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      time: "10:00 AM",
      description: "Discuss project progress and assign new tasks.",
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      description: "Present the project proposal to the client.",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    title: "",
    description: "",
    date: new Date(),
    category: categories[0],
  });

  useEffect(() => {
    // Load deadlines from local storage on component mount
    const storedDeadlines = localStorage.getItem("deadlines");
    if (storedDeadlines) {
      setDeadlines(JSON.parse(storedDeadlines));
    }
  }, []);

  useEffect(() => {
    // Save deadlines to local storage whenever the deadlines state changes
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
  }, [deadlines]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDeadline(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewDeadline(prev => ({ ...prev, category: value }));
  };

  const handleDateChange = (date: Date) => {
    setNewDeadline(prev => ({ ...prev, date: date }));
  };

  const addDeadline = () => {
    if (!newDeadline.title || !newDeadline.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newId = deadlines.length > 0 ? Math.max(...deadlines.map(d => d.id)) + 1 : 1;
    const deadlineToAdd = {
      id: newId,
      title: newDeadline.title,
      description: newDeadline.description,
      date: newDeadline.date,
      category: newDeadline.category,
      completed: false,
    };

    setDeadlines(prev => [...prev, deadlineToAdd]);
    setOpen(false);
    setNewDeadline({
      title: "",
      description: "",
      date: new Date(),
      category: categories[0],
    });
    toast.success("Deadline added successfully!");
  };

  const handleMarkComplete = (id: number) => {
    setDeadlines(prevDeadlines => 
      prevDeadlines.map(deadline => 
        deadline.id === id 
          ? { ...deadline, completed: true } 
          : deadline
      )
    );
    
    toast.success("Deadline marked as complete!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-gray-600 mt-1">Manage your deadlines and events</p>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  You can add new deadlines and manage existing ones to stay organized.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none shadow-sm"
                  />
                </div>
                <p>
                  Selected Date: {date ? format(date, "PPP") : "No date selected"}{" "}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Event Timeline</CardTitle>
                <CardDescription>
                  View upcoming events in a timeline format.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EventTimeline events={events} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines">
            <DeadlineList 
              deadlines={deadlines} 
              onMarkComplete={handleMarkComplete} 
            />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Deadline
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Deadline</DialogTitle>
                  <DialogDescription>
                    Add a new deadline to your calendar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      value={newDeadline.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right mt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newDeadline.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={newDeadline.date}
                      onSelect={handleDateChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select onValueChange={handleCategoryChange} defaultValue={newDeadline.category}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={addDeadline}>
                    Add Deadline
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CalendarPage;
