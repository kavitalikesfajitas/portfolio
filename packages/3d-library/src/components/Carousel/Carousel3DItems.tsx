import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
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
} from "./constants";
import { AxesHelper } from "three";
import { Geometry } from "./Geometry";
import { Vector3, type Mesh, type ShaderMaterial } from "three";
import type { Carousel3DItemsType } from "./types";
import { useCarouselContext } from "./provider";
import { Material } from "./Material";

extend({ WaveShaderMaterial, AxesHelper });

const Carousel3DItems = forwardRef((props: Carousel3DItemsType, ref) => {
  // create refs for the meshes and shader materials
  const meshRefList = props.items.map(() => createRef<Mesh>());
  const shaderRefList = props.items.map(() => createRef<ShaderMaterial>());
  const axesHelper = new AxesHelper(10);
  useThree((state) => state.scene.add(axesHelper));

  // animation calculations
  const frameCount = useRef<number>(0);
  const animationFrameCount = useRef<number>(0);
  const prevAnimationFrameCount = useRef<number>(0);
  const totalAnimationFrames = useRef<number>(0);

  // rotate to selected item
  const [animateSelected, setAnimateSelected] = useState(false);
  // rotate once to left
  const [animateLeft, setAnimateLeft] = useState(false);
  // rotate once to right
  const [animateRight, setAnimateRight] = useState(false);
  // keeping track of items by array rotation
  const rotatedItemPositions = useRef<number[]>([]);

  const isLaptop = useIsLaptopOrHigher();
  const carouselContext = useCarouselContext();

  useEffect(() => {
    rotatedItemPositions.current = Array.from(props.items, (x) =>
      props.items.indexOf(x),
    );
  }, [props.items]);

  // shader animations
  useFrame(({ clock }) => {
    const baseOpacityLevel = 0.5;
    shaderRefList.map(
      (ref: { current: { uTime: number; uOpacity: number } }, i: number) => {
        if (ref.current) {
          ref.current.uTime = clock.getElapsedTime() + i * 0.5;
        }
        if (meshRefList[i].current?.position?.x <= 0 && ref.current) {
          ref.current.uOpacity = baseOpacityLevel;
        } else {
          ref.current
            ? (ref.current.uOpacity =
                (meshRefList[i].current?.position?.x / radius) *
                  baseOpacityLevel +
                baseOpacityLevel)
            : null;
        }
      },
    );
  });

  // movement animations

  const carouselAngle = isLaptop ? desktopCarouselAngle : mobileCarouselAngle;
  const radius = isLaptop ? desktopRadius : mobileRadius;
  const degreeSeperation = 360 / props.items.length;

  const startingPositionDegrees = props.items.map(
    (item: any, index: number) => {
      let pos = degreeSeperation * (index + 1) - degreeSeperation;
      isLaptop ? (pos += 10) : null;
      if (index % 2) pos *= -1;
      return pos;
    },
  );

  useImperativeHandle(ref, () => ({
    slideLeft() {
      if (
        animateLeft ||
        animateRight ||
        animateSelected ||
        props.animateSelected.current != "false"
      )
        return null;
      // set animate to left
      props.animateSelected.current = "left";
      // get poster to left of selected
      const indexOfLeft = rotatedItemPositions.current.length - 1;

      // update selected & previousSelected poster
      props.prevSelectedIndex.current = props.selectedIndex.current;
      props.selectedIndex.current = rotatedItemPositions.current[indexOfLeft];

      // sets selected for thumbnail
      carouselContext?.setSelectedIndex(props.selectedIndex.current);

      // rotate itemRotationArray ref and set animFrames
      arrayRotate(rotatedItemPositions.current, indexOfLeft);
      totalAnimationFrames.current = degreeSeperation;

      // start animate left animation
      if (!animateLeft || !animateRight || !animateSelected)
        setAnimateLeft(true);
    },
    slideRight() {
      if (
        animateLeft ||
        animateRight ||
        animateSelected ||
        props.animateSelected.current != "false"
      )
        return null;
      // set animate to right
      props.animateSelected.current = "right";

      // get poster to right of selected
      const indexOfRight = 1;

      // update selected & previousSelected poster
      props.prevSelectedIndex.current = props.selectedIndex.current;
      props.selectedIndex.current = rotatedItemPositions.current[indexOfRight];

      // sets selected for thumbnail
      carouselContext?.setSelectedIndex(props.selectedIndex.current);

      // rotate itemRotationArray ref and set animFrames
      arrayRotate(rotatedItemPositions.current, indexOfRight);
      totalAnimationFrames.current = degreeSeperation;

      // start animate right animation
      if (!animateLeft || !animateRight || !animateSelected)
        setAnimateRight(true);
    },
  }));

  return (
    <group>
      {props.items.map((item: any, i: any) => {
        return (
          <mesh
            position={[
              radius * Math.cos((startingPositionDegrees[i] * Math.PI) / 180),
              0,
              radius * Math.sin((startingPositionDegrees[i] * Math.PI) / 180),
            ]}
            rotation={rotation(0, 0, 0)}
            ref={meshRefList[i]}
            // onClick={() => slideTo(i)}
            key={i}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <Geometry option={item.itemGeometry} />
            <Material
              option={item.itemMaterial}
              i={i}
              itemVideo={item.itemVideo}
              video={item.video}
              itemTexture={item.itemTexture}
              ref={shaderRefList[i]}
            />
          </mesh>
        );
      })}
    </group>
  );
});

Carousel3DItems.displayName = "Carousel3DItems";

export default Carousel3DItems;
