
// Define common types for exchange data
export interface Job {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  deadline?: string;
  completedAt?: string;
  budget: string;
  client: string;
  feedback?: number;
}

export interface Skill {
  id: number;
  title: string;
  category: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  sessions: number;
  rate?: string;
  student: string;
  feedback?: number;
}

export interface Material {
  id: number;
  title: string;
  category: string;
  status: string;
  listedAt: string;
  soldAt?: string;
  price: string;
  condition?: string;
  buyer?: string;
}
