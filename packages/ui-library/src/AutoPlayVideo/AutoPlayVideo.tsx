import React, { type ForwardedRef, type VideoHTMLAttributes } from "react";

type AutoPlayVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  className?: string;
};

export const AutoPlayVideo = React.forwardRef(
  (props: AutoPlayVideoProps, ref: ForwardedRef<HTMLVideoElement>) => {
    return <video playsInline autoPlay loop muted {...props} ref={ref} />;
  },
);

AutoPlayVideo.displayName = "AutoPlayVideo";
