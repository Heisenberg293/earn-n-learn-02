
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, ThumbsUp, Bell } from "lucide-react";
import { LoanCompletionData } from "../data/financial-data";

interface LoanNotificationProps {
  loanCompletions: LoanCompletionData[];
}

export const LoanNotification: React.FC<LoanNotificationProps> = ({ loanCompletions }) => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Simulate new loan completions after a delay
    const timeout = setTimeout(() => {
      // Show notification for the most recent loan completion
      if (loanCompletions.length > 0) {
        const mostRecent = loanCompletions[0];
        
        toast({
          title: (
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-green-500 animate-pulse" />
              <span>Loan Completed!</span>
            </div>
          ),
          description: (
            <div className="pt-1">
              <p className="font-medium">{mostRecent.borrower} just repaid a ${mostRecent.amount} loan</p>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                <ThumbsUp className="h-3 w-3" />
                <span>Building trust in the SkillSwap community</span>
              </div>
            </div>
          ),
          duration: 5000,
        });
      }
    }, 3000);

    // Simulate another loan completion notification after a longer delay
    const secondTimeout = setTimeout(() => {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500 animate-pulse" />
            <span>5 Loans Completed Today!</span>
          </div>
        ),
        description: (
          <div className="pt-1">
            <p>The SkillSwap community has successfully completed 5 peer loans today!</p>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
              <ThumbsUp className="h-3 w-3" />
              <span>$1,395 exchanged within our community</span>
            </div>
          </div>
        ),
        duration: 5000,
      });
    }, 10000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(secondTimeout);
    };
  }, [loanCompletions, toast]);

  return null; // This component doesn't render anything, it just shows toast notifications
};
