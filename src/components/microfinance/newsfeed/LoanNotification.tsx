
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LoanNotificationProps = {
  type: 'application' | 'approved' | 'payment' | 'reminder';
  user: {
    name: string;
    avatar?: string;
  };
  time: string;
  amount?: number;
  dueDate?: string;
  loanId: string;
}

export const LoanNotification = ({ type, user, time, amount, dueDate, loanId }: LoanNotificationProps) => {
  const renderContent = () => {
    switch (type) {
      case 'application':
        return (
          <span>
            <strong>{user.name}</strong> has applied for a loan of <strong>${amount}</strong>
          </span>
        );
      case 'approved':
        return (
          <span>
            Your loan application for <strong>${amount}</strong> has been approved
          </span>
        );
      case 'payment':
        return (
          <span>
            <strong>{user.name}</strong> has made a payment of <strong>${amount}</strong> for their loan
          </span>
        );
      case 'reminder':
        return (
          <span>
            Payment of <strong>${amount}</strong> is due on <strong>{dueDate}</strong>
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="mb-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm mb-1">
                  {renderContent()}
                </p>
                <p className="text-xs text-gray-500">{time}</p>
              </div>
              
              <Badge variant={
                type === 'approved' ? 'success' :
                type === 'payment' ? 'outline' :
                type === 'reminder' ? 'destructive' : 'secondary'
              }>
                {type}
              </Badge>
            </div>
            
            <div className="flex gap-2 mt-3">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="text-xs">Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Comment</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-2 ml-auto" asChild>
                <Link to={`/microfinance/loans/${loanId}`}>
                  <span className="text-xs">View Details</span>
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
