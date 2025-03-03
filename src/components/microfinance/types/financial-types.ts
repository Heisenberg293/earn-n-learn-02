
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

export interface TaskPost {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: "open" | "in-progress" | "completed";
  skills: string[];
  applicants: number;
}
