
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Group } from "../types/communication-types";
import { MOCK_GROUPS } from "../data/mock-data";

const GroupChats = () => {
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Handle creating a new group
  const handleCreateGroup = () => {
    toast({
      title: "Group Created",
      description: "Your new group has been created successfully",
    });
  };
  
  // Filter groups based on search term
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
      {/* Groups List */}
      <Card className="overflow-hidden md:col-span-1 flex flex-col">
        <CardHeader className="pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto px-2 pt-2 pb-0">
          {filteredGroups.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No groups found</p>
          ) : (
            <div className="space-y-1">
              {filteredGroups.map((group) => (
                <div 
                  key={group.id}
                  className="flex items-start gap-3 p-2 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-primary">
                    <div className="text-sm font-semibold text-primary-foreground">{group.avatar}</div>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-medium text-sm truncate">{group.name}</h4>
                      <span className="text-xs text-muted-foreground">{group.lastActive}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{group.members} members</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2">
          <Button className="w-full flex gap-2" variant="outline" size="sm" onClick={handleCreateGroup}>
            <Plus className="h-4 w-4" />
            <span>New Group</span>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Group Details */}
      <Card className="md:col-span-2 flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Create a New Group
          </CardTitle>
          <CardDescription>
            Create a group for your project, study session, or student club
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-name">Group Name</label>
            <Input id="group-name" placeholder="e.g., Finance Study Group" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="group-description">Description</label>
            <Textarea 
              id="group-description" 
              placeholder="What is this group for?" 
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy</label>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">Public</Button>
              <Button variant="outline" className="flex-1">Private</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Public groups can be found in search, private groups are invite-only
            </p>
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button className="w-full" onClick={handleCreateGroup}>Create Group</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GroupChats;
