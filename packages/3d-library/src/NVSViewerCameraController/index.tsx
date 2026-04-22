import { CameraControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
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
  if (currentTargetIdx >= targets.length) {
    // eslint-disable-next-line no-console
    console.error(
      "Invalid target index, it is out of bounds for the provided targets array",
    );
  }

  const controlsRef = useRef<CameraControls>(null);
  const { touches, mouseButtons } = useControlsEventsForTarget(
    targets[currentTargetIdx],
  );

  const mergedControlsProps = useMemo(
    () =>
      Object.assign(
        {},
        globalControlsProps,
        targets[currentTargetIdx].controlsConstraints,
      ),
    [globalControlsProps, targets, currentTargetIdx],
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
    animateToTarget(targets[currentTargetIdx]).catch(console.error);
  }, [currentTargetIdx, targets, controlsRef.current]);

  useFrame((_, delta) => {
    if (!controlsRef.current || !autoRotate) return;
    controlsRef.current.azimuthAngle += 5 * delta * MathUtils.DEG2RAD;
  });

  return (
    <CameraControls
      {...mergedControlsProps}
      touches={touches}
      mouseButtons={mouseButtons}
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
