
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './sidebar/AppSidebar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const SIDEBAR_STATE_COOKIE = 'sidebar-open-state';

export const SidebarNavigation = ({ children }: { children: React.ReactNode }) => {
  // Check for saved sidebar state
  const savedState = Cookies.get(SIDEBAR_STATE_COOKIE);
  const defaultOpen = savedState ? savedState === 'true' : true;
  
  // Save sidebar state when it changes
  const handleSidebarChange = (isOpen: boolean) => {
    Cookies.set(SIDEBAR_STATE_COOKIE, String(isOpen), { expires: 30 });
  };
  
  // Initialize sidebar state from cookies
  useEffect(() => {
    // This effect only runs on mount to initialize from cookies
  }, []);

  return (
    <SidebarProvider defaultOpen={defaultOpen} onOpenChange={handleSidebarChange}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
