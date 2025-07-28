"use client";

import type React from "react";

import { useState } from "react";
import { Menu, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const navigationItems = [
  { name: "Overview", href: "/" },
  { name: "DU's in Insurance", href: "/du" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo and Company Name */}
              <div
                className="flex items-center space-x-4 hover:cursor-pointer"
                onClick={() => router.push(`/`)}
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold text-2xl">
                    InsuranceCo
                  </span>
                  <span className="text-gray-600 text-sm">
                    Insurance that cares
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "text-red-600 font-semibold"
                            : "text-gray-700 hover:text-red-500"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
                    onClick={() => router.push(`/auth`)}
                  >
                    Sign In
                  </Button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-700"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-white">
                    <div className="flex flex-col space-y-6 mt-8">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-gray-700 hover:text-red-600 text-lg font-medium transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white w-full"
                        onClick={() => router.push(`/auth`)}
                      >
                        Sign In
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
