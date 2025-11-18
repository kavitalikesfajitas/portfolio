"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  // Match the nav’s morph range
  const range: [number, number] = [0, 0.2];

  // Animate the whole logo block
  const heroScale = useTransform(progress, range, [1, 0.7]);
  const heroY = useTransform(progress, range, ["0%", "-12%"]);
  const heroOpacity = useTransform(progress, range, [1, 0]);

  // Optional: give the lips a tiny bit of extra motion so they feel alive
  const lipsScale = useTransform(progress, range, [1, 0.9]);
  const lipsY = useTransform(progress, range, ["0%", "-8%"]);

  return (
    <section className="relative flex min-h-screen flex-col lg:items-center lg:justify-items-start">
      <motion.div
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        className="relative inline-block scale-[0.6] md:scale-[0.5] lg:scale-75 lg:-mt-24"
      >
        <Image
          src="/images/living-kavita-loca-logo.png"
          alt="living kavita loca"
          height={1024}
          width={1024}
          className="flex self-center"
        />

        <motion.div
          style={{ scale: lipsScale, y: lipsY }}
          className="absolute -right-20 top-1/2 scale-50 -translate-y-1/2 translate-x-[37.5%]"
        >
          <Image
            src="/images/lips-glossy.png"
            alt="lips open that are glossy"
            className="lips relative z-10"
            height={1024}
            width={1024}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
