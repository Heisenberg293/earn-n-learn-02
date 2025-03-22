
import { Message } from "./ChatBot";

// Mock job listings
const jobListings = [
  {
    id: 1,
    title: "Python Programming Assignment",
    category: "coding",
    budget: "$150-300",
    difficulty: "Intermediate",
    description: "Need help with a Python data analysis project involving pandas, matplotlib, and data visualization.",
    skills: ["Python", "Data Analysis", "Pandas", "Matplotlib"]
  },
  {
    id: 2,
    title: "Logo Design for Tech Startup",
    category: "design",
    budget: "$200-400",
    difficulty: "Intermediate",
    description: "Create a modern, minimalist logo for a SaaS company focusing on productivity tools.",
    skills: ["Graphic Design", "Logo Design", "Adobe Illustrator", "Branding"]
  },
  {
    id: 3,
    title: "Research Paper Review",
    category: "academic",
    budget: "$100-200",
    difficulty: "Advanced",
    description: "Review and provide feedback on a 20-page research paper in the field of environmental science.",
    skills: ["Academic Writing", "Research", "Environmental Science", "Proofreading"]
  },
  {
    id: 4,
    title: "Social Media Strategy",
    category: "marketing",
    budget: "$300-600",
    difficulty: "Beginner",
    description: "Develop a social media content calendar and strategy for a small fitness business.",
    skills: ["Social Media Marketing", "Content Planning", "Marketing Strategy"]
  },
  {
    id: 5,
    title: "JavaScript Frontend Development",
    category: "coding",
    budget: "$400-800",
    difficulty: "Advanced",
    description: "Build a responsive single-page application using React and Redux.",
    skills: ["JavaScript", "React", "Redux", "Responsive Design"]
  },
  {
    id: 6,
    title: "Content Writing for Blog",
    category: "writing",
    budget: "$100-300",
    difficulty: "Beginner",
    description: "Write 5 blog posts about digital marketing trends.",
    skills: ["Content Writing", "Blogging", "SEO", "Digital Marketing"]
  }
];

// FAQ responses
const faqResponses: Record<string, string> = {
  "post job": "To post a job, go to the Task Hub page and click on the 'Post a Job' button. Fill in the job details including title, description, budget, and required skills.",
  "post a job": "To post a job, go to the Task Hub page and click on the 'Post a Job' button. Fill in the job details including title, description, budget, and required skills.",
  "escrow": "Our escrow system ensures secure payments. When a job is accepted, the client deposits funds into escrow. Funds are only released when the work is completed and approved. This protects both parties during the transaction.",
  "escrow system": "Our escrow system ensures secure payments. When a job is accepted, the client deposits funds into escrow. Funds are only released when the work is completed and approved. This protects both parties during the transaction.",
  "payment": "We accept payments via credit/debit cards, PayPal, and bank transfers. All payments for jobs are secured through our escrow system.",
  "dispute": "If you have a dispute about a job or payment, you can open a dispute case through the job details page. Our team will review the case and help mediate a resolution.",
  "find jobs": "To find jobs, go to the Task Hub page where you can browse available jobs. You can filter by category, skill level, and budget range to find jobs that match your preferences.",
  "apply for job": "To apply for a job, click on the job listing to view details, then click the 'Apply' button. You'll need to submit a proposal outlining your skills and why you're a good fit for the job.",
  "profile": "You can update your profile by going to the Profile page. Here you can add your skills, portfolio items, and personal information to make your profile more attractive to potential clients.",
  "withdraw money": "You can withdraw your earnings through the Earnings page under your Profile. We process withdrawals within 3-5 business days.",
  "feedback": "After completing a job, both the client and freelancer can leave feedback and ratings. This helps build your reputation on the platform.",
  "browse jobs": "You can browse all available jobs in the Task Hub section. Click on 'View All' in the Recent Jobs section of your Dashboard or navigate directly to the Task Hub page.",
  "task hub": "The Task Hub is our job marketplace where you can browse and apply for available jobs or post your own job listings if you need work done."
};

// State variables to track conversation context
let currentContext: {
  stage: 'initial' | 'asking_category' | 'asking_skill_level' | 'asking_budget' | 'recommending';
  category?: string;
  skillLevel?: string;
  budgetRange?: string;
} = {
  stage: 'initial'
};

// Function to match user query with FAQ responses
const matchFAQ = (query: string): string | null => {
  const normalizedQuery = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(faqResponses)) {
    if (normalizedQuery.includes(keyword)) {
      return response;
    }
  }
  
  return null;
};

