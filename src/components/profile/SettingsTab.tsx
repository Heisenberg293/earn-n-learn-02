
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BellRing, Moon, Lock, Globe, Bell } from "lucide-react";

const SettingsTab = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState("public");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated",
    });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password changed",
      description: "Your password has been updated successfully",
    });

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about activity</p>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Task Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminders about upcoming task deadlines</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Skill Match Alerts</p>
              <p className="text-sm text-muted-foreground">Be notified when someone matches your skill exchange</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Button onClick={handleSaveNotifications} className="mt-2">Save Notification Settings</Button>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-primary" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize how the application looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode} 
            />
          </div>
          
          <Button onClick={handleSaveAppearance} className="mt-2">Save Appearance Settings</Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Privacy</CardTitle>
          </div>
          <CardDescription>Manage your privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="privacy-level">Profile Visibility</Label>
            <select
              id="privacy-level"
              className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 py-2"
              value={privacyLevel}
              onChange={(e) => setPrivacyLevel(e.target.value)}
            >
              <option value="public">Public - Anyone can see your profile</option>
              <option value="students">Students Only - Only verified students can see your profile</option>
              <option value="connections">Connections Only - Only your connections can see your profile</option>
              <option value="private">Private - Your profile is hidden</option>
            </select>
          </div>
          
          <Button onClick={handleSavePrivacy} className="mt-2">Save Privacy Settings</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input 
              id="current-password" 
              type="password" 
              placeholder="Enter your current password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1" 
            />
          </div>
          
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input 
              id="new-password" 
              type="password" 
              placeholder="Enter your new password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1" 
            />
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              placeholder="Confirm your new password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1" 
            />
          </div>
          
          <Button onClick={handleChangePassword} className="mt-2">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
