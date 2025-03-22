
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { LoanTimeline } from "@/components/microfinance/newsfeed/LoanTimeline";
import { LoanNotificationsList } from "@/components/microfinance/newsfeed/LoanNotification";
import { mockLoanCompletions } from "@/components/microfinance/data/financial-data";

// Define the structure of a post
interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: "loan" | "skill" | "marketplace" | "shoutout" | "event";
}
const Newsfeed = () => {
  const {
    toast
  } = useToast();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([{
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      initials: "SJ"
    },
    content: "🎉 I just successfully repaid my loan to Alex! Thanks for helping me get those textbooks for the semester.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    type: "loan"
  }, {
    id: "2",
    author: {
      name: "Mike Thompson",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      initials: "MT"
    },
    content: "🤝 Just finished exchanging Python tutoring with Emily for some amazing graphic design help on my project. Skill exchanges make this community awesome!",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
    type: "skill"
  }, {
    id: "3",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      initials: "AR"
    },
    content: "🛒 I just sold my calculus textbook to Jamie! Great to see it going to good use rather than collecting dust on my shelf.",
    timestamp: "Yesterday",
    likes: 18,
    comments: 3,
    type: "marketplace"
  }, {
    id: "4",
    author: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      initials: "EC"
    },
    content: "👏 Shoutout to Professor Wilson for organizing the finance workshop last week! Learned so many practical money management tips.",
    timestamp: "2 days ago",
    likes: 56,
    comments: 12,
    type: "shoutout"
  }, {
    id: "5",
    author: {
      name: "SkillSwap Team",
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      initials: "ST"
    },
    content: "📅 Don't miss our upcoming peer lending workshop this Friday at 3 PM in the Student Center! Learn how to effectively use our platform to build financial relationships.",
    timestamp: "3 days ago",
    likes: 89,
    comments: 24,
    type: "event"
  }]);
  const handlePostSubmit = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }
    const newPostObj: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "",
        initials: "YO"
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      type: "shoutout" // Default type
    };
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    toast({
      title: "Post published!",
      description: "Your post has been shared with the community."
    });
  };
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => post.id === postId ? {
      ...post,
      likes: post.likes + 1
    } : post));
  };
  return <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left column - Create Post and Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Campus Newsfeed</h1>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest happenings in your university community
            </p>

            {/* Create Post Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Share an update</CardTitle>
                <CardDescription>
                  Share your campus experiences, achievements, or ask for help from fellow students!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="What's happening on campus?" value={newPost} onChange={e => setNewPost(e.target.value)} className="min-h-[100px]" />
                  <div className="flex justify-end">
                    <Button onClick={handlePostSubmit}>Post Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Notifications Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Recent Campus Loan Activities</CardTitle>
                <CardDescription>
                  Stay updated with recent peer lending transactions in your university community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoanNotificationsList loanCompletions={mockLoanCompletions} />
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map(post => <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-gray-700">{post.content}</p>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors" onClick={() => handleLike(post.id)}>
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
          
          {/* Right column - Campus Activities Timeline */}
          <div className="space-y-6">
            {/* Recent Activities Card */}
            <LoanTimeline loanCompletions={mockLoanCompletions} />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Campus Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New message from Study Group</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">You received 5 likes on your post</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah shared your Spring Break Trip goal</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Newsfeed;
