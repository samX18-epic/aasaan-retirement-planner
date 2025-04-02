
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface RetirementChartProps {
  years: number[];
  investmentData: number[];
  growthData: number[];
}

const RetirementChart = ({ years, investmentData, growthData }: RetirementChartProps) => {
  // Format the data for Recharts
  const formattedData = years.map((year, index) => ({
    year: year,
    investment: investmentData[index],
    growth: growthData[index],
  }));

  const formatYAxisValue = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
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

  return (
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
  );
};

export default RetirementChart;
