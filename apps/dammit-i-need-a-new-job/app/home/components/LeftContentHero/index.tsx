import { clsx } from "clsx";

export function LeftContentHero() {
  return (
    <div className={clsx("flex flex-col gap-5")}>
      <div className="flex-1 grow-0 uppercase text-7xl font-bold text-cream-1000 bg-neutral-950 font-londrina-shadow">
        Dammit.
        <br /> I need a new job.
      </div>
      <div className="font-overpass-mono text-2xl font-bold uppercase tracking-tighter text-orange-1000">
        Why This Exists
      </div>
      <div className="max-w-xl space-y-6 font-overpass-mono text-md leading-relaxed max-w text-cream-800">
        <p>
          I got tired of scrolling through job boards that felt more like social
          media feeds than job searches.
        </p>
        <p>
          While looking for my next role, I’m experimenting with a better way to
          discover opportunities.
        </p>
      </div>
    </div>
  );
}
