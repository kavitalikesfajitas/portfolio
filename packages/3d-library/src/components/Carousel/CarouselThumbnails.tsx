import Image from "next/image";
import clsx from "clsx";
import type { CarouselThumbnailsProps } from "./types";
import { useCarouselContext } from "./provider";

const ImageThumbnail: React.FC<{
  img: any;
  index: number;
  selectedIndex: number | undefined;
}> = ({ img, index, selectedIndex }) => {
  if (!img?.asset?.url) return null;
  return (
    <div>
      <Image
        className={clsx(
          "border-2 border-solid",
          {
            "border-green-500": index == selectedIndex,
          },
          { "border-white": index != selectedIndex },
        )}
        src={img.asset.url}
        alt={`carousel image ${index + (img.description ?? "")}`}
        width={76}
        height={76}
        id={`img-${index}`}
      />
      <div
        className={clsx(
          { "text-green-500": index == selectedIndex },
          { "text-white": index != selectedIndex },
        )}
      >
        {`ED.${Number(index + 1)?.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`}
      </div>
    </div>
  );
};

export const CarouselThumbnails: React.FC<CarouselThumbnailsProps> = ({
  images,
  selectedIndex,
  prevSelectedIndex,
  animateSelected,
}) => {
  const carouselContext = useCarouselContext();

  const thumbnailClicked = (index: number) => {
    const isAlreadySelected = index === selectedIndex.current;
    const isCarouselAnimating =
      animateSelected && animateSelected.current !== "false";

    if (isAlreadySelected || isCarouselAnimating) return null;

    selectedIndex.current = index;
    carouselContext?.setSelectedIndex(index);

    if (animateSelected && !isCarouselAnimating)
      animateSelected.current = "true";

    if (prevSelectedIndex) prevSelectedIndex.current = selectedIndex.current;
  };

  if (!images) return null;
  return (
    <div className="my-6 w-full">
      <div className="flex max-w-max">
        {images.map((img: any, i: number) => {
          return (
            <div
              className="mr-2 flex-auto hover:cursor-pointer"
              key={`thumbnail ${i}`}
              onClick={() => thumbnailClicked(i)}
            >
              <ImageThumbnail
                img={img}
                index={i}
                selectedIndex={carouselContext?.selectedIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
