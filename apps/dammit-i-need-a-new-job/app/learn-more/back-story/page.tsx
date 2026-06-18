import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";
import BackStoryContent from "@/docs/000-back-story.mdx";

export const metadata = {
  title: "The Back Story | Dammit",
  description:
    "Why Dammit exists and why it pulls live job listings from company boards.",
};

export default function BackStoryPage() {
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
          Article
        </p>

        <article>
          <BackStoryContent />
        </article>
      </main>
    </div>
  );
}
