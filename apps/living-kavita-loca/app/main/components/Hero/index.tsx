"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import "./Hero.css";
import { forwardRef, useState } from "react";
import LivingKavitaLocaLogo from "@/public/images/hero/living-kavita-loca-logo.png";
import LipsGlossy from "@/public/images/hero/lips-glossy.png";

export const Hero = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((_props, ref) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [lipsLoaded, setLipsLoaded] = useState(false);
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
  const heroLoaded = logoLoaded && lipsLoaded;

  return (
    <div className="flex flex-col grow h-full w-full items-center">
      <motion.div
        ref={ref}
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        className="relative flex w-full justify-center scale-75 md:scale-100 lg:scale-125"
      >
        <Image
          src={LivingKavitaLocaLogo}
          alt="living kavita loca"
          width={650}
          height={650}
          priority
          className={`object-contain max-w-full transition-all duration-700 ease-out ${
            logoLoaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-[0.985] blur-sm"
          }`}
          onLoad={() => setLogoLoaded(true)}
        />

        <motion.div
          style={{ scale: lipsScale, y: lipsY }}
          className="absolute top-1/2 z-10 translate-x-[45%] -translate-y-1/2 scale-50 lips"
        >
          <Image
            src={LipsGlossy}
            alt="lips open that are glossy"
            className={`lips relative z-10 transition-all duration-700 ease-out ${
              lipsLoaded
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-[0.97] blur-sm"
            }`}
            height={600}
            width={600}
            priority
            onLoad={() => setLipsLoaded(true)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
});

Hero.displayName = "Hero";
