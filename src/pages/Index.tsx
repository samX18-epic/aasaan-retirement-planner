
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, LineChart, ShieldCheck, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-12 text-center md:text-left md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              EY Scholarship Challenge
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Aasaan
              </span> Retirement Planner
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Simplifying retirement planning with AI-powered tools and blockchain technology for a secure financial future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Button size="lg" className="hover:scale-105 transition-transform">
                <Link to="/dashboard" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute -z-10 h-72 w-72 blur-[100px] bg-primary/20 rounded-full top-0 right-0"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6 transform md:translate-x-4 hover:-translate-y-2 transition-transform duration-300">
              <img 
                src="/placeholder.svg" 
                alt="Retirement Planning Dashboard" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-xl shadow-lg">
                <Zap className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cutting-Edge Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines the latest financial technology to give you the best retirement planning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<LineChart className="h-10 w-10" />}
            title="Robo-Advisors"
            description="AI-powered investment strategies tailored to your retirement goals and risk tolerance."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10" />}
            title="Blockchain Security"
            description="Next-generation security for your retirement savings with blockchain technology."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10" />}
            title="Smart Calculators"
            description="Dynamic tools that factor in inflation, lifestyle choices, and health expenses."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Future?</h2>
            <p className="text-lg mb-6">
              Start planning your retirement journey today with our AI-powered tools.
            </p>
            <Button size="lg" className="hover:scale-105 transition-transform">
              <Link to="/dashboard" className="flex items-center gap-2">
                Begin Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Aasaan Retirement Planner. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
      <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
