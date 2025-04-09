
import { useState } from "react";
import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import { FileText, Video, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DUMMY_BLOGS = [
  {
    id: "1",
    title: "Understanding PPF and EPF: Which is Better for Your Retirement?",
    excerpt: "A comprehensive comparison between PPF and EPF investment options for long-term retirement planning.",
    author: "Rajesh Kumar",
    authorRole: "Financial Advisor",
    date: "2025-04-02",
    readTime: "8 min read",
    type: "article",
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["retirement", "investments", "tax planning"]
  },
  {
    id: "2",
    title: "Video Guide: How to Calculate Your Retirement Corpus",
    excerpt: "Step-by-step video tutorial on using retirement calculators effectively for your financial planning.",
    author: "Priya Sharma",
    authorRole: "Certified Financial Planner",
    date: "2025-03-28",
    readTime: "15 min watch",
    type: "video",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["retirement calculator", "financial planning", "video guide"]
  },
  {
    id: "3",
    title: "The Power of Compound Interest: Start Investing Early",
    excerpt: "Understanding how time is your greatest ally when it comes to building wealth through investments.",
    author: "Vikram Desai",
    authorRole: "Investment Strategist",
    date: "2025-03-20",
    readTime: "6 min read",
    type: "article",
    coverImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["compound interest", "wealth building", "investments"]
  },
  {
    id: "4",
    title: "Video Tutorial: SIP vs Lumpsum Investment Strategy",
    excerpt: "Which investment approach is better for you? This video breaks down the pros and cons of each method.",
    author: "Meena Iyer",
    authorRole: "Portfolio Manager",
    date: "2025-03-15",
    readTime: "12 min watch",
    type: "video",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["SIP", "lumpsum", "investment strategy", "video guide"]
  },
];

const BlogsList = () => {
  const [blogs, setBlogs] = useState(DUMMY_BLOGS);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogType, setBlogType] = useState("article");
  const [videoUrl, setVideoUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog = {
      id: `${blogs.length + 1}`,
      title,
      excerpt: content.substring(0, 120) + "...",
      author: authorName || "Anonymous",
      authorRole: authorRole || "Finance Enthusiast",
      date: new Date().toISOString().split("T")[0],
      readTime: blogType === "article" ? "5 min read" : "10 min watch",
      type: blogType,
      coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["finance", "investments"]
    };

    setBlogs([newBlog, ...blogs]);
    setOpen(false);
    
    // Reset form
    setTitle("");
    setContent("");
    setBlogType("article");
    setVideoUrl("");
    setAuthorName("");
    setAuthorRole("");

    toast({
      title: "Blog published!",
      description: "Your content has been successfully published.",
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Expert Blogs & Video Modules</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Contribute
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Share Your Financial Insights</DialogTitle>
                <DialogDescription>
                  Contribute your expertise with the community. Create an article or upload a video module.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="col-span-3"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Your Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="Financial Advisor"
                      className="col-span-3"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter blog title"
                      className="col-span-3"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content-type" className="text-right">
                      Type
                    </Label>
                    <div className="col-span-3">
                      <Tabs value={blogType} onValueChange={setBlogType} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="article">
                            <FileText className="h-4 w-4 mr-2" /> Article
                          </TabsTrigger>
                          <TabsTrigger value="video">
                            <Video className="h-4 w-4 mr-2" /> Video
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  
                  {blogType === "article" ? (
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="content" className="text-right">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        placeholder="Write your article content here..."
                        className="col-span-3"
                        required
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="video-url" className="text-right">
                        Video URL
                      </Label>
                      <Input
                        id="video-url"
                        placeholder="YouTube or Vimeo link"
                        className="col-span-3"
                        required
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Publish</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {blogs.filter(blog => blog.type === "article").map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {blogs.filter(blog => blog.type === "video").map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogsList;
