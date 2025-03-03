
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Users, Gem, Trophy, BookOpen, Heart, Target, Zap } from "lucide-react";
import { UserBadge } from "../types/financial-types";

// Mock badges data
const mockBadges: UserBadge[] = [
  {
    id: "1",
    name: "First Task Completed",
    description: "Completed your first task on the platform",
    icon: "award",
    dateEarned: "2023-05-15",
    category: "achievements"
  },
  {
    id: "2",
    name: "Skill Sharer",
    description: "Shared 5 skills with the community",
    icon: "book",
    dateEarned: "2023-06-02",
    category: "skills"
  },
  {
    id: "3",
    name: "Helping Hand",
    description: "Helped 3 community members with their projects",
    icon: "heart",
    dateEarned: "2023-07-10",
    category: "community"
  },
  {
    id: "4",
    name: "Micro Investor",
    description: "Made your first investment",
    icon: "gem",
    dateEarned: "2023-08-22",
    category: "financial"
  },
  {
    id: "5",
    name: "Rising Star",
    description: "Received 10 positive reviews",
    icon: "star",
    dateEarned: "2023-09-05",
    category: "achievements"
  }
];

// Function to render the appropriate icon based on the badge type
const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case "award": return <Award className="h-6 w-6" />;
    case "star": return <Star className="h-6 w-6" />;
    case "book": return <BookOpen className="h-6 w-6" />;
    case "heart": return <Heart className="h-6 w-6" />;
    case "gem": return <Gem className="h-6 w-6" />;
    case "users": return <Users className="h-6 w-6" />;
    case "trophy": return <Trophy className="h-6 w-6" />;
    case "target": return <Target className="h-6 w-6" />;
    case "zap": return <Zap className="h-6 w-6" />;
    default: return <Award className="h-6 w-6" />;
  }
};

interface UserBadgesProps {
  badges?: UserBadge[];
}

const UserBadges: React.FC<UserBadgesProps> = ({ badges = mockBadges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Badges & Achievements
        </CardTitle>
        <CardDescription>
          Showcase your achievements and milestones on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="p-3 bg-primary/10 text-primary rounded-full mb-2">
                {getBadgeIcon(badge.icon)}
              </div>
              <h4 className="text-sm font-medium text-center">{badge.name}</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {new Date(badge.dateEarned).toLocaleDateString("en-US", { 
                  month: "short", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBadges;
