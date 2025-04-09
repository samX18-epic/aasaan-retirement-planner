
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  source: string;
  imageUrl: string;
  url: string;
}

const NewsCard = ({ title, summary, date, source, imageUrl, url }: NewsCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-1 pb-2">
        <h3 className="text-lg font-bold leading-tight line-clamp-2">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors"
          >
            {title}
          </a>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center text-xs text-muted-foreground pt-0">
        <div className="flex items-center">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <time dateTime={date}>{date}</time>
        </div>
        <span className="mx-2">•</span>
        <span>{source}</span>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
