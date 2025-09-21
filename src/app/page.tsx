import { Checker } from "@/components/checker";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-6 lg:p-10">
        <div className="w-full max-w-4xl">
          <Checker />
        </div>
      </main>
    </div>
  );
}
