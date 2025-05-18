
"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>
    {children}
    <Toaster />
    <Sonner position="top-right" closeButton />
  </TooltipProvider>
);

export default App;
