
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  BarChart3,
  Newspaper,
  Menu,
  X,
  TrendingUp,
  Settings,
  LineChart,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-finance-teal" />
            <span className="hidden font-bold sm:inline-block text-xl">Aasaan Retirement</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <Calculator className="h-4 w-4" />
              <span>Calculators</span>
            </Link>
            <Link to="/investments" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <BarChart3 className="h-4 w-4" />
              <span>Investments</span>
            </Link>
            <Link to="/stock-market" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <LineChart className="h-4 w-4" />
              <span>Stock Market</span>
            </Link>
            <Link to="/news" className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary">
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="mr-2 rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calculator className="h-5 w-5" />
              <span>Calculators</span>
            </Link>
            <Link 
              to="/investments" 
              className="flex items-center space-x-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Investments</span>
            </Link>
            <Link 
              to="/stock-market" 
              className="flex items-center space-x-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LineChart className="h-5 w-5" />
              <span>Stock Market</span>
            </Link>
            <Link 
              to="/news" 
              className="flex items-center space-x-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Newspaper className="h-5 w-5" />
              <span>News</span>
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" className="w-full justify-start">Sign In</Button>
              <Button className="w-full justify-start">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
