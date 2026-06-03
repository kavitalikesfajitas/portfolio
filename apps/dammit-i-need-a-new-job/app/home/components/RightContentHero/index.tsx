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
        "flex flex-col flex-1 items-center lg:items-end gap-0 relative",
      )}
    >
      <Card className="flex h-[430px] w-80 flex-col overflow-visible bg-neutral-910 text-cream-1000 border-border-1000 relative py-0">
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
