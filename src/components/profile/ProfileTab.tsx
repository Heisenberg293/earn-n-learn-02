
import ProfileImage from "./ProfileImage";
import BasicInformation from "./BasicInformation";
import SkillsSection from "./SkillsSection";
import PortfolioSection from "./PortfolioSection";
import SkillPaymentConnection from "@/components/microfinance/SkillPaymentConnection";
import { useState } from "react";

const ProfileTab = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
      <BasicInformation />
      <SkillsSection />
      <SkillPaymentConnection />
      <PortfolioSection />
    </div>
  );
};

export default ProfileTab;
