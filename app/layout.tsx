import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthGuard from "@/components/auth-guard";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Campina Verde IASD",
  description: "Igreja adventista do sétimo dia - Campina Verde",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <AuthGuard>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
