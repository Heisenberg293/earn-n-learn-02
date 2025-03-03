
import ProfileImage from "./ProfileImage";
import BasicInformation from "./BasicInformation";
import SkillsSection from "./SkillsSection";
import PortfolioSection from "./PortfolioSection";
import { useState } from "react";

const ProfileTab = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <div>
      <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
      <BasicInformation />
      <SkillsSection />
      <PortfolioSection />
    </div>
  );
};

export default ProfileTab;
