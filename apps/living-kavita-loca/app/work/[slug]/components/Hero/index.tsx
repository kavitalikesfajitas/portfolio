import React from "react";
import clsx from "clsx";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { HEIGHT_CLASSES, type HeightKey } from "./constants";

type HeroProps = React.PropsWithChildren<{
  image?: StaticImageData | string | undefined;
  videoSrc?: string;
  videoPoster?: string;
  height?: HeightKey;
  className?: string;
  videoSources?: { src: string; type: string }[];
}>;

export function Hero({
  className,
  height = "xl",
  children,
  videoSrc,
  videoSources,
  image,
  videoPoster,
  ...rest
}: HeroProps) {
  const isStaticImage = typeof image === "object";
  // Only use blur placeholder if the image has blurDataURL (not for SVGs)
  const supportsBlur = isStaticImage && "blurDataURL" in image;

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
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          {...(supportsBlur && { placeholder: "blur" })}
          className="absolute inset-0 object-cover z-0 w-full h-full object-center"
        />
      )}
      {(videoSrc || (videoSources && videoSources.length > 0)) && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
        >
          {videoSources?.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
          {/* Fallback single source for backwards compatibility */}
          {videoSrc ? <source src={videoSrc} /> : null}
        </video>
      )}
      {children}
    </div>
  );
}
