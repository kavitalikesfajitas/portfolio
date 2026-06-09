import { CompaniesUnderInvestigation } from "./components/CompaniesUnderInvestigation";
import { NavigationMenu } from "@/app/components/NavigationMenu";

export default function CompaniesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-950 text-cream-1000">
      <NavigationMenu />
      <main className="flex w-full max-w-7xl flex-1 flex-col px-10 py-10">
        <CompaniesUnderInvestigation />
      </main>
    </div>
  );
}
