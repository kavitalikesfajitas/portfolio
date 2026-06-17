import { CompaniesUnderInvestigation } from "./components/CompaniesUnderInvestigation";

export const revalidate = 86_400;

export default function CompaniesPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-10 sm:py-10">
        <CompaniesUnderInvestigation />
      </main>
    </div>
  );
}
