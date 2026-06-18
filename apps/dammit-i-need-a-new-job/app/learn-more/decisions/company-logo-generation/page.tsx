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
        <Link
          href="/learn-more"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-orange-1000 underline-offset-4 hover:underline"
        >
          <ArrowRight className="size-4 shrink-0 rotate-180" aria-hidden />
          <span>Back to learn more</span>
        </Link>

        <p className="mb-3 text-xs font-bold uppercase tracking-tighter text-orange-1000">
          Decision note
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article>
            <DecisionContent />
          </article>

          <aside className="rounded-md border border-divider-1000 bg-neutral-910/80 p-5 lg:sticky lg:top-28">
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
