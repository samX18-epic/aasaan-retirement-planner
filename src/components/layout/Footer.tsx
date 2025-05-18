
"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">RetirePlan</h3>
            <p className="text-sm text-muted-foreground">
              Smart tools for better retirement planning and investment decisions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              <Twitter className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              <Instagram className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              <Linkedin className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#retirement-calculator" className="text-sm text-muted-foreground hover:text-foreground">
                  Retirement Calculator
                </Link>
              </li>
              <li>
                <Link href="/#sip-calculator" className="text-sm text-muted-foreground hover:text-foreground">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link href="/#ppf-calculator" className="text-sm text-muted-foreground hover:text-foreground">
                  PPF Calculator
                </Link>
              </li>
              <li>
                <Link href="/#swf-calculator" className="text-sm text-muted-foreground hover:text-foreground">
                  Safe Withdrawal Fund
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground">
                  News
                </Link>
              </li>
              <li>
                <Link href="/investments" className="text-sm text-muted-foreground hover:text-foreground">
                  Investments
                </Link>
              </li>
              <li>
                <Link href="/stock-market" className="text-sm text-muted-foreground hover:text-foreground">
                  Stock Market
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RetirePlan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
