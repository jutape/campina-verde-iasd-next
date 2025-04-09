import UserDropdown from "@/components/user-dropdown";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Voltar ao início</span>
          </Button>
        </Link>
        <UserDropdown />
      </div>
      {children}
    </div>
  );
}
