import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  default: (
    imageProps: React.ComponentProps<"img"> & {
      placeholder?: string;
      priority?: boolean;
      quality?: number;
      src: string | { src: string };
    },
  ) => {
    const { alt, src } = imageProps;
    const props = { ...imageProps };

    delete props.placeholder;
    delete props.priority;
    delete props.quality;

    return React.createElement("img", {
      ...props,
      alt,
      src: typeof src === "string" ? src : src.src,
    });
  },
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    clear: () => {
      store = {};
    },
    getItem: (key: string) => store[key] ?? null,
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: localStorageMock,
});

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: localStorageMock,
});

// Mock window.matchMedia for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
