import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useIsLaptopOrHigher } from "./utils";
import Carousel3DItems from "./Carousel3DItems";

import { useGesture } from "@use-gesture/react";
import { NoToneMapping } from "three";
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
    <CarouselContainer
      className={{ thumbails: "relative" }}
      items={items}
      selectedIndex={selectedIndex}
      prevSelectedIndex={prevSelectedIndex}
      animateSelected={animateSelected}
    >
      <CarouselArrowNav
        onClickRightArrow={() => carousel3DitemsRef.current.slideRight()}
        onClickLeftArrow={() => carousel3DitemsRef.current.slideLeft()}
      />

      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        linear
        style={{ touchAction: "pan-y" }}
        {...gestures()}
      >
        <PerspectiveCamera
          makeDefault
          position={[5, 0, 0]}
          rotation={[
            0,
            Math.PI / 2,
            isLaptop ? desktopCarouselAngle : mobileCarouselAngle,
          ]}
          fov={isLaptop ? 8 : 13}
        />
        <Suspense fallback={null}>
          <Carousel3DItems
            items={items}
            selectedIndex={selectedIndex}
            prevSelectedIndex={prevSelectedIndex}
            animateSelected={animateSelected}
            ref={carousel3DitemsRef}
          />
        </Suspense>
      </Canvas>
    </CarouselContainer>
  );
};

export default Carousel3D;
