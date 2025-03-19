
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';
import SidebarMenuItem, { MenuItemProps } from './SidebarMenuItem';
import { AnimatePresence } from 'framer-motion';

interface SidebarMenuGroupProps {
  label: string;
  items: MenuItemProps[];
  openMenus: Record<string, boolean>;
  toggleMenu: (menu: string) => void;
  isCollapsed: boolean;
}

const SidebarMenuGroup = ({ 
  label, 
  items, 
  openMenus, 
  toggleMenu, 
  isCollapsed 
}: SidebarMenuGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <AnimatePresence>
            {items.map(item => {
              const menuKey = item.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <SidebarMenuItem 
                  key={item.title}
                  item={{
                    ...item,
                    isOpen: item.subItems ? openMenus[menuKey] : undefined,
                    onToggle: item.subItems ? () => toggleMenu(menuKey) : undefined
                  }} 
                  isCollapsed={isCollapsed}
                />
              );
            })}
          </AnimatePresence>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuGroup;
