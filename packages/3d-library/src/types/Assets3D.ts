
import type { Events } from "@react-three/fiber";
import type { Vector3, Euler } from "@react-three/fiber";

export type Transform3D = {
  position?: Vector3;
  rotation?: Euler;
  scale?: Vector3;
};


export enum Asset3DAnimationType {
  KeyframeAnimation = "Keyframe",
  AssetAnimation = "ContentTypeAsset",
}

// We have to make our own version of the Three.AnimationActionLoopStyles
// because the weird way they are exported does not allow us to
// enumerate them like you can normally with an enum
export enum KeyframeAnimationAssetPlaybackActionType {
  LoopOnce = "LoopOnce",
  LoopRepeat = "LoopRepeat",
  LoopPingPong = "LoopPingPong",
}

type PlaybackAction = keyof typeof KeyframeAnimationAssetPlaybackActionType;

type AssetAnimationTypeKey = keyof typeof Asset3DAnimationType;

export type AssetAnimationTypeValue =
  typeof Asset3DAnimationType[AssetAnimationTypeKey];

// export type InteractionType3D = keyof Events | "autoplay";
export const InteractionPlaybackOptions3D = {
  autoplay: "autoplay",
} as const;

export type InteractionType3D =
  | typeof InteractionPlaybackOptions3D[keyof typeof InteractionPlaybackOptions3D]
  | keyof Events;

export type Animation3DInteractionType = {
  interactionType: InteractionType3D;
};

export type SceneAssetAnimation = {
  animation: AnimationType;
  name: string;
} & Animation3DInteractionType;

export type SceneAssetProps = Asset3D & {
  transform3D?: Transform3D;
  customMaterials?: string;
} & { animation?: SceneAssetAnimation };

export type Asset3D = {
  asset: Partial<Asset> & {
    url: string;
  };
};

export type KeyFrameAnimationType = {
  actionName: string;
  playbackAction: PlaybackAction;
};

export type VideoAnimationType = {
  asset: Partial<Asset> & {
    url: string;
  };
};

export type BaseAnimationWithAssetProps = Asset3D & {
  transform3D?: Transform3D;
  customMaterials?: string;
};

export type AnimationType = Partial<KeyFrameAnimationType> &
  Partial<VideoAnimationType> & {
    __typename: AssetAnimationTypeValue;
  };
