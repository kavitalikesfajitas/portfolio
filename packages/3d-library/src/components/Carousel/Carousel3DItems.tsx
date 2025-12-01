import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useIsLaptopOrHigher } from "@/libs/utils";
import { WaveShaderMaterial } from "./waveShaderMaterial";
import {
  desktopCarouselAngle,
  mobileCarouselAngle,
  desktopRadius,
  mobileRadius,
  desktopPosterSize,
} from "./constants";
import { useTexture } from "@react-three/drei";
import { Vector3, Euler } from "three";
import { Carousel3DItemsType } from "./types";
import { useCarouselContext } from "./provider";

extend({ WaveShaderMaterial });

const Carousel3DItems = forwardRef((props: Carousel3DItemsType, ref) => {
  const meshRefList = props.items.map(() => createRef());
  const shaderRefList = props.items.map(() => createRef());

  // animation calculations
  const frameCount = useRef<number>(0);
  const animationFrameCount = useRef<number>(0);
  const prevAnimationFrameCount = useRef<number>(0);
  const totalAnimationFrames = useRef<number>(0);

  // rotate to selected poster
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
  useFrame(() => {
    const easedMovement = easeOutCubic(
      animationFrameCount.current / totalAnimationFrames.current,
    );
    const easedMovementofTAFC = easedMovement * totalAnimationFrames.current;
    const movement = prevAnimationFrameCount.current + easedMovementofTAFC;
    const backwardsMovement =
      prevAnimationFrameCount.current - easedMovementofTAFC;

    const selectedPosterPositionRefX =
      meshRefList[props.selectedIndex.current].current.position.x;
    const selectedPosterPositionRefZ =
      meshRefList[props.selectedIndex.current].current.position.z;
    const frontCondition =
      selectedPosterPositionRefX.toFixed(5) == frontPosition.x.toFixed(5) &&
      selectedPosterPositionRefZ.toFixed(5) == frontPosition.z.toFixed(5);

    // triggering the animation from thumbnail component
    if (props.animateSelected.current == "true") {
      if (props.selectedIndex.current == rotatedItemPositions.current[1]) {
        props.animateSelected.current = "false";
        slideRight();
      } else if (
        props.selectedIndex.current ==
        rotatedItemPositions.current[rotatedItemPositions.current.length - 1]
      ) {
        props.animateSelected.current = "false";
        slideLeft();
      }

      if (props.animateSelected.current == "true") {
        const prevIndexOfSelected = rotatedItemPositions.current.indexOf(
          props.selectedIndex.current,
        );
        arrayRotate(rotatedItemPositions.current, prevIndexOfSelected);
        totalAnimationFrames.current = prevIndexOfSelected * degreeSeperation;
        props.animateSelected.current = "started";
        if (!animateSelected) setAnimateSelected(true);
      }
    }

    if (animateSelected) {
      frameCount.current++;
      if (frameCount.current > 360) {
        frameCount.current = 0;
      }
      // prevents animationFrameCount to pass totalAnimationFrames
      if (animationFrameCount.current < totalAnimationFrames.current) {
        animationFrameCount.current++;
      }

      meshRefList.map(
        (mesh: { current: { position: Vector3 } }, i: string | number) => {
          if (mesh.current) {
            const meshPosition = mesh.current.position;
            meshPosition.x =
              radius *
              Math.cos(
                ((startingPositionDegrees[i] + movement) * Math.PI) / 180,
              );
            meshPosition.z =
              radius *
              Math.sin(
                ((startingPositionDegrees[i] + movement) * Math.PI) / 180,
              );
          }
        },
      );

      const frameCountStop =
        totalAnimationFrames.current + prevAnimationFrameCount.current;
      const frameCountStopCondition =
        frameCount.current > frameCountStop ||
        (frameCount.current == 91 && frameCountStop == 450) ||
        (frameCount.current == 0 && frameCountStop == 360);

      if (frontCondition || frameCountStopCondition) {
        prevAnimationFrameCount.current =
          Math.round(frameCount.current / 10) * 10;
        animationFrameCount.current = 0;
        if (props.animateSelected.current != "false")
          props.animateSelected.current = "false";
        if (animateSelected) setAnimateSelected(false);
      }
    } else if (animateLeft) {
      frameCount.current--;
      if (frameCount.current < 0) {
        frameCount.current = 360;
      }
      // prevents animationFrameCount to pass totalAnimationFrames
      if (animationFrameCount.current < totalAnimationFrames.current) {
        animationFrameCount.current++;
      }

      meshRefList.map(
        (mesh: { current: { position: Vector3 } }, i: string | number) => {
          if (mesh.current) {
            const meshPosition = mesh.current.position;
            meshPosition.x =
              radius *
              Math.cos(
                ((startingPositionDegrees[i] + backwardsMovement) * Math.PI) /
                  180,
              );
            meshPosition.z =
              radius *
              Math.sin(
                ((startingPositionDegrees[i] + backwardsMovement) * Math.PI) /
                  180,
              );
          }
        },
      );

      // when in desktop we have to check mobile starting positions
      if (
        isLaptop
          ? normalPositions.includes(frameCount.current - 1)
          : startingPositionDegrees.includes(frameCount.current - 1) ||
            startingPositionDegrees.includes((frameCount.current - 1) * -1)
      ) {
        prevAnimationFrameCount.current =
          Math.round(frameCount.current / 10) * 10;
        animationFrameCount.current = 0;
        if (props.animateSelected.current != "false")
          props.animateSelected.current = "false";
        setAnimateLeft(false);
      }
    } else if (animateRight) {
      frameCount.current++;
      if (frameCount.current > 360) {
        frameCount.current = 0;
      }
      // prevents animationFrameCount to pass totalAnimationFrames
      if (animationFrameCount.current < totalAnimationFrames.current) {
        animationFrameCount.current++;
      }

      meshRefList.map(
        (mesh: { current: { position: Vector3 } }, i: string | number) => {
          if (mesh.current) {
            const meshPosition = mesh.current.position;
            meshPosition.x =
              radius *
              Math.cos(
                ((startingPositionDegrees[i] + movement) * Math.PI) / 180,
              );
            meshPosition.z =
              radius *
              Math.sin(
                ((startingPositionDegrees[i] + movement) * Math.PI) / 180,
              );
          }
        },
      );

      // when in desktop we have to check mobile starting positions
      if (
        isLaptop
          ? normalPositions.includes(frameCount.current)
          : startingPositionDegrees.includes(frameCount.current) ||
            startingPositionDegrees.includes(frameCount.current * -1)
      ) {
        prevAnimationFrameCount.current =
          Math.round(frameCount.current / 10) * 10;
        animationFrameCount.current = 0;
        if (props.animateSelected.current != "false")
          props.animateSelected.current = "false";
        setAnimateRight(false);
      }
    }
  });

  const carouselAngle = isLaptop ? desktopCarouselAngle : mobileCarouselAngle;
  const radius = isLaptop ? desktopRadius : mobileRadius;
  const degreeSeperation = 360 / props.items.length;

  const normalPositions = props.items.map(
    (item: any, index: number) =>
      degreeSeperation * (index + 1) - degreeSeperation,
  );
  const startingPositionDegrees = props.items.map(
    (item: any, index: number) => {
      let pos = degreeSeperation * (index + 1) - degreeSeperation;
      isLaptop ? (pos += 10) : null;
      if (index % 2) pos *= -1;
      return pos;
    },
  );

  const textureList: string[] = props.items.map(
    (x: { itemTexture: any }) => x.itemTexture,
  );

  const frontPosition = new Vector3(
    radius * Math.cos((startingPositionDegrees[0] * Math.PI) / 180),
    0,
    radius * Math.sin((startingPositionDegrees[0] * Math.PI) / 180),
  );

  function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  const rotation = (option: number | undefined) => {
    return new Euler(0, Math.PI / 2, option, "XYZ");
  };

  const arrayRotate = (arr: any, count: number) => {
    const len = arr.length;
    const newArr = arr;
    newArr.push(...newArr.splice(0, ((count % len) + len) % len));
    return newArr;
  };

  const slideTo = (index: number) => {
    if (
      index == props.selectedIndex.current ||
      animateLeft ||
      animateRight ||
      animateSelected
    )
      return null;

    if (
      index ==
      rotatedItemPositions.current[rotatedItemPositions.current.length - 1]
    ) {
      slideLeft();
      return null;
    } else if (index == rotatedItemPositions.current[1]) {
      slideRight();
      return null;
    }

    // set animate to started
    props.animateSelected.current = "started";

    // update selected & previousSelected poster position
    props.prevSelectedIndex.current = props.selectedIndex.current;
    props.selectedIndex.current = index;

    // sets selected for thumbnail
    carouselContext?.setSelectedIndex(index);

    // rotate rotatedItemPositions ref and set animFrames
    const prevIndexOfSelected = rotatedItemPositions.current.indexOf(
      props.selectedIndex.current,
    );

    arrayRotate(rotatedItemPositions.current, prevIndexOfSelected);

    totalAnimationFrames.current = prevIndexOfSelected * degreeSeperation;

    // start select animation
    if (!animateSelected) setAnimateSelected(true);
  };

  const slideLeft = () => {
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
    if (!animateLeft || !animateRight || !animateSelected) setAnimateLeft(true);
  };

  const slideRight = () => {
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
  };

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

  // list of supported geomtries for the carousel
  const GeometryList = (props: { option: any }) => {
    switch (props.option) {
      case "plane":
        return <planeGeometry args={desktopPosterSize} />;
      default:
        return <></>;
    }
  };

  // list of supported materials for the carousel
  const MaterialList = (props: { option: any; i: number }) => {
    const posterTextures = useTexture(textureList);

    switch (props.option.type) {
      case "wavy":
        return (
          <>
            {/* ShaderMaterial from R3F/drei doesn't work well with TS */}
            {/* @ts-ignore */}
            <waveShaderMaterial
              ref={shaderRefList[props.i]}
              uTexture={posterTextures[props.i]}
              uFactor={props.option.params.noiseFactor}
              uNoiseFrequency={props.option.params.noiseFreq}
              uNoiseAmplitude={props.option.params.noiseAmp}
            />
          </>
        );
      default:
        return <></>;
    }
  };

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
            rotation={rotation(carouselAngle)}
            ref={meshRefList[i]}
            onClick={() => slideTo(i)}
            key={i}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <GeometryList option={item.itemGeometry} />
            <MaterialList option={item.itemMaterial} i={i} />
          </mesh>
        );
      })}
    </group>
  );
});

Carousel3DItems.displayName = "Carousel3DItems";

export default Carousel3DItems;
