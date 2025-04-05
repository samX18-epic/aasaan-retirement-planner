
import { useToast } from "@/hooks/use-toast";

// Types for market data
export interface MutualFund {
  id: string;
  name: string;
  category: string;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  nav: number;
  aum: number; // Assets under management in crores
  expenseRatio: number;
  riskLevel: "Low" | "Moderate" | "High";
  rating: number;
  trending: "up" | "down" | "neutral";
}

export interface StockIndex {
  name: string;
  value: number;
  change: number;
  percentChange: number;
}

// This would connect to real APIs in production
// For demonstration, using realistic mock data
export const fetchMutualFunds = async (): Promise<MutualFund[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In production, this would be a real API call
  return [
    {
      id: "1",
      name: "SBI Blue Chip Fund",
      category: "Large Cap",
      oneYearReturn: 15.3,
      threeYearReturn: 12.1,
      fiveYearReturn: 10.8,
      nav: 64.82,
      aum: 32456,
      expenseRatio: 1.2,
      riskLevel: "Moderate",
      rating: 5,
      trending: "up"
    },
    {
      id: "2",
      name: "HDFC Balanced Advantage Fund",
      category: "Hybrid",
      oneYearReturn: 16.2,
      threeYearReturn: 13.8,
      fiveYearReturn: 11.5,
      nav: 298.75,
      aum: 45678,
      expenseRatio: 1.6,
      riskLevel: "Moderate",
      rating: 5,
      trending: "up"
    },
    {
      id: "3",
      name: "Axis Midcap Fund",
      category: "Mid Cap",
      oneYearReturn: 18.7,
      threeYearReturn: 16.2,
      fiveYearReturn: 14.8,
      nav: 87.56,
      aum: 12567,
      expenseRatio: 1.8,
      riskLevel: "High",
      rating: 4,
      trending: "up"
    },
    {
      id: "4",
      name: "Mirae Asset Emerging Bluechip",
      category: "Large & Mid Cap",
      oneYearReturn: 19.5,
      threeYearReturn: 17.3,
      fiveYearReturn: 15.8,
      nav: 112.34,
      aum: 23456,
      expenseRatio: 1.7,
      riskLevel: "High",
      rating: 5,
      trending: "up"
    },
    {
      id: "5",
      name: "Kotak Small Cap Fund",
      category: "Small Cap",
      oneYearReturn: 22.4,
      threeYearReturn: 19.8,
      fiveYearReturn: 16.7,
      nav: 156.78,
      aum: 10234,
      expenseRatio: 2.0,
      riskLevel: "High",
      rating: 4,
      trending: "up"
    },
    {
      id: "6",
      name: "ICICI Prudential Value Discovery",
      category: "Value",
      oneYearReturn: 14.3,
      threeYearReturn: 11.9,
      fiveYearReturn: 10.5,
      nav: 187.92,
      aum: 21345,
      expenseRatio: 1.6,
      riskLevel: "Moderate",
      rating: 4,
      trending: "up"
    },
    {
      id: "7",
      name: "Aditya Birla Sun Life Tax Relief 96",
      category: "ELSS",
      oneYearReturn: 17.3,
      threeYearReturn: 14.5,
      fiveYearReturn: 12.6,
      nav: 43.21,
      aum: 9876,
      expenseRatio: 1.9,
      riskLevel: "High",
      rating: 4,
      trending: "up"
    },
    {
      id: "8",
      name: "Parag Parikh Flexi Cap Fund",
      category: "Flexi Cap",
      oneYearReturn: 16.8,
      threeYearReturn: 15.2,
      fiveYearReturn: 13.9,
      nav: 56.43,
      aum: 14567,
      expenseRatio: 1.5,
      riskLevel: "Moderate",
      rating: 5,
      trending: "up"
    },
    {
      id: "9",
      name: "HDFC Corporate Bond Fund",
      category: "Debt",
      oneYearReturn: 8.4,
      threeYearReturn: 7.6,
      fiveYearReturn: 7.3,
      nav: 26.54,
      aum: 28764,
      expenseRatio: 0.9,
      riskLevel: "Low",
      rating: 4,
      trending: "neutral"
    },
    {
      id: "10",
      name: "DSP Nifty 50 Index Fund",
      category: "Index",
      oneYearReturn: 13.8,
      threeYearReturn: 12.3,
      fiveYearReturn: 10.9,
      nav: 16.75,
      aum: 5678,
      expenseRatio: 0.5,
      riskLevel: "Moderate",
      rating: 4,
      trending: "neutral"
    }
  ];
};

export const fetchMarketIndices = async (): Promise<StockIndex[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would be a real API call
  return [
    {
      name: "NIFTY 50",
      value: 23487.65,
      change: 183.45,
      percentChange: 0.79
    },
    {
      name: "SENSEX",
      value: 78342.18,
      change: 612.75,
      percentChange: 0.85
    },
    {
      name: "BANK NIFTY",
      value: 48598.32,
      change: -156.78,
      percentChange: -0.32
    },
    {
      name: "NIFTY MIDCAP 100",
      value: 42785.65,
      change: 345.28,
      percentChange: 0.81
    },
    {
      name: "NIFTY SMALLCAP 100",
      value: 15876.43,
      change: 178.34,
      percentChange: 1.13
    }
  ];
};

export const useMarketData = () => {
  const { toast } = useToast();
  
  const fetchData = async <T,>(fetcher: () => Promise<T>, errorMessage: string): Promise<T | null> => {
    try {
      return await fetcher();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    }
  };
  
  return {
    getMutualFunds: () => fetchData(() => fetchMutualFunds(), "Failed to fetch mutual funds data"),
    getMarketIndices: () => fetchData(() => fetchMarketIndices(), "Failed to fetch market indices data"),
  };
};
