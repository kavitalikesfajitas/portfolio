import clsx from "clsx";
import type { FeaturedWorkCardProps } from "./types";
import { FeatureWorkThumbnailVideo } from "./FeatureWorkThumbnailVideo";
export type FeaturedWorkCardThumbnailProps = FeaturedWorkCardProps & {
  isHovered: boolean;
  className?: string;
  badge?: string | undefined;
  thumbnail?: string | undefined;
};

export function FeatureWorkCardThumbnail(
  props: FeaturedWorkCardThumbnailProps,
) {
  console.log({ isHovered: props.isHovered });
  return (
    <figure
      className={clsx(
        "aspect-1 relative overflow-hidden rounded-t-lg",
        props.className,
      )}
    >
      <FeatureWorkThumbnailVideo
        videoDescription={props.videoDescription ?? null}
        videoSrc={props.videoSrc ?? ""}
        isHovered={props.isHovered}
      />
      {props.imageSrc && (
        <img
          src={props.imageSrc}
          alt={"thumbnail"}
          loading="lazy"
          // placeholder="blur"
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
