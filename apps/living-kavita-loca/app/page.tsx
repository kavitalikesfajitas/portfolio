"use client";
import { NavForMain } from "@/app/main/components/NavForMain";
import { Hero } from "@/app/main/components/Hero";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bio } from "./main/components/Bio";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { amount: 0.3, initial: true });

  const bioRef = useRef<HTMLDivElement>(null);

  return (
    <main
      className={clsx(
        "bg-gray-1000 text-white relative flex flex-col mt-20 md:mt-32 lg:mt-40",
      )}
    >
      {/* overflow-x-clip is important to ensure that on mobile it does not scroll horizontally */}
      <section className="relative flex flex-col overflow-x-clip">
        <Hero ref={heroRef} />
      </section>
      <NavForMain />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHeroInView ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Bio ref={bioRef} />
      </motion.div>
    </main>
  );
}
