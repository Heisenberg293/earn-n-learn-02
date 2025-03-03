
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PortfolioItem, { PortfolioItemType } from "./PortfolioItem";
import { Link, Image, File, BookOpen } from "lucide-react";

const PortfolioSection = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([
    {
      title: "Personal Website",
      description: "My portfolio website built with React",
      type: "link",
      url: "https://example.com",
    },
  ]);
  const [isAddingPortfolioItem, setIsAddingPortfolioItem] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState<Partial<PortfolioItemType>>({
    title: "",
    description: "",
    type: "link",
    url: "",
  });

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

  // Portfolio management
  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.type) {
      setPortfolioItems([...portfolioItems, newPortfolioItem as PortfolioItemType]);
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

  return (
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
                      onClick={() => setNewPortfolioItem({...newPortfolioItem, type: type as PortfolioItemType["type"]})}
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
              <PortfolioItem
                key={index}
                item={item}
                index={index}
                onRemove={removePortfolioItem}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
