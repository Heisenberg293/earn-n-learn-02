export interface FinancialProduct {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  loanTerm: number;
  maxAmount: number;
  applicationProcess: string;
  eligibilityCriteria: string;
  feesAndCharges: string;
  faq: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplication {
  id: string;
  applicantName: string;
  contactEmail: string;
  loanAmount: number;
  financialProductId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface JobPost {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  deadline: string;
  createdAt: string;
  status: 'open' | 'in_progress' | 'completed';
  userId: string;
}

export interface SkillsExchange {
  id: string;
  title: string;
  description: string;
  skillsOffered: string[];
  skillsDesired: string[];
  contactEmail: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
