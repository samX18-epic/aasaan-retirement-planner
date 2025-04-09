import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, LineChart, Menu, Settings, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/dashboard" },
    { label: "Investments", icon: <LineChart className="h-5 w-5" />, href: "/investments" },
    { label: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
    { label: "Profile", icon: <User className="h-5 w-5" />, href: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <LineChart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold hidden md:block">Aasaan</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-primary text-primary-foreground p-2 rounded-md">
                  <LineChart className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Aasaan</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-secondary/10">
        {children}
      </main>

      {/* Footer - Keep it minimal on internal pages */}
      <footer className="border-t py-4 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 Aasaan Retirement Planner | EY Scholarship Challenge
        </div>
      </footer>
    </div>
  );
};

export default Layout;
