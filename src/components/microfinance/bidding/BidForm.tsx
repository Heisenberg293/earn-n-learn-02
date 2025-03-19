
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Job } from "../escrow/types";
import { DollarSign, Handshake, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bidFormSchema = z.object({
  amount: z.coerce.number().min(0, {
    message: "Bid amount must be a positive number or zero for skill exchanges",
  }),
  message: z.string().min(10, {
    message: "Your proposal should be at least 10 characters",
  }),
  proposedTimeframe: z.string().min(1, {
    message: "Please provide a timeframe",
  }),
  bidType: z.enum(["money", "skill-exchange"], {
    required_error: "Please select a bid type",
  }),
  skillOffered: z.string().optional(),
});

interface BidFormProps {
  job: Job;
  onSubmitBid: (bidData: z.infer<typeof bidFormSchema>) => void;
}

const BidForm = ({ job, onSubmitBid }: BidFormProps) => {
  const { toast } = useToast();
  const [bidType, setBidType] = useState<"money" | "skill-exchange">("money");
  
  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
    defaultValues: {
      amount: 0,
      message: "",
      proposedTimeframe: "",
      bidType: "money",
      skillOffered: "",
    },
  });

  const onSubmit = (values: z.infer<typeof bidFormSchema>) => {
    // If it's a skill exchange and no skill is offered
    if (values.bidType === "skill-exchange" && !values.skillOffered) {
      toast({
        title: "Missing skill",
        description: "Please specify what skill you're offering in exchange",
        variant: "destructive",
      });
      return;
    }

    // If it's a money bid with zero amount
    if (values.bidType === "money" && values.amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid bid amount greater than zero",
        variant: "destructive",
      });
      return;
    }

    onSubmitBid(values);
    form.reset();
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Place Your Bid</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bidType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Bid Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value: "money" | "skill-exchange") => {
                        field.onChange(value);
                        setBidType(value);
                        // Reset amount to 0 for skill exchange
                        if (value === "skill-exchange") {
                          form.setValue("amount", 0);
                        }
                      }}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="money" id="bidtype-money" />
                        <Label htmlFor="bidtype-money" className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" /> Monetary Bid
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="skill-exchange" id="bidtype-skill" />
                        <Label htmlFor="bidtype-skill" className="flex items-center gap-2">
                          <Handshake className="h-4 w-4" /> Skill Exchange
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {bidType === "money" ? (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Bid Amount ($)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field} 
                          className="pl-10 border-gray-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="skillOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Offered in Exchange</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Web Design, Content Writing" {...field} className="border-gray-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="proposedTimeframe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Timeframe</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 days, 2 weeks" {...field} className="border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Proposal</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe why you're the best fit for this job..."
                      className="min-h-[120px] border-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Bid
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BidForm;
