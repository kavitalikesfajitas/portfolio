"use client";

import { NavForMain } from "./main/NavForMain";
import { Hero } from "./main/Hero";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import Image from "next/image";

import { projects } from "./exploration/resume/portfolio";
import { FeaturedWorkCard } from "@kavita-likes-fajitas/ui-library/FeatureWorkCard";
import { Container } from "./main/components/Container";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { amount: "some", initial: true });
  console.log({ isHeroInView });
  return (
    <main
      className={clsx(
        "bg-gray-950 text-white relative flex flex-col mt-20 md:mt-32 lg:mt-40",
      )}
    >
      {/* overflow-x-clip is important to ensure that on mobile it does not scroll horizontally */}
      <section ref={heroRef} className="relative flex flex-col overflow-x-clip">
        <Hero />
      </section>
      <NavForMain />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHeroInView ? 0 : 1 }}
        transition={{ duration: 0.05 }}
        className="snap-proximity snap-y overflow-y-auto min-h-screen scroll-pt-20 scroll-smooth"
      >
        {/* we need are setting the height to screen and overflow-y-auto to ensure that the content beyond 100vh is visible/scrollable 
        and treated as overflow content so that the user can still scroll to it, but we still pin to start of the content */}
        <div className="px-6 pt-24 bg-gray-950 flex flex-col w-full gap-10 h-screen overflow-y-auto snap-start">
          <Container>
            <section className="flex-col flex md:flex-row gap-10 pt-10">
              <div
                className={clsx(
                  "relative aspect-square",
                  "w-full md:basis-1/2 h-fit max-w-[600px]",
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
                <h2 className="text-3xl font-bold mb-6">
                  Hi! I&apos;m Kavita!
                </h2>

                <div className="space-y-10 max-w-2xl">
                  Hi I&apos;m Kavita! I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer. I&apos;m a software engineer and creative
                  developer.
                </div>
              </div>
            </section>

            <section className=" flex flex-col gap-10 h-fit mb-24">
              <h2>Featured Work</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <FeaturedWorkCard
                    key={project.title}
                    {...project}
                    thumbnail="/images/our_force_1_header.jpg"
                    badge="/logos/nike.svg"
                  />
                ))}
              </div>
            </section>
          </Container>
        </div>
      </motion.div>
    </main>
  );
}
