"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/services/auth-service";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const requiresAuth = pathname?.startsWith("/manage");
    
    if (requiresAuth && !authService.isAuthenticated()) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    } else {
      setLoading(false);
    }
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
        <p className="mt-4 text-lg font-medium">Carregando...</p>
      </div>
    );
  }

  return <>{children}</>;
}
