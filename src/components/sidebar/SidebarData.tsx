
import { Home, BookOpen, CreditCard, User, FileText, Users, Settings, Mail, BriefcaseBusiness, Search, DollarSign } from 'lucide-react';

export type SubMenuItem = {
  title: string;
  path: string;
  icon?: React.ComponentType<any>;
};

export type MenuItem = {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
  subMenus?: SubMenuItem[];
};

export const SidebarMenuItems: MenuItem[] = [
  {
    title: 'Home',
    path: '/task-hub',
    icon: Home,
  },
  {
    title: 'Job Hub',
    path: '/task-hub',
    icon: BriefcaseBusiness,
    subMenus: [
      {
        title: 'Browse Jobs',
        path: '/task-hub',
      },
      {
        title: 'My Jobs',
        path: '/my-jobs',
      },
      {
        title: 'Applied Jobs',
        path: '/applied-jobs',
      },
      {
        title: 'Earnings',
        path: '/profile/earnings',
      },
    ],
  },
  {
    title: 'Microfinance',
    path: '/microfinance',
    icon: CreditCard,
    subMenus: [
      {
        title: 'Peer Lending',
        path: '/microfinance',
      },
      {
        title: 'Crowdfunding',
        path: '/microfinance?tab=crowdfunding',
      },
      {
        title: 'Escrow System',
        path: '/microfinance?tab=escrow',
      },
      {
        title: 'Bidding System',
        path: '/microfinance?tab=bidding',
      },
    ],
  },
  {
    title: 'Newsfeed',
    path: '/newsfeed',
    icon: BookOpen,
  },
  {
    title: 'Messages',
    path: '/communications',
    icon: Mail,
    subMenus: [
      {
        title: 'Inbox',
        path: '/communications',
      },
      {
        title: 'Notifications',
        path: '/communications?tab=notifications',
      },
    ],
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
    subMenus: [
      {
        title: 'My Profile',
        path: '/profile',
      },
      {
        title: 'Earnings',
        path: '/profile/earnings',
      },
      {
        title: 'Settings',
        path: '/profile/settings',
      },
    ],
  },
];
