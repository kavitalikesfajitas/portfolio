import { NvsBackgroundProps } from "../Background/types";
import { NvsCameraControlsProps } from "../NvsCameraControls/types";
import { SceneLightProps } from "../Lighting/types";
import { SceneAssetProps } from "../Assets3D/types";
import { NvsLoadersTypes } from "../NvsLoaders/types";
import { Asset } from "nvs-types/dist/types/generated/contentful";
import { EffectsMappingProps } from "../Effects3D/types";

export type AuthorableProductProps = {
  hdri?: HDRI;
  loaderType?: NvsLoadersTypes;
  background: NvsBackgroundProps;
  cameraControls: NvsCameraControlsProps;
  lights: SceneLightProps[] | undefined;
  assets3d: SceneAssetProps[] | undefined;
  effects?: EffectsMappingProps;
  className?: string;
  isAutoplayAndVisible?: boolean;
};

export type HDRI = Partial<Asset> & {
  url?: string;
  title?: string;
  description?: string;
};
