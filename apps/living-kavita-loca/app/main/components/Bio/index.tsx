import { TornPaperEffect } from "@kavita-likes-fajitas/ui-library/TornPaperEffect";
import clsx from "clsx";
import BioImage from "@/public/images/personal/bio-photo.jpg";
import Image from "next/image";
import { Container } from "../Container";
import { CollapsibleContent } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/collapsible";
import { Collapsible } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/collapsible";
import { CollapsibleTrigger } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { forwardRef } from "react";

type SnazzyDividerProps = {
  className?: string;
  maxWidth?: string;
  height?: string;
  color?: string;
};

const SnazzyDivider = ({
  className,
  maxWidth,
  height,
  color,
}: SnazzyDividerProps) => {
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
>(function Bio(props, ref) {
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

          <div
            className={clsx(
              "flex flex-1 bg-white text-gray-1000 font-light rounded-2xl text-sm",
              "w-full md:max-w-[600px]  ",
              "p-5",
            )}
          >
            I am a staff full-stack engineer with a wide technical range and a
            deep love for problem-solving. I&apos;ve spent my career designing
            and building systems that scale — from frontend architecture and
            performance-critical user experiences to backend platforms, APIs,
            and infrastructure. I&apos;m most at home in complex, ambiguous
            spaces, and I&apos;m known for jumping in wherever the challenge is
            hardest. I care deeply about craft, reliability, and clarity -
            building systems that are not only powerful, but understandable and
            maintainable by the teams who own them. Whether I&apos;m working on
            a greenfield project or untangling an existing system, l approach
            problems with curiosity, empathy, and a long-term mindset. Off the
            keyboard, I&apos;m hiking Colorado 14ers with my dog, Samosa. Same
            mindset, different terrain: patience, persistence, and enjoying the
            journey.
          </div>
        </div>
        {/* <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2">
            Can I use this in my project? <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible> */}
      </Container>
    </section>
  );
});
Bio.displayName = "Bio";
