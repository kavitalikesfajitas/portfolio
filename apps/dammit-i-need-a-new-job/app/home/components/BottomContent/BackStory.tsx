import Image from "next/image";
import ConstructionBarrier from "@/public/images/construction-barrier.png";

export function BackStory() {
  return (
    <div className="flex flex-col gap-6 border-t border-divider-1000 pt-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="mb-3 text-lg font-bold uppercase tracking-tighter text-orange-1000 sm:mb-4 sm:text-xl">
          The back story
        </h2>
        <div className="max-w-4xl space-y-5 text-xs leading-relaxed text-foreground-900 sm:space-y-6 sm:text-sm">
          <p>I kept thinking there has to be a better way.</p>

          <p>
            It felt like it was getting harder and harder to sift through job
            listings on LinkedIn. Between recommendations, sponsored posts, and
            AI-generated suggestions, I couldn&apos;t shake the feeling that I
            was only seeing what the algorithm wanted me to see.
          </p>

          <p>
            Naturally, I started wondering if I could make the experience better
            for myself. What if I just pulled jobs directly from the companies I
            actually cared about? I started exploring (with AI as a thought
            partner) whether there were public APIs I could use to source job
            listings or if there was another way to collect the data.
          </p>

          <p>
            At first, I was only building it for myself. But the deeper I got
            into the problem, the more interesting it became. Eventually I
            realized the journey was just as interesting as the solution, so I
            decided to document it.
          </p>

          <p>
            What makes this fun is that the APIs aren&apos;t exactly
            plug-and-play. For example, I can&apos;t just ask Greenhouse for
            every engineering job on the internet. I have to think about
            companies, boards, departments, discovery, aggregation, filtering,
            and all the other problems that show up once you start looking at
            this at scale.
          </p>

          <p>
            Current status: Right now I&apos;m digging into the Greenhouse APIs,
            figuring out how job listings are structured, what information is
            publicly available, and what it would actually take to aggregate
            this data into something useful.
          </p>
        </div>
      </div>
      <Image
        src={ConstructionBarrier}
        priority
        alt="construction barrier"
        className="w-full max-w-xs self-center object-contain md:w-80 md:self-start"
      />
    </div>
  );
}
