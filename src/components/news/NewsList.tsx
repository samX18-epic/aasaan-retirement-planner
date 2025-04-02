
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import NewsCard from "./NewsCard";

// Sample news data (would be fetched from an API in a real app)
const dummyNews = [
  {
    id: 1,
    title: "RBI keeps repo rate unchanged at 6.5%, projects GDP growth at 7.2% for FY25",
    summary: "The Reserve Bank of India (RBI) has maintained its repo rate at 6.5% for the eighth consecutive time, balancing growth concerns with persistent inflation risks.",
    date: "2023-08-10",
    source: "Economic Times",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  },
  {
    id: 2,
    title: "New PPF rule changes to benefit long-term investors",
    summary: "The government has announced modifications to Public Provident Fund (PPF) regulations, offering enhanced benefits for investors planning for retirement.",
    date: "2023-08-05",
    source: "Financial Express",
    imageUrl: "https://images.unsplash.com/photo-1589666564472-1011dfaee57e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  },
  {
    id: 3,
    title: "Market correction: Is it time to increase your SIP investments?",
    summary: "Financial experts suggest that market corrections present an opportunity to increase systematic investment plans (SIPs) to benefit from lower entry points.",
    date: "2023-07-28",
    source: "Mint",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  },
  {
    id: 4,
    title: "NPS vs EPF: Which is better for retirement planning?",
    summary: "A comparative analysis of National Pension System (NPS) and Employee Provident Fund (EPF) to help investors make informed decisions for their retirement planning.",
    date: "2023-07-20",
    source: "Business Standard",
    imageUrl: "https://images.unsplash.com/photo-1623210384123-871224afdce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  },
  {
    id: 5,
    title: "7 tax-saving instruments to consider for your retirement portfolio",
    summary: "A comprehensive guide to tax-efficient investment options that can help you build a robust retirement corpus while minimizing your tax liability.",
    date: "2023-07-15",
    source: "Money Control",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  },
  {
    id: 6,
    title: "How inflation impacts your retirement planning",
    summary: "Understanding the effects of inflation on long-term retirement planning and strategies to inflation-proof your retirement savings.",
    date: "2023-07-08",
    source: "Financial Express",
    imageUrl: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#"
  }
];

const NewsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState(dummyNews);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim() === "") {
      setNews(dummyNews);
      return;
    }
    
    const filteredNews = dummyNews.filter(
      item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setNews(filteredNews);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto gap-2">
        <Input
          type="text"
          placeholder="Search financial news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="finance-input"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              summary={item.summary}
              date={item.date}
              source={item.source}
              imageUrl={item.imageUrl}
              url={item.url}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-lg text-muted-foreground">No news articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
