
import { format } from 'date-fns';
import { CalendarClock, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Deadline = {
  id: number | string;
  title: string;
  date: Date;
  status: 'pending' | 'completed' | 'missed' | 'overdue';
};

interface DeadlineListProps {
  deadlines: Deadline[];
  onStatusChange?: (id: number | string, status: 'pending' | 'completed' | 'missed') => void;
}

export const DeadlineList = ({ deadlines, onStatusChange }: DeadlineListProps) => {
  if (!deadlines.length) {
    return (
      <div className="flex flex-col items-center py-8 text-center text-gray-500">
        <CalendarClock className="h-12 w-12 mb-2 text-gray-300" />
        <p>No upcoming deadlines</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {deadlines.map((deadline) => (
        <div key={deadline.id} className="border rounded-md p-3 flex justify-between items-center">
          <div>
            <h4 className="font-medium">{deadline.title}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              {format(deadline.date, 'MMM d, yyyy')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {deadline.status === 'pending' ? (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Pending
              </Badge>
            ) : deadline.status === 'completed' ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Completed
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {deadline.status === 'overdue' ? 'Overdue' : 'Missed'}
              </Badge>
            )}
            
            {onStatusChange && deadline.status === 'pending' && (
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => onStatusChange(deadline.id, 'completed')}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onStatusChange(deadline.id, 'missed')}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
