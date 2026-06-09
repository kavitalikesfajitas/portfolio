import clsx from "clsx";
import { JobsStatsBlock } from "./home/components/JobsStatsBlock";
import { RightContentHero } from "./home/components/RightContentHero";
import { NavigationMenu } from "./components/NavigationMenu";
import { LeftContentHero } from "./home/components/LeftContentHero";
import { CurrentInvestigations } from "./home/components/CurrentInvestigations";

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
        <CurrentInvestigations />
      </main>
    </div>
  );
}
