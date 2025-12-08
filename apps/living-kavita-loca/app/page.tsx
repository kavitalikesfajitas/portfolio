"use client";

import { NavForMain } from "./main/NavForMain";
import { Hero } from "./main/Hero";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import Image from "next/image";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { amount: "some" });

  return (
    <main
      className={clsx(
        "bg-gray-950 text-white relative flex flex-col mt-20 md:mt-32 lg:mt-40",
      )}
    >
      {/* overflow-x-clip is important to ensure that on mobile it does not scroll horizontally */}
      <section
        ref={heroRef}
        className="relative flex flex-col overflow-x-clip min-h-[100px]"
      >
        <Hero />
      </section>
      <NavForMain />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHeroInView ? 0 : 1 }}
        transition={{ duration: 0.05 }}
      >
        <div className=" min-h-screen px-6 py-24 bg-gray-950 flex flex-col w-full gap-10 ">
          <section className=" flex-col flex md:flex-row gap-10">
            <div
              className={clsx(
                "relative aspect-square",
                "w-full md:basis-1/2 h-fit",
              )}
            >
              <TornPaperEffect className="h-full w-full">
                <Image
                  src="/images/bio-photo.jpg"
                  alt="Kavita C"
                  fill
                  quality={75}
                  className="object-cover p-5"
                />
              </TornPaperEffect>
            </div>
            <div className="flex flex-col basis-1/2">
              <h2 className="text-3xl font-bold mb-6">Hi! I&apos;m Kavita!</h2>

              <div className="space-y-10 max-w-2xl">
                Hi I&apos;m Kavita! I&apos;m a software engineer and creative
                developer. I&apos;m a software engineer and creative developer.
                I&apos;m a software engineer and creative developer. I&apos;m a
                software engineer and creative developer. I&apos;m a software
                engineer and creative developer. I&apos;m a software engineer
                and creative developer. I&apos;m a software engineer and
                creative developer. I&apos;m a software engineer and creative
                developer. I&apos;m a software engineer and creative developer.
                I&apos;m a software engineer and creative developer. I&apos;m a
                software engineer and creative developer. I&apos;m a software
                engineer and creative developer.
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </main>
  );
}
