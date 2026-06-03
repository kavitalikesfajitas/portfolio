"use client";

import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import { CardContent } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/card";
import { useLocalStorageValue } from "@react-hookz/web";

const INITIAL_DAYS_SINCE_LAID_OFF = 32;
const DAYS_SINCE_LAID_OFF_STORAGE_KEY = "dammit.daysSinceLaidOff";

export function DaysCounterCardContent() {
  const {
    value: daysSinceLaidOff = INITIAL_DAYS_SINCE_LAID_OFF,
    set: setDaysSinceLaidOff,
  } = useLocalStorageValue<number>(DAYS_SINCE_LAID_OFF_STORAGE_KEY, {
    defaultValue: INITIAL_DAYS_SINCE_LAID_OFF,
    initializeWithValue: false,
  });

  const decrementDays = () => {
    setDaysSinceLaidOff((currentDays) =>
      Math.max(0, (currentDays ?? INITIAL_DAYS_SINCE_LAID_OFF) - 1),
    );
  };

  const incrementDays = () => {
    setDaysSinceLaidOff(
      (currentDays) => (currentDays ?? INITIAL_DAYS_SINCE_LAID_OFF) + 1,
    );
  };
  return (
    <CardContent className="relative z-30 flex flex-col items-center gap-6 px-8 pt-12">
      <div className="font-overpass-mono tracking-tighter text-sm text-center text-cream-800">
        DAYS SINCE LAID OFF
      </div>
      <div className="text-orange-1000 font-extrabold tracking-tighter text-8xl leading-none w-full flex justify-center">
        {daysSinceLaidOff}
      </div>
      <div className="flex flex-row gap-5 uppercase dark justify-center">
        <Button
          aria-label="Subtract one day"
          className="bg-transparent hover:text-neutral-950 border border-orange-1000 text-cream-1000 font-overpass-mono uppercase tracking-tighter text-xs"
          disabled={daysSinceLaidOff === 0}
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
