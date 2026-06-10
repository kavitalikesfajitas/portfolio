import { clsx } from "clsx";

export function LeftContentHero() {
  return (
    <div className={clsx("flex flex-col gap-5")}>
      <div className="flex-1 grow-0 uppercase text-7xl font-bold text-cream-1000 bg-neutral-950 font-londrina-shadow">
        Dammit.
        <br /> I gotta get a new job.
      </div>
      <div className="font-overpass-mono text-2xl font-bold uppercase tracking-tighter text-orange-1000">
        Why This Exists
      </div>
      <div className="max-w-full lg:max-w-xl space-y-6 font-overpass-mono text-sm lg:text-md leading-relaxed text-cream-800">
        <p>
          I started looking at job listings and found myself wondering how much
          of the market I was actually seeing.
        </p>
        <p>
          Am I seeing what&apos;s available, or am I seeing what an algorithm
          thinks I should see?
        </p>
        <p>I wanted more control over how I discovered opportunities.</p>
        <p>
          Between recommendations, sponsored posts, AI-generated suggestions,
          and platform-specific filters, it felt like someone else&apos;s
          algorithm was deciding what opportunities made it into my feed.
        </p>
        <p>So I started digging.</p>
      </div>
    </div>
  );
}
