import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Lips({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <motion.div
      ref={ref}
      className="sticky top-0 z-50 flex h-20 items-center justify-center"
      style={{
        opacity: useTransform(scrollYProgress, [0.7, 1], [0.5, 1]),
      }}
    >
      <motion.img
        src="/lips.png"
        style={{
          scale: useTransform(scrollYProgress, [0.6, 1], [0.4, 0.25]),
          y: useTransform(scrollYProgress, [0.6, 1], ["-10vh", "0vh"]),
        }}
      />
    </motion.div>
  );
}
export function HeroLips({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-40vh"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "0vw"]); // adjust if sliding sideways

  return (
    <motion.img
      ref={ref}
      src={src}
      style={{
        scale,
        y,
        x,
        position: "relative",
        zIndex: 20,
      }}
    />
  );
}
