
import RetirementCalculator from "@/components/calculators/RetirementCalculator";
import SipCalculator from "@/components/calculators/SipCalculator";
import HlvCalculator from "@/components/calculators/HlvCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Activity, LineChart, Landmark, Bitcoin } from "lucide-react";

export default function Investments() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="space-y-4 mb-8 text-center md:text-left">
        <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Financial Intelligence</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-finance-blue to-finance-teal bg-clip-text text-transparent">
          Investment Tools
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
          Calculate and plan your investments with our advanced financial tools tailored for Indian investors.
        </p>
      </div>

      <Tabs defaultValue="retirement" className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-xl">
          <TabsList className="grid w-full max-w-4xl grid-cols-4 h-auto gap-2 p-1">
            <TabsTrigger value="retirement" className="relative h-14 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <div className="flex flex-col items-center gap-1">
                <Activity className="h-4 w-4" />
                <span>Retirement</span>
              </div>
              <div className="absolute -top-3 -right-1">
                <Badge className="text-xs h-5 bg-amber-500 hover:bg-amber-600">AI</Badge>
                <Badge className="text-xs h-5 ml-1 bg-blue-500 hover:bg-blue-600">New</Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger value="sip" className="h-14 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <div className="flex flex-col items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>SIP</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="hlv" className="h-14 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <div className="flex flex-col items-center gap-1">
                <Landmark className="h-4 w-4" />
                <span>HLV</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="h-14 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <div className="flex flex-col items-center gap-1">
                <Bitcoin className="h-4 w-4" />
                <span>Blockchain</span>
              </div>
              <div className="absolute -top-3 -right-1">
                <Badge className="text-xs h-5 bg-purple-500 hover:bg-purple-600">Beta</Badge>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="retirement">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-finance-blue/5 to-finance-teal/5 pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-finance-blue">Retirement Planning</CardTitle>
                  <CardDescription className="text-base">
                    Calculate how much you need to save for a comfortable retirement.
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">India-Specific</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" /> AI-powered insights
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <RetirementCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sip">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-finance-blue/5 to-finance-teal/5">
              <CardTitle className="text-2xl font-bold text-finance-blue flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                Systematic Investment Plan
              </CardTitle>
              <CardDescription className="text-base">
                Calculate returns on your regular investments with our advanced SIP calculator.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SipCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hlv">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-finance-blue/5 to-finance-teal/5">
              <CardTitle className="text-2xl font-bold text-finance-blue flex items-center gap-2">
                <Landmark className="h-5 w-5 text-blue-500" />
                Human Life Value
              </CardTitle>
              <CardDescription className="text-base">
                Calculate your financial worth based on income potential and other factors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HlvCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blockchain">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-blue-500/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-finance-blue flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-purple-500" />
                    Blockchain Assets
                  </CardTitle>
                  <CardDescription className="text-base">
                    Explore blockchain-based pensions and retirement accounts.
                  </CardDescription>
                </div>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">Emerging Tech</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Digital Asset Integration</CardTitle>
                      <CardDescription>Blockchain-powered retirement planning</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Explore how blockchain technology is revolutionizing retirement planning with secure, transparent record-keeping and smart contracts.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tokenized Pensions</CardTitle>
                      <CardDescription>Fractional ownership model</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Discover how tokenization is enabling more flexible and portable pension plans with reduced administrative costs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Smart Contract Annuities</CardTitle>
                      <CardDescription>Automated retirement income</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Learn about smart contract-powered annuities that can automatically adjust to inflation and provide steady retirement income.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    While still niche in India, blockchain-based retirement solutions are on the horizon.
                    <br />Stay ahead of the curve with our upcoming digital asset retirement planning tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
