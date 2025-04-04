
import { useState } from "react";
import { Search, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for demonstration purposes
const topMutualFunds = [
  { name: "HDFC Balanced Advantage Fund", category: "Hybrid", oneYearReturn: 15.7, threeYearReturn: 12.8, fiveYearReturn: 11.2, rating: 5, trending: "up" },
  { name: "Axis Bluechip Fund", category: "Equity", oneYearReturn: 14.2, threeYearReturn: 11.5, fiveYearReturn: 10.8, rating: 4, trending: "up" },
  { name: "SBI Small Cap Fund", category: "Small Cap", oneYearReturn: 18.3, threeYearReturn: 15.9, fiveYearReturn: 13.6, rating: 5, trending: "down" },
  { name: "Kotak Emerging Equity Fund", category: "Mid Cap", oneYearReturn: 16.8, threeYearReturn: 13.2, fiveYearReturn: 12.5, rating: 4, trending: "up" },
  { name: "ICICI Prudential Value Discovery Fund", category: "Value", oneYearReturn: 13.6, threeYearReturn: 10.7, fiveYearReturn: 9.9, rating: 4, trending: "up" },
];

const topSIPOptions = [
  { name: "SBI Blue Chip Fund", minAmount: 500, category: "Large Cap", returns: "12.8%", rating: 5 },
  { name: "Axis Long Term Equity Fund", minAmount: 500, category: "ELSS", returns: "14.2%", rating: 4 },
  { name: "Mirae Asset Emerging Bluechip", minAmount: 1000, category: "Large & Mid Cap", returns: "16.5%", rating: 5 },
  { name: "DSP Midcap Fund", minAmount: 500, category: "Mid Cap", returns: "15.3%", rating: 4 },
  { name: "Motilal Oswal Nasdaq 100 FOF", minAmount: 500, category: "International", returns: "18.1%", rating: 5 },
];

interface SearchResult {
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

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // Combine and filter results from both datasets
    const combinedResults = [
      ...topMutualFunds.map(fund => ({
        name: fund.name,
        category: fund.category,
        returns: `${fund.oneYearReturn}%`,
        oneYearReturn: fund.oneYearReturn,
        rating: fund.rating,
        trending: fund.trending
      })),
      ...topSIPOptions.map(sip => ({
        name: sip.name,
        category: sip.category,
        returns: sip.returns,
        rating: sip.rating
      }))
    ].filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(combinedResults);
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
          Explore mutual funds, SIP options, and market trends
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Search funds, SIPs, stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="sip">SIP Options</TabsTrigger>
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>NIFTY 50</span>
                    <div className="flex items-center text-green-500">
                      <span className="font-bold">23,450.8</span>
                      <TrendingUp className="ml-2 h-4 w-4" />
                      <span className="ml-1">0.75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SENSEX</span>
                    <div className="flex items-center text-green-500">
                      <span className="font-bold">78,240.5</span>
                      <TrendingUp className="ml-2 h-4 w-4" />
                      <span className="ml-1">0.82%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BANK NIFTY</span>
                    <div className="flex items-center text-red-500">
                      <span className="font-bold">48,560.3</span>
                      <TrendingDown className="ml-2 h-4 w-4" />
                      <span className="ml-1">0.32%</span>
                    </div>
                  </div>
                </div>
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>HDFC Bank</span>
                    <div className="flex items-center text-green-500">
                      <span className="font-bold">+18.2%</span>
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SBI Small Cap Fund</span>
                    <div className="flex items-center text-green-500">
                      <span className="font-bold">+15.7%</span>
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mirae Asset Tax Saver</span>
                    <div className="flex items-center text-green-500">
                      <span className="font-bold">+12.8%</span>
                      <TrendingUp className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
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
                  {topMutualFunds.map((fund, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{fund.name}</TableCell>
                      <TableCell>{fund.category}</TableCell>
                      <TableCell className={`font-medium ${fund.oneYearReturn > 15 ? 'text-green-500' : ''}`}>
                        {fund.oneYearReturn}%
                      </TableCell>
                      <TableCell>{fund.threeYearReturn}%</TableCell>
                      <TableCell>{fund.fiveYearReturn}%</TableCell>
                      <TableCell className="text-amber-500">{renderRating(fund.rating)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
