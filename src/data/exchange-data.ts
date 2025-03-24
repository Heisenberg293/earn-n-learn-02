
import { Job, Skill, Material } from "@/components/exchanges/types";

// Active jobs data
export const activeJobs: Job[] = [
  {
    id: 1,
    title: "Website Development for E-commerce",
    category: "Web Development",
    status: "in-progress",
    startedAt: "2023-11-15",
    deadline: "2023-12-15",
    budget: "$750",
    client: "TechVentures Inc."
  }, 
  {
    id: 2,
    title: "Mobile App UI Design",
    category: "UI/UX Design",
    status: "in-progress",
    startedAt: "2023-11-20",
    deadline: "2023-12-10",
    budget: "$500",
    client: "AppSolutions"
  },
  {
    id: 3,
    title: "Data Analysis Project",
    category: "Data Science",
    status: "in-progress",
    startedAt: "2023-11-18",
    deadline: "2023-12-20",
    budget: "$650",
    client: "DataTech Corp"
  }
];

// Active skills data
export const activeSkills: Skill[] = [
  {
    id: 101,
    title: "Python Programming Tutoring",
    category: "Education",
    status: "active",
    startedAt: "2023-11-10",
    sessions: 5,
    rate: "$40/hr",
    student: "Alex Johnson"
  },
  {
    id: 102,
    title: "Language Exchange: Spanish",
    category: "Languages",
    status: "active",
    startedAt: "2023-11-05",
    sessions: 8,
    rate: "Skill Swap",
    student: "Maria Lopez"
  }
];

// Active materials data
export const activeMaterials: Material[] = [
  {
    id: 201,
    title: "Programming Textbooks (3)",
    category: "Books",
    status: "for-sale",
    listedAt: "2023-11-05",
    price: "$75",
    condition: "Like New"
  },
  {
    id: 202,
    title: "Digital Graphics Tablet",
    category: "Electronics",
    status: "for-sale",
    listedAt: "2023-11-12",
    price: "$120",
    condition: "Good"
  }
];

// Completed jobs data
export const completedJobs: Job[] = [
  {
    id: 4,
    title: "Content Writing for Blog",
    category: "Writing",
    status: "completed",
    startedAt: "2023-10-01",
    completedAt: "2023-10-15",
    budget: "$200",
    client: "BlogMasters",
    feedback: 4.8
  }, 
  {
    id: 5,
    title: "Logo Design",
    category: "Graphic Design",
    status: "completed",
    startedAt: "2023-09-15",
    completedAt: "2023-09-30",
    budget: "$150",
    client: "StartupBrands",
    feedback: 5.0
  },
  {
    id: 6,
    title: "Social Media Campaign",
    category: "Marketing",
    status: "completed",
    startedAt: "2023-09-01",
    completedAt: "2023-09-25",
    budget: "$300",
    client: "GrowthMarketing",
    feedback: 4.5
  }
];

// Completed skills data
export const completedSkills: Skill[] = [
  {
    id: 103,
    title: "JavaScript Mentorship",
    category: "Education",
    status: "completed",
    startedAt: "2023-09-01",
    completedAt: "2023-10-30",
    sessions: 8,
    student: "Maria Garcia",
    feedback: 4.9
  },
  {
    id: 104,
    title: "UI/UX Design Workshop",
    category: "Design",
    status: "completed",
    startedAt: "2023-08-15",
    completedAt: "2023-09-20",
    sessions: 6,
    student: "Taylor Wong",
    feedback: 4.7
  }
];

// Completed materials data
export const completedMaterials: Material[] = [
  {
    id: 203,
    title: "Computer Science Notes",
    category: "Academic",
    status: "sold",
    listedAt: "2023-10-01",
    soldAt: "2023-10-12",
    price: "$25",
    buyer: "Chris Williams"
  },
  {
    id: 204,
    title: "Photography Equipment",
    category: "Electronics",
    status: "sold",
    listedAt: "2023-09-20",
    soldAt: "2023-10-05",
    price: "$180",
    buyer: "Sam Johnson"
  }
];

// Pending job applications
export const pendingJobApplications = [
  {
    id: 7,
    title: "Frontend Developer for E-commerce Project",
    category: "Web Development",
    status: "pending",
    appliedAt: "2023-11-28",
    budget: "$800-1200",
    company: "TechEcommerce"
  }, 
  {
    id: 8,
    title: "UI/UX Designer for Mobile App",
    category: "Design",
    status: "pending",
    appliedAt: "2023-11-25",
    budget: "$500-700",
    company: "AppSolutions"
  }, 
  {
    id: 9,
    title: "Content Writer for SaaS Blog",
    category: "Content Writing",
    status: "pending",
    appliedAt: "2023-11-20",
    budget: "$300-500",
    company: "SaaSPlatform"
  }
];

// Pending skill applications
export const pendingSkillApplications = [
  {
    id: 105,
    title: "Web Development Tutoring",
    category: "Education",
    status: "pending",
    appliedAt: "2023-11-26",
    rate: "$35/hr",
    provider: "CodeAcademy"
  }, 
  {
    id: 106,
    title: "Graphic Design Collaboration",
    category: "Design",
    status: "pending",
    appliedAt: "2023-11-22",
    compensation: "Skill Exchange",
    partner: "DesignHub"
  }
];

// Rejected job applications
export const rejectedJobApplications = [
  {
    id: 10,
    title: "WordPress Website Development",
    category: "Web Development",
    status: "rejected",
    appliedAt: "2023-11-10",
    rejectedAt: "2023-11-15",
    budget: "$300-500",
    company: "LocalBusiness"
  }, 
  {
    id: 11,
    title: "Logo Design for Startup",
    category: "Graphic Design",
    status: "rejected",
    appliedAt: "2023-11-05",
    rejectedAt: "2023-11-12",
    budget: "$100-300",
    company: "NewStartup"
  }
];

// Rejected skill applications
export const rejectedSkillApplications = [
  {
    id: 107,
    title: "Data Analysis Workshop",
    category: "Data Science",
    status: "rejected",
    appliedAt: "2023-11-08",
    rejectedAt: "2023-11-14",
    compensation: "Certificate + $100",
    organization: "DataScientists"
  }
];
