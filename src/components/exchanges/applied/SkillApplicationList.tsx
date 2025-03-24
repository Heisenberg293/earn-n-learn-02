
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface SkillApplication {
  id: number;
  title: string;
  category: string;
  status: string;
  appliedAt: string;
  rejectedAt?: string;
  rate?: string;
  compensation?: string;
  provider?: string;
  partner?: string;
  organization?: string;
}

interface SkillApplicationListProps {
  applications: SkillApplication[];
  type: "pending" | "rejected";
}

const SkillApplicationList = ({ applications, type }: SkillApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Coins className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type === "pending" ? "Pending" : "Rejected"} Skill Applications
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {type === "pending"
              ? "You don't have any pending skill exchange applications."
              : "You don't have any rejected skill exchange applications."}
          </p>
          {type === "pending" && (
            <Link to="/task-hub">
              <Button>Find Skill Exchanges</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((skill) => (
        <Card key={skill.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold">{skill.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span>{skill.category}</span>
                  <span>•</span>
                  <span>
                    {skill.provider
                      ? `Provider: ${skill.provider}`
                      : skill.partner
                      ? `Partner: ${skill.partner}`
                      : `Organization: ${skill.organization}`}
                  </span>
                </div>
              </div>
              <Badge
                className={
                  type === "pending"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }
              >
                {type === "pending" ? "Pending" : "Rejected"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Applied: {skill.appliedAt}</span>
              </div>
              {type === "rejected" && skill.rejectedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Rejected: {skill.rejectedAt}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">
                  Compensation: {skill.rate || skill.compensation}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={`/skills/${skill.id}`}>
                <Button variant="outline" className="gap-2">
                  View {type === "pending" ? "Application" : "Details"}
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

export default SkillApplicationList;
