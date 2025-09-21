import { ShieldCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">SatyaCheck</span>
        </div>
      </div>
    </header>
  );
}
