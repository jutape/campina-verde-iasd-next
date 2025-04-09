"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-8 transition-all duration-500 ease-in-out mr-4 ${
              isHomePage ? 'opacity-0 invisible scale-95' : 'opacity-100 visible scale-100'
            }`}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              aria-label="Voltar"
              disabled={isHomePage}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <Link 
            href="/" 
            className="h-10 flex items-center transition-all duration-300 ease-in-out"
          >
            <Church className="h-5 w-5 mr-2 transition-transform duration-300" />
            <span className="font-semibold transition-all duration-300">IASD Campina Verde</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
