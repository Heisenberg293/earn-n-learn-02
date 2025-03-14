
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileText,
  Upload,
  BookOpen,
  Code,
  Paintbrush,
  TrendingUp,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  budget: z.string().min(1, {
    message: "Please enter a budget.",
  }),
  deadline: z.string().min(1, {
    message: "Please select a deadline.",
  }),
  difficulty: z.string({
    required_error: "Please select a difficulty level.",
  }),
});

interface JobPostFormProps {
  onSuccess?: () => void;
}

export const JobPostForm = ({ onSuccess }: JobPostFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
      difficulty: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real application, this would send data to an API
    console.log("Form submitted:", values);
    
    // Call the success callback if provided
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          Post a New Job
        </h2>
        <p className="text-gray-600 mt-2">
          Fill out the form below to create a new job for freelancers
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Logo Design for Tech Startup" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a clear, specific title for your job.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide detailed information about the job requirements..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific about deliverables, timeline, and requirements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="academic">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <span>Academic Help</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="coding">
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-gray-500" />
                            <span>Coding</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="design">
                          <div className="flex items-center gap-2">
                            <Paintbrush className="h-4 w-4 text-gray-500" />
                            <span>Design</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="marketing">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-500" />
                            <span>Marketing</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range (USD)</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., $100-200" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a specific amount or range
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-white gap-2"
              >
                <Upload className="h-4 w-4" />
                Post Job
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
