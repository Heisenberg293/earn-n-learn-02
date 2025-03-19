
import { Link } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarFooterSectionProps {
  isActive: (path: string) => boolean;
}

const SidebarFooterSection = ({ isActive }: SidebarFooterSectionProps) => {
  const { user, logout } = useContext(AuthContext);

  return (
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
  );
};

export default SidebarFooterSection;
