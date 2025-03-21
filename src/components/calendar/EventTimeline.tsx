
import { format, isToday, isPast, differenceInDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  date: Date;
  type: 'milestone' | 'task' | 'meeting';
};

interface EventTimelineProps {
  events: Event[];
}

export const EventTimeline = ({ events }: EventTimelineProps) => {
  if (!events.length) {
    return <div className="text-center py-8 text-gray-500">No events to display in timeline</div>;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      <div className="space-y-6">
        {events.map((event) => {
          const daysFromNow = differenceInDays(event.date, new Date());
          let status = "upcoming";
          
          if (isToday(event.date)) {
            status = "today";
          } else if (isPast(event.date)) {
            status = "past";
          }
          
          return (
            <div key={event.id} className="relative pl-10">
              <div className={`absolute left-0 h-8 w-8 rounded-full flex items-center justify-center
                ${event.type === 'milestone' ? 'bg-purple-100 text-purple-600' : 
                  event.type === 'meeting' ? 'bg-blue-100 text-blue-600' : 
                  status === 'today' ? 'bg-green-100 text-green-600' : 
                  status === 'past' ? 'bg-gray-100 text-gray-600' : 
                  'bg-gray-100 text-gray-600'}`}
              >
                <Clock className="h-4 w-4" />
              </div>
              
              <div className="bg-white p-3 rounded-md border">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{event.title}</h4>
                  
                  <Badge variant="outline" className={`
                    ${event.type === 'milestone' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                    event.type === 'meeting' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    'bg-gray-50 text-gray-700 border-gray-200'}`
                  }>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(event.date, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
