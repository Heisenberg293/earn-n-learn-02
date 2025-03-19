
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarMenuGroup from './SidebarMenuGroup';
import SidebarFooterSection from './SidebarFooterSection';
import { createSidebarData } from './SidebarData';

const AppSidebar = () => {
  const location = useLocation();
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

  const { jobHubItems, browseJobItems, microfinanceItems, socialItems } = createSidebarData(isActive);

  return (
    <Sidebar>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <SidebarContent>
        <SidebarMenuGroup 
          label="Main" 
          items={[jobHubItems, browseJobItems, microfinanceItems]} 
          openMenus={openMenus}
          toggleMenu={toggleMenu}
        />

        <SidebarMenuGroup 
          label="Social" 
          items={socialItems} 
          openMenus={openMenus}
          toggleMenu={toggleMenu}
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarFooterSection isActive={isActive} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
