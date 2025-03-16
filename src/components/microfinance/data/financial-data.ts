
import { JobPost } from "../types/financial-types";

export const MOCK_FINANCIAL_TASKS = [
  {
    id: "1",
    title: "Freelance Web Development",
    description: "Building a responsive website for a local business",
    amount: 750,
    completed: true,
    dateCompleted: "2023-06-12",
    category: "Income"
  },
  {
    id: "2",
    title: "Graphic Design Project",
    description: "Logo design for a startup",
    amount: 350,
    completed: true,
    dateCompleted: "2023-06-15",
    category: "Income"
  },
  {
    id: "3",
    title: "Content Writing Gig",
    description: "Writing blog posts for a marketing agency",
    amount: 200,
    completed: false,
    dateCompleted: null,
    category: "Income"
  },
  {
    id: "4",
    title: "Monthly Rent",
    description: "Apartment rent payment",
    amount: 800,
    completed: true,
    dateCompleted: "2023-06-01",
    category: "Expense"
  },
  {
    id: "5",
    title: "Groceries",
    description: "Weekly grocery shopping",
    amount: 120,
    completed: true,
    dateCompleted: "2023-06-05",
    category: "Expense"
  },
  {
    id: "6",
    title: "Subscription Services",
    description: "Netflix, Spotify, and other subscriptions",
    amount: 45,
    completed: true,
    dateCompleted: "2023-06-08",
    category: "Expense"
  }
];

export const MOCK_JOB_POSTS: JobPost[] = [
  {
    id: "1",
    title: "Frontend Developer Needed",
    description: "Looking for someone to build a responsive website",
    budget: 500,
    skills: ["React", "CSS", "JavaScript"],
    deadline: "2023-06-30",
    status: "open",
    createdAt: "2023-06-01",
    category: "Web Development",
    creator: "Jane Smith",
    bids: []
  },
  {
    id: "2",
    title: "Logo Design for Startup",
    description: "Need a modern logo for a tech startup",
    budget: 300,
    skills: ["Graphic Design", "Illustrator", "Branding"],
    deadline: "2023-06-25",
    status: "open",
    createdAt: "2023-06-03",
    category: "Design",
    creator: "John Doe",
    bids: []
  },
  {
    id: "3",
    title: "Blog Writer for Marketing Agency",
    description: "Looking for someone to write 5 blog posts about digital marketing",
    budget: 200,
    skills: ["Content Writing", "SEO", "Marketing"],
    deadline: "2023-06-20",
    status: "open",
    createdAt: "2023-06-05",
    category: "Marketing",
    creator: "Emily Johnson",
    bids: []
  }
];

// Add mock data to support existing imports from other components
export const mockBudgetData = {
  income: 1500,
  expenses: 950,
  balance: 550,
  transactions: []
};

export const mockSavingsGoals = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 1000,
    currentAmount: 500,
    deadline: "2023-12-31",
    description: "Saving for unexpected expenses",
    category: "emergency"
  }
];

export const mockInvestments = [
  {
    id: "1",
    name: "Tech Stock",
    type: "stock",
    amount: 1000,
    shares: 10,
    purchasePrice: 100,
    currentPrice: 110,
    purchaseDate: "2023-01-15",
    description: "Investment in a tech company"
  }
];

export const mockTaskPosts = MOCK_JOB_POSTS;
