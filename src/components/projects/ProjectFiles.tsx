
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  Download, 
  Image as ImageIcon, 
  File, 
  FileSpreadsheet, 
  FileCode, 
  FileImage,
  X,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project, ProjectFile } from "./types";

interface ProjectFilesProps {
  project: Project;
}

const ProjectFiles = ({ project }: ProjectFilesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Project Files ({project.files.length})</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-60">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-10" />
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
      
      {project.files.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No files yet</h3>
          <p className="text-muted-foreground mb-6">Upload project files to share with the team</p>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload First File
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Uploaded By</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {project.files.map((file) => (
                  <tr key={file.id} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <FileIcon type={file.type} />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage 
                            src={project.members.find(m => m.id === file.uploadedBy)?.avatar} 
                            alt={project.members.find(m => m.id === file.uploadedBy)?.name} 
                          />
                          <AvatarFallback>
                            {project.members.find(m => m.id === file.uploadedBy)?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {project.members.find(m => m.id === file.uploadedBy)?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface FileIconProps {
  type: string;
}

const FileIcon = ({ type }: FileIconProps) => {
  switch (type) {
    case 'image':
    case 'figma':
      return <FileImage className="h-5 w-5 text-blue-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'spreadsheet':
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    case 'code':
      return <FileCode className="h-5 w-5 text-purple-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

// Helper function to format file sizes
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export default ProjectFiles;
