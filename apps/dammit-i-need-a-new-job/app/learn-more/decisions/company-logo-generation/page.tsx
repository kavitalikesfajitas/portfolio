import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";
import DecisionContent from "@/docs/002-company-logo-generation.mdx";
import { LogoDecisionPreview } from "../../components/LogoDecisionPreview";

export const metadata = {
  title: "Company Logo Generation | Dammit Decisions",
  description:
    "Why Dammit generates company logos at build time for seeded companies and how that changes for dynamic approvals.",
};

export default function CompanyLogoGenerationDecisionPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col px-5 py-8 font-overpass-mono sm:px-10 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-divider-1000 pb-4">
          <Link
            href="/learn-more"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase leading-none tracking-tighter text-orange-1000 underline-offset-4 hover:underline sm:text-base"
          >
            <ArrowRight className="size-4 shrink-0 rotate-180" aria-hidden />
            <span>Back to learn more</span>
          </Link>

          <p className="text-sm font-bold uppercase leading-none tracking-tighter text-orange-1000 sm:text-base">
            Decision note
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="order-2 min-w-0 lg:order-1">
            <DecisionContent />
          </article>

          <aside className="order-1 min-w-0 rounded-md border border-divider-1000 bg-neutral-910/80 p-5 lg:sticky lg:top-28 lg:order-2">
            <h2 className="text-sm font-bold uppercase tracking-tighter text-orange-1000">
              Current seed logos
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-900">
              The app-owned company list uses static logo files and a generated
              manifest. Dynamic companies should eventually point at reviewed
              asset URLs instead.
            </p>
            <LogoDecisionPreview />
            <a
              href="https://github.com/kavitalikesfajitas/portfolio/blob/main/apps/dammit-i-need-a-new-job/scripts/fetch-company-logos.ts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-orange-1000 underline-offset-4 hover:underline"
            >
              <span>Read the script</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </a>
          </aside>
        </div>
      </main>
    </div>
  );
}
