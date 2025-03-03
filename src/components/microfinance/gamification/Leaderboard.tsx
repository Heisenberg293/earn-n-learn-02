
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";
import { LeaderboardEntry } from "../types/financial-types";

// Mock leaderboard data
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    userId: "user1",
    name: "Alex Johnson",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    points: 2580,
    rank: 1,
    taskCompleted: 32,
    skillsShared: 15
  },
  {
    id: "2",
    userId: "user2",
    name: "Jamie Smith",
    avatarUrl: "https://i.pravatar.cc/150?img=24",
    points: 2340,
    rank: 2,
    taskCompleted: 28,
    skillsShared: 12
  },
  {
    id: "3",
    userId: "user3",
    name: "Taylor Wilson",
    avatarUrl: "https://i.pravatar.cc/150?img=35",
    points: 2100,
    rank: 3,
    taskCompleted: 25,
    skillsShared: 10
  },
  {
    id: "4",
    userId: "user4",
    name: "Jordan Lee",
    avatarUrl: "https://i.pravatar.cc/150?img=46",
    points: 1850,
    rank: 4,
    taskCompleted: 20,
    skillsShared: 8
  },
  {
    id: "5",
    userId: "user5",
    name: "Casey Rivera",
    avatarUrl: "https://i.pravatar.cc/150?img=57",
    points: 1650,
    rank: 5,
    taskCompleted: 18,
    skillsShared: 9
  }
];

interface LeaderboardProps {
  entries?: LeaderboardEntry[];
  currentUserId?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  entries = mockLeaderboardData, 
  currentUserId = "user1" // Default to first user for demo
}) => {
  // Function to get rank badge/icon
  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center font-medium">{rank}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>
          See who's leading in points and contributions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div 
              key={entry.id} 
              className={`flex items-center p-3 rounded-lg ${
                entry.userId === currentUserId ? "bg-primary/10" : "hover:bg-muted/50"
              } transition-colors`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankDisplay(entry.rank)}
              </div>
              
              <Avatar className="h-10 w-10 ml-2">
                <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="ml-4 flex-1">
                <p className="font-medium">{entry.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{entry.taskCompleted} tasks</span>
                  <span className="mx-1">•</span>
                  <span>{entry.skillsShared} skills shared</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-primary">{entry.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
