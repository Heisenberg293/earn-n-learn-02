
import { Bid, Job } from "./types";

export const MOCK_JOBS: Job[] = [
  {
    id: "job1",
    title: "Logo Design for Tech Startup",
    description: "Need a modern logo for a new tech startup focusing on AI solutions.",
    budget: 250,
    deadline: "2024-04-20",
    category: "design",
    skills: ["Graphic Design", "Branding", "Logo Design"],
    creator: "Michael Chen",
    status: "open",
    bids: [],
    createdAt: "2024-03-15"
  },
  {
    id: "job2",
    title: "Mobile App Development",
    description: "Looking for someone to develop a simple mobile app for tracking daily tasks.",
    budget: 750,
    deadline: "2024-05-10",
    category: "coding",
    skills: ["React Native", "Mobile Development", "UI/UX"],
    creator: "Sarah Johnson",
    status: "open",
    bids: [],
    createdAt: "2024-03-10"
  },
  {
    id: "job3",
    title: "Content Writing for Blog",
    description: "Need articles about financial literacy for college students.",
    budget: 200,
    deadline: "2024-04-05",
    category: "writing",
    skills: ["Content Writing", "SEO", "Research"],
    creator: "You",
    status: "open",
    bids: [],
    createdAt: "2024-03-18"
  }
];

export const MOCK_BIDS: Bid[] = [
  {
    id: "bid1",
    jobId: "job1",
    bidder: "You",
    amount: 200,
    message: "I can create a modern, minimalist logo with 3 revisions included.",
    proposedTimeframe: "5 days",
    bidType: "money",
    status: "pending",
    createdAt: "2024-03-17"
  },
  {
    id: "bid2",
    jobId: "job1",
    bidder: "Alex Rodriguez",
    amount: 0,
    message: "I'll design your logo in exchange for help with my website content.",
    proposedTimeframe: "7 days",
    bidType: "skill-exchange",
    skillOffered: "Logo Design",
    status: "pending",
    createdAt: "2024-03-16"
  },
  {
    id: "bid3",
    jobId: "job2",
    bidder: "Taylor Kim",
    amount: 650,
    message: "Experienced mobile developer, can complete within timeline with all features.",
    proposedTimeframe: "20 days",
    bidType: "money",
    status: "pending",
    createdAt: "2024-03-12"
  }
];

// Helper function to get jobs with their bids
export const getJobsWithBids = (): Job[] => {
  return MOCK_JOBS.map(job => {
    const jobBids = MOCK_BIDS.filter(bid => bid.jobId === job.id);
    return { ...job, bids: jobBids };
  });
};
