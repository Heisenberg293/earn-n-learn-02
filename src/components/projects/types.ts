
export interface ProjectMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skills: string[];
  joinedAt: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignedTo: string | null;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  startDate: string;
  endDate: string | null;
  status: 'recruiting' | 'in-progress' | 'completed';
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  members: ProjectMember[];
  openRoles: {
    title: string;
    requiredSkills: string[];
    filled: boolean;
  }[];
  tasks: ProjectTask[];
  files: ProjectFile[];
}
