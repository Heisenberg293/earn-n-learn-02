
import Navigation from "@/components/Navigation";
import DeadlineList from "@/components/calendar/DeadlineList";
import EventTimeline from "@/components/calendar/EventTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Fix: Define a proper type for Deadline that includes description
interface Deadline {
  id: number;
  date: string;
  title: string;
  type: string;
  priority: "high" | "medium" | "low";
  description: string; // Added this field to match usage
}

const Calendar = () => {
  const navigate = useNavigate();
  
  // Sample deadlines
  const upcoming: Deadline[] = [
    {
      id: 1,
      date: "2023-12-10",
      title: "Web Development Project",
      type: "job",
      priority: "high",
      description: "Complete the final deliverables for TechVentures Inc."
    },
    {
      id: 2,
      date: "2023-12-15",
      title: "UI Design Feedback",
      type: "job",
      priority: "medium",
      description: "Provide feedback on the UI designs for the mobile app."
    },
    {
      id: 3,
      date: "2023-12-20",
      title: "Python Tutoring Session",
      type: "skill",
      priority: "medium",
      description: "Prepare materials for the advanced Python session."
    },
    {
      id: 4,
      date: "2023-12-25",
      title: "Content Writing Delivery",
      type: "job",
      priority: "high",
      description: "Submit the final blog articles for review."
    },
    {
      id: 5,
      date: "2023-12-30",
      title: "Textbook Listing Renewal",
      type: "material",
      priority: "low",
      description: "Update the programming textbooks listing with new photos."
    }
  ];
  
  // Past deadlines
  const past: Deadline[] = [
    {
      id: 6,
      date: "2023-11-15",
      title: "Logo Design Draft",
      type: "job",
      priority: "high",
      description: "Submit the initial logo design drafts for client feedback."
    },
    {
      id: 7,
      date: "2023-11-20",
      title: "JavaScript Tutoring Session",
      type: "skill",
      priority: "medium",
      description: "Cover advanced JavaScript topics with the student."
    }
  ];
  
  // Timeline events
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const events = [
    {
      id: 1,
      date: today.toISOString().split('T')[0],
      events: [
        {
          id: 101,
          time: "10:00 AM",
          title: "Code Review Meeting",
          description: "Review the latest code changes with the development team."
        },
        {
          id: 102,
          time: "2:00 PM",
          title: "Python Tutoring",
          description: "One-on-one tutoring session with Alex on data structures."
        }
      ]
    },
    {
      id: 2,
      date: nextWeek.toISOString().split('T')[0],
      events: [
        {
          id: 103,
          time: "9:30 AM",
          title: "Project Delivery",
          description: "Final delivery and presentation of the e-commerce website."
        }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto pt-24 pb-16 px-[26px] py-[35px]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Calendar</h1>
                <p className="text-gray-600 mt-1">Manage your schedule and deadlines</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="mb-6 grid grid-cols-2 w-full md:w-auto max-w-md">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    <DeadlineList deadlines={upcoming} />
                  </TabsContent>
                  
                  <TabsContent value="past">
                    <DeadlineList deadlines={past} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-green-600" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventTimeline events={events} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
