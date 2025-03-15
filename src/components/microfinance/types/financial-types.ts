
export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description: string;
}

export interface Budget {
  income: number;
  expenses: number;
  balance: number;
  transactions: BudgetItem[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description: string;
  category: "emergency" | "education" | "travel" | "tech" | "other";
}

export interface Investment {
  id: string;
  name: string;
  type: "stock" | "mutual-fund" | "etf" | "crypto";
  amount: number;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  description: string;
}

export interface JobPost {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: "open" | "in_progress" | "completed";
  skills: string[];
  applicants?: number;
  category?: string;
  createdAt?: string;
  userId?: string;
}

// Gamification types
export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
  category: "skills" | "financial" | "community" | "achievements";
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  points: number;
  rank: number;
  taskCompleted: number;
  skillsShared: number;
}

export interface UserPoints {
  total: number;
  breakdown: {
    tasksCompleted: number;
    skillsShared: number;
    communityParticipation: number;
    lending: number;
  };
  history: {
    date: string;
    amount: number;
    description: string;
    category: "tasks" | "skills" | "community" | "lending";
  }[];
}
