
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, TrendingUp, Coins, PiggyBank, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { MutualFund, useMarketData } from "@/services/marketDataService";

interface RetirementInsightsProps {
  age: number;
  requiredCorpus: number;
  monthlyInvestment: number;
  yearsUntilRetirement: number;
  expectedReturns: number;
}

interface Recommendation {
  fundId: string;
  fundName: string;
  allocation: number;
  reason: string;
  returns: number;
}

const RetirementInsights = ({
  age,
  requiredCorpus,
  monthlyInvestment,
  yearsUntilRetirement,
  expectedReturns,
}: RetirementInsightsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("insights");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const marketDataService = useMarketData();
  
  // Fetch mutual funds using React Query for recommendations
  const { 
    data: mutualFunds,
    isLoading: isLoadingFunds
  } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: marketDataService.getMutualFunds
  });

  // Calculate risk profile based on age and years until retirement
  const calculateRiskProfile = () => {
    if (age < 30 && yearsUntilRetirement > 25) return "Aggressive";
    if (age < 40 && yearsUntilRetirement > 15) return "Moderately Aggressive";
    if (age < 50 && yearsUntilRetirement > 10) return "Moderate";
    if (age < 60 && yearsUntilRetirement > 5) return "Moderately Conservative";
    return "Conservative";
  };

  const riskProfile = calculateRiskProfile();

  // Generate AI insights based on user's retirement parameters
  const generateInsights = () => {
    setLoading(true);
    
    // In a real implementation, this would call an AI API
    // For now, we'll use predefined insights based on parameters
    
    setTimeout(() => {
      const newInsights = [];
      
      // Age-based insights
      if (age < 30) {
        newInsights.push("Your early start gives you a significant advantage. Consider allocating more to equity for long-term growth.");
        newInsights.push("With time on your side, you could explore high-growth small-cap funds for a portion of your portfolio.");
        newInsights.push("Consider a 70-30 equity-debt ratio to maximize long-term wealth accumulation while managing volatility.");
      } else if (age < 45) {
        newInsights.push("You're in your prime earning years. Consider maximizing tax-advantaged retirement accounts like PPF and NPS.");
        newInsights.push("Balance between growth and stability with a 60-40 equity-debt ratio to optimize returns.");
        newInsights.push("Review and update your health insurance coverage as healthcare costs may increase significantly by retirement.");
      } else {
        newInsights.push("As you approach retirement, consider gradually shifting towards more conservative investments.");
        newInsights.push("Review and maximize employer retirement benefits if available.");
        newInsights.push("Consider a 40-60 equity-debt ratio to protect accumulated wealth while allowing for modest growth.");
      }
      
      // Corpus and investment insights
      if (monthlyInvestment < requiredCorpus / (12 * yearsUntilRetirement * 10)) {
        newInsights.push("Your current investment rate may be insufficient. Consider increasing your monthly contribution by at least 20%.");
        newInsights.push("Explore additional income streams to boost retirement savings without compromising lifestyle.");
      }
      
      if (expectedReturns > 14) {
        newInsights.push("Your expected return rate seems optimistic. Consider planning with a more conservative rate of 10-12%.");
        newInsights.push("Create a 'stress test' scenario with lower returns to ensure your plan remains viable in varied market conditions.");
      }
      
      // Additional personalized insights
      if (yearsUntilRetirement > 20) {
        newInsights.push("With a long investment horizon, consider allocating a portion to international equity for greater diversification.");
      }
      
      if (requiredCorpus > 5000000) {
        newInsights.push("Your significant corpus goal may benefit from professional financial planning. Consider consulting a certified advisor.");
      }
      
      // Additional general insights
      newInsights.push("Diversify across asset classes for better risk management. Consider gold and international exposure.");
      newInsights.push("Review your retirement portfolio quarterly and rebalance annually to maintain optimal asset allocation.");
      
      setInsights(newInsights);
      generateFundRecommendations();
      setLoading(false);
      
      toast({
        title: "Retirement Insights Generated",
        description: "AI-powered recommendations based on your financial profile.",
      });
    }, 1500);
  };

  // Generate fund recommendations based on risk profile and mutual fund data
  const generateFundRecommendations = () => {
    if (!mutualFunds) return;

    // Filter and sort mutual funds based on risk profile
    let filteredFunds: MutualFund[] = [...mutualFunds];
    
    // Apply risk-based filtering
    if (riskProfile === "Aggressive") {
      filteredFunds = filteredFunds.filter(fund => 
        fund.riskLevel === "High" || 
        fund.category === "Small Cap" || 
        fund.category === "Mid Cap"
      );
    } else if (riskProfile === "Moderately Aggressive") {
      filteredFunds = filteredFunds.filter(fund => 
        fund.category === "Mid Cap" || 
        fund.category === "Large & Mid Cap" ||
        fund.category === "Flexi Cap"
      );
    } else if (riskProfile === "Moderate") {
      filteredFunds = filteredFunds.filter(fund => 
        fund.riskLevel === "Moderate" || 
        fund.category === "Hybrid" ||
        fund.category === "Large Cap"
      );
    } else {
      filteredFunds = filteredFunds.filter(fund => 
        fund.riskLevel === "Low" || 
        fund.category === "Debt" ||
        fund.category === "Hybrid" 
      );
    }
    
    // Sort by performance
    filteredFunds.sort((a, b) => b.threeYearReturn - a.threeYearReturn);
    
    // Take top performers
    const topFunds = filteredFunds.slice(0, 4);
    
    // Create allocation percentages based on risk profile
    let allocations: number[] = [];
    
    if (riskProfile === "Aggressive") {
      allocations = [40, 30, 20, 10];
    } else if (riskProfile === "Moderately Aggressive") {
      allocations = [35, 30, 20, 15];
    } else if (riskProfile === "Moderate") {
      allocations = [30, 25, 25, 20];
    } else if (riskProfile === "Moderately Conservative") {
      allocations = [30, 25, 25, 20];
    } else {
      allocations = [25, 25, 25, 25];
    }
    
    // Create recommendations
    const newRecommendations: Recommendation[] = topFunds.map((fund, index) => ({
      fundId: fund.id,
      fundName: fund.name,
      allocation: allocations[index],
      reason: getReason(fund, index),
      returns: fund.threeYearReturn
    }));
    
    setRecommendations(newRecommendations);
  };
  
  // Generate reason for recommendation
  const getReason = (fund: MutualFund, index: number) => {
    const reasons = [
      `Top performer in ${fund.category} category with consistent returns over 3-5 years.`,
      `Strong risk-adjusted returns that align with your ${riskProfile.toLowerCase()} risk profile.`,
      `Provides good exposure to ${fund.category} with moderate volatility.`,
      `Adds diversification to your portfolio with stable returns.`
    ];
    
    return reasons[index] || "Recommended based on your retirement goals and risk profile.";
  };

  useEffect(() => {
    if (mutualFunds && mutualFunds.length > 0 && insights.length > 0 && recommendations.length === 0) {
      generateFundRecommendations();
    }
  }, [mutualFunds, insights]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          AI-Powered Retirement Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">Personalized Insights</TabsTrigger>
              <TabsTrigger value="recommendations">Fund Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="mt-4 space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={
                    riskProfile === "Aggressive" ? "destructive" : 
                    riskProfile === "Conservative" ? "outline" : 
                    "default"
                  }>
                    {riskProfile} Risk Profile
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Based on age {age} and {yearsUntilRetirement} years until retirement
                  </span>
                </div>
                <Progress value={
                  riskProfile === "Aggressive" ? 90 : 
                  riskProfile === "Moderately Aggressive" ? 75 : 
                  riskProfile === "Moderate" ? 50 : 
                  riskProfile === "Moderately Conservative" ? 30 : 
                  15
                } className="h-2" />
              </div>
              
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 mt-0.5 text-blue-500 flex-shrink-0" />
                  <p>{insight}</p>
                </div>
              ))}
              
              <Separator className="my-4" />
              <Button variant="outline" onClick={generateInsights} disabled={loading} className="w-full">
                {loading ? "Analyzing your profile..." : "Refresh Insights"}
              </Button>
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-4 space-y-4">
              {isLoadingFunds || recommendations.length === 0 ? (
                <div className="py-8 text-center">
                  <PiggyBank className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
                  <p>Loading fund recommendations...</p>
                </div>
              ) : (
                <>
                  <div className="bg-muted/50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Recommended Portfolio Allocation</h3>
                    <div className="flex gap-1 h-6 w-full rounded-full overflow-hidden">
                      {recommendations.map((rec, index) => (
                        <div 
                          key={index} 
                          style={{ width: `${rec.allocation}%` }}
                          className={`
                            ${index === 0 ? 'bg-blue-500' : ''}
                            ${index === 1 ? 'bg-green-500' : ''}
                            ${index === 2 ? 'bg-amber-500' : ''}
                            ${index === 3 ? 'bg-purple-500' : ''}
                          `}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Based on your {riskProfile} risk profile</span>
                      <span>Optimized for {yearsUntilRetirement} year horizon</span>
                    </div>
                  </div>
                  
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {index === 0 && <BarChart3 className="h-4 w-4 text-blue-500" />}
                          {index === 1 && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {index === 2 && <Coins className="h-4 w-4 text-amber-500" />}
                          {index === 3 && <PiggyBank className="h-4 w-4 text-purple-500" />}
                          <h4 className="font-medium">{rec.fundName}</h4>
                        </div>
                        <Badge variant="outline">{rec.allocation}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">3-Year Returns:</span>
                        <span className="font-medium text-green-600">{rec.returns.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Lightbulb className="h-12 w-12 text-amber-500 mb-4 opacity-80" />
            <h3 className="text-lg font-medium mb-2">Get Personalized Retirement Advice</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Our AI will analyze your retirement profile and provide tailored recommendations to improve your financial future.
            </p>
            <Button onClick={generateInsights} disabled={loading} className="flex items-center gap-2">
              {loading ? "Analyzing your profile..." : "Generate Insights"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RetirementInsights;
