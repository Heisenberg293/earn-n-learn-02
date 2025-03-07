
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2 } from "lucide-react";

interface TaskStatsProps {
  getStatusCountByType: (status: string) => number;
}

const TaskStats = ({ getStatusCountByType }: TaskStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="text-blue-500" /> Open Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{getStatusCountByType("open")}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="text-yellow-500" /> In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{getStatusCountByType("in-progress")}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="text-green-500" /> Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{getStatusCountByType("completed")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
