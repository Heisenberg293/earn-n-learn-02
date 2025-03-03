
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, Calendar, ArrowRight, PiggyBank, Edit, Save, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockSavingsGoals } from "../data/financial-data";
import { SavingsGoal } from "../types/financial-types";

const SavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>(mockSavingsGoals);
  const [newGoal, setNewGoal] = useState<Partial<SavingsGoal>>({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: "",
    description: "",
    category: "other"
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<{ [key: string]: number }>({});

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const goal: SavingsGoal = {
      id: `s${Date.now()}`,
      name: newGoal.name || "",
      targetAmount: Number(newGoal.targetAmount) || 0,
      currentAmount: Number(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline || "",
      description: newGoal.description || "",
      category: newGoal.category || "other"
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: "",
      description: "",
      category: "other"
    });
    
    toast({
      title: "Savings goal created",
      description: `Created new goal: ${goal.name}`
    });
  };

  const handleEditGoal = (goalId: string) => {
    setEditingGoalId(goalId);
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setNewGoal({ ...goal });
    }
  };

  const handleSaveEdit = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedGoals = goals.map(goal => {
      if (goal.id === editingGoalId) {
        return {
          ...goal,
          name: newGoal.name || goal.name,
          targetAmount: Number(newGoal.targetAmount) || goal.targetAmount,
          currentAmount: Number(newGoal.currentAmount) || goal.currentAmount,
          deadline: newGoal.deadline || goal.deadline,
          description: newGoal.description || goal.description,
          category: newGoal.category || goal.category
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setEditingGoalId(null);
    setNewGoal({
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: "",
      description: "",
      category: "other"
    });
    
    toast({
      title: "Savings goal updated",
      description: "Your goal has been successfully updated"
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    
    toast({
      title: "Savings goal deleted",
      description: "Your goal has been successfully deleted"
    });
  };

  const handleContribution = (goalId: string) => {
    const amount = contributionAmount[goalId];
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to contribute",
        variant: "destructive"
      });
      return;
    }

    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = goal.currentAmount + amount;
        const completed = newAmount >= goal.targetAmount;
        
        if (completed) {
          toast({
            title: "Goal achieved! 🎉",
            description: `Congratulations! You've reached your savings goal for "${goal.name}"`
          });
        }
        
        return {
          ...goal,
          currentAmount: newAmount
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setContributionAmount({
      ...contributionAmount,
      [goalId]: 0
    });
    
    toast({
      title: "Contribution added",
      description: `Added $${amount} to your savings goal`
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency": return "bg-red-100 text-red-800";
      case "education": return "bg-blue-100 text-blue-800";
      case "travel": return "bg-yellow-100 text-yellow-800";
      case "tech": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingGoalId ? "Edit Savings Goal" : "Create New Savings Goal"}
          </CardTitle>
          <CardDescription>
            {editingGoalId ? "Update your existing goal" : "Set a new financial target to achieve"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.name || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-category">Category</Label>
                <select
                  id="goal-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newGoal.category || "other"}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                >
                  <option value="emergency">Emergency</option>
                  <option value="education">Education</option>
                  <option value="travel">Travel</option>
                  <option value="tech">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount ($)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="1000"
                  value={newGoal.targetAmount || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-amount">Starting Amount ($)</Label>
                <Input
                  id="current-amount"
                  type="number"
                  placeholder="0"
                  value={newGoal.currentAmount || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                placeholder="Why is this goal important to you?"
                value={newGoal.description || ""}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </div>
            
            {editingGoalId ? (
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} className="flex-1">
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingGoalId(null);
                    setNewGoal({
                      name: "",
                      targetAmount: 0,
                      currentAmount: 0,
                      deadline: "",
                      description: "",
                      category: "other"
                    });
                  }} 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={handleAddGoal} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Savings Goal
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5" /> {goal.name}
                  </CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getCategoryColor(goal.category)}`}>
                    {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditGoal(goal.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span>${goal.targetAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress: ${goal.currentAmount.toFixed(2)}</span>
                  <span>{calculateProgress(goal.currentAmount, goal.targetAmount)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {goal.currentAmount < goal.targetAmount 
                    ? `$${(goal.targetAmount - goal.currentAmount).toFixed(2)} more to go` 
                    : "Goal completed! 🎉"}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex gap-2 w-full">
                <Input 
                  type="number" 
                  placeholder="Amount to add"
                  value={contributionAmount[goal.id] || ""}
                  onChange={(e) => setContributionAmount({
                    ...contributionAmount,
                    [goal.id]: parseFloat(e.target.value)
                  })}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleContribution(goal.id)}
                  disabled={goal.currentAmount >= goal.targetAmount}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {goals.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <PiggyBank className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">You don't have any savings goals yet. Create one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavingsGoals;
