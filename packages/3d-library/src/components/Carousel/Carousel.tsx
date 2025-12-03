import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useIsLaptopOrHigher } from "./utils";
import Carousel3DItems from "./Carousel3DItems";
import { NoToneMapping } from "three";
import type { CarouselProps } from "./types";
import { noop } from "lodash";

const Carousel3D: React.FC<CarouselProps> = ({ items }) => {
  const isLaptop = useIsLaptopOrHigher();
  const selectedIndex = useRef<number>(0);
  const prevSelectedIndex = useRef<number>(0);
  const animateSelected = useRef<string>("false");
  const carousel3DitemsRef = useRef<any>(null);

  // const gestures = useGesture({
  //   onDrag: ({ swipe: [swipeX] }) => handleSwipe(swipeX),
  // });

  if (!items) return null;
  return (
    <div className="display flex h-screen w-full flex-col justify-center overflow-hidden">
      <div className="flex-2 w flex h-fit w-full flex-col items-center text-white">
        buttons here!
        <div className="flex flex-row justify-between gap-4">
          <button onClick={noop}>Rotate Left</button>
          <button onClick={noop}>Rotate Right</button>
        </div>
      </div>
      <div className="flex w-fit flex-grow">
        <Canvas
          gl={{ toneMapping: NoToneMapping }}
          linear
          style={{ touchAction: "pan-y" }}
          // {...gestures()}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 5]}
            fov={isLaptop ? 20 : 20}
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
