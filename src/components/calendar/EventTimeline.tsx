
import { format, isToday, isPast, differenceInDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type Deadline = {
  id: number;
  title: string;
  date: Date;
  status: 'pending' | 'completed' | 'missed';
};

interface EventTimelineProps {
  deadlines: Deadline[];
}

export const EventTimeline = ({ deadlines }: EventTimelineProps) => {
  if (!deadlines.length) {
    return <div className="text-center py-8 text-gray-500">No events to display in timeline</div>;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      <div className="space-y-6">
        {deadlines.map((deadline) => {
          const daysFromNow = differenceInDays(deadline.date, new Date());
          let status = "upcoming";
          
          if (deadline.status === 'completed') {
            status = "completed";
          } else if (deadline.status === 'missed') {
            status = "missed";
          } else if (isToday(deadline.date)) {
            status = "today";
          } else if (isPast(deadline.date)) {
            status = "past";
          }
          
          return (
            <div key={deadline.id} className="relative pl-10">
              <div className={`absolute left-0 h-8 w-8 rounded-full flex items-center justify-center
                ${status === 'completed' ? 'bg-green-100 text-green-600' : 
                  status === 'missed' ? 'bg-red-100 text-red-600' : 
                  status === 'today' ? 'bg-blue-100 text-blue-600' : 
                  status === 'past' ? 'bg-gray-100 text-gray-600' : 
                  'bg-gray-100 text-gray-600'}`}
              >
                {status === 'completed' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : status === 'missed' ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </div>
              
              <div className="bg-white p-3 rounded-md border">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{deadline.title}</h4>
                  
                  {status === 'completed' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  ) : status === 'missed' ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Missed
                    </Badge>
                  ) : status === 'today' ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Today
                    </Badge>
                  ) : isPast(deadline.date) ? (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Past
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {daysFromNow === 1 ? 'Tomorrow' : `In ${daysFromNow} days`}
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(deadline.date, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
