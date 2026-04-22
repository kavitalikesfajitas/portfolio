import { NvsControlsTypes, NvsControlsValue, ControlsProps } from "./types";
import {
  CameraControls,
  OrbitControls,
  OrbitControlsProps,
  PresentationControlProps,
  PresentationControls,
} from "@react-three/drei";
import {
  defaultOrbitProps,
  defaultRotateProps,
  defaultPresentationProps,
  defaultPinchZoomProps,
} from "./constants";
import get from "lodash/get";
import {
  useIsAnimationPlaying,
  useCameraControlsRef,
  useIsPinchtoZoom,
} from "../../hooks";

type ControlsJSXElement = (
  props: ControlsProps<OrbitControlsProps | PresentationControlProps | null>,
) => JSX.Element;

const DefaultOrbit = ({
  props,
  children,
}: ControlsProps<OrbitControlsProps>) => (
  <>
    <OrbitControls
      makeDefault
      onEnd={(e) => props?.onEnd?.({ target: e, type: "controlend" })}
      {...props}
    />
    {children}
  </>
);

const DefaultPinchZoom = ({
  props,
  children,
}: ControlsProps<OrbitControlsProps>) => {
  const { setIsPinchZoom } = useIsPinchtoZoom();
  const { isAnimationPlaying } = useIsAnimationPlaying();
  const cameraControlsRef = useCameraControlsRef();
  setIsPinchZoom && setIsPinchZoom(true);
  return (
    <>
      <CameraControls
        makeDefault
        ref={cameraControlsRef}
        enabled={!isAnimationPlaying}
        onEnd={(e) => props?.onEnd?.({ target: e, type: "controlend" })}
        {...defaultPinchZoomProps}
      />
      {children}
    </>
  );
};

export const ControlsMap = {
  [NvsControlsTypes.Orbit]: ({
    props,
    children,
  }: ControlsProps<OrbitControlsProps>) => (
    <DefaultOrbit props={props}>{children}</DefaultOrbit>
  ),
  [NvsControlsTypes.Rotate]: ({
    props,
    children,
  }: ControlsProps<OrbitControlsProps>) => (
    <DefaultOrbit props={props}>{children}</DefaultOrbit>
  ),
  [NvsControlsTypes.Presentation]: ({
    props,
    children,
  }: ControlsProps<PresentationControlProps>) => (
    <PresentationControls {...props}>{children}</PresentationControls>
  ),
  [NvsControlsTypes.PinchZoom]: ({
    children,
  }: ControlsProps<OrbitControlsProps>) => (
    <DefaultPinchZoom>{children}</DefaultPinchZoom>
  ),
};

export const ControlsDefaultPropMap = {
  [NvsControlsTypes.Orbit]: defaultOrbitProps,
  [NvsControlsTypes.Rotate]: defaultRotateProps,
  [NvsControlsTypes.Presentation]: defaultPresentationProps,
};

export const getControlsFromType = (controlsType: NvsControlsValue) => {
  return {
    Controls: get(ControlsMap, controlsType) as ControlsJSXElement | null,
    defaultProps: get(ControlsDefaultPropMap, controlsType),
  };
};
