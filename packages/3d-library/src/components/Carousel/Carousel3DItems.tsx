import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  arrayRotate,
  easeOutCubic,
  rotation,
  useIsLaptopOrHigher,
} from "./utils";
import { WaveShaderMaterial } from "./waveShaderMaterial";
import {
  desktopCarouselAngle,
  mobileCarouselAngle,
  desktopRadius,
  mobileRadius,
  desktopPosterSize,
} from "./constants";
import { AxesHelper, DoubleSide } from "three";
import { Vector3, type Mesh, type ShaderMaterial } from "three";
import type { Carousel3DItemsType } from "./types";

import { TextureMaterial, VideoMaterial } from "./Material";

extend({ WaveShaderMaterial, AxesHelper });

const Carousel3DItems = forwardRef((props: Carousel3DItemsType, ref) => {
  const axesHelper = new AxesHelper(10);
  useThree((state) => state.scene.add(axesHelper));

  const isLaptop = useIsLaptopOrHigher();

  // movement animations

  const carouselAngle = isLaptop ? desktopCarouselAngle : mobileCarouselAngle;
  const radius = isLaptop ? desktopRadius : mobileRadius;

  return (
    <group>
      {props.items.map((item: any, i: number) => (
        <CarouselItem
          key={i}
          item={item}
          i={i}
          radius={radius}
          itemsCount={props.items.length}
        />
      ))}
    </group>
  );
});

function CarouselItem({
  item,
  i,
  radius,
  itemsCount,
}: {
  item: any;
  i: number;
  radius: number;
  itemsCount: number;
}) {
  const position = useMemo(() => {
    return positionOnCircle(itemsCount, i, radius);
  }, [itemsCount, radius, i]);

  const angle = ((2 * Math.PI) / itemsCount) * i;
  const meshRef = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      // @ts-expect-error: ShaderMaterial from R3F/drei doesn't work well with TS
      shaderRef.current.uTime = clock.getElapsedTime() + i * 0.5;
    }
  });

  return (
    <mesh
      position={position}
      rotation-y={angle}
      ref={meshRef}
      key={i}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <planeGeometry args={[0.3, 0.3, 16, 16]} />
      {item?.video && item?.itemVideo && (
        <VideoMaterial
          video={item.itemVideo}
          option={item.itemMaterial}
          ref={shaderRef}
        />
      )}
      {item?.itemTexture && (
        <TextureMaterial
          itemTexture={item.itemTexture}
          option={item.itemMaterial}
          ref={shaderRef}
        />
      )}
    </mesh>
  );
}

function positionOnCircle(count: number, index: number, radius: number) {
  const fullCircle360 = 2 * Math.PI;
  const angle = (fullCircle360 / count) * index;
  // x, y,z
  return new Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
}

Carousel3DItems.displayName = "Carousel3DItems";

export default Carousel3DItems;
