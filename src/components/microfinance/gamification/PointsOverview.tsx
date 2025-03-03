import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, BarChart } from "lucide-react";
import { UserPoints } from "../types/financial-types";
import { Badge } from "@/components/ui/badge";

// Mock points data
const mockPointsData: UserPoints = {
  total: 1250,
  breakdown: {
    tasksCompleted: 750,
    skillsShared: 250,
    communityParticipation: 150,
    lending: 100
  },
  history: [
    { date: "2023-10-01", amount: 50, description: "Completed a web design task", category: "tasks" },
    { date: "2023-09-28", amount: 30, description: "Shared programming skills", category: "skills" },
    { date: "2023-09-25", amount: 20, description: "Participated in community forum", category: "community" },
    { date: "2023-09-20", amount: 75, description: "Completed a logo design task", category: "tasks" },
    { date: "2023-09-15", amount: 40, description: "Lent to a peer project", category: "lending" }
  ]
};

interface PointsOverviewProps {
  pointsData?: UserPoints;
}

const PointsOverview: React.FC<PointsOverviewProps> = ({ pointsData = mockPointsData }) => {
  const totalPoints = pointsData.total;
  const { tasksCompleted, skillsShared, communityParticipation, lending } = pointsData.breakdown;
  
  // Calculate percentages for the progress bars
  const calculatePercentage = (points: number) => (points / totalPoints) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Points Overview
        </CardTitle>
        <CardDescription>
          Track your points and see how you're earning them
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{totalPoints} Points</h3>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +125 this month
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tasks Completed</span>
                    <span className="text-sm text-muted-foreground">{tasksCompleted} points</span>
                  </div>
                  <Progress value={calculatePercentage(tasksCompleted)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Skills Shared</span>
                    <span className="text-sm text-muted-foreground">{skillsShared} points</span>
                  </div>
                  <Progress value={calculatePercentage(skillsShared)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Community Participation</span>
                    <span className="text-sm text-muted-foreground">{communityParticipation} points</span>
                  </div>
                  <Progress value={calculatePercentage(communityParticipation)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Lending Activity</span>
                    <span className="text-sm text-muted-foreground">{lending} points</span>
                  </div>
                  <Progress value={calculatePercentage(lending)} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {pointsData.history.map((entry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{entry.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium">+{entry.amount}</span>
                    <Badge variant="outline" className="capitalize">{entry.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PointsOverview;
