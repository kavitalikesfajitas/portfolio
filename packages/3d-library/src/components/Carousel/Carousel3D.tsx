import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useIsLaptopOrHigher } from "./utils";
import Carousel3DItems from "./Carousel3DItems";

import { useGesture } from "@use-gesture/react";
import { AxesHelper, NoToneMapping } from "three";
import CarouselContainer from "./CarouselContainer";

import { CarouselArrowNav } from "./CarouselArrows";
import type { CarouselProps } from "./types";
import { desktopCarouselAngle, mobileCarouselAngle } from "./constants";

const Carousel3D: React.FC<CarouselProps> = ({ items }) => {
  const isLaptop = useIsLaptopOrHigher();
  const selectedIndex = useRef<number>(0);
  const prevSelectedIndex = useRef<number>(0);
  const animateSelected = useRef<string>("false");
  const carousel3DitemsRef = useRef<any>(null);

  const handleSwipe = (e: any) => {
    if (!isLaptop && animateSelected.current == "false" && e == 1) {
      carousel3DitemsRef.current.slideLeft();
    }
    if (!isLaptop && animateSelected.current == "false" && e == -1) {
      carousel3DitemsRef.current.slideRight();
    }
  };

  const gestures = useGesture({
    onDrag: ({ swipe: [swipeX] }) => handleSwipe(swipeX),
  });

  if (!items) return null;
  return (
    <div className="display flex h-screen w-full flex-col justify-center overflow-hidden">
      <div className="flex-2 flex h-10 w-full text-white">hellos</div>
      <div className="flex w-fit flex-grow">
        <Canvas
          gl={{ toneMapping: NoToneMapping }}
          linear
          style={{ touchAction: "pan-y" }}
          {...gestures()}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 5]}
            fov={isLaptop ? 8 : 13}
            rotation={[0, 0, 0]}
          />
          <Suspense fallback={null}>
            <Carousel3DItems
              items={items}
              selectedIndex={selectedIndex}
              prevSelectedIndex={prevSelectedIndex}
              animateSelected={animateSelected}
              ref={carousel3DitemsRef}
            />
            <OrbitControls enablePan={true} maxDistance={5} minDistance={2} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Carousel3D;
