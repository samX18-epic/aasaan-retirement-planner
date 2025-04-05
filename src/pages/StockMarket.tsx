
import { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, BarChart3, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import InvestmentRecommendations from "@/components/investments/InvestmentRecommendations";
import { useMarketData, MutualFund, StockIndex } from "@/services/marketDataService";
import { useQuery } from "@tanstack/react-query";

interface SearchResult {
  id?: string;
  name: string;
  category: string;
  returns?: string;
  oneYearReturn?: number;
  rating: number;
  trending?: string;
}

export default function StockMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState("explore");
  const marketDataService = useMarketData();

  // Fetch mutual funds using React Query
  const { 
    data: mutualFunds,
    isLoading: isLoadingFunds
  } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: marketDataService.getMutualFunds
  });

  // Fetch market indices using React Query
  const { 
    data: marketIndices,
    isLoading: isLoadingIndices
  } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: marketDataService.getMarketIndices
  });

  // Top SIP options derived from mutual funds data
  const topSIPOptions = mutualFunds?.slice(0, 5).map(fund => ({
    id: fund.id,
    name: fund.name,
    minAmount: 500 + Math.floor(Math.random() * 10) * 100, // Random min amount between 500-1500
    category: fund.category,
    returns: `${fund.oneYearReturn}%`,
    rating: fund.rating
  })) || [];

  const handleSearch = () => {
    if (!searchTerm.trim() || !mutualFunds) return;
    
    // Filter mutual funds based on search term
    const filteredFunds = mutualFunds.filter(fund => 
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      fund.category.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(fund => ({
      id: fund.id,
      name: fund.name,
      category: fund.category,
      returns: `${fund.oneYearReturn}%`,
      oneYearReturn: fund.oneYearReturn,
      rating: fund.rating,
      trending: fund.trending
    }));
    
    setSearchResults(filteredFunds);
    setActiveTab("search");
  };

  const renderRating = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Stock Market</h1>
        <p className="text-lg text-muted-foreground">
          Explore mutual funds, SIP options, and get personalized investment recommendations
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
        <Input
          placeholder="Search funds, SIPs, stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} className="w-full sm:w-auto">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xl grid-cols-4">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="sip">SIP Options</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {searchResults.length} results for "{searchTerm}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Returns</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.name}</TableCell>
                        <TableCell>{result.category}</TableCell>
                        <TableCell>{result.returns}</TableCell>
                        <TableCell className="text-amber-500">{renderRating(result.rating)}</TableCell>
                        <TableCell>
                          {result.trending === "up" ? (
                            <TrendingUp className="text-green-500 h-5 w-5" />
                          ) : result.trending === "down" ? (
                            <TrendingDown className="text-red-500 h-5 w-5" />
                          ) : (
                            <span>-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No results found. Try a different search term.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explore">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Market Overview
                </CardTitle>
                <CardDescription>Latest market trends and performance</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingIndices ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                ) : marketIndices ? (
                  <div className="space-y-4">
                    {marketIndices.map((index, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span>{index.name}</span>
                        <div className={`flex items-center ${index.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          <span className="font-bold">{index.value.toLocaleString('en-IN')}</span>
                          {index.percentChange >= 0 ? (
                            <TrendingUp className="ml-2 h-4 w-4" />
                          ) : (
                            <TrendingDown className="ml-2 h-4 w-4" />
                          )}
                          <span className="ml-1">{index.percentChange.toFixed(2)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
                    <p>Unable to load market data. Please try again later.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>This month's best performing options</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingFunds ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                ) : mutualFunds ? (
                  <div className="space-y-4">
                    {mutualFunds
                      .sort((a, b) => b.oneYearReturn - a.oneYearReturn)
                      .slice(0, 3)
                      .map((fund, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{fund.name}</span>
                          <div className="flex items-center text-green-500">
                            <span className="font-bold">+{fund.oneYearReturn.toFixed(1)}%</span>
                            <TrendingUp className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
                    <p>Unable to load fund performance data. Please try again later.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mutual-funds">
          <Card>
            <CardHeader>
              <CardTitle>Top Mutual Funds</CardTitle>
              <CardDescription>
                Recommended mutual funds based on performance and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFunds ? (
                <div className="w-full">
                  <div className="flex items-center space-x-2 mb-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading mutual funds data...</p>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fund Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>1 Year Return</TableHead>
                        <TableHead>3 Year Return</TableHead>
                        <TableHead>5 Year Return</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array(5).fill(0).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : mutualFunds ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fund Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>1 Year Return</TableHead>
                        <TableHead>3 Year Return</TableHead>
                        <TableHead>5 Year Return</TableHead>
                        <TableHead>Risk</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mutualFunds.map((fund, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{fund.name}</TableCell>
                          <TableCell>{fund.category}</TableCell>
                          <TableCell className={`font-medium ${fund.oneYearReturn > 15 ? 'text-green-500' : ''}`}>
                            {fund.oneYearReturn}%
                          </TableCell>
                          <TableCell>{fund.threeYearReturn}%</TableCell>
                          <TableCell>{fund.fiveYearReturn}%</TableCell>
                          <TableCell>
                            <Badge variant={
                              fund.riskLevel === "Low" ? "outline" : 
                              fund.riskLevel === "Moderate" ? "secondary" : 
                              "default"
                            }>
                              {fund.riskLevel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-amber-500">{renderRating(fund.rating)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
                  <p className="text-lg font-medium mb-2">Unable to load mutual funds data</p>
                  <p className="text-sm text-muted-foreground mb-4">Please check your connection and try again</p>
                  <Button onClick={() => window.location.reload()}>Refresh</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sip">
          <Card>
            <CardHeader>
              <CardTitle>Top SIP Options</CardTitle>
              <CardDescription>
                Best Systematic Investment Plan (SIP) options for regular investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFunds ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fund Name</TableHead>
                      <TableHead>Minimum SIP Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Expected Returns</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(5).fill(0).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fund Name</TableHead>
                        <TableHead>Minimum SIP Amount</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Expected Returns</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSIPOptions.map((sip, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{sip.name}</TableCell>
                          <TableCell>₹{sip.minAmount}</TableCell>
                          <TableCell>{sip.category}</TableCell>
                          <TableCell className="font-medium text-green-500">{sip.returns}</TableCell>
                          <TableCell className="text-amber-500">{renderRating(sip.rating)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      * Returns shown are historical and not guaranteed for future performance. Please read all scheme related documents and consult your financial advisor before investing.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <InvestmentRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
