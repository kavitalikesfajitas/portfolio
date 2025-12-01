import React, { MutableRefObject, useEffect } from "react";
import CarouselThumbnails from "./CarouselThumbnails";
import {
  CarouselItems,
  ContentTypeAsset,
} from "nvs-types/dist/types/generated/contentful";
import { CarouselType } from "./types";
import { useCarouselContext } from "../../contexts/CarouselContext";
import { SiteWrapper } from "@/src/components/grid/components/SiteWrapper";
import clsx from "clsx";

type CarouselContainerProps = React.PropsWithChildren<{
  className?: { thumbails: string };
  type: CarouselType;
  items: CarouselItems[];
  selectedIndex: MutableRefObject<number>;
  prevSelectedIndex?: MutableRefObject<number>;
  animateSelected?: MutableRefObject<string>;
}>;

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  className,
  type,
  items,
  children,
  selectedIndex,
  prevSelectedIndex,
  animateSelected,
}) => {
  const carouselContext = useCarouselContext();
  const thumbnails = items?.map((item) => item?.carouselThumbnail);

  useEffect(() => {
    carouselContext?.setType(type);
    carouselContext?.setSelectedIndex(selectedIndex.current);
    carouselContext?.setItems(items);
  }, [carouselContext, items, selectedIndex, type]);

  return (
    <div className="w-full flex flex-col content-center justify-center overflow-hidden relative">
      <SiteWrapper
        className={clsx("z-10 absolute top-0", className?.thumbails)}
      >
        <div className="mx-auto max-w-6xl self-center">
          <CarouselThumbnails
            images={thumbnails as ContentTypeAsset[]}
            selectedIndex={selectedIndex}
            prevSelectedIndex={prevSelectedIndex}
            animateSelected={animateSelected}
          />
        </div>
      </SiteWrapper>
      <div className="h-screen w-full relative">{children}</div>
    </div>
  );
};

export default CarouselContainer;
