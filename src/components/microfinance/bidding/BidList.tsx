
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bid } from "../escrow/types";
import { Clock, DollarSign, MessageSquare, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BidListProps {
  bids: Bid[];
  onAcceptBid: (bidId: string) => void;
  onRejectBid: (bidId: string) => void;
  isCreator: boolean;
}

const BidList = ({ bids, onAcceptBid, onRejectBid, isCreator }: BidListProps) => {
  const { toast } = useToast();
  const [expandedBidId, setExpandedBidId] = useState<string | null>(null);

  const toggleExpandBid = (bidId: string) => {
    setExpandedBidId(expandedBidId === bidId ? null : bidId);
  };

  const getStatusBadgeClass = (status: Bid["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  if (bids.length === 0) {
    return (
      <Card className="bg-gray-50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <RefreshCw className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            No bids have been placed yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <Card key={bid.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{bid.bidder}</span>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusBadgeClass(bid.status)}`}
                  >
                    {bid.status}
                  </Badge>
                </div>
                {bid.bidType === "money" ? (
                  <div className="flex items-center gap-1 text-base font-semibold mt-1">
                    <DollarSign className="h-4 w-4" />
                    {bid.amount.toFixed(2)}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-base font-semibold mt-1">
                    <span className="text-purple-600">Skill Exchange: {bid.skillOffered}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {bid.proposedTimeframe}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className={`${
                expandedBidId === bid.id ? "" : "line-clamp-2"
              } text-gray-600 mb-3`}
            >
              {bid.message}
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => toggleExpandBid(bid.id)}
                className="text-xs text-blue-600 flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3" />
                {expandedBidId === bid.id ? "Show less" : "Read more"}
              </button>
              
              {isCreator && bid.status === "pending" && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onRejectBid(bid.id)}
                  >
                    Decline
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onAcceptBid(bid.id)}
                  >
                    Accept Bid
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BidList;
