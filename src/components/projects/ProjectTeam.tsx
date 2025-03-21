
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar, MessagesSquare, User, UserPlus } from "lucide-react";
import { Project, ProjectMember } from "./types";

interface ProjectTeamProps {
  project: Project;
}

const ProjectTeam = ({ project }: ProjectTeamProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members ({project.members.length})</h2>
        
        {/* Only show invite button if user is a project member */}
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
      
      {project.members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No team members yet</p>
        </div>
      )}
    </div>
  );
};

interface MemberCardProps {
  member: ProjectMember;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{member.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {member.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.skills.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Joined {new Date(member.joinedAt).toLocaleDateString()}
              </span>
              
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessagesSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTeam;
