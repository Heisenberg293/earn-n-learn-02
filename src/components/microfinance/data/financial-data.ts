
import { Budget, SavingsGoal, Investment, TaskPost } from "../types/financial-types";

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

export const mockTaskPosts: TaskPost[] = [
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
    status: "in-progress",
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
