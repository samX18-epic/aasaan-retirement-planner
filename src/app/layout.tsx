
import "../index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@/app/providers";

export const metadata = {
  title: "Financial Planning App",
  description: "Plan your finances and retirement with our tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider>
          <TooltipProvider>
            <main>{children}</main>
            <Toaster />
            <Sonner position="top-right" closeButton />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
