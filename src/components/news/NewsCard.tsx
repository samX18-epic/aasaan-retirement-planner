
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md border-opacity-40 hover:border-opacity-100 dark:border-opacity-30">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 text-xs rounded-md">
            {source}
          </div>
        </div>
        <CardHeader className="space-y-1 pb-2">
          <h3 className="text-lg font-bold leading-tight line-clamp-2 group">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              {title}
              <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {summary}
          </p>
        </CardContent>
        <CardFooter className="flex items-center text-xs text-muted-foreground pt-0 mt-auto">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <time dateTime={date}>{date}</time>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
