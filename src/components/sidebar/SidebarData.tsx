
import { Briefcase, Search, CreditCard, Users, MessageSquare } from 'lucide-react';
import { MenuItemProps } from './SidebarMenuItem';

export const createSidebarData = (isActive: (path: string) => boolean) => {
  const jobHubItems: MenuItemProps = {
    title: "Job Hub",
    icon: <Briefcase />,
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
    icon: <Search />,
    tooltip: "Browse Job",
    isActive,
    subItems: [
      { title: "Browse Jobs", path: "/task-hub", isActive },
      { title: "Post Job", path: "/post-task", isActive },
      { title: "Skill Exchange", path: "/skills-matching", isActive }
    ]
  };

  const microfinanceItems: MenuItemProps = {
    title: "Microfinance",
    icon: <CreditCard />,
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
      title: "Newsfeed",
      icon: <Users />,
      path: "/newsfeed",
      tooltip: "Newsfeed",
      isActive
    },
    {
      title: "Communications",
      icon: <MessageSquare />,
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
