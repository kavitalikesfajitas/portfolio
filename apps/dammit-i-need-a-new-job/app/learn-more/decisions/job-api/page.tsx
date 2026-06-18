import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";
import DecisionContent from "@/docs/001-job-api-decisions.mdx";

export const metadata = {
  title: "Job API Decisions | Dammit Decisions",
  description:
    "Why Dammit starts with Greenhouse departments, validates upstream payloads, and keeps jobs as a future search surface.",
};

export default function JobApiDecisionPage() {
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
              Current MVP shape
            </h2>
            <dl className="mt-4 space-y-4 text-sm leading-relaxed text-foreground-900">
              <div>
                <dt className="font-bold uppercase tracking-tighter text-cream-1000">
                  Provider
                </dt>
                <dd>Greenhouse public job boards</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-tighter text-cream-1000">
                  Primary request
                </dt>
                <dd>`/departments` for department-first discovery</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-tighter text-cream-1000">
                  Rendering
                </dt>
                <dd>ISR company pages backed by server-side data</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-tighter text-cream-1000">
                  Protection
                </dt>
                <dd>Jobs proxy keeps `x-api-key` outside development</dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
}
