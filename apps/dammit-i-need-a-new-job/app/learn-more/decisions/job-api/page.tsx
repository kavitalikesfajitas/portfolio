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
