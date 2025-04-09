
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsList from "@/components/news/NewsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const News = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Financial News & Insights</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest financial news and retirement planning insights
            </p>
          </div>
          
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="retirement">Retirement</TabsTrigger>
              <TabsTrigger value="investing">Investing</TabsTrigger>
              <TabsTrigger value="policy">Policy Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <NewsList />
            </TabsContent>
            
            <TabsContent value="retirement">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized retirement news will be available in our next update.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="investing">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Specialized investment news will be available in our next update.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="policy">
              <div className="flex justify-center items-center h-60">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    Policy updates will be available in our next update.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
