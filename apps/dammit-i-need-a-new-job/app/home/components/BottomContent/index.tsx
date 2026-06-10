import { CurrentInvestigationsHeader } from "../CurrentInvestigations";
import { BackStory } from "./BackStory";
import { InvestigationPanel } from "./InvestigationPanel";

export function BottomContent() {
  return (
    <section className="flex w-full flex-col gap-6 font-overpass-mono pb-10">
      <CurrentInvestigationsHeader />
      <InvestigationPanel />
      <BackStory />
    </section>
  );
}
