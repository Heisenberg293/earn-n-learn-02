
import { Home, BookOpen, CreditCard, User, FileText, Users, Settings, Mail, BriefcaseBusiness, Search, DollarSign, BarChart2, LayoutDashboard, MessageSquare, CalendarDays, Bell, Trophy, CheckSquare } from 'lucide-react';

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
    title: 'Dashboard',
    path: '/task-hub',
    icon: LayoutDashboard,
  },
  {
    title: 'Job Hub',
    path: '/task-hub',
    icon: BriefcaseBusiness,
    subMenus: [
      {
        title: 'Browse Jobs',
        path: '/task-hub',
        icon: Search
      },
      {
        title: 'My Jobs',
        path: '/my-jobs',
        icon: FileText
      },
      {
        title: 'Applied Jobs',
        path: '/applied-jobs',
        icon: Users
      },
      {
        title: 'Earnings',
        path: '/profile/earnings',
        icon: DollarSign
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
        icon: Users
      },
      {
        title: 'Crowdfunding',
        path: '/microfinance?tab=crowdfunding',
        icon: BarChart2
      },
      {
        title: 'Escrow System',
        path: '/microfinance?tab=escrow',
        icon: CreditCard
      },
      {
        title: 'Bidding System',
        path: '/microfinance?tab=bidding',
        icon: DollarSign
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
    icon: MessageSquare,
    subMenus: [
      {
        title: 'Direct Messages',
        path: '/communications',
        icon: Mail
      },
      {
        title: 'Group Chats',
        path: '/communications?tab=groups',
        icon: Users
      },
      {
        title: 'Notifications',
        path: '/communications?tab=notifications',
        icon: Bell
      },
    ],
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: CalendarDays,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
    subMenus: [
      {
        title: 'My Profile',
        path: '/profile',
        icon: User
      },
      {
        title: 'My Tasks',
        path: '/profile?tab=tasks',
        icon: CheckSquare
      },
      {
        title: 'Leaderboard',
        path: '/profile?tab=leaderboard',
        icon: Trophy
      },
      {
        title: 'Settings',
        path: '/profile?tab=settings',
        icon: Settings
      },
    ],
  },
];
