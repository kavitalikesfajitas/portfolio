import clsx from "clsx";
import { JobsStatsBlock } from "./home/components/JobsStatsBlock";
import { RightContentHero } from "./home/components/RightContentHero";
import { NavigationMenu } from "./components/NavigationMenu";
import { LeftContentHero } from "./home/components/LeftContentHero";
import Image from "next/image";
import ConstructionBarrier from "@/public/images/construction-barrier.png";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-neutral-950 text-cream-1000">
      <NavigationMenu />
      <main className="flex flex-1 w-full flex-col items-center gap-10 bg-neutral-950 max-w-7xl px-10">
        <div className={clsx("flex flex-wrap flex-row  w-full gap-10")}>
          <LeftContentHero />
          <RightContentHero />
        </div>

        <JobsStatsBlock />
        <div
          className={clsx(
            "flex w-full flex-col gap-8 font-overpass-mono md:flex-row md:items-start md:justify-between",
          )}
        >
          <div>
            <div className="mb-3 text-2xl font-bold uppercase tracking-tighter text-orange-1000">
              Coming Soon
            </div>
            <p className="max-w-4xl text-base leading-relaxed text-text-900">
              I’m building features that actually help job seekers instead of
              just keeping them scrolling. Check back soon for updates.
            </p>
          </div>
          <Image
            src={ConstructionBarrier}
            priority
            alt="construction barrier"
            className="w-full max-w-sm self-center object-contain md:w-80 md:self-end lg:w-96"
          />
        </div>
      </main>
    </div>
  );
}
