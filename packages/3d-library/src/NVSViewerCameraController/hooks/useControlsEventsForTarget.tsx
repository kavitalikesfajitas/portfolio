import { useMemo } from "react";
import CameraControlsLib from "camera-controls";

import { withDefaultConditionalValue } from "../utils";
import type { UseControlsEventsReturn, ViewerCameraTransform } from "../types";

export function useControlsEventsForTarget(
  target: ViewerCameraTransform,
): UseControlsEventsReturn {
  const { ACTION } = CameraControlsLib;

  return useMemo<UseControlsEventsReturn>(() => {
    const { controlsEnabled, zoomEnabled } = target;
    return {
      touches: {
        one: withDefaultConditionalValue(
          ACTION.TOUCH_ROTATE,
          ACTION.NONE,
          controlsEnabled,
        ),
        two: withDefaultConditionalValue(
          ACTION.TOUCH_ZOOM,
          ACTION.NONE,
          controlsEnabled && zoomEnabled,
        ),
        three: ACTION.NONE,
      },
      mouseButtons: {
        left: withDefaultConditionalValue(
          ACTION.ROTATE,
          ACTION.NONE,
          controlsEnabled,
        ),
        right: ACTION.NONE,
        middle: withDefaultConditionalValue(
          ACTION.ZOOM,
          ACTION.NONE,
          controlsEnabled && zoomEnabled,
        ),
        wheel: withDefaultConditionalValue(
          ACTION.ZOOM,
          ACTION.NONE,
          controlsEnabled && zoomEnabled,
        ),
      },
    };
  }, [target.controlsEnabled, target.zoomEnabled]);
}
