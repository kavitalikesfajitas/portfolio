import { CameraControls, Environment, useProgress } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";

import { NvsAuthorableScene } from "../NvsAuthorableScene";
import { NvsBackground } from "../Background";
import { NvsCameraControls } from "../NvsCameraControls";
import NvsSceneLights from "../Lighting";
import NVSScene3DAssets from "../Assets3D";
import { AuthorableProductProps } from "./types";
import { getLoaderComponent } from "../NvsLoaders/utils";
import NvsAuthorableProductProvider from "./AuthorableProductProvider";
import NvsEffectsSelector from "../Effects3D";

const AuthorableProduct: React.FC<AuthorableProductProps> = ({
  hdri,
  loaderType,
  background,
  cameraControls,
  lights,
  assets3d,
  effects,
  className,
  isAutoplayAndVisible = false,
}) => {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [isPinchZoom, setIsPinchZoom] = useState(false);
  const { active } = useProgress();
  const cameraControlsRef = useRef<CameraControls>(null);
  const { LoaderComponent } = getLoaderComponent(loaderType!);
  return (
    <NvsAuthorableProductProvider.Provider
      value={{
        isAutoplayAndVisible,
        isAnimationPlaying,
        setIsAnimationPlaying,
        isPinchZoom,
        setIsPinchZoom,
        cameraPos: cameraControls.transform3D?.position,
        cameraRot: cameraControls.transform3D?.rotation,
        cameraControlsRef,
      }}
    >
      <NvsAuthorableScene
        className={className}
        shadows
        flat={isAnimationPlaying}
      >
        {/* need to update this mock */}
        <NvsEffectsSelector effects={effects} enabled={!isAnimationPlaying} />
        {hdri?.url && <Environment files={hdri.url} />}
        {LoaderComponent ? <LoaderComponent isLoading={active} /> : <></>}
        <NvsCameraControls {...cameraControls}>
          <NvsSceneLights lights={lights} />
          <Suspense>
            <NvsBackground {...background} />
            <NVSScene3DAssets assets={assets3d} />
          </Suspense>
        </NvsCameraControls>
      </NvsAuthorableScene>
    </NvsAuthorableProductProvider.Provider>
  );
};

export default AuthorableProduct;
