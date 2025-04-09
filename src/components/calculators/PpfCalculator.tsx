
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
import { Info, Calculator } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PpfCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [tenure, setTenure] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  useEffect(() => {
    calculatePpf();
  }, [yearlyInvestment, tenure, interestRate]);

  const calculatePpf = () => {
    let totalContribution = 0;
    let totalInterestEarned = 0;
    let balance = 0;
    const yearData = [];

    for (let year = 1; year <= tenure; year++) {
      totalContribution += yearlyInvestment;
      const interestForYear = ((balance + yearlyInvestment) * interestRate) / 100;
      balance += yearlyInvestment + interestForYear;
      totalInterestEarned += interestForYear;

      yearData.push({
        year,
        investment: totalContribution,
        interest: Math.round(totalInterestEarned),
        balance: Math.round(balance),
      });
    }

    setMaturityAmount(Math.round(balance));
    setTotalInvestment(totalContribution);
    setTotalInterest(Math.round(totalInterestEarned));
    setYearlyData(yearData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">PPF Calculator</h3>
          </div>
          <div className="bg-muted/50 text-sm px-3 py-1 rounded-full flex items-center">
            <Info className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>Current Rate: 7.1% p.a.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="yearly-investment">Yearly Investment (₹)</Label>
              <Input
                id="yearly-investment"
                type="number"
                min="500"
                max="150000"
                value={yearlyInvestment}
                onChange={(e) => setYearlyInvestment(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Min: ₹500, Max: ₹1,50,000 per year</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                min="15"
                max="50"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Min: 15 years (Premature withdrawal partially allowed after 7 years)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">Current rate: 7.1% (Q1 FY24-25)</p>
            </div>

            <Button onClick={calculatePpf} className="w-full">Calculate</Button>
          </div>

          <div className="md:col-span-2">
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalInvestment)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Maturity Value</p>
                  <p className="text-2xl font-bold text-finance-blue">{formatCurrency(maturityAmount)}</p>
                </div>
              </div>
            </div>

            <div className="h-[300px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, ""]}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="investment" name="Total Investment" fill="#94a3b8" />
                  <Bar dataKey="interest" name="Interest Earned" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-4" />

            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Total Investment</TableHead>
                    <TableHead>Interest Earned</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyData.map((item) => (
                    <TableRow key={item.year}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{formatCurrency(item.investment)}</TableCell>
                      <TableCell>{formatCurrency(item.interest)}</TableCell>
                      <TableCell>{formatCurrency(item.balance)}</TableCell>
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

export default PpfCalculator;
