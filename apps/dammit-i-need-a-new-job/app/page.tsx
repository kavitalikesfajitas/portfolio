import clsx from "clsx";
import Image from "next/image";
import FireLogo from "@/public/images/fire.png";
import {
  Card,
  CardContent,
} from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { Footer } from "@kavita-likes-fajitas/ui-library/Navigation/Footer";
import { Container } from "@kavita-likes-fajitas/ui-library/Container";
import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import {
  Briefcase,
  ChatBubble,
  Ghost,
  Flame,
} from "@kavita-likes-fajitas/kavita-fajita-icons";
import Cat1 from "@/public/images/cat-3.png";
import { JobsStatsBlock } from "./home/components/JobsStatsBlock";
import { RightContentHero } from "./home/components/RightContentHero";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black">
      <div className=" sticky bg-pink-800 top-0 w-full flex flex-row">
        <div className=" flex-1 flex flex-row gap-2 items-center">
          <div className="font-midnight-gelactic ">DAMMIT.</div>
          <Image
            src={FireLogo}
            alt="fdsafsdf"
            placeholder="blur"
            quality={75}
          />
        </div>

        <div>{/* rigght content <Arrow/> */}</div>
      </div>
      <main className="flex flex-1 w-full flex-col items-center gap-10 bg-black max-w-7xl px-10">
        <div className={clsx("flex flex-row w-full gap-10")}>
          <LeftHeaderHero />
          <RightContentHero />
        </div>

        <JobsStatsBlock />
      </main>
    </div>
  );
}

const Arrow = () => {
  return (
    <div className="text-neutral-900 -rotate-6">
      <svg width="90" height="55" viewBox="0 0 90 55" fill="none">
        <path
          d="M8 12 C28 45, 58 42, 72 18"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M63 18 L75 15 L73 28"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      a
    </div>
  );
};

const LeftHeaderHero = () => {
  return (
    <div className={clsx("flex flex-col gap-5")}>
      <div className="flex-1 grow-0 uppercase text-8xl font-bold text-white bg-black font-londrina-shadow">
        Dammit.
        <br /> I need a new job.
      </div>
      <div className={clsx("font-overpass-mono")}>
        some sub text <br />a Lorem epsum
      </div>
    </div>
  );
};
