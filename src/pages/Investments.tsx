
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, TrendingUp, TrendingDown, Info } from "lucide-react";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip } from 'recharts';

const Investments = () => {
  // Sample data for asset allocation chart
  const assetAllocationData = [
    { name: 'Equity', value: 60 },
    { name: 'Debt', value: 25 },
    { name: 'Gold', value: 10 },
    { name: 'Cash', value: 5 },
  ];
  
  const COLORS = ['#1e40af', '#0d9488', '#b45309', '#94a3b8'];
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Investment Insights</h1>
            <p className="text-muted-foreground">
              Track, analyze and optimize your retirement investments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="stat-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹43.5L</div>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+12.4% YTD</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Annual Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11.2%</div>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+2.1% from last year</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Retirement Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">62%</div>
                <div className="flex items-center mt-1 text-sm text-amber-600">
                  <Info className="mr-1 h-4 w-4" />
                  <span>Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
              <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Asset Allocation</CardTitle>
                  <CardDescription>
                    Breakdown of your current investment portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={renderCustomizedLabel}
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Rebalance Portfolio</Button>
                  <Button>View Detailed Analysis</Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Investments with highest returns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">HDFC Equity Fund</div>
                          <div className="text-sm text-muted-foreground">Equity: Large Cap</div>
                        </div>
                        <div className="text-green-600 font-semibold">+18.4%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">Axis Midcap Fund</div>
                          <div className="text-sm text-muted-foreground">Equity: Mid Cap</div>
                        </div>
                        <div className="text-green-600 font-semibold">+16.7%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">SBI Gold Fund</div>
                          <div className="text-sm text-muted-foreground">Commodity</div>
                        </div>
                        <div className="text-green-600 font-semibold">+12.5%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Retirement Accounts</CardTitle>
                    <CardDescription>EPF, PPF, and NPS balances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">Employee Provident Fund</div>
                          <div className="text-sm text-muted-foreground">Tax-advantaged</div>
                        </div>
                        <div className="font-semibold">₹15.8L</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">Public Provident Fund</div>
                          <div className="text-sm text-muted-foreground">Tax-free returns</div>
                        </div>
                        <div className="font-semibold">₹9.2L</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">National Pension System</div>
                          <div className="text-sm text-muted-foreground">Tier 1 account</div>
                        </div>
                        <div className="font-semibold">₹7.5L</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                  <CardDescription>
                    Track your investment performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border rounded-md p-6 bg-muted/20">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Performance Charts</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Detailed performance analysis charts will be available in the next update.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>
                    Suggestions to optimize your portfolio for retirement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                          <Info className="h-4 w-4 text-amber-800 dark:text-amber-300" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold mb-1">Increase Equity Allocation</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your current equity allocation is lower than recommended for your age and risk profile. Consider increasing equity exposure by 10-15%.
                          </p>
                          <Button variant="outline" size="sm">View Recommendations</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold mb-1">Maximize NPS Contributions</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            You can contribute more to your NPS account to take advantage of additional tax benefits under Section 80CCD(1B).
                          </p>
                          <Button variant="outline" size="sm">Learn More</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-start gap-4">
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <PieChart className="h-4 w-4 text-green-800 dark:text-green-300" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold mb-1">Diversify Mutual Fund Portfolio</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your mutual fund portfolio is heavily concentrated in large-cap funds. Consider adding mid-cap and international funds for better diversification.
                          </p>
                          <Button variant="outline" size="sm">View Suggested Funds</Button>
                        </div>
                      </div>
                    </div>
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
