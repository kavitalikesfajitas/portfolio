import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";
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
            The homepage is the current working surface: companies, job data,
            and the rough shape of the experiment. The longer story about why I
            built it, what I decided along the way, and where it would need to
            change for scale now lives with the decision notes.
          </p>

          <Link
            href="/learn-more/back-story"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-tighter text-orange-1000 underline-offset-4 hover:underline"
          >
            <span>Read the back story</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
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
