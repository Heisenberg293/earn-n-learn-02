
import { Briefcase, Search, CreditCard, Users, MessageSquare, Home, Calendar } from 'lucide-react';
import { MenuItemProps } from './SidebarMenuItem';

export const createSidebarData = (isActive: (path: string) => boolean) => {
  const jobHubItems: MenuItemProps = {
    title: "Job Hub",
    icon: <Briefcase className="h-4 w-4" />,
    tooltip: "Job Hub",
    isActive,
    subItems: [
      { title: "My Jobs", path: "/my-jobs", isActive },
      { title: "Applied Jobs", path: "/applied-jobs", isActive },
      { title: "Earnings", path: "/profile/earnings", isActive }
    ]
  };

  const browseJobItems: MenuItemProps = {
    title: "Browse Job",
    icon: <Search className="h-4 w-4" />,
    tooltip: "Browse Job",
    isActive,
    badge: "8",
    subItems: [
      { title: "Browse Jobs", path: "/task-hub", isActive },
      { title: "Post Job", path: "/post-task", isActive },
      { title: "Skill Exchange", path: "/skills-matching", isActive }
    ]
  };

  const microfinanceItems: MenuItemProps = {
    title: "Microfinance",
    icon: <CreditCard className="h-4 w-4" />,
    tooltip: "Microfinance",
    isActive,
    subItems: [
      { title: "Peer-to-Peer Lending", path: "/microfinance?tab=peer-lending", isActive },
      { title: "Crowdfunding", path: "/microfinance?tab=crowdfunding", isActive },
      { title: "Escrow", path: "/microfinance?tab=escrow", isActive },
      { title: "Bidding System", path: "/microfinance?tab=bidding", isActive }
    ]
  };

  const socialItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      path: "/",
      tooltip: "Dashboard",
      isActive
    },
    {
      title: "Schedule",
      icon: <Calendar className="h-4 w-4" />,
      path: "/schedule",
      tooltip: "Schedule",
      badge: "3",
      isActive
    },
    {
      title: "Communications",
      icon: <MessageSquare className="h-4 w-4" />,
      path: "/communications",
      tooltip: "Communications",
      isActive
    }
  ];

  return {
    jobHubItems,
    browseJobItems,
    microfinanceItems,
    socialItems
  };
};
