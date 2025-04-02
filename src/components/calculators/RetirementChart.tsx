
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useToast } from "@/hooks/use-toast";

interface RetirementChartProps {
  years: number[];
  investmentData: number[];
  growthData: number[];
}

const RetirementChart = ({ years, investmentData, growthData }: RetirementChartProps) => {
  const { toast } = useToast();
  
  // Format the data for Recharts
  const formattedData = years.map((year, index) => ({
    year: year,
    investment: investmentData[index],
    growth: growthData[index],
    total: investmentData[index] + growthData[index]
  }));

  const formatYAxisValue = (value: number): string => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const tooltipFormatter = (value: number) => {
    if (value >= 10000000) {
      return [`₹${(value / 10000000).toFixed(2)} Cr`, ""];
    } else if (value >= 100000) {
      return [`₹${(value / 100000).toFixed(2)} L`, ""];
    } else {
      return [`₹${value.toFixed(0)}`, ""];
    }
  };
  
  const handleChartClick = () => {
    const totalCorpus = formattedData[formattedData.length - 1].total;
    const formattedCorpus = tooltipFormatter(totalCorpus)[0];
    
    toast({
      title: "Projected Retirement Corpus",
      description: `Your estimated retirement corpus will be ${formattedCorpus} by ${formattedData[formattedData.length - 1].year}`,
      duration: 5000,
    });
  };

  // Find the year with maximum growth rate for reference
  const maxGrowthYear = formattedData.reduce((maxYear, current, index, array) => {
    if (index === 0) return maxYear;
    
    const prevGrowth = array[index - 1].growth || 0;
    const currentGrowth = current.growth || 0;
    const growthRate = prevGrowth > 0 ? (currentGrowth - prevGrowth) / prevGrowth : 0;
    
    const maxGrowth = array[maxYear].growth || 0;
    const prevMaxGrowth = maxYear > 0 ? array[maxYear - 1].growth || 0 : 0;
    const maxGrowthRate = prevMaxGrowth > 0 ? (maxGrowth - prevMaxGrowth) / prevMaxGrowth : 0;
    
    return growthRate > maxGrowthRate ? index : maxYear;
  }, 0);

  return (
    <div className="relative" onClick={handleChartClick}>
      <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-slate-800/80 text-xs px-2 py-1 rounded shadow text-muted-foreground">
        Click chart for details
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="year" 
            label={{ 
              value: 'Years', 
              position: 'insideBottomRight', 
              offset: -10 
            }}
          />
          <YAxis 
            tickFormatter={formatYAxisValue}
            label={{ 
              value: 'Amount (₹)', 
              angle: -90, 
              position: 'insideLeft'
            }}
          />
          <Tooltip 
            formatter={tooltipFormatter}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <ReferenceLine 
            x={formattedData[maxGrowthYear]?.year} 
            stroke="#6366f1" 
            strokeDasharray="3 3"
            label={{ 
              value: 'Max Growth', 
              position: 'insideTopRight', 
              fill: '#6366f1',
              fontSize: 12
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="investment" 
            name="Total Investment" 
            stackId="1"
            stroke="#0d9488" 
            fill="#0d948840" 
          />
          <Area 
            type="monotone" 
            dataKey="growth" 
            name="Projected Growth" 
            stackId="1"
            stroke="#1e40af" 
            fill="#1e40af40" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetirementChart;
