import clsx from "clsx";
import { JobsStatsBlock } from "./home/components/JobsStatsBlock";
import { RightContentHero } from "./home/components/RightContentHero";
import { LeftContentHero } from "./home/components/LeftContentHero";
import { BottomContent } from "./home/components/BottomContent";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col items-center gap-10 bg-neutral-950 px-5 sm:px-10">
        <div className={clsx("flex flex-wrap flex-row  w-full gap-10")}>
          <LeftContentHero />
          <RightContentHero />
        </div>

        <JobsStatsBlock />
        <BottomContent />
      </main>
    </div>
  );
}
