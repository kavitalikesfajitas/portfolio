"use client";
import { Card } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import clsx from "clsx";
import Image from "next/image";
import Cat6 from "@/public/images/cat-6.png";
import { DaysCounterCardContent } from "./DaysCounterCardContent";

export function RightContentHero() {
  return (
    <div
      className={clsx(
        "relative flex min-w-0 w-full flex-1 flex-col items-center gap-0 lg:items-end",
      )}
    >
      <Card className="relative flex h-[430px] w-full max-w-80 flex-col overflow-visible border-divider-1000 bg-neutral-910 py-0 text-cream-1000">
        <DaysCounterCardContent />
        <Image
          src={Cat6}
          alt="cat asking for help beside a panic fuel mug"
          priority
          className="pointer-events-none absolute -bottom-14 left-1/2 z-20 w-[92%] max-w-none -translate-x-1/2"
        />
      </Card>
    </div>
  );
}
