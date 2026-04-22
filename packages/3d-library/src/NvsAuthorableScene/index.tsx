import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Props as CanvasProps } from "@react-three/fiber";
import { CubeLoader } from "../NvsLoaders";

export type NvsSceneProps = CanvasProps;

export const NvsAuthorableScene: React.FC<NvsSceneProps> = ({
  children,
  ...props
}) => {
  return (
    <Canvas {...props}>
      <Suspense fallback={<CubeLoader />}>{children}</Suspense>
    </Canvas>
  );
};
