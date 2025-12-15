"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import "./Hero.css";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 40,
    mass: 0.6,
  });

  // Match the nav's morph range
  const range: [number, number] = [0, 0.4];

  // Animate the whole logo block
  const heroScale = useTransform(progress, range, [1, 0.7]);
  const heroY = useTransform(progress, range, ["0%", "-12%"]);
  const heroOpacity = useTransform(progress, range, [1, 0.15]);

  // Optional: give the lips a tiny bit of extra motion so they feel alive
  const lipsScale = useTransform(progress, range, [1, 0.9]);
  const lipsY = useTransform(progress, range, ["0%", "-8%"]);

  return (
    // overflow-x-clip is important to ensure that on mobile it does not scroll horizontally
    <section className="relative flex flex-col overflow-x-clip">
      <div className="flex flex-col grow h-full w-full items-center">
        <motion.div
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
          className="relative flex  w-full justify-center scale-75 md:scale-100 lg:scale-125"
        >
          <Image
            src="/images/hero/living-kavita-loca-logo.png"
            alt="living kavita loca"
            width={650}
            height={650}
            className="object-contain max-w-full"
          />

          <motion.div
            style={{ scale: lipsScale, y: lipsY }}
            className="absolute top-1/2 translate-x-[45%] -translate-y-1/2 scale-50 lips"
          >
            <Image
              src="/images/hero/lips-glossy.png"
              alt="lips open that are glossy"
              className="lips relative z-10"
              height={600}
              width={600}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
