
import { EscrowTransaction } from "./types";

export const MOCK_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "1",
    title: "Website Design Project",
    description: "Creating a personal portfolio website with responsive design",
    amount: 350,
    buyer: "You",
    seller: "Michael Chen",
    status: "in-progress",
    createdAt: "2023-03-15"
  },
  {
    id: "2",
    title: "Math Tutoring Sessions",
    description: "5 hours of calculus tutoring",
    amount: 125,
    buyer: "Sarah Park",
    seller: "You",
    status: "pending",
    createdAt: "2023-03-20"
  },
  {
    id: "3",
    title: "Custom Illustration",
    description: "Digital illustration for student magazine cover",
    amount: 200,
    buyer: "Alex Rodriguez",
    seller: "Taylor Kim",
    status: "completed",
    createdAt: "2023-03-10"
  }
];
