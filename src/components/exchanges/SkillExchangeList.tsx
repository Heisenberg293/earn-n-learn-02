
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Skill {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  sessions: number;
  rate?: string;
  student: string;
  feedback?: number;
}

interface SkillExchangeListProps {
  skills: Skill[];
  type: "active" | "completed";
}

const SkillExchangeList = ({ skills, type }: SkillExchangeListProps) => {
  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Coins className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type === "active" ? "Active" : "Completed"} Skills
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {type === "active"
              ? "You don't have any active skill exchanges at the moment."
              : "You haven't completed any skill exchanges yet."}
          </p>
          {type === "active" && (
            <Link to="/task-hub">
              <Button>Offer Skills</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <Card key={skill.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold">{skill.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span>{skill.category}</span>
                  <span>•</span>
                  <span>Student: {skill.student}</span>
                </div>
              </div>
              <Badge
                className={
                  type === "active"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {type === "active" ? "Active" : "Completed"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {type === "active" ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Started: {skill.startedAt}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Completed: {skill.completedAt}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Sessions: {skill.sessions}</span>
              </div>
              {type === "active" && skill.rate ? (
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Rate: {skill.rate}</span>
                </div>
              ) : (
                type === "completed" &&
                skill.feedback && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Rating: {skill.feedback}/5.0</span>
                  </div>
                )
              )}
            </div>

            <div className="flex justify-end">
              <Link to={`/skills/${skill.id}`}>
                <Button variant="outline" className="gap-2">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillExchangeList;
