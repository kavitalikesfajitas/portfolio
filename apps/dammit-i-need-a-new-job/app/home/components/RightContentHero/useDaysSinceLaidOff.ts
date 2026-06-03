"use client";

import { useLocalStorageValue } from "@react-hookz/web";

const LAID_OFF_DATE = {
  day: 27,
  monthIndex: 3,
  year: 2026,
};
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_SINCE_LAID_OFF_STORAGE_KEY = "dammit.daysSinceLaidOff";

export function getInitialDaysSinceLaidOff(referenceDate = new Date()) {
  const laidOffDay = Date.UTC(
    LAID_OFF_DATE.year,
    LAID_OFF_DATE.monthIndex,
    LAID_OFF_DATE.day,
  );
  const currentDay = Date.UTC(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return Math.max(
    0,
    Math.floor((currentDay - laidOffDay) / MILLISECONDS_PER_DAY),
  );
}

export function useDaysSinceLaidOff() {
  const initialDaysSinceLaidOff = getInitialDaysSinceLaidOff();
  const { value: daysSinceLaidOff, set: setDaysSinceLaidOff } =
    useLocalStorageValue<number>(DAYS_SINCE_LAID_OFF_STORAGE_KEY, {
      defaultValue: initialDaysSinceLaidOff,
      initializeWithValue: false,
    });

  const decrementDays = () => {
    setDaysSinceLaidOff((currentDays) =>
      Math.max(0, (currentDays ?? initialDaysSinceLaidOff) - 1),
    );
  };

  const incrementDays = () => {
    setDaysSinceLaidOff(
      (currentDays) => (currentDays ?? initialDaysSinceLaidOff) + 1,
    );
  };

  return {
    daysSinceLaidOff,
    decrementDays,
    incrementDays,
    isDaysSinceLaidOffReady: daysSinceLaidOff !== undefined,
  };
}
