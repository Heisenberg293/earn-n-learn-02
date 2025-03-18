
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { 
  Briefcase, 
  BarChart4, 
  Users, 
  MessageSquare, 
  User, 
  CreditCard, 
  Settings, 
  PanelLeft,
  LogOut,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  RefreshCw,
  Menu
} from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { motion } from 'framer-motion';

export const SidebarNavigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

interface SubMenuItemProps {
  title: string;
  path: string;
  isActive: (path: string) => boolean;
}

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
  tooltip?: string;
  subItems?: SubMenuItemProps[];
  isActive: (path: string) => boolean;
}

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'job-hub': true,
    'browse-job': true,
    'microfinance': true
  });

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

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

  const renderSubMenuItems = (subItems: SubMenuItemProps[]) => {
    return subItems.map((item) => (
      <SidebarMenuSubItem key={item.title}>
        <SidebarMenuSubButton 
          asChild 
          isActive={isActive(item.path)}
        >
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    ));
  };

  const renderMenuItem = (item: MenuItemProps) => {
    if (item.subItems && item.subItems.length > 0) {
      const isOpen = openMenus[item.title.toLowerCase().replace(/\s+/g, '-')];
      
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            tooltip={item.tooltip}
            onClick={() => toggleMenu(item.title.toLowerCase().replace(/\s+/g, '-'))}
            className="flex justify-between w-full"
          >
            <div className="flex items-center">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </SidebarMenuButton>
          
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SidebarMenuSub>
                {renderSubMenuItems(item.subItems)}
              </SidebarMenuSub>
            </motion.div>
          )}
        </SidebarMenuItem>
      );
    } else {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={item.path ? isActive(item.path) : false}
            tooltip={item.tooltip}
          >
            <Link to={item.path || "#"}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <motion.div 
            className="flex items-center"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xl font-bold">earn-n-learn</h1>
          </motion.div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItem(jobHubItems)}
              {renderMenuItem(browseJobItems)}
              {renderMenuItem(microfinanceItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Social</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialItems.map(item => renderMenuItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/profile')} tooltip="Profile">
                  <Link to="/profile" className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <span>{user?.name || "Profile"}</span>
                    </div>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/profile/settings')} tooltip="Settings">
                  <Link to="/profile/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

