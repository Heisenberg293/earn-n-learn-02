
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2, X, Save, Image, Link, File, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";

// Define form schema with zod
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }),
  location: z.string().optional(),
  education: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

// Define portfolio item schema
const portfolioItemSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().optional(),
  type: z.enum(["image", "link", "file", "text"]),
  url: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PortfolioItem = z.infer<typeof portfolioItemSchema>;

const Profile = () => {
  // Mock user data - in a real app, this would come from a database
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>(["JavaScript", "React", "UI Design"]);
  const [newSkill, setNewSkill] = useState("");
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      title: "Personal Website",
      description: "My portfolio website built with React",
      type: "link",
      url: "https://example.com",
    },
  ]);
  const [isAddingPortfolioItem, setIsAddingPortfolioItem] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState<Partial<PortfolioItem>>({
    title: "",
    description: "",
    type: "link",
    url: "",
  });

  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      bio: "Computer Science student passionate about web development and UI/UX design. Looking to collaborate on interesting projects and expand my skills.",
      location: "San Francisco, CA",
      education: "Bachelor's in Computer Science (In Progress)",
      website: "",
    },
  });

  // Handle profile form submission
  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you would save this data to a database
    console.log("Profile data submitted:", data);
    toast.success("Profile updated successfully!");
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Skills management
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      toast.success("Skill added!");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Portfolio management
  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.type) {
      setPortfolioItems([...portfolioItems, newPortfolioItem as PortfolioItem]);
      setNewPortfolioItem({
        title: "",
        description: "",
        type: "link",
        url: "",
      });
      setIsAddingPortfolioItem(false);
      toast.success("Portfolio item added!");
    }
  };

  const removePortfolioItem = (index: number) => {
    const updatedItems = [...portfolioItems];
    updatedItems.splice(index, 1);
    setPortfolioItems(updatedItems);
    toast.success("Portfolio item removed");
  };

  // Helper function to get icon for portfolio item type
  const getPortfolioTypeIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-5 w-5" />;
      case "link": return <Link className="h-5 w-5" />;
      case "file": return <File className="h-5 w-5" />;
      case "text": return <BookOpen className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
        
        {/* Profile Image Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
            <CardDescription>Upload a photo to personalize your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              {profileImage ? (
                <div className="relative">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-0 right-0"
                    onClick={() => setProfileImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-gray-400 text-4xl">?</span>
                </div>
              )}
            </div>
            <Label htmlFor="profile-image" className="cursor-pointer">
              <div className="flex items-center gap-2 text-primary hover:underline">
                <PlusCircle className="h-4 w-4" />
                <span>{profileImage ? "Change photo" : "Upload photo"}</span>
              </div>
              <Input 
                id="profile-image" 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </CardContent>
        </Card>
        
        {/* Basic Profile Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Tell us about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a short bio about yourself" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <Input placeholder="Your education background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Save Profile</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Skills Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add skills that you want to showcase</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditingSkills(!isEditingSkills)}
            >
              {isEditingSkills ? <Save className="h-4 w-4 mr-2" /> : <Pencil className="h-4 w-4 mr-2" />}
              {isEditingSkills ? "Done" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 rounded-full text-sm bg-primary/10 text-primary flex items-center gap-1 ${
                    isEditingSkills ? "pr-1" : ""
                  }`}
                >
                  {skill}
                  {isEditingSkills && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1 text-primary hover:text-destructive hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {isEditingSkills && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Portfolio Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Showcase your projects and work</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingPortfolioItem(true)}
              disabled={isAddingPortfolioItem}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            {isAddingPortfolioItem && (
              <Card className="mb-6 border-dashed border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Add New Portfolio Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-title">Title</Label>
                    <Input
                      id="portfolio-title"
                      placeholder="Project title"
                      value={newPortfolioItem.title}
                      onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-description">Description (Optional)</Label>
                    <Textarea
                      id="portfolio-description"
                      placeholder="Describe your project"
                      value={newPortfolioItem.description}
                      onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Item Type</Label>
                    <div className="flex flex-wrap gap-2">
                      {["link", "image", "file", "text"].map(type => (
                        <Button
                          key={type}
                          type="button"
                          variant={newPortfolioItem.type === type ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setNewPortfolioItem({...newPortfolioItem, type: type as PortfolioItem["type"]})}
                        >
                          {getPortfolioTypeIcon(type)}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {(newPortfolioItem.type === "link" || newPortfolioItem.type === "image") && (
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-url">URL</Label>
                      <Input
                        id="portfolio-url"
                        placeholder={newPortfolioItem.type === "link" ? "https://example.com" : "https://example.com/image.jpg"}
                        value={newPortfolioItem.url}
                        onChange={(e) => setNewPortfolioItem({...newPortfolioItem, url: e.target.value})}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingPortfolioItem(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={addPortfolioItem}>Add to Portfolio</Button>
                </CardFooter>
              </Card>
            )}
            
            {portfolioItems.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No portfolio items yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your projects, images, or other work to showcase your skills
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {getPortfolioTypeIcon(item.type)}
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removePortfolioItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {item.description && <p className="text-sm text-muted-foreground mb-2">{item.description}</p>}
                      
                      {item.type === "image" && item.url && (
                        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      {item.type === "link" && item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                        >
                          <span>View Project</span>
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
