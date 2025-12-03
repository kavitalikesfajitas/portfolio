import React, { forwardRef, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useIsLaptopOrHigher } from "./utils";
import { WaveShaderMaterial } from "./waveShaderMaterial";
import {
  desktopCarouselAngle,
  mobileCarouselAngle,
  desktopRadius,
  mobileRadius,
} from "./constants";
import { AxesHelper, type Group, Vector3 } from "three";
import type { Carousel3DItemsType } from "./types";
import { noop } from "lodash";
import { CarouselItem } from "./CarouselItem";
import { useMotion } from "@react-three/drei";
import { animate, useMotionValue } from "motion/react";

extend({ WaveShaderMaterial, AxesHelper });

const Carousel3DItems = forwardRef((props: Carousel3DItemsType, ref) => {
  const axesHelper = new AxesHelper(10);

  const groupRef = useRef<Group>(null);
  const rotationY = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Subscribe to motionValue and update Three.js object directly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY.get();
    }
  });
  useThree((state) => state.scene.add(axesHelper));

  const isLaptop = useIsLaptopOrHigher();
  const itemsCount = props.items.length;
  // movement animations

  const carouselAngle = isLaptop ? desktopCarouselAngle : mobileCarouselAngle;
  const radius = isLaptop ? desktopRadius : mobileRadius;

  const handleClick = (index: number) => {
    const nextIndex = (currentIndex + 1) % itemsCount;
    const angle = ((2 * Math.PI) / itemsCount) * nextIndex;
    console.log({ currentIndex, nextIndex, angle });
    setCurrentIndex(nextIndex);

    animate(rotationY, angle);
  };

  return (
    <group rotation-y={rotationY.get() as number} ref={groupRef}>
      {props.items.map((item: any, i: number) => {
        return (
          <CarouselItem
            key={i}
            item={item}
            onClick={() => handleClick(i)}
            i={i}
            radius={radius}
            itemsCount={props.items.length}
          />
        );
      })}
    </group>
  );
});

Carousel3DItems.displayName = "Carousel3DItems";

export default Carousel3DItems;