// Function to filter jobs based on user preferences
const filterJobs = (category?: string, skillLevel?: string, budgetMin?: number, budgetMax?: number) => {
  let filtered = [...jobListings];
  
  if (category) {
    filtered = filtered.filter(job => 
      job.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (skillLevel) {
    filtered = filtered.filter(job => 
      job.difficulty.toLowerCase() === skillLevel.toLowerCase()
    );
  }
  
  if (budgetMin !== undefined || budgetMax !== undefined) {
    filtered = filtered.filter(job => {
      const budgetStr = job.budget.replace('$', '');
      const [min, max] = budgetStr.split('-').map(num => parseInt(num.trim()));
      
      if (budgetMin !== undefined && min < budgetMin) return false;
      if (budgetMax !== undefined && max > budgetMax) return false;
      
      return true;
    });
  }
  
  return filtered;
};

// Function to extract budget range from user input
const extractBudgetRange = (input: string): [number | undefined, number | undefined] => {
  const matches = input.match(/\$?(\d+)(?:\s*-\s*\$?(\d+))?/);
  
  if (matches) {
    const min = matches[1] ? parseInt(matches[1]) : undefined;
    const max = matches[2] ? parseInt(matches[2]) : undefined;
    return [min, max];
  }
  
  return [undefined, undefined];
};

// Main function to generate chat responses
export const generateChatResponse = async (
  message: string, 
  conversation: Message[]
): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const normalizedMessage = message.toLowerCase();
  
  // Check if message matches a FAQ
  const faqResponse = matchFAQ(normalizedMessage);
  if (faqResponse) {
    return faqResponse;
  }
  
  // Job recommendation flow
  if (
    normalizedMessage.includes('job') && 
    (normalizedMessage.includes('find') || normalizedMessage.includes('recommend') || normalizedMessage.includes('looking for'))
  ) {
    currentContext.stage = 'asking_category';
    return "I'd be happy to help you find a job! What type of job are you looking for? (e.g., Coding, Design, Marketing, Writing, Academic)";
  }
  
  // Add handling for view all jobs or task hub related queries
  if (
    (normalizedMessage.includes('view all') && normalizedMessage.includes('job')) ||
    normalizedMessage.includes('browse job') ||
    (normalizedMessage.includes('task') && normalizedMessage.includes('hub'))
  ) {
    return "You can view all available jobs in the Task Hub. I can help navigate you there - just click on 'View All' in the Recent Jobs section of your Dashboard, or you can go directly to the Job Hub from the main navigation.";
  }
  
  // Handle conversation based on current context
  switch (currentContext.stage) {
    case 'asking_category':
      // Store category and ask for skill level
      if (
        normalizedMessage.includes('cod') || 
        normalizedMessage.includes('program') || 
        normalizedMessage.includes('develop')
      ) {
        currentContext.category = 'coding';
      } else if (
        normalizedMessage.includes('design') ||
        normalizedMessage.includes('graphic') ||
        normalizedMessage.includes('logo')
      ) {
        currentContext.category = 'design';
      } else if (
        normalizedMessage.includes('market') ||
        normalizedMessage.includes('social media') ||
        normalizedMessage.includes('seo')
      ) {
        currentContext.category = 'marketing';
      } else if (
        normalizedMessage.includes('writ') ||
        normalizedMessage.includes('content') ||
        normalizedMessage.includes('blog')
      ) {
        currentContext.category = 'writing';
      } else if (
        normalizedMessage.includes('academ') ||
        normalizedMessage.includes('research') ||
        normalizedMessage.includes('paper')
      ) {
        currentContext.category = 'academic';
      } else {
        currentContext.category = message.trim();
      }
      
      currentContext.stage = 'asking_skill_level';
      return `Great! What is your skill level in ${currentContext.category}? (Beginner, Intermediate, Advanced)`;
      
    case 'asking_skill_level':
      // Store skill level and ask for budget
      if (normalizedMessage.includes('begin')) {
        currentContext.skillLevel = 'beginner';
      } else if (normalizedMessage.includes('inter')) {
        currentContext.skillLevel = 'intermediate';
      } else if (normalizedMessage.includes('advan') || normalizedMessage.includes('expert')) {
        currentContext.skillLevel = 'advanced';
      } else {
        currentContext.skillLevel = message.trim();
      }
      
      currentContext.stage = 'asking_budget';
      return "What is your budget range for this job? (e.g., $100-200, $500+)";
      
    case 'asking_budget':
      // Store budget and provide recommendations
      currentContext.budgetRange = message.trim();
      currentContext.stage = 'recommending';
      
      const [budgetMin, budgetMax] = extractBudgetRange(message);
      
      const recommendations = filterJobs(
        currentContext.category,
        currentContext.skillLevel,
        budgetMin,
        budgetMax
      );
      
      if (recommendations.length === 0) {
        return "I couldn't find any jobs matching your criteria. Would you like to try with different parameters?";
      }
      
      let response = `Here are some ${currentContext.category} jobs matching your criteria:\n\n`;
      
      recommendations.slice(0, 3).forEach((job, index) => {
        response += `${index + 1}. ${job.title}\n   Budget: ${job.budget}\n   Difficulty: ${job.difficulty}\n   Description: ${job.description.substring(0, 100)}...\n\n`;
      });
      
      response += "You can view more details about these jobs in the Task Hub section. Would you like more specific information about any of these jobs?";
      
      // Reset context for next conversation
      currentContext = { stage: 'initial' };
      
      return response;
      
    default:
      // Handle general queries or start a new conversation
      if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
        return "Hello! How can I help you today? I can assist with job recommendations, answer questions about the platform, or help you find skills that match your needs.";
      }
      
      if (normalizedMessage.includes('thank')) {
        return "You're welcome! If you have any other questions, feel free to ask.";
      }
      
      if (
        normalizedMessage.includes('skill') && 
        (normalizedMessage.includes('match') || normalizedMessage.includes('find'))
      ) {
        currentContext.stage = 'asking_category';
        return "I can help you find jobs that match your skills. What category of skills do you have? (e.g., Coding, Design, Marketing)";
      }
      
      if (normalizedMessage.includes('budget') && normalizedMessage.includes('suggest')) {
        return "What is your budget range? I can suggest jobs that fit within your budget.";
      }
      
      // Default response
      return "I'm not sure I understand. Would you like help with finding jobs, learning about our platform features, or something else?";
  }
};
