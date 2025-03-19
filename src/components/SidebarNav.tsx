
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from './sidebar/AppSidebar';

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
