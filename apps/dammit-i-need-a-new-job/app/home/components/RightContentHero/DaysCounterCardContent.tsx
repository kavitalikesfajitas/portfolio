"use client";

import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { CardContent } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { Skeleton } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/skeleton";
import { useDaysSinceLaidOff } from "./useDaysSinceLaidOff";

export function DaysCounterCardContent() {
  const {
    daysSinceLaidOff,
    decrementDays,
    incrementDays,
    isDaysSinceLaidOffReady,
  } = useDaysSinceLaidOff();

  return (
    <CardContent className="relative z-30 flex flex-col items-center gap-6 px-8 pt-12">
      <div className="font-overpass-mono tracking-tighter text-sm text-center text-cream-800">
        DAYS SINCE MY LAST SPIRAL
      </div>
      <div className="text-orange-1000 font-extrabold tracking-tighter text-8xl leading-none w-full flex justify-center">
        {isDaysSinceLaidOffReady ? (
          daysSinceLaidOff
        ) : (
          <Skeleton
            aria-label="Loading days since laid off"
            className="h-24 w-32 bg-neutral-800/70"
          />
        )}
      </div>
      <div className="flex flex-row gap-5 uppercase dark justify-center">
        <Button
          aria-label="Subtract one day"
          className="bg-transparent hover:text-neutral-950 border border-orange-1000 text-cream-1000 font-overpass-mono uppercase tracking-tighter text-xs"
          disabled={!isDaysSinceLaidOffReady || daysSinceLaidOff === 0}
          onClick={decrementDays}
        >
          - 1 day
        </Button>
        <Button
          aria-label="Add one day"
          className="bg-transparent hover:text-neutral-950 border border-orange-1000 text-cream-1000 font-overpass-mono uppercase tracking-tighter text-xs"
          onClick={incrementDays}
        >
          + 1 day
        </Button>
      </div>
    </CardContent>
  );
}
