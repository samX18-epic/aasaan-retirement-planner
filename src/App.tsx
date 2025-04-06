
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Investments from "./pages/Investments";
import News from "./pages/News";
import StockMarket from "./pages/StockMarket";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-950">
        <BrowserRouter>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/news" element={<News />} />
              <Route path="/stock-market" element={<StockMarket />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
        <Sonner position="top-right" closeButton />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
