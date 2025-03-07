
export interface EscrowTransaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  buyer: string;
  seller: string;
  status: "pending" | "in-progress" | "completed" | "disputed" | "refunded";
  createdAt: string;
}

export interface Bid {
  id: string;
  jobId: string;
  bidder: string;
  amount: number;
  message: string;
  proposedTimeframe: string;
  bidType: "money" | "skill-exchange";
  skillOffered?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  category: string;
  skills: string[];
  creator: string;
  status: "open" | "in-progress" | "completed";
  bids: Bid[];
  createdAt: string;
}
