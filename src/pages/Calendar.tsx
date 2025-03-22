import { useState } from "react";
import { format, parseISO, isToday, isThisMonth, isThisWeek, isBefore, addDays, compareAsc } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Clock, X, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { EventTimeline } from "@/components/calendar/EventTimeline";
import { DeadlineList } from "@/components/calendar/DeadlineList";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'class' | 'meeting' | 'event';
  description?: string;
}

interface Deadline {
  id: string;
  title: string;
  date: Date;
  course?: string;
  description?: string;
  status: 'pending' | 'completed' | 'overdue';
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    time: '',
    location: '',
    type: 'event',
    description: ''
  });
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Marketing 101 Class',
      date: addDays(new Date(), -1),
      time: '10:00 AM - 11:30 AM',
      location: 'Business School, Room 302',
      type: 'class',
      description: 'Introduction to marketing principles and strategies'
    },
    {
      id: '2',
      title: 'Group Project Meeting',
      date: new Date(),
      time: '2:00 PM - 3:30 PM',
      location: 'Library Study Room 4',
      type: 'meeting',
      description: 'Discuss progress on the final project presentation'
    },
    {
      id: '3',
      title: 'Tech Career Fair',
      date: addDays(new Date(), 1),
      time: '11:00 AM - 3:00 PM',
      location: 'Student Center Main Hall',
      type: 'event',
      description: 'Networking event with tech companies hiring for internships and full-time positions'
    },
    {
      id: '4',
      title: 'Study Group - Economics',
      date: addDays(new Date(), 2),
      time: '4:00 PM - 6:00 PM',
      location: 'Coffee Shop near campus',
      type: 'meeting',
      description: 'Review session for upcoming midterm exam'
    },
    {
      id: '5',
      title: 'Philosophy Discussion',
      date: addDays(new Date(), 2),
      time: '7:00 PM - 8:00 PM',
      location: 'Humanities Building, Room 101',
      type: 'class',
      description: 'Open discussion on ethical theories and their applications'
    }
  ]);
  
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    {
      id: '1',
      title: 'Economics Research Paper',
      date: addDays(new Date(), -2),
      course: 'ECON 302',
      description: '5-page research paper on a macroeconomic policy of your choice',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Statistics Problem Set',
      date: addDays(new Date(), -1),
      course: 'STAT 201',
      description: 'Complete problems 1-20 in Chapter 7',
      status: 'overdue'
    },
    {
      id: '3',
      title: 'Psychology Quiz',
      date: new Date(),
      course: 'PSYC 101',
      description: 'Online quiz covering chapters 8-10',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Computer Science Project',
      date: addDays(new Date(), 3),
      course: 'CS 340',
      description: 'Implement a basic web application using React',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Marketing Case Study',
      date: addDays(new Date(), 7),
      course: 'MKT 250',
      description: 'Analyze the marketing strategy of a company of your choice',
      status: 'pending'
    },
    {
      id: '6',
      title: 'Biology Lab Report',
      date: addDays(new Date(), 10),
      course: 'BIO 203',
      description: 'Write up findings from the photosynthesis experiment',
      status: 'pending'
    }
  ]);
  
  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) return;
    
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      date: selectedDate,
      time: newEvent.time || '',
      location: newEvent.location || '',
      type: newEvent.type || 'event',
      description: newEvent.description
    };
    
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      time: '',
      location: '',
      type: 'event',
      description: ''
    });
    setShowAddEvent(false);
  };
  
  const handleCompleteDeadline = (id: string) => {
    setDeadlines(deadlines.map(deadline => 
      deadline.id === id ? { ...deadline, status: 'completed' } : deadline
    ));
  };
  
  const selectedDateEvents = events.filter(event => 
    selectedDate && isToday(event.date, selectedDate)
  );
  
  const selectedDateDeadlines = deadlines.filter(deadline => 
    selectedDate && isToday(deadline.date, selectedDate)
  );
  
  const todayEvents = events.filter(event => isToday(event.date));
  const thisWeekEvents = events.filter(event => isThisWeek(event.date) && !isToday(event.date));
  const thisMonthEvents = events.filter(event => isThisMonth(event.date) && !isThisWeek(event.date));
  
  const pendingDeadlines = deadlines.filter(deadline => deadline.status === 'pending')
    .sort((a, b) => compareAsc(a.date, b.date));
  const overdueDeadlines = deadlines.filter(deadline => 
    deadline.status === 'overdue' || (deadline.status === 'pending' && isBefore(deadline.date, new Date()))
  );
  const completedDeadlines = deadlines.filter(deadline => deadline.status === 'completed');
  
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getDeadlineStatusColor = (status: Deadline['status'], date: Date) => {
    if (status === 'completed') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'overdue' || (status === 'pending' && isBefore(date, new Date()))) 
      return 'bg-red-100 text-red-800 border-red-200';
    
    const twoDaysFromNow = addDays(new Date(), 2);
    if (isBefore(date, twoDaysFromNow)) 
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Academic Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
              
              <Button 
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="mt-4 w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
              
              {showAddEvent && (
                <div className="mt-4 space-y-3 w-full">
                  <Input
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                  <Input
                    placeholder="Time (e.g. 2:00 PM - 3:30 PM)"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                  <Input
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handleAddEvent} className="w-full">Save</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddEvent(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {selectedDate && (selectedDateEvents.length > 0 || selectedDateDeadlines.length > 0) && (
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                </CardTitle>
                <CardDescription>
                  {selectedDateEvents.length} events, {selectedDateDeadlines.length} deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Events</h3>
                    <div className="space-y-2">
                      {selectedDateEvents.map(event => (
                        <div key={event.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{event.title}</p>
                              {event.time && (
                                <p className="text-sm text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" /> {event.time}
                                </p>
                              )}
                              {event.location && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {event.location}
                                </p>
                              )}
                            </div>
                            <Badge className={`${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedDateDeadlines.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Deadlines</h3>
                    <div className="space-y-2">
                      {selectedDateDeadlines.map(deadline => (
                        <div key={deadline.id} className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{deadline.title}</p>
                              {deadline.course && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {deadline.course}
                                </p>
                              )}
                            </div>
                            <Badge className={`${getDeadlineStatusColor(deadline.status, deadline.date)}`}>
                              {deadline.status === 'completed' ? 'Completed' : 
                               deadline.status === 'overdue' || isBefore(deadline.date, new Date()) ? 'Overdue' : 
                               'Due Today'}
                            </Badge>
                          </div>
                          
                          {deadline.status !== 'completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => handleCompleteDeadline(deadline.id)}
                            >
                              <Check className="h-3 w-3 mr-1" /> Mark as Completed
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>View your schedule for today and upcoming days</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventTimeline events={events as unknown as any[]} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deadlines" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Deadlines</CardTitle>
                  <CardDescription>Track your upcoming assignments and their due dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <DeadlineList 
                    deadlines={deadlines as unknown as any[]} 
                    onStatusChange={handleCompleteDeadline} 
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

export default CalendarPage;
