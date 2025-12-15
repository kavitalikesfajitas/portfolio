import React from "react";
import clsx from "clsx";
import type { StaticImageData } from "next/image";
import { HEIGHT_CLASSES, type HeightKey } from "./constants";
import Image from "next/image";
type HeroProps = React.PropsWithChildren<{
  image?: StaticImageData;
  height?: HeightKey;
  className?: string;
}>;

export function Hero({
  className,
  height = "xl",
  children,
  image,
  ...rest
}: HeroProps) {
  console.log({ image });
  return (
    <div
      className={clsx(
        "aspect-auto w-full ",
        "flex flex-col justify-center items-center relative overflow-hidden",

        HEIGHT_CLASSES[height],
        className,
      )}
      {...rest}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        priority
        // blurDataURL={DEFAULT_BLUR}
        fetchPriority="high"
        placeholder="blur"
        className="absolute inset-0 object-cover z-0 w-full h-full object-center"
      />
      {children}
    </div>
  );
}
