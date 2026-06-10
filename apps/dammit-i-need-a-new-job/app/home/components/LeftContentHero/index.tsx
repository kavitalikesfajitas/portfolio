import { clsx } from "clsx";

export function LeftContentHero() {
  return (
    <div className={clsx("flex flex-col gap-5")}>
      <div className="flex-1 grow-0 bg-neutral-950 font-londrina-shadow text-5xl font-bold uppercase text-cream-1000 sm:text-7xl">
        Dammit.
        <br /> I gotta get a new job.
      </div>
      <div className="font-overpass-mono text-xl font-bold uppercase tracking-tighter text-orange-1000 sm:text-2xl">
        Why This Exists
      </div>
      <div className="max-w-full space-y-5 font-overpass-mono text-xs leading-relaxed text-cream-800 sm:space-y-6 sm:text-sm lg:max-w-xl lg:text-md">
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
