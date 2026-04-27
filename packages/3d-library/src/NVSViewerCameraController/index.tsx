import { CameraControls } from "@react-three/drei";
import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

import { useControlsEventsForTarget } from "./hooks";
import type {
  ViewerCameraControllerProps,
  ViewerCameraTransform,
} from "./types";

export function NVSViewerCameraController({
  currentTargetIdx,
  targets,
  globalControlsProps,
  autoRotate,
}: ViewerCameraControllerProps) {
  const activeTarget = targets[currentTargetIdx];

  if (currentTargetIdx >= targets.length || !activeTarget) {
    // eslint-disable-next-line no-console
    console.error(
      "Invalid target index, it is out of bounds for the provided targets array",
    );
    return null;
  }

  const controlsRef = useRef<CameraControls>(null);
  const { touches, mouseButtons } = useControlsEventsForTarget(activeTarget);

  const mergedControlsProps = useMemo(
    () =>
      Object.assign(
        {},
        globalControlsProps,
        activeTarget.controlsConstraints,
      ),
    [globalControlsProps, activeTarget],
  );

  async function animateToTarget(target: ViewerCameraTransform) {
    return Promise.all([
      controlsRef.current?.setLookAt(
        ...target.position.toArray(),
        ...target.lookAtCenter.toArray(),
        true,
      ),
      controlsRef.current?.zoomTo(target.zoom, true),
    ]);
  }

  useEffect(() => {
    if (!controlsRef.current) return;

    // eslint-disable-next-line no-console
    animateToTarget(activeTarget).catch(console.error);
  }, [activeTarget]);

  useFrame((_, delta) => {
    if (!controlsRef.current || !autoRotate) return;
    controlsRef.current.azimuthAngle += 5 * delta * MathUtils.DEG2RAD;
  });

  return (
    <CameraControls
      {...mergedControlsProps}
      touches={touches as React.ComponentProps<typeof CameraControls>["touches"]}
      mouseButtons={
        mouseButtons as React.ComponentProps<typeof CameraControls>["mouseButtons"]
      }
      ref={controlsRef}
      makeDefault
    />
  );
}

export type {
  ViewerCameraControllerProps,
  ViewerCameraTransform,
  ViewerCameraTransforms,
  ControlsConstraints,
} from "./types";
