import { useFrame } from "@react-three/fiber";
import { TextureMaterial, VideoMaterial } from "./Material";
import { ShaderMaterial, Vector3, type Mesh } from "three";
import { useMemo, useRef } from "react";

export function positionOnCircle(count: number, index: number, radius: number) {
  const fullCircle360 = 2 * Math.PI;
  const angle = (fullCircle360 / count) * index;
  // x, y,z
  return new Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
}

export function CarouselItem({
  item,
  i,
  radius,
  itemsCount,
  onClick,
}: {
  item: any;
  i: number;
  radius: number;
  itemsCount: number;
  onClick: () => void;
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
      onClick={onClick}
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
