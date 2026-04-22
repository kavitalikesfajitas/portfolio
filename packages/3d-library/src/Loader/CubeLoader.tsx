import { useEffect } from "react";
import { useAnimationControls, type Variants } from "framer-motion";
import { motion } from "framer-motion-3d";
import { DoubleSide, MeshBasicMaterial } from "three";

const colorFaceMaterials = [
  new MeshBasicMaterial({ color: 0x07f468, side: DoubleSide }),
  new MeshBasicMaterial({ color: "white", side: DoubleSide }),
  new MeshBasicMaterial({ color: "black", side: DoubleSide }),
  new MeshBasicMaterial({ color: "black", side: DoubleSide }),
  new MeshBasicMaterial({ color: "white", side: DoubleSide }),
  new MeshBasicMaterial({ color: 0x07f468, side: DoubleSide }),
  new MeshBasicMaterial({ color: "black", side: DoubleSide }),
];

const loaderAnimationVariants = {
  init: {
    rotateY: 0,
    rotateX: 0,
  },
  right: {
    rotateY: -Math.PI / 2,
  },
  up: {
    rotateX: -Math.PI / 2,
  },
} as Variants;

export function CubeLoader() {
  const animControls = useAnimationControls();

  async function animate() {
    await animControls.start("right");
    await animControls.start("up");
    await animControls.start("init");

    // Repeat the same animation over and over
    void animate();
  }

  // Trigger the animation on mount
  useEffect(() => void animate(), []);

  return (
    <motion.mesh
      scale={0.3}
      variants={loaderAnimationVariants as Variants}
      animate={animControls}
      transition={{
        duration: 0.5,
        delay: 0.25,
        ease: "easeInOut",
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      {colorFaceMaterials.map((material, idx) => (
        <primitive key={idx} object={material} attach={`material-${idx}`} />
      ))}
    </motion.mesh>
  );
}
