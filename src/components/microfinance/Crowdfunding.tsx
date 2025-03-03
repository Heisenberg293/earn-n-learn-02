
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Coins, Users, Calendar, Target } from "lucide-react";

interface Campaign {
  id: string;
  creator: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  deadline: string;
  backers: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    creator: "Student Council",
    title: "End of Year Festival",
    description: "Help us organize an unforgettable end-of-year festival with music, food, and activities for all students.",
    goal: 1500,
    raised: 875,
    deadline: "May 15, 2023",
    backers: 37
  },
  {
    id: "2",
    creator: "Robotics Club",
    title: "Robotics Competition Entry",
    description: "We need funds for parts and travel expenses to compete in the national robotics championship.",
    goal: 2000,
    raised: 1200,
    deadline: "April 10, 2023",
    backers: 28
  },
  {
    id: "3",
    creator: "Sarah Miller",
    title: "Medical Emergency Support",
    description: "I need help covering unexpected medical expenses from an accident during soccer practice.",
    goal: 800,
    raised: 620,
    deadline: "March 30, 2023",
    backers: 15
  }
];

const Crowdfunding = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [pledgeAmount, setPledgeAmount] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !goal || !deadline) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      creator: "You",
      title,
      description,
      goal: parseFloat(goal),
      raised: 0,
      deadline,
      backers: 0
    };

    setCampaigns([newCampaign, ...campaigns]);
    
    toast({
      title: "Campaign created",
      description: "Your crowdfunding campaign has been launched"
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setGoal("");
    setDeadline("");
  };

  const handlePledge = (id: string) => {
    const amount = pledgeAmount[id];
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid pledge amount",
        variant: "destructive"
      });
      return;
    }

    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          raised: campaign.raised + parseFloat(amount),
          backers: campaign.backers + 1
        };
      }
      return campaign;
    }));

    // Reset pledge amount for this campaign
    setPledgeAmount({
      ...pledgeAmount,
      [id]: ""
    });
    
    toast({
      title: "Pledge successful",
      description: `You pledged $${amount} to the campaign`
    });
  };

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Create a Crowdfunding Campaign
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleCreateCampaign}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title</Label>
              <Input 
                id="title" 
                placeholder="What are you raising funds for?" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Funding Goal ($)</Label>
                <Input 
                  id="goal" 
                  placeholder="e.g. 500" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  type="number"
                  min="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input 
                  id="deadline" 
                  placeholder="e.g. May 31, 2023" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your campaign and why people should contribute..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Launch Campaign</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Coins className="h-5 w-5 text-accent" />
          Active Campaigns
        </h3>
        
        {campaigns.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No active campaigns at the moment</p>
        ) : (
          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.title}</CardTitle>
                      <CardDescription className="mt-1">by {campaign.creator}</CardDescription>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-accent">${campaign.raised}</span>
                      <span className="text-muted-foreground"> of ${campaign.goal}</span>
                      <p className="text-xs text-muted-foreground mt-1">Deadline: {campaign.deadline}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{campaign.description}</p>
                  
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className="bg-accent h-2.5 rounded-full" 
                      style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {campaign.backers} backers
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {campaign.deadline}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="number"
                    placeholder="Pledge amount"
                    value={pledgeAmount[campaign.id] || ""}
                    onChange={(e) => setPledgeAmount({
                      ...pledgeAmount,
                      [campaign.id]: e.target.value
                    })}
                    min="1"
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handlePledge(campaign.id)}
                    disabled={campaign.creator === "You"}
                    className="sm:w-auto w-full"
                  >
                    Back This Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Crowdfunding;
