
import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Mobile App for Local Farmers Market',
    description: 'Creating a mobile app that connects local farmers with consumers, allowing direct purchases and delivery scheduling.',
    category: 'Mobile Development',
    skills: ['React Native', 'Firebase', 'UI/UX Design', 'Project Management'],
    startDate: '2023-08-15',
    endDate: null,
    status: 'recruiting',
    owner: {
      id: 'user1',
      name: 'Laura Chen',
      avatar: 'https://i.pravatar.cc/150?img=32'
    },
    members: [
      {
        id: 'user1',
        name: 'Laura Chen',
        avatar: 'https://i.pravatar.cc/150?img=32',
        role: 'Project Manager',
        skills: ['Project Management', 'Agile', 'Product Strategy'],
        joinedAt: '2023-08-15'
      },
      {
        id: 'user2',
        name: 'Miguel Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'UI/UX Designer',
        skills: ['UI/UX Design', 'Figma', 'User Research'],
        joinedAt: '2023-08-18'
      }
    ],
    openRoles: [
      {
        title: 'React Native Developer',
        requiredSkills: ['React Native', 'JavaScript', 'Mobile Development'],
        filled: false
      },
      {
        title: 'Backend Developer',
        requiredSkills: ['Firebase', 'Node.js', 'Database Design'],
        filled: false
      }
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Create wireframes for main screens',
        description: 'Design wireframes for home, marketplace, and farmer profile screens',
        status: 'completed',
        assignedTo: 'user2',
        dueDate: '2023-08-25',
        priority: 'high'
      },
      {
        id: 'task2',
        title: 'Set up Firebase project',
        description: 'Create Firebase project and configure authentication',
        status: 'todo',
        assignedTo: null,
        dueDate: '2023-09-05',
        priority: 'medium'
      }
    ],
    files: [
      {
        id: 'file1',
        name: 'App Wireframes.fig',
        type: 'figma',
        size: 3500000,
        uploadedBy: 'user2',
        uploadedAt: '2023-08-22',
        url: '#'
      }
    ]
  },
  {
    id: '2',
    title: 'Research Paper: Impact of Microfinance on Rural Communities',
    description: 'Collaborative research project studying the long-term effects of microfinance initiatives in rural areas across developing countries.',
    category: 'Research',
    skills: ['Research Methods', 'Data Analysis', 'Academic Writing', 'Economic Theory'],
    startDate: '2023-07-10',
    endDate: null,
    status: 'in-progress',
    owner: {
      id: 'user3',
      name: 'Dr. Amara Okafor',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    members: [
      {
        id: 'user3',
        name: 'Dr. Amara Okafor',
        avatar: 'https://i.pravatar.cc/150?img=25',
        role: 'Lead Researcher',
        skills: ['Research Methods', 'Economic Theory', 'Statistics'],
        joinedAt: '2023-07-10'
      },
      {
        id: 'user4',
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=53',
        role: 'Data Analyst',
        skills: ['Data Analysis', 'R', 'SPSS', 'Visualization'],
        joinedAt: '2023-07-15'
      },
      {
        id: 'user5',
        name: 'Sofia Mendoza',
        avatar: 'https://i.pravatar.cc/150?img=5',
        role: 'Field Researcher',
        skills: ['Interviews', 'Qualitative Analysis', 'Survey Design'],
        joinedAt: '2023-07-20'
      }
    ],
    openRoles: [
      {
        title: 'Academic Writer',
        requiredSkills: ['Academic Writing', 'Editing', 'Literature Review'],
        filled: false
      }
    ],
    tasks: [
      {
        id: 'task3',
        title: 'Literature review on microfinance impacts',
        description: 'Comprehensive review of existing research on microfinance outcomes',
        status: 'completed',
        assignedTo: 'user3',
        dueDate: '2023-07-30',
        priority: 'high'
      },
      {
        id: 'task4',
        title: 'Analyze survey data from Region A',
        description: 'Statistical analysis of survey responses from first target region',
        status: 'in-progress',
        assignedTo: 'user4',
        dueDate: '2023-08-15',
        priority: 'medium'
      },
      {
        id: 'task5',
        title: 'Conduct follow-up interviews',
        description: 'Interview 10 participants for qualitative insights',
        status: 'in-progress',
        assignedTo: 'user5',
        dueDate: '2023-08-30',
        priority: 'medium'
      }
    ],
    files: [
      {
        id: 'file2',
        name: 'Literature Review Draft.docx',
        type: 'document',
        size: 1200000,
        uploadedBy: 'user3',
        uploadedAt: '2023-07-28',
        url: '#'
      },
      {
        id: 'file3',
        name: 'Survey Raw Data.xlsx',
        type: 'spreadsheet',
        size: 4500000,
        uploadedBy: 'user4',
        uploadedAt: '2023-08-05',
        url: '#'
      }
    ]
  },
  {
    id: '3',
    title: 'Web Platform for Educational Resources',
    description: 'Building an open-source platform where educators can share and collaborate on teaching materials for K-12 students.',
    category: 'Web Development',
    skills: ['React', 'Node.js', 'MongoDB', 'UI/UX Design'],
    startDate: '2023-09-01',
    endDate: null,
    status: 'recruiting',
    owner: {
      id: 'user6',
      name: 'Raj Patel',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    members: [
      {
        id: 'user6',
        name: 'Raj Patel',
        avatar: 'https://i.pravatar.cc/150?img=68',
        role: 'Technical Lead',
        skills: ['React', 'Node.js', 'System Architecture'],
        joinedAt: '2023-09-01'
      }
    ],
    openRoles: [
      {
        title: 'Frontend Developer',
        requiredSkills: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
        filled: false
      },
      {
        title: 'Backend Developer',
        requiredSkills: ['Node.js', 'MongoDB', 'API Design'],
        filled: false
      },
      {
        title: 'Education Content Specialist',
        requiredSkills: ['Curriculum Development', 'Educational Content', 'K-12 Experience'],
        filled: false
      }
    ],
    tasks: [
      {
        id: 'task6',
        title: 'Create project architecture document',
        description: 'Outline system components, data models, and API endpoints',
        status: 'in-progress',
        assignedTo: 'user6',
        dueDate: '2023-09-15',
        priority: 'high'
      }
    ],
    files: [
      {
        id: 'file4',
        name: 'Initial Project Scope.pdf',
        type: 'document',
        size: 850000,
        uploadedBy: 'user6',
        uploadedAt: '2023-09-03',
        url: '#'
      }
    ]
  }
];
