
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SidebarMenuItem as SidebarMenuItemUI,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar';
import SidebarSubMenu from './SidebarSubMenu';

interface SubMenuItemProps {
  title: string;
  path: string;
  isActive: (path: string) => boolean;
}

export interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  path?: string;
  tooltip?: string;
  subItems?: SubMenuItemProps[];
  isActive: (path: string) => boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  badge?: string | number;
}

interface SidebarMenuItemComponentProps {
  item: MenuItemProps;
  isCollapsed: boolean;
}

const SidebarMenuItem = ({ item, isCollapsed }: SidebarMenuItemComponentProps) => {
  const hasSubMenu = item.subItems && item.subItems.length > 0;
  
  if (hasSubMenu) {
    return (
      <SidebarMenuItemUI key={item.title}>
        <SidebarMenuButton 
          tooltip={isCollapsed ? item.title : undefined}
          onClick={item.onToggle}
          className="flex justify-between w-full"
          isActive={item.isActive(item.path || '')}
        >
          <div className="flex items-center">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <motion.div
            initial={false}
            animate={{ rotate: item.isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={isCollapsed ? 'hidden' : ''}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </SidebarMenuButton>
        
        {item.badge && !isCollapsed && (
          <SidebarMenuBadge className="bg-sidebar-accent">
            {item.badge}
          </SidebarMenuBadge>
        )}
        
        {!isCollapsed && item.isOpen && (
          <SidebarSubMenu subItems={item.subItems} />
        )}
      </SidebarMenuItemUI>
    );
  } else {
    return (
      <SidebarMenuItemUI key={item.title}>
        <SidebarMenuButton 
          asChild 
          isActive={item.path ? item.isActive(item.path) : false}
          tooltip={isCollapsed ? item.title : undefined}
        >
          <Link to={item.path || "#"}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
        
        {item.badge && !isCollapsed && (
          <SidebarMenuBadge className="bg-sidebar-accent">
            {item.badge}
          </SidebarMenuBadge>
        )}
      </SidebarMenuItemUI>
    );
  }
};

export default SidebarMenuItem;
