
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Check, ChevronsRight, DollarSign, Calendar, BookOpen, Home, Laptop, AlertTriangle, HelpCircle } from "lucide-react";
import { LoanCompletionData } from "../data/financial-data";

interface LoanTimelineProps {
  loanCompletions: LoanCompletionData[];
}

export const LoanTimeline: React.FC<LoanTimelineProps> = ({ loanCompletions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<LoanCompletionData | null>(null);

  const filteredLoans = selectedCategory
    ? loanCompletions.filter(loan => loan.category === selectedCategory)
    : loanCompletions;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "textbooks":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "housing":
        return <Home className="h-4 w-4 text-green-500" />;
      case "technology":
        return <Laptop className="h-4 w-4 text-purple-500" />;
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const categories = Array.from(new Set(loanCompletions.map(loan => loan.category)));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Loan Completion Timeline
        </CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            size="sm" 
            onClick={() => setSelectedCategory(null)}
            className="text-xs h-7"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs h-7 flex items-center gap-1"
            >
              {getCategoryIcon(category)}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {filteredLoans.map((loan, index) => (
              <div key={loan.id} className="mb-4 pl-12 relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Timeline dot */}
                <div className="absolute left-2 top-2 h-6 w-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-500" />
                </div>
                
                {/* Timeline card */}
                <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">${loan.amount} Loan Completed</h4>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">{loan.borrower}</span> repaid loan to <span className="font-medium">{loan.lender}</span>
                        </p>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(loan.completedDate), { addSuffix: true })}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(loan.category)}
                        {loan.category}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {loan.duration}
                      </Badge>
                      
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-xs h-7 ml-auto">
                            <span>Details</span>
                            <ChevronsRight className="h-3 w-3 ml-1" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Loan Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <span className="text-muted-foreground">Amount:</span>
                              <span className="font-medium">${loan.amount}</span>
                              
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="font-medium">{loan.duration}</span>
                              
                              <span className="text-muted-foreground">Category:</span>
                              <span className="font-medium flex items-center gap-1">
                                {getCategoryIcon(loan.category)}
                                {loan.category}
                              </span>
                              
                              <span className="text-muted-foreground">Completed on:</span>
                              <span className="font-medium">
                                {new Date(loan.completedDate).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mt-2 pt-2 border-t text-muted-foreground">
                              {loan.description}
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
