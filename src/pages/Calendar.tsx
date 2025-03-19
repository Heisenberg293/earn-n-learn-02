
import { useContext, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, addDays, isSameDay } from 'date-fns';
import { CalendarPlus, Clock, ListTodo } from 'lucide-react';
import { EventTimeline } from '@/components/calendar/EventTimeline';
import { DeadlineList } from '@/components/calendar/DeadlineList';
import { AuthContext } from '@/context/AuthContext';

// Mock deadlines data - in a real app this would come from an API/database
const mockDeadlines = [
  { id: 1, title: 'Complete Frontend Design', date: addDays(new Date(), 2), status: 'pending' },
  { id: 2, title: 'Client Meeting', date: addDays(new Date(), 5), status: 'pending' },
  { id: 3, title: 'Project Submission', date: addDays(new Date(), 10), status: 'pending' },
  { id: 4, title: 'Review Code', date: addDays(new Date(), 3), status: 'pending' },
  { id: 5, title: 'Team Standup', date: addDays(new Date(), 1), status: 'pending' },
];

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState<Date>(new Date());
  const [deadlines, setDeadlines] = useState(mockDeadlines);
  const [newDeadline, setNewDeadline] = useState({ title: '', date: new Date() });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get the deadlines for the currently selected date
  const selectedDateDeadlines = deadlines.filter(
    deadline => isSameDay(deadline.date, date)
  );
  
  // Function to highlight dates with deadlines
  const isDayWithDeadline = (day: Date) => {
    return deadlines.some(deadline => 
      isSameDay(day, deadline.date)
    );
  };
  
  // Add a new deadline
  const handleAddDeadline = () => {
    if (newDeadline.title.trim() === '') return;
    
    const deadline = {
      id: deadlines.length + 1,
      title: newDeadline.title,
      date: newDeadline.date,
      status: 'pending'
    };
    
    setDeadlines([...deadlines, deadline]);
    setNewDeadline({ title: '', date: new Date() });
    setIsDialogOpen(false);
  };
  
  // Get all upcoming deadlines sorted by date
  const upcomingDeadlines = [...deadlines]
    .filter(d => d.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-semibold mb-6">Calendar & Deadlines</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-1/2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Calendar</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <CalendarPlus className="h-4 w-4" />
                    Add Deadline
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Deadline</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newDeadline.title}
                        onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                        placeholder="Enter deadline title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Calendar
                        mode="single"
                        selected={newDeadline.date}
                        onSelect={(date) => date && setNewDeadline({...newDeadline, date})}
                        className="rounded border p-3 pointer-events-auto"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddDeadline}>Save Deadline</Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              modifiers={{
                highlighted: isDayWithDeadline
              }}
              modifiersClassNames={{
                highlighted: "bg-green-100 font-bold text-green-800 hover:bg-green-200"
              }}
              className="pointer-events-auto"
            />
            
            {/* Show deadlines for selected date */}
            <div className="mt-4 border-t pt-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                {format(date, 'MMMM d, yyyy')}
              </h3>
              
              {selectedDateDeadlines.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDateDeadlines.map(deadline => (
                    <li key={deadline.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      <ListTodo className="h-4 w-4 text-green-600" />
                      {deadline.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No deadlines for this date</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:w-1/2 space-y-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Deadlines</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <DeadlineList 
                    deadlines={upcomingDeadlines} 
                    onStatusChange={(id, status) => {
                      setDeadlines(deadlines.map(d => 
                        d.id === id ? {...d, status} : d
                      ));
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline View</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventTimeline deadlines={upcomingDeadlines} />
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
