"use client";
import { NavForMain } from "@/app/main/components/NavForMain";
import { Hero } from "@/app/main/components/Hero";
import clsx from "clsx";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bio } from "./main/components/Bio";
import { projects } from "./exploration/resume/portfolio";
import { FeaturedWorkCard } from "@kavita-likes-fajitas/ui-library/FeatureWorkCard";
import { Container } from "./main/components/Container";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { amount: "some", initial: true });

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
          <Container
            maxWidth="8xl"
            size="full"
            className="flex flex-col gap-10"
          >
            <Bio />
            <section className=" flex flex-col gap-10 h-fit mb-24">
              <h2 className="text-3xl font-midnight-gelactic">Featured Work</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <FeaturedWorkCard key={project.title} {...project} />
                ))}
              </div>
            </section>
          </Container>
        </div>
      </motion.div>
    </main>
  );
}
