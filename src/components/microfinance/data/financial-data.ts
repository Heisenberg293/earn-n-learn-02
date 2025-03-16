
import { Budget, SavingsGoal, Investment, JobPost } from "../types/financial-types";

export const mockBudgetData: Budget = {
  income: 1200,
  expenses: 850,
  balance: 350,
  transactions: [
    {
      id: "t1",
      category: "Salary",
      amount: 800,
      type: "income",
      date: "2023-06-01",
      description: "Part-time job payment"
    },
    {
      id: "t2",
      category: "Freelance",
      amount: 400,
      type: "income",
      date: "2023-06-15",
      description: "Website design project"
    },
    {
      id: "t3",
      category: "Rent",
      amount: 450,
      type: "expense",
      date: "2023-06-02",
      description: "Monthly rent"
    },
    {
      id: "t4",
      category: "Groceries",
      amount: 120,
      type: "expense",
      date: "2023-06-08",
      description: "Weekly groceries"
    },
    {
      id: "t5",
      category: "Utilities",
      amount: 80,
      type: "expense",
      date: "2023-06-10",
      description: "Electricity and water bill"
    },
    {
      id: "t6",
      category: "Transportation",
      amount: 60,
      type: "expense",
      date: "2023-06-12",
      description: "Bus pass"
    },
    {
      id: "t7",
      category: "Entertainment",
      amount: 50,
      type: "expense",
      date: "2023-06-18",
      description: "Movie night"
    },
    {
      id: "t8",
      category: "Books",
      amount: 90,
      type: "expense",
      date: "2023-06-20",
      description: "Textbooks for class"
    }
  ]
};

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: "s1",
    name: "Emergency Fund",
    targetAmount: 1000,
    currentAmount: 450,
    deadline: "2023-12-31",
    description: "Build an emergency fund for unexpected expenses",
    category: "emergency"
  },
  {
    id: "s2",
    name: "Laptop Upgrade",
    targetAmount: 800,
    currentAmount: 350,
    deadline: "2023-09-15",
    description: "Save for a new laptop for school projects",
    category: "tech"
  },
  {
    id: "s3",
    name: "Spring Break Trip",
    targetAmount: 500,
    currentAmount: 200,
    deadline: "2024-03-01",
    description: "Save for spring break travel expenses",
    category: "travel"
  }
];

export const mockInvestments: Investment[] = [
  {
    id: "i1",
    name: "Tech Growth ETF",
    type: "etf",
    amount: 200,
    shares: 2.5,
    purchasePrice: 80,
    currentPrice: 85,
    purchaseDate: "2023-05-10",
    description: "ETF focused on technology growth companies"
  },
  {
    id: "i2",
    name: "Green Energy Fund",
    type: "mutual-fund",
    amount: 150,
    shares: 6,
    purchasePrice: 25,
    currentPrice: 27,
    purchaseDate: "2023-04-22",
    description: "Mutual fund investing in renewable energy companies"
  },
  {
    id: "i3",
    name: "Student Micro-Index",
    type: "etf",
    amount: 100,
    shares: 4,
    purchasePrice: 25,
    currentPrice: 26,
    purchaseDate: "2023-06-05",
    description: "Diversified index fund with low minimum investment"
  }
];

export const mockTaskPosts: JobPost[] = [
  {
    id: "tp1",
    title: "Website Development for Student Club",
    description: "Need help building a simple website for our chess club using React",
    budget: 150,
    deadline: "2023-07-15",
    status: "open",
    skills: ["React", "JavaScript", "HTML/CSS"],
    applicants: 3
  },
  {
    id: "tp2",
    title: "Graphic Design for Event Posters",
    description: "Looking for someone to design promotional posters for campus event",
    budget: 80,
    deadline: "2023-06-28",
    status: "in_progress",
    skills: ["Graphic Design", "Illustrator", "Photoshop"],
    applicants: 5
  },
  {
    id: "tp3",
    title: "Research Assistant for Economics Project",
    description: "Need help gathering and analyzing data for research project",
    budget: 200,
    deadline: "2023-07-30",
    status: "open",
    skills: ["Research", "Data Analysis", "Excel"],
    applicants: 2
  },
  {
    id: "tp4",
    title: "Math Tutoring for Calculus",
    description: "Looking for a tutor to help with Calculus II topics",
    budget: 120,
    deadline: "2023-08-15",
    status: "completed",
    skills: ["Mathematics", "Calculus", "Teaching"],
    applicants: 4
  }
];

// Mock loan completion data for timeline
export interface LoanCompletionData {
  id: string;
  borrower: string;
  lender: string;
  amount: number;
  completedDate: string;
  duration: string;
  category: "textbooks" | "tuition" | "housing" | "emergency" | "technology" | "other";
  status: "completed" | "in-progress" | "defaulted";
  description: string;
}

export const mockLoanCompletions: LoanCompletionData[] = [
  {
    id: "loan1",
    borrower: "Alex Chen",
    lender: "Jamie Smith",
    amount: 250,
    completedDate: "2023-06-10T14:30:00",
    duration: "45 days",
    category: "textbooks",
    status: "completed",
    description: "Loan for calculus and physics textbooks fully repaid on time."
  },
  {
    id: "loan2",
    borrower: "Taylor Wilson",
    lender: "Jordan Park",
    amount: 500,
    completedDate: "2023-06-05T09:15:00",
    duration: "60 days",
    category: "technology",
    status: "completed",
    description: "Loan for laptop repair paid back two weeks early."
  },
  {
    id: "loan3",
    borrower: "Morgan Lee",
    lender: "Riley Johnson",
    amount: 175,
    completedDate: "2023-05-28T16:45:00",
    duration: "30 days",
    category: "emergency",
    status: "completed",
    description: "Emergency car repair loan repaid with interest."
  },
  {
    id: "loan4",
    borrower: "Casey Brown",
    lender: "Avery Williams",
    amount: 350,
    completedDate: "2023-05-15T11:20:00",
    duration: "90 days",
    category: "housing",
    status: "completed",
    description: "Security deposit loan for new apartment fully repaid."
  },
  {
    id: "loan5",
    borrower: "Sam Taylor",
    lender: "Jordan White",
    amount: 120,
    completedDate: "2023-06-12T10:00:00",
    duration: "14 days",
    category: "other",
    status: "completed",
    description: "Short-term loan for conference registration fee repaid."
  }
];
