
import { Link, Image, File, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface PortfolioItemType {
  title: string;
  description?: string;
  type: "image" | "link" | "file" | "text";
  url?: string;
}

interface PortfolioItemProps {
  item: PortfolioItemType;
  index: number;
  onRemove: (index: number) => void;
}

const PortfolioItem = ({ item, index, onRemove }: PortfolioItemProps) => {
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
    <Card className="overflow-hidden">
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
            onClick={() => onRemove(index)}
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
  );
};

export default PortfolioItem;
