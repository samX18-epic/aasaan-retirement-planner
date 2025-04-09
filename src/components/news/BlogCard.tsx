
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Video, Calendar, Clock, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  type: "article" | "video";
  coverImage: string;
  tags: string[];
}

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className={blog.type === "article" ? "bg-primary" : "bg-purple-600"}>
            {blog.type === "article" ? (
              <FileText className="h-3 w-3 mr-1" />
            ) : (
              <Video className="h-3 w-3 mr-1" />
            )}
            {blog.type === "article" ? "Article" : "Video"}
          </Badge>
        </div>
      </div>
      
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(blog.date)}</span>
          <span className="mx-1">•</span>
          <Clock className="h-3 w-3" />
          <span>{blog.readTime}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0 pb-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="" />
            <AvatarFallback>{getInitials(blog.author)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{blog.author}</p>
            <p className="text-xs text-muted-foreground">{blog.authorRole}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-sm">
          Read More <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
