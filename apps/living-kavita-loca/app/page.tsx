import { ScrapbookImg } from "@kavita-likes-fajitas/ui-library/ScrapbookImg";
import Image from "next/image";
import Hero from "./components/GlamChatHero/Hero";
import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import clsx from "clsx";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white relative">
      <TornPaperEffect
        className={clsx("text-2xl font-midnight-gelactic")}
        text="living kavita loca"
      />
    </main>
  );
}
