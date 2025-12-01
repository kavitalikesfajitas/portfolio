import type { MutableRefObject } from "react";

export type Carousel3DItemsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any; // @todo - type this one out
  animateSelected: { current: string };
  selectedIndex: { current: number };
  prevSelectedIndex: { current: number };
};

export type CarouselThumbnailsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  selectedIndex: MutableRefObject<number>;
  prevSelectedIndex?: MutableRefObject<number>;
  animateSelected?: MutableRefObject<string>;
};

export type CarouselProps = {
  items?: any[];
};
