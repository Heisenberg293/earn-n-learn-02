
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';
import SidebarMenuItem, { MenuItemProps } from './SidebarMenuItem';

interface SidebarMenuGroupProps {
  label: string;
  items: MenuItemProps[];
  openMenus: Record<string, boolean>;
  toggleMenu: (menu: string) => void;
}

const SidebarMenuGroup = ({ label, items, openMenus, toggleMenu }: SidebarMenuGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
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
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMenuGroup;
