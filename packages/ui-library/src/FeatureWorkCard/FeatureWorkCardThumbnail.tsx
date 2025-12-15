import clsx from "clsx";
import type { FeaturedWorkCardProps } from "./types";
import { FeatureWorkThumbnailVideo } from "./FeatureWorkThumbnailVideo";
import Image from "next/image";
export type FeaturedWorkCardThumbnailProps = FeaturedWorkCardProps & {
  isHovered: boolean;
  className?: string;
  badge?: string | undefined;
  thumbnail?: string | undefined;
};
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function FeatureWorkCardThumbnail(
  props: FeaturedWorkCardThumbnailProps,
) {
  return (
    <figure
      className={clsx(
        "relative z-10 aspect-auto h-48 overflow-hidden rounded-t-lg",
        "w-full",
        props.className,
      )}
    >
      <FeatureWorkThumbnailVideo
        videoDescription={props.videoDescription ?? null}
        videoSrc={props.videoSrc ?? undefined}
        isHovered={props.isHovered}
      />
      {props.imageSrc && (
        <Image
          src={props.imageSrc}
          alt={"thumbnail"}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className={clsx(
            "object-cover",
            !props.videoSrc &&
              "transition-transform duration-300 group-hover:scale-105",
            "object-scale-down object-top",
          )}
          unoptimized
        />
      )}
      {props.badge && (
        <div className="bg-accent/95 absolute left-4 top-4 flex items-center justify-center gap-1 rounded-md px-2 py-1">
          <img
            src={props.badge}
            alt="Project badge"
            className="h-auto max-h-5 w-auto max-w-20"
          />
        </div>
      )}
    </figure>
  );
}
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
