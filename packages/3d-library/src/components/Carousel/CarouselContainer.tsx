import React, { type MutableRefObject, useEffect } from "react";
import { useCarouselContext } from "./provider";
import { SiteWrapper } from "./SiteWrapper";
import clsx from "clsx";
import { CarouselThumbnails } from "./CarouselThumbnails";

type CarouselContainerProps = React.PropsWithChildren<{
  className?: { thumbails: string };
  items: any[];
  selectedIndex: MutableRefObject<number>;
  prevSelectedIndex?: MutableRefObject<number>;
  animateSelected?: MutableRefObject<string>;
}>;

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  className,
  items,
  children,
  selectedIndex,
  prevSelectedIndex,
  animateSelected,
}) => {
  const carouselContext = useCarouselContext();
  const thumbnails = items?.map((item) => item?.carouselThumbnail);

  useEffect(() => {
    carouselContext?.setSelectedIndex(selectedIndex.current);
    carouselContext?.setItems(items);
  }, [carouselContext, items, selectedIndex]);

  return (
    <div className="relative flex w-full flex-col content-center justify-center overflow-hidden">
      <SiteWrapper
        className={clsx("absolute top-0 z-10", className?.thumbails)}
      >
        <div className="mx-auto max-w-6xl self-center">
          <CarouselThumbnails
            images={thumbnails as any[]}
            selectedIndex={selectedIndex}
            prevSelectedIndex={prevSelectedIndex as MutableRefObject<number>}
            animateSelected={animateSelected}
          />
        </div>
      </SiteWrapper>
      <div className="relative h-screen w-full">{children}</div>
    </div>
  );
};

export default CarouselContainer;
