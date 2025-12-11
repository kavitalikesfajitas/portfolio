import clsx from "clsx";

import type { FeaturedWorkCardThumbnailProps } from "./FeatureWorkCardThumbnail";
import { useVideoStateController, AutoPlayVideo } from "../AutoPlayVideo";
import { LoadingBarPulse } from "./LoadingPulseBar";

function labelVideo(tokenName?: string | null) {
  if (tokenName) return `Video of ${tokenName}`;
  return "Video of Featured work";
}

type FeatureWorkThumbnailVideoProps = Pick<
  FeaturedWorkCardThumbnailProps,
  "videoSrc" | "videoDescription" | "isHovered"
>;

export function FeatureWorkThumbnailVideo(
  props: FeatureWorkThumbnailVideoProps,
) {
  const videoController = useVideoStateController();

  return props.isHovered ? (
    <div className="hidden md:block">
      <AutoPlayVideo
        loop={false}
        src={props.videoSrc}
        aria-label={labelVideo(props.videoDescription)}
        className={clsx(
          "absolute inset-0 object-contain opacity-0 transition-opacity duration-300",
          {
            "opacity-100": videoController.showVideo,
          },
        )}
        onCanPlay={() => videoController.setCanPlay(true)}
        onWaiting={() => videoController.setIsWaiting(true)}
        onPlaying={() => {
          videoController.setIsComplete(false);
          videoController.setIsWaiting(false);
        }}
        onEnded={() => videoController.setIsComplete(true)}
      />
      {videoController.showLoader && (
        <LoadingBarPulse
          aria-label="Featured work video loading..."
          className="absolute bottom-0 left-0 right-0"
        />
      )}
    </div>
  ) : null;
}
