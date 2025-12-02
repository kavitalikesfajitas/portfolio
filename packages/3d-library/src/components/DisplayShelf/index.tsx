// components/DisplayShelf.tsx
import * as THREE from "three";
import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

type DisplayShelfProps = ThreeElements["group"] & {
  shelfCount?: number;
  width?: number;
  height?: number;
  depth?: number;
  tiltDeg?: number;
  color?: string;
  texture: string;
};

export function DisplayShelf({
  shelfCount = 3,
  width = 1.2, // overall shelf width
  height = 1.8, // overall shelf height
  depth = 0.28, // overall shelf depth
  tiltDeg = 20, // magazine-rack angle
  color = "#f7f7fb",
  texture,
  ...groupProps
}: DisplayShelfProps) {
  const thickness = 0.03;
  const backThickness = 0.01;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // Evenly distribute shelves vertically
  const shelfPositions = useMemo(() => {
    const top = height * 0.8;
    const bottom = height * 0.25;
    const step = (top - bottom) / Math.max(shelfCount - 1, 1);
    return new Array(shelfCount).fill(0).map((_, i) => bottom + step * i);
  }, [height, shelfCount]);

  const woodTex = useTexture(texture);
  // Make it tile instead of stretching
  woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
  woodTex.repeat.set(3, 3); // tweak to taste
  woodTex.colorSpace = THREE.SRGBColorSpace;

  const shelfMaterial = (
    <meshStandardMaterial map={woodTex} roughness={0.6} metalness={0.05} />
  );

  return (
    <group {...groupProps}>
      {/* Back panel */}
      <mesh position={[0, height / 2, -depth / 2 + backThickness / 2]}>
        <boxGeometry args={[width, height, backThickness]} />
        {shelfMaterial}
      </mesh>

      {/* Side panels */}
      <mesh position={[-width / 2 + thickness / 2, height / 2, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        {shelfMaterial}
      </mesh>

      <mesh position={[width / 2 - thickness / 2, height / 2, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        {shelfMaterial}
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, thickness / 2, 0]}>
        <boxGeometry args={[width - thickness * 2, thickness, depth]} />
        {shelfMaterial}
      </mesh>

      {/* Shelves (magazine-rack style: back higher, front lower) */}
      {shelfPositions.map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          {/* Rotated group so shelf + lip lean together */}
          <group rotation={[tiltRad, 0, 0]}>
            {/* Main shelf plank */}
            <mesh>
              <boxGeometry
                args={[
                  width - thickness * 2,
                  thickness,
                  depth * 0.9, // shelf depth
                ]}
              />
              {shelfMaterial}
            </mesh>
            {/* {idx === 0 && <RealisticBook />} */}
            {/* BIGGER LIP – backing plate */}
            <mesh
              position={[
                0,
                -thickness, // a bit below the plank
                (depth * 0.9) / 2 - thickness * 0.1, // just under front edge
              ]}
            >
              <boxGeometry
                args={[
                  width - thickness * 2, // across shelf
                  thickness * 1.2, // lip height
                  thickness * 0.7, // lip depth
                ]}
              />
              {shelfMaterial}
            </mesh>

            {/* BIGGER ROUNDED FRONT BAR */}
            <mesh
              position={[
                0,
                -thickness * 0.7, // roughly mid-height of plate
                (depth * 0.9) / 2 + thickness * 0.35, // a bit in front
              ]}
              rotation={[0, 0, Math.PI / 2]} // 🔑 rotate so cylinder runs along X
            >
              <cylinderGeometry
                args={[
                  thickness * 0.8, // radiusTop
                  thickness * 0.8, // radiusBottom
                  width - thickness * 2, // length across shelf (X axis)
                  24, // segments (smoothness)
                ]}
              />
              {shelfMaterial}
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}
