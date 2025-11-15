"use client";

import Image from "next/image";
import ScrollytellingSection, { HTMLOverlaySlide } from "./index";
import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import {
  SkillBadge,
  ProjectCard,
  StatBlock,
  QuoteCard,
  TimelineItem,
  IconSkillCard,
} from "./examples";

/**
 * COMPLETE PORTFOLIO SCROLLYTELLING EXAMPLE
 *
 * Copy and adapt this to your page.tsx!
 */

export function PortfolioScrollytellingExample() {
  return (
    <ScrollytellingSection
      backgroundColor="#111111"
      // Optional: Add a subtle background image
      // backgroundImage="/images/gradient-bg.jpg"
      chapters={[
        { id: "intro", y: 0 },
        { id: "journey", y: 0.22 },
        { id: "skills", y: 0.45 },
        { id: "work", y: 0.68 },
        { id: "contact", y: 0.88 },
      ]}
      scrollPagesLength={4.5}
    >
      {/* 1. ATTENTION-GRABBING INTRO */}
      <HTMLOverlaySlide alignment="center" top={0.02}>
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Kavita Chaudhry
          </h1>
          <p className="text-2xl md:text-3xl text-white/70">
            Developer • Designer • Creator
          </p>
          <div className="text-white/50 text-lg animate-bounce mt-12">
            ↓ Scroll to explore
          </div>
        </div>
      </HTMLOverlaySlide>

      {/* 2. YOUR STORY */}
      <HTMLOverlaySlide alignment="left" top={0.2}>
        <div className="space-y-6 max-w-lg">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Who am I?
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            From building my first website in high school to creating production
            apps used by thousands, I've been obsessed with bringing ideas to
            life through code.
          </p>
          <div className="pt-4">
            <TornPaperEffect>
              <Image
                src="./images/IMG_4003.jpg"
                alt="Early work"
                width={300}
                height={200}
                className="rounded-lg opacity-80"
              />
            </TornPaperEffect>
          </div>
        </div>
      </HTMLOverlaySlide>

      {/* 3. STATS/IMPACT */}
      <HTMLOverlaySlide alignment="right" top={0.35}>
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-white">Impact</h2>
          <div className="grid grid-cols-2 gap-8">
            <StatBlock number="50+" label="Projects Shipped" />
            <StatBlock number="100K+" label="Users Reached" />
            <StatBlock number="5+" label="Years Experience" />
            <StatBlock number="∞" label="Coffee Consumed" />
          </div>
        </div>
      </HTMLOverlaySlide>

      {/* 4. SKILLS SHOWCASE */}
      <HTMLOverlaySlide alignment="center" top={0.48}>
        <div className="space-y-8 max-w-2xl">
          <h2 className="text-6xl font-bold text-white text-center">
            What I Do
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <IconSkillCard
              icon="⚛️"
              title="Frontend"
              description="React, Next.js, TypeScript"
            />
            <IconSkillCard
              icon="🎨"
              title="Design"
              description="UI/UX, Figma, Tailwind"
            />
            <IconSkillCard
              icon="🚀"
              title="Performance"
              description="Optimization, Core Web Vitals"
            />
            <IconSkillCard
              icon="🔧"
              title="Tooling"
              description="Build systems, CI/CD"
            />
          </div>
        </div>
      </HTMLOverlaySlide>

      {/* 5. FEATURED PROJECT 1 */}
      <HTMLOverlaySlide alignment="left" top={0.62}>
        <ProjectCard
          title="E-Commerce Platform"
          description="Built a full-stack shopping experience that increased conversion by 40%"
          image="/images/logo.png"
          tags={["Next.js", "Stripe", "PostgreSQL"]}
          link="#"
        />
      </HTMLOverlaySlide>

      {/* 6. FEATURED PROJECT 2 */}
      <HTMLOverlaySlide alignment="right" top={0.75}>
        <ProjectCard
          title="AI Chat Interface"
          description="Created an intuitive chat UI used by 10K+ daily active users"
          image="/images/mouth-dialog.png"
          tags={["React", "WebSocket", "OpenAI"]}
          link="#"
        />
      </HTMLOverlaySlide>

      {/* 7. TESTIMONIAL/QUOTE */}
      <HTMLOverlaySlide alignment="center" top={0.86}>
        <QuoteCard
          quote="Kavita doesn't just code - she crafts experiences that users love. Her attention to detail is unmatched."
          author="Client Name, Company"
        />
      </HTMLOverlaySlide>

      {/* 8. CALL TO ACTION */}
      <HTMLOverlaySlide alignment="center" top={0.95}>
        <div className="text-center space-y-8">
          <h2 className="text-6xl md:text-7xl font-bold text-white">
            Let's Create
          </h2>
          <p className="text-xl text-white/70 max-w-md mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-white/90 transition-colors">
              Get In Touch
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-full text-lg font-bold border border-white/20 hover:bg-white/20 transition-colors">
              View Resume
            </button>
          </div>
        </div>
      </HTMLOverlaySlide>
    </ScrollytellingSection>
  );
}

/**
 * ALTERNATIVE: Timeline-based approach (more compact)
 */
export function TimelineScrollytellingExample() {
  return (
    <ScrollytellingSection
      backgroundColor="#111111"
      chapters={[
        { id: "2020", y: 0 },
        { id: "2021", y: 0.3 },
        { id: "2022", y: 0.6 },
        { id: "2023", y: 0.85 },
      ]}
      scrollPagesLength={3.5}
    >
      <HTMLOverlaySlide alignment="center" top={0.08}>
        <h1 className="text-7xl font-bold text-white">My Journey</h1>
      </HTMLOverlaySlide>

      <HTMLOverlaySlide alignment="left" top={0.25}>
        <TimelineItem
          year="2020"
          title="Started Freelancing"
          description="Built my first client websites and discovered my passion for web development"
        />
      </HTMLOverlaySlide>

      <HTMLOverlaySlide alignment="right" top={0.45}>
        <TimelineItem
          year="2021"
          title="Joined Startup"
          description="Became lead frontend developer at a fast-growing tech company"
        />
      </HTMLOverlaySlide>

      <HTMLOverlaySlide alignment="left" top={0.65}>
        <TimelineItem
          year="2022"
          title="Open Source"
          description="Contributed to major open source projects and built my own library"
        />
      </HTMLOverlaySlide>

      <HTMLOverlaySlide alignment="right" top={0.82}>
        <TimelineItem
          year="2023"
          title="Full-Time Creator"
          description="Now building products and helping others learn to code"
        />
      </HTMLOverlaySlide>
    </ScrollytellingSection>
  );
}
