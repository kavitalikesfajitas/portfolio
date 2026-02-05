import clsx from "clsx";
import BioImage from "@/public/images/personal/bio-photo.jpg";
import Image from "next/image";
import { Container } from "../Container";
import { forwardRef } from "react";

type SnazzyDividerProps = {
  className?: string;
};

const SnazzyDivider = ({ className }: SnazzyDividerProps) => {
  return (
    <div
      className={clsx(
        "max-w-[50%] bg-[#B56B78] text-[#B56B78] h-1.5",
        className,
      )}
    />
  );
};

export const Bio = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Bio(_props, ref) {
  return (
    <section className="px-6 pt-24 bg-gray-1000 flex flex-col w-full gap-10 min-h-screen overflow-y-auto">
      <Container
        maxWidth="8xl"
        size="full"
        className="flex flex-col gap-10 grow"
      >
        <div className="flex flex-col gap-2" ref={ref}>
          <div className="font-lobster text-4xl text-white">About Me</div>
          <SnazzyDivider className="max-w-[40%]" />
          <SnazzyDivider className="max-w-[75%]" />
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-10">
          <div
            className={clsx(
              "relative aspect-square",
              "w-full md:max-w-[600px] h-fit ",
            )}
          >
            <Image
              src={BioImage}
              alt="Kavita Chaudhry"
              fill
              placeholder="blur"
              quality={75}
              className="object-cover rounded-2xl"
            />
          </div>

          <div className={clsx("flex flex-1 shrink-0 flex-col gap-4")}>
            <div
              className={clsx(
                "flex-col gap-2 flex-1",
                "w-full md:max-w-[600px]e rounded-2xl ",
                " bg-white text-gray-1000 font-light rounded-2xl text-sm p-5",
              )}
            >
              <div className="font-midnight-gelactic text-2xl text-gray-1000 pb-1">
                Hello there...
              </div>
              <div>
                I am a staff full-stack engineer with a wide technical range and
                a deep love for problem-solving. I&apos;ve spent my career
                designing and building systems that scale — from frontend
                architecture and performance-critical user experiences to
                backend platforms, APIs, and infrastructure. I&apos;m most at
                home in complex, ambiguous spaces, and I&apos;m known for
                jumping in wherever the challenge is hardest. I care deeply
                about craft, reliability, and clarity - building systems that
                are not only powerful, but understandable and maintainable by
                the teams who own them. Whether I&apos;m working on a greenfield
                project or untangling an existing system, l approach problems
                with curiosity, empathy, and a long-term mindset. Off the
                keyboard, I&apos;m hiking Colorado 14ers with my dog, Samosa.
                Same mindset, different terrain: patience, persistence, and
                enjoying the journey.
              </div>
            </div>
            <div
              className={clsx(
                "flex-col gap-2 flex-1",
                "w-full md:max-w-[600px]e rounded-2xl ",
                " bg-white text-gray-1000 font-light rounded-2xl text-sm p-5",
              )}
            >
              <div className="font-midnight-gelactic text-2xl text-gray-1000 pb-1">
                A work in progress...
              </div>
              <div>
                You&apos;ve caught me mid-migration! 🏗️ Much like refactoring
                legacy code, this site is getting a thoughtful overhaul.
                The&nbsp;
                <a
                  href="https://livingkavitaloca.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B56B78] hover:underline"
                >
                  old version
                </a>
                &nbsp;served me well (like that trusty monolith we all know),
                but it&apos;s time for something more scalable, maintainable,
                and delightful. Think of it like moving into a new apartment
                while also rewriting the architecture — the essentials are here
                and deployed, but I&apos;m still unpacking boxes and deciding
                where the art goes. Some features are live, others are in PR
                review, and a few are still on the backlog. Want to see the
                code?&nbsp;
                <a
                  href="https://github.com/kavitalikesfajitas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B56B78] hover:underline"
                >
                  Check out my GitHub
                </a>
                . Thanks for being patient while I ship this incrementally, one
                commit at a time. Promise it&apos;ll be worth the wait! ✨🚀
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
Bio.displayName = "Bio";
