import {
  CameraControlsProps,
  OrbitControlsProps,
  PresentationControlProps,
} from "@react-three/drei";

/**
 * Default props for OrbitControls
 * @see https://github.com/nike-nvs/nvs-code/blob/main/web/src/routes/join/routes/onboarding/routes/card/components/CameraControls.tsx#L37-L50
 */
export const defaultOrbitProps: OrbitControlsProps = {
  enableZoom: true,
  maxZoom: 125,
  enableDamping: true,
  dampingFactor: 0.1,
  rotateSpeed: 0.5,
  zoomSpeed: 1,
  enablePan: false,
  enableRotate: true,
  maxPolarAngle: Math.PI * 0.75,
  minPolarAngle: Math.PI * 0.25,
  minDistance: 1,
  maxDistance: 100,
};

export const defaultRotateProps: OrbitControlsProps = {
  ...defaultOrbitProps,
  maxPolarAngle: Math.PI / 2,
  minPolarAngle: Math.PI / 2,
};

/**
 * Default props for PresentationControls
 * @see https://github.com/nike-nvs/nvs-code/blob/main/web/src/routes/collections/routes/%5BcollectionName%5D/routes/products/routes/%5BproductName%5D/routes/tokens/routes/%5BtokenId%5D/components/af01-shoes/AF01Shoe/AF01ShoeInteractiveContent.tsx#L157-L162
 */
export const defaultPresentationProps: PresentationControlProps = {
  config: { mass: 1, tension: 300, friction: 20 },
  snap: true,
  speed: 2,
  polar: [(-Math.PI * 3) / 4, (Math.PI * 3) / 4],
  azimuth: [-Math.PI, Math.PI],
};

export const defaultPinchZoomProps: CameraControlsProps = {
  maxZoom: 125,
  smoothTime: 0.1,
  minDistance: 1,
  maxDistance: 100,
};
