
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExchangeHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

const ExchangeHeader = ({
  title,
  subtitle,
  icon = <Briefcase className="h-8 w-8 text-green-600 mr-3" />,
}: ExchangeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
    </div>
  );
};

export default ExchangeHeader;
