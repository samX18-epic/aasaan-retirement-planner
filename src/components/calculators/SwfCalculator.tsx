
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calculator, PiggyBank, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Safe Withdrawal Fund Calculator
const SwfCalculator = () => {
  const [initialCorpus, setInitialCorpus] = useState<number>(10000000);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(4);
  const [expectedReturns, setExpectedReturns] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(5);
  const [years, setYears] = useState<number>(30);
  
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [initialAnnualWithdrawal, setInitialAnnualWithdrawal] = useState<number>(0);
  const [finalAnnualWithdrawal, setFinalAnnualWithdrawal] = useState<number>(0);
  const [finalCorpus, setFinalCorpus] = useState<number>(0);
  const [willOutlast, setWillOutlast] = useState<boolean>(true);
  const [yearsLasted, setYearsLasted] = useState<number>(years);

  useEffect(() => {
    calculateWithdrawal();
  }, [initialCorpus, withdrawalRate, expectedReturns, inflationRate, years]);

  const calculateWithdrawal = () => {
    const initialAnnual = initialCorpus * (withdrawalRate / 100);
    setInitialAnnualWithdrawal(initialAnnual);
    
    let corpus = initialCorpus;
    let annualWithdrawal = initialAnnual;
    const yearData = [];
    let lastingYears = years;
    
    for (let year = 1; year <= years; year++) {
      const startingBalance = corpus;
      const withdrawal = annualWithdrawal;
      
      if (corpus < withdrawal) {
        // Corpus depleted
        lastingYears = year - 1;
        break;
      }
      
      corpus -= withdrawal;
      const returns = corpus * (expectedReturns / 100);
      corpus += returns;
      
      // Increase withdrawal amount for next year due to inflation
      annualWithdrawal *= (1 + inflationRate / 100);
      
      yearData.push({
        year,
        startingBalance: Math.round(startingBalance),
        withdrawal: Math.round(withdrawal),
        returns: Math.round(returns),
        endingBalance: Math.round(corpus),
        withdrawalPower: Math.round(withdrawal / Math.pow(1 + inflationRate / 100, year - 1))
      });
    }

    setFinalCorpus(Math.round(corpus));
    setFinalAnnualWithdrawal(Math.round(annualWithdrawal));
    setYearlyData(yearData);
    setWillOutlast(corpus > 0);
    setYearsLasted(lastingYears);
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)} K`;
    } else {
      return `₹${value.toFixed(0)}`;
    }
  };

  const getCorpusStatus = () => {
    if (willOutlast) {
      if (finalCorpus > initialCorpus) {
        return { label: "Growing Corpus", color: "bg-green-500" };
      } else if (finalCorpus > initialCorpus / 2) {
        return { label: "Stable Corpus", color: "bg-blue-500" };
      } else {
        return { label: "Depleting Corpus", color: "bg-amber-500" };
      }
    } else {
      return { label: `Depleted after ${yearsLasted} years`, color: "bg-red-500" };
    }
  };

  const corpusStatus = getCorpusStatus();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Safe Withdrawal Fund Calculator</h3>
          </div>
          <Badge variant="outline" className={`${corpusStatus.color} text-white`}>
            {corpusStatus.label}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initial-corpus">Initial Retirement Corpus (₹)</Label>
              <Input
                id="initial-corpus"
                type="number"
                min="1000000"
                value={initialCorpus}
                onChange={(e) => setInitialCorpus(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">The retirement savings you start with</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="withdrawal-rate">Initial Withdrawal Rate (%)</Label>
                <span className="text-sm font-medium">{withdrawalRate}%</span>
              </div>
              <Slider
                id="withdrawal-rate"
                min={2}
                max={10}
                step={0.1}
                value={[withdrawalRate]}
                onValueChange={(value) => setWithdrawalRate(value[0])}
              />
              <p className="text-xs text-muted-foreground">4% is considered the safe withdrawal rate</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="expected-returns">Expected Annual Returns (%)</Label>
                <span className="text-sm font-medium">{expectedReturns}%</span>
              </div>
              <Slider
                id="expected-returns"
                min={1}
                max={15}
                step={0.5}
                value={[expectedReturns]}
                onValueChange={(value) => setExpectedReturns(value[0])}
              />
              <p className="text-xs text-muted-foreground">Conservative post-retirement portfolio returns</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="inflation-rate">Expected Inflation Rate (%)</Label>
                <span className="text-sm font-medium">{inflationRate}%</span>
              </div>
              <Slider
                id="inflation-rate"
                min={1}
                max={10}
                step={0.5}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
              <p className="text-xs text-muted-foreground">Average long-term inflation expectation in India</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="years">Number of Years</Label>
                <span className="text-sm font-medium">{years} years</span>
              </div>
              <Slider
                id="years"
                min={10}
                max={50}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
              />
              <p className="text-xs text-muted-foreground">Duration to simulate the withdrawal plan</p>
            </div>

            <Button onClick={calculateWithdrawal} className="w-full">Calculate</Button>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Annual Withdrawal</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">First Year</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(initialAnnualWithdrawal)}</p>
                  <p className="text-xs text-muted-foreground">Monthly: {formatCurrency(initialAnnualWithdrawal / 12)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Year</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(finalAnnualWithdrawal)}</p>
                  <p className="text-xs text-muted-foreground">Monthly: {formatCurrency(finalAnnualWithdrawal / 12)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Initial Corpus</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(initialCorpus)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Final Corpus</p>
                  <p className="text-xl font-bold text-finance-blue">{formatCurrency(finalCorpus)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Growth/Depletion</p>
                  <p className={`text-xl font-bold ${finalCorpus >= initialCorpus ? "text-green-600" : "text-amber-600"}`}>
                    {finalCorpus >= initialCorpus 
                      ? `+${((finalCorpus / initialCorpus - 1) * 100).toFixed(1)}%` 
                      : `-${((1 - finalCorpus / initialCorpus) * 100).toFixed(1)}%`}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[300px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis
                    tickFormatter={(value) => {
                      if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
                      return `${(value / 1000).toFixed(0)}K`;
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, ""]}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <ReferenceLine y={initialCorpus} stroke="gray" strokeDasharray="3 3" label="Initial Corpus" />
                  <Line type="monotone" dataKey="endingBalance" name="Corpus Balance" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="withdrawal" name="Annual Withdrawal" stroke="#ef4444" strokeWidth={1.5} />
                  <Line type="monotone" dataKey="withdrawalPower" name="Withdrawal (Inflation Adjusted)" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2 space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h4 className="font-medium">Sustainability Analysis</h4>
              </div>
              <p className="text-sm">
                {willOutlast
                  ? `Your corpus will last the entire ${years} year period and you'll still have ${formatCurrency(finalCorpus)} remaining.`
                  : `Your corpus will be depleted after ${yearsLasted} years. Consider reducing your withdrawal rate or increasing your initial corpus.`}
              </p>
              {willOutlast && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Sustainability ratio: </span>
                  <span className={finalCorpus > initialCorpus ? "text-green-600" : "text-amber-600"}>
                    {(finalCorpus / initialCorpus).toFixed(2)}x
                  </span>
                  <span className="text-muted-foreground ml-2">
                    (A ratio above 1.0 means your corpus is sustainable indefinitely)
                  </span>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Starting Balance</TableHead>
                    <TableHead>Withdrawal</TableHead>
                    <TableHead>Returns</TableHead>
                    <TableHead>Ending Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyData.map((item) => (
                    <TableRow key={item.year}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{formatCurrency(item.startingBalance)}</TableCell>
                      <TableCell>{formatCurrency(item.withdrawal)}</TableCell>
                      <TableCell>{formatCurrency(item.returns)}</TableCell>
                      <TableCell>{formatCurrency(item.endingBalance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwfCalculator;
