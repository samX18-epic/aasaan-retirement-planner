
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { LineChart, BarChart, PieChart, ArrowUpRight, Calculator, Shield, Wallet, ChevronRight } from "lucide-react";
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {
  const [progress, setProgress] = useState(67);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your retirement plan</p>
        </div>
        <Button>
          <Calculator className="mr-2 h-4 w-4" /> Run New Projection
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Current Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">₹24,65,000</div>
              <div className="text-green-600 flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Last updated: April 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Retirement Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">₹2.4 Cr</div>
              <div className="flex items-center text-muted-foreground text-sm">
                By age 60
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Monthly Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">₹24,000</div>
              <Button variant="outline" size="sm">
                Adjust
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Next auto-deposit: 15th April</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-fit">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Projection</CardTitle>
              <CardDescription>Your expected retirement savings growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2">Retirement Growth Projection Chart</p>
                  <p className="text-sm text-muted-foreground">(Chart visualization would go here)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Milestones</CardTitle>
                <CardDescription>Key financial targets by age</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { age: 40, target: "₹45,00,000", status: "On Track" },
                    { age: 50, target: "₹1.2 Cr", status: "Attention Needed" },
                    { age: 60, target: "₹2.4 Cr", status: "On Track" }
                  ].map((milestone, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <Separator />}
                      <div className="flex items-center justify-between py-1">
                        <div>
                          <div className="font-medium">Age {milestone.age}</div>
                          <div className="text-sm text-muted-foreground">Target: {milestone.target}</div>
                        </div>
                        <div className={`text-sm ${milestone.status === "On Track" ? "text-green-600" : "text-amber-600"}`}>
                          {milestone.status}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Retirement Readiness</CardTitle>
                <CardDescription>Key metrics about your retirement plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Savings Rate", value: "18% of income", icon: Wallet },
                    { label: "Estimated Monthly Income", value: "₹80,000", icon: Calculator },
                    { label: "Risk Coverage", value: "Medium", icon: Shield }
                  ].map((metric, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <Separator />}
                      <div className="flex items-center gap-4 py-1">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <metric.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                          <div className="font-medium">{metric.value}</div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
              <CardDescription>View your current investment allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2">Asset Allocation Chart</p>
                      <p className="text-sm text-muted-foreground">(Chart visualization would go here)</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { category: "Equity", allocation: "60%", value: "₹14,79,000" },
                    { category: "Debt", allocation: "30%", value: "₹7,39,500" },
                    { category: "Gold", allocation: "5%", value: "₹1,23,250" },
                    { category: "Digital Assets", allocation: "5%", value: "₹1,23,250" }
                  ].map((asset, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{asset.category}</div>
                        <div className="text-sm text-muted-foreground">{asset.allocation}</div>
                      </div>
                      <div className="text-right">
                        <div>{asset.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Strategies</CardTitle>
              <CardDescription>Personalized recommendations from our robo-advisors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border bg-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Rebalance Portfolio Recommendation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Based on recent market changes, we recommend increasing your exposure to mid-cap funds by 5% while reducing large-cap allocation.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Apply Changes</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Increase Monthly Contribution</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Increasing your monthly contribution by ₹2,000 could add approximately ₹15 lakhs to your retirement corpus.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">View Projection</Button>
                        <Button variant="outline" size="sm">Adjust Contribution</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Blockchain Security Enhancement</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Secure your retirement assets with our new blockchain-based security features. Protect against inflation and currency fluctuations.
                      </p>
                      <div className="mt-4">
                        <Button size="sm" variant="outline">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
