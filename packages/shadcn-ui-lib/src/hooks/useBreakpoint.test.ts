import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useIsMobile,
  useIsDesktopOrLarger,
  useIsBreakpointMaxWidth,
  useIsBreakpointMinWidth,
} from "./useBreakpoint";

// Helper function to mock window.matchMedia
function createMatchMediaMock(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useBreakpoint hooks", () => {
  let originalMatchMedia: typeof window.matchMedia;
  let originalInnerWidth: number;

  beforeEach(() => {
    // Store original values
    originalMatchMedia = window.matchMedia;
    originalInnerWidth = window.innerWidth;

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore original values
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe("useIsMobile", () => {
    test("returns true when viewport width is less than default breakpoint (768px)", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 767,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(true);
    });

    test("returns false when viewport width is greater than or equal to default breakpoint (768px)", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 768,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(false);
    });

    test("accepts custom breakpoint and returns true when below it", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 639,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsMobile(640));

      expect(result.current).toBe(true);
    });

    test("accepts custom breakpoint and returns false when at or above it", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 640,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsMobile(640));

      expect(result.current).toBe(false);
    });

    test("starts with undefined and updates after effect runs", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsMobile());

      // Initial render should be undefined (before useEffect runs)
      // Then it should update to the actual value
      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });
  });

  describe("useIsDesktopOrLarger", () => {
    test("returns true when viewport width is greater than or equal to default breakpoint (1024px)", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsDesktopOrLarger());

      expect(result.current).toBe(true);
    });

    test("returns false when viewport width is less than default breakpoint (1024px)", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1023,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsDesktopOrLarger());

      expect(result.current).toBe(false);
    });

    test("accepts custom breakpoint and returns true when at or above it", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1440,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsDesktopOrLarger(1440));

      expect(result.current).toBe(true);
    });

    test("accepts custom breakpoint and returns false when below it", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1439,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsDesktopOrLarger(1440));

      expect(result.current).toBe(false);
    });
  });

  describe("useIsBreakpointMaxWidth", () => {
    test("returns true when viewport width is less than breakpoint", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsBreakpointMaxWidth(768));

      expect(result.current).toBe(true);
    });

    test("returns false when viewport width is greater than or equal to breakpoint", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsBreakpointMaxWidth(768));

      expect(result.current).toBe(false);
    });

    test("updates when breakpoint prop changes", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 700,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result, rerender } = renderHook(
        ({ breakpoint }) => useIsBreakpointMaxWidth(breakpoint),
        { initialProps: { breakpoint: 768 } },
      );

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      // Change breakpoint to 600 (current width 700 is now >= 600, so should be false)
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 700,
      });
      window.matchMedia = createMatchMediaMock(false);

      rerender({ breakpoint: 600 });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    test("registers and unregisters event listener", () => {
      const mockAddEventListener = vi.fn();
      const mockRemoveEventListener = vi.fn();

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        dispatchEvent: vi.fn(),
      }));

      const { unmount } = renderHook(() => useIsBreakpointMaxWidth(768));

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });
  });

  describe("useIsBreakpointMinWidth", () => {
    test("returns true when viewport width is greater than or equal to breakpoint", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsBreakpointMinWidth(1024));

      expect(result.current).toBe(true);
    });

    test("returns false when viewport width is less than breakpoint", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1023,
      });
      window.matchMedia = createMatchMediaMock(false);

      const { result } = renderHook(() => useIsBreakpointMinWidth(1024));

      expect(result.current).toBe(false);
    });

    test("uses default breakpoint of 768px when no argument provided", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result } = renderHook(() => useIsBreakpointMinWidth());

      expect(result.current).toBe(true);
    });

    test("updates when breakpoint prop changes", async () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 900,
      });
      window.matchMedia = createMatchMediaMock(true);

      const { result, rerender } = renderHook(
        ({ breakpoint }) => useIsBreakpointMinWidth(breakpoint),
        { initialProps: { breakpoint: 768 } },
      );

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      // Change breakpoint to 1024 (current width 900 is now < 1024, so should be false)
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 900,
      });
      window.matchMedia = createMatchMediaMock(false);

      rerender({ breakpoint: 1024 });

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    test("registers and unregisters event listener", () => {
      const mockAddEventListener = vi.fn();
      const mockRemoveEventListener = vi.fn();

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: true,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        dispatchEvent: vi.fn(),
      }));

      const { unmount } = renderHook(() => useIsBreakpointMinWidth(1024));

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });
  });
});
