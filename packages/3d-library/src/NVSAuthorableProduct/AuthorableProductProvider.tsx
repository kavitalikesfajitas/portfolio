import { CameraControls } from "@react-three/drei";
import { Euler, Vector3 } from "@react-three/fiber";
import { Dispatch, SetStateAction, createContext } from "react";

type AutorableProductContextType = {
  isAutoplayAndVisible: boolean;
  isAnimationPlaying: boolean;
  setIsAnimationPlaying: Dispatch<SetStateAction<boolean>> | null;
  isPinchZoom: boolean;
  setIsPinchZoom: Dispatch<SetStateAction<boolean>> | null;
  cameraPos: Vector3 | undefined | null;
  cameraRot: Euler | undefined | null;
  cameraControlsRef: React.RefObject<CameraControls> | null;
};

const NvsAuthorableProductContext = createContext<AutorableProductContextType>({
  isAutoplayAndVisible: false,
  isAnimationPlaying: false,
  setIsAnimationPlaying: null,
  isPinchZoom: false,
  setIsPinchZoom: null,
  cameraPos: null,
  cameraRot: null,
  cameraControlsRef: null,
});

export default NvsAuthorableProductContext;
