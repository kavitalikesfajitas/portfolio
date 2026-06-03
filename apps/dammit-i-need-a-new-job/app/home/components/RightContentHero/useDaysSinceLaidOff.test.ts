import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const { useDaysSinceLaidOff } = await import("./useDaysSinceLaidOff");

describe("given useDaysSinceLaidOff", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("it loads the days between today and the laid off date", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 5, 3, 12));

    const { result } = renderHook(() => useDaysSinceLaidOff());

    await waitFor(() => {
      expect(result.current.daysSinceLaidOff).toBe(37);
      expect(result.current.isDaysSinceLaidOffReady).toBe(true);
    });
  });

  test("it loads the saved days since laid off without flashing the computed default", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 5, 3, 12));
    window.localStorage.setItem("dammit.daysSinceLaidOff", "42");

    const { result } = renderHook(() => useDaysSinceLaidOff());

    await waitFor(() => {
      expect(result.current.daysSinceLaidOff).toBe(42);
    });
  });

  test("it increments and decrements the days since laid off", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date(2026, 5, 3, 12));

    const { result } = renderHook(() => useDaysSinceLaidOff());

    await waitFor(() => {
      expect(result.current.daysSinceLaidOff).toBe(37);
    });

    act(() => {
      result.current.incrementDays();
    });

    expect(result.current.daysSinceLaidOff).toBe(38);

    act(() => {
      result.current.decrementDays();
    });

    expect(result.current.daysSinceLaidOff).toBe(37);
  });

  test("it does not decrement below zero", async () => {
    window.localStorage.setItem("dammit.daysSinceLaidOff", "0");

    const { result } = renderHook(() => useDaysSinceLaidOff());

    await waitFor(() => {
      expect(result.current.daysSinceLaidOff).toBe(0);
    });

    act(() => {
      result.current.decrementDays();
    });

    expect(result.current.daysSinceLaidOff).toBe(0);
  });
});
