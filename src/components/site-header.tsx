import { ShieldCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/30 backdrop-blur-lg">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-foreground" />
          <span className="font-bold text-lg">SatyaCheck</span>
        </div>
      </div>
    </header>
  );
}
