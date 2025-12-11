import { useState } from "react";

export function useVideoStateController() {
  const [canPlay, setCanPlay] = useState(false);
  const [waiting, setIsWaiting] = useState(false);
  const [complete, setIsComplete] = useState(false);

  return {
    canPlay,
    waiting,
    complete,
    setCanPlay,
    setIsWaiting,
    setIsComplete,
    showLoader: (waiting || !canPlay) && !complete,
    showVideo: canPlay && !complete,
  };
}

export type MouseStateController = {
  enabled: boolean;
};

export function useMouseStateController({ enabled }: MouseStateController) {
  const [isHovered, setIsHovered] = useState(false);

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }

  return {
    onMouseEnter: enabled ? onMouseEnter : undefined,
    onMouseLeave: enabled ? onMouseLeave : undefined,
    isHovered: isHovered,
  };
}
