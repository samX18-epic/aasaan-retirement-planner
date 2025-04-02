
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, LineChart, IndianRupee, TrendingUp, Clock, Bookmark } from "lucide-react";

const Investments = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
            <p className="text-muted-foreground">
              Track, analyze, and optimize your retirement investment portfolio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹24,32,450</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+12.3%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Monthly SIP</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,000</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across 5 different investments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retirement Readiness</CardTitle>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  On track to reach 85% in 2.5 years
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <div className="h-60 w-60 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="mx-auto h-16 w-16 text-muted-foreground/60" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          Investment summary visualization coming soon
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <div className="h-60 w-full flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="mx-auto h-16 w-16 text-muted-foreground/60" />
                        <p className="mt-4 text-sm text-muted-foreground">
                          Performance chart coming soon
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">HDFC Balanced Advantage Fund</div>
                        <div className="text-sm text-muted-foreground">Mutual Fund - Hybrid</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹6,45,230</div>
                        <div className="text-sm text-emerald-500">+8.2% YTD</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">Axis Long Term Equity Fund</div>
                        <div className="text-sm text-muted-foreground">Mutual Fund - ELSS</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹4,32,800</div>
                        <div className="text-sm text-emerald-500">+12.5% YTD</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">Public Provident Fund (PPF)</div>
                        <div className="text-sm text-muted-foreground">Government Saving</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹3,28,640</div>
                        <div className="text-sm text-emerald-500">+7.1% YTD</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">Employee Provident Fund (EPF)</div>
                        <div className="text-sm text-muted-foreground">Employer + Employee</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹5,22,480</div>
                        <div className="text-sm text-emerald-500">+8.5% YTD</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">National Pension System</div>
                        <div className="text-sm text-muted-foreground">Tier 1 - Auto Choice</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹2,85,300</div>
                        <div className="text-sm text-emerald-500">+9.2% YTD</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button size="lg">Add New Investment</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="allocation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart className="mx-auto h-24 w-24 text-muted-foreground/60" />
                    <p className="text-lg font-medium">Asset Allocation Coming Soon</p>
                    <p className="text-sm text-muted-foreground">
                      This feature will allow you to view and manage your investment allocation across different asset classes.
                    </p>
                    <Button>Get Notified When Available</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <LineChart className="mx-auto h-24 w-24 text-muted-foreground/60" />
                    <p className="text-lg font-medium">Performance Analytics Coming Soon</p>
                    <p className="text-sm text-muted-foreground">
                      Detailed performance metrics and comparisons with benchmarks will be available in our next update.
                    </p>
                    <Button>Get Notified When Available</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Clock className="mx-auto h-24 w-24 text-muted-foreground/60" />
                    <p className="text-lg font-medium">Transaction History Coming Soon</p>
                    <p className="text-sm text-muted-foreground">
                      View and track all your investment transactions in one place. This feature will be available soon.
                    </p>
                    <Button>Get Notified When Available</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Investments;
