
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
import { Wallet, Calculator } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";

const EpfCalculator = () => {
  const [basicSalary, setBasicSalary] = useState<number>(30000);
  const [employeeContribution, setEmployeeContribution] = useState<number>(12);
  const [employerContribution, setEmployerContribution] = useState<number>(12);
  const [age, setAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(58);
  const [expectedAnnualIncrement, setExpectedAnnualIncrement] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(8.25);
  
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [employeeTotal, setEmployeeTotal] = useState<number>(0);
  const [employerTotal, setEmployerTotal] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  useEffect(() => {
    calculateEpf();
  }, [basicSalary, employeeContribution, employerContribution, age, retirementAge, expectedAnnualIncrement, interestRate]);

  const calculateEpf = () => {
    let currentSalary = basicSalary;
    let balance = 0;
    let totalEmployeeContribution = 0;
    let totalEmployerContribution = 0;
    let totalInterestEarned = 0;
    const yearData = [];
    const years = retirementAge - age;

    for (let year = 1; year <= years; year++) {
      const monthlyEmployeeContribution = (currentSalary * (employeeContribution / 100));
      const monthlyEmployerContribution = (currentSalary * (employerContribution / 100));
      const yearlyEmployeeContribution = monthlyEmployeeContribution * 12;
      const yearlyEmployerContribution = monthlyEmployerContribution * 12;
      
      totalEmployeeContribution += yearlyEmployeeContribution;
      totalEmployerContribution += yearlyEmployerContribution;
      
      const yearlyContribution = yearlyEmployeeContribution + yearlyEmployerContribution;
      const interestForYear = ((balance + yearlyContribution) * interestRate) / 100;
      
      balance += yearlyContribution + interestForYear;
      totalInterestEarned += interestForYear;

      yearData.push({
        year: age + year - 1,
        employeeContribution: Math.round(totalEmployeeContribution),
        employerContribution: Math.round(totalEmployerContribution),
        interest: Math.round(totalInterestEarned),
        balance: Math.round(balance),
        salary: Math.round(currentSalary),
      });
      
      // Increase salary for next year
      currentSalary += currentSalary * (expectedAnnualIncrement / 100);
    }

    setMaturityAmount(Math.round(balance));
    setEmployeeTotal(Math.round(totalEmployeeContribution));
    setEmployerTotal(Math.round(totalEmployerContribution));
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
            <h3 className="text-xl font-semibold">EPF Calculator</h3>
          </div>
          <div className="bg-muted/50 text-sm px-3 py-1 rounded-full flex items-center">
            <Wallet className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>Current Rate: 8.25% p.a.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="basic-salary">Monthly Basic Salary (DA + Basic) (₹)</Label>
              <Input
                id="basic-salary"
                type="number"
                min="1000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">EPF is calculated on your basic salary + dearness allowance</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee-contribution">Your Contribution (%)</Label>
                <Input
                  id="employee-contribution"
                  type="number"
                  min="1"
                  max="100"
                  value={employeeContribution}
                  onChange={(e) => setEmployeeContribution(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Usually 12% of basic salary</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employer-contribution">Employer's Contribution (%)</Label>
                <Input
                  id="employer-contribution"
                  type="number"
                  min="1"
                  max="100"
                  value={employerContribution}
                  onChange={(e) => setEmployerContribution(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Usually 12% of basic salary</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-age">Current Age</Label>
                <Input
                  id="current-age"
                  type="number"
                  min="18"
                  max="57"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirement-age">Retirement Age</Label>
                <Input
                  id="retirement-age"
                  type="number"
                  min="age + 1"
                  max="60"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-increment">Expected Annual Increment (%)</Label>
              <Input
                id="annual-increment"
                type="number"
                min="0"
                max="30"
                step="0.5"
                value={expectedAnnualIncrement}
                onChange={(e) => setExpectedAnnualIncrement(Number(e.target.value))}
              />
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
              <p className="text-xs text-muted-foreground">Current rate: 8.25% (FY23-24)</p>
            </div>

            <Button onClick={calculateEpf} className="w-full">Calculate</Button>
          </div>

          <div className="md:col-span-2">
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Your Contribution</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(employeeTotal)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employer Contribution</p>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(employerTotal)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(totalInterest)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total EPF Corpus</p>
                  <p className="text-xl font-bold text-finance-blue">{formatCurrency(maturityAmount)}</p>
                </div>
              </div>
            </div>

            <div className="h-[300px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Age", position: "insideBottom", offset: -5 }} />
                  <YAxis yAxisId="left" tickFormatter={(value) => `₹${value/100000}L`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `₹${value/1000}K`} />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, ""]}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="employeeContribution" name="Your Contribution" fill="#94a3b8" stackId="a" />
                  <Bar yAxisId="left" dataKey="employerContribution" name="Employer Contribution" fill="#a78bfa" stackId="a" />
                  <Bar yAxisId="left" dataKey="interest" name="Interest Earned" fill="#22c55e" stackId="a" />
                  <Line yAxisId="right" type="monotone" dataKey="salary" name="Monthly Salary" stroke="#f59e0b" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <Separator className="my-4" />

            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Age</TableHead>
                    <TableHead>Monthly Salary</TableHead>
                    <TableHead>Your Contribution</TableHead>
                    <TableHead>Employer's</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyData.map((item) => (
                    <TableRow key={item.year}>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{formatCurrency(item.salary)}</TableCell>
                      <TableCell>{formatCurrency(item.employeeContribution)}</TableCell>
                      <TableCell>{formatCurrency(item.employerContribution)}</TableCell>
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

export default EpfCalculator;
