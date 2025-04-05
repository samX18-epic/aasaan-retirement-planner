
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface RetirementInsightsProps {
  age: number;
  requiredCorpus: number;
  monthlyInvestment: number;
  yearsUntilRetirement: number;
  expectedReturns: number;
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
      } else if (age < 45) {
        newInsights.push("You're in your prime earning years. Consider maximizing tax-advantaged retirement accounts like PPF and NPS.");
        newInsights.push("Balance between growth and stability with a 60-40 equity-debt ratio to optimize returns.");
      } else {
        newInsights.push("As you approach retirement, consider gradually shifting towards more conservative investments.");
        newInsights.push("Review and maximize employer retirement benefits if available.");
      }
      
      // Corpus and investment insights
      if (monthlyInvestment < requiredCorpus / (12 * yearsUntilRetirement * 10)) {
        newInsights.push("Your current investment rate may be insufficient. Consider increasing your monthly contribution by at least 20%.");
      }
      
      if (expectedReturns > 14) {
        newInsights.push("Your expected return rate seems optimistic. Consider planning with a more conservative rate of 10-12%.");
      }
      
      // Additional general insights
      newInsights.push("Diversify across asset classes for better risk management. Consider gold and international exposure.");
      newInsights.push("Review your retirement portfolio quarterly and rebalance annually to maintain optimal asset allocation.");
      
      setInsights(newInsights);
      setLoading(false);
      
      toast({
        title: "Retirement Insights Generated",
        description: "AI-powered recommendations based on your financial profile.",
      });
    }, 1500);
  };

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
          <div className="space-y-4">
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
          </div>
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
