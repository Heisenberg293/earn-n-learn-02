
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileImageProps {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

const ProfileImage = ({ profileImage, setProfileImage }: ProfileImageProps) => {
  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Upload a photo to personalize your profile</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative mb-4">
          {profileImage ? (
            <div className="relative">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-0 right-0"
                onClick={() => setProfileImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
              <span className="text-gray-400 text-4xl">?</span>
            </div>
          )}
        </div>
        <Label htmlFor="profile-image" className="cursor-pointer">
          <div className="flex items-center gap-2 text-primary hover:underline">
            <PlusCircle className="h-4 w-4" />
            <span>{profileImage ? "Change photo" : "Upload photo"}</span>
          </div>
          <Input 
            id="profile-image" 
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={handleImageUpload}
          />
        </Label>
      </CardContent>
    </Card>
  );
};

export default ProfileImage;
