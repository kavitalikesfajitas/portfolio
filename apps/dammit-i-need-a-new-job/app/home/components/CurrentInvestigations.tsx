import { Button } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/button";
import {
  DividedPanel,
  DividedPanelItem,
} from "@kavita-likes-fajitas/ui-library";
import Image from "next/image";
import Link from "next/link";
import ConstructionBarrier from "@/public/images/construction-barrier.png";

type Investigation = {
  name: string;
  jobs: number;
  href: string;
  mark: "vercel" | "stripe" | "anthropic" | "linear";
};

const investigations: Investigation[] = [
  { name: "Vercel", jobs: 17, href: "/companies/vercel", mark: "vercel" },
  { name: "Stripe", jobs: 31, href: "/companies", mark: "stripe" },
  { name: "Anthropic", jobs: 54, href: "/companies", mark: "anthropic" },
  { name: "Linear", jobs: 6, href: "/companies", mark: "linear" },
];

function CompanyMark({ mark }: { mark: Investigation["mark"] }) {
  if (mark === "vercel") {
    return (
      <div className="flex size-12 items-center justify-center rounded-md bg-black">
        <div className="h-0 w-0 border-x-[13px] border-b-[23px] border-x-transparent border-b-white" />
      </div>
    );
  }

  if (mark === "stripe") {
    return (
      <div className="flex size-12 items-center justify-center rounded-md bg-indigo-500 text-3xl font-extrabold text-white shadow-[0_0_18px_rgba(99,102,241,0.35)]">
        S
      </div>
    );
  }

  if (mark === "anthropic") {
    return (
      <div className="flex size-12 items-center justify-center rounded-md bg-[#c9ae93] text-2xl font-extrabold text-neutral-950">
        AI
      </div>
    );
  }

  return (
    <div className="flex size-12 items-center justify-center rounded-md bg-black">
      <div className="size-7 rounded-full bg-[repeating-linear-gradient(45deg,#fff_0_3px,transparent_3px_6px)]" />
    </div>
  );
}

function InvestigationCard({ name, jobs, href, mark }: Investigation) {
  return (
    <DividedPanelItem className="items-stretch gap-4 border-divider-1000 px-5 py-4 text-left sm:odd:border-r sm:nth-[n+3]:border-t lg:border-r lg:border-t-0 lg:last:border-r-0">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <CompanyMark mark={mark} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-xl font-extrabold text-cream-1000">
                {name}
              </h3>
              <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
            </div>
          </div>
        </div>

        <div>
          <div className="text-3xl font-extrabold leading-none text-orange-1000">
            {jobs}
          </div>
          <div className="mt-2 text-sm text-foreground-900">
            engineering jobs
          </div>
        </div>

        <Button
          asChild
          className="h-10 w-full rounded-md border border-orange-1000 bg-transparent font-overpass-mono text-sm font-bold text-orange-1000 hover:bg-orange-1000 hover:text-neutral-950"
        >
          <Link href={href}>Investigate -&gt;</Link>
        </Button>
      </div>
    </DividedPanelItem>
  );
}

export function CurrentInvestigations() {
  return (
    <section className="flex w-full flex-col gap-6 font-overpass-mono">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase tracking-tighter text-orange-1000">
          Current Investigations
        </h2>
        <Link
          href="/companies"
          className="text-sm font-bold text-orange-1000 transition-colors hover:text-cream-1000"
        >
          view all -&gt;
        </Link>
      </div>

      <DividedPanel contentClassName="sm:grid-cols-2 lg:grid-cols-4">
        {investigations.map((investigation) => (
          <InvestigationCard key={investigation.name} {...investigation} />
        ))}
      </DividedPanel>

      <div className="flex flex-col gap-6 border-t border-divider-1000 pt-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-4 text-xl font-bold uppercase tracking-tighter text-orange-1000">
            The back story
          </h2>
          <div className="max-w-4xl text-sm leading-relaxed text-foreground-900 space-y-6">
            <p>I kept thinking there has to be a better way.</p>

            <p>
              It felt like it was getting harder and harder to sift through job
              listings on LinkedIn. Between recommendations, sponsored posts,
              and AI-generated suggestions, I couldn&apos;t shake the feeling
              that I was only seeing what the algorithm wanted me to see.
            </p>

            <p>
              Naturally, I started wondering if I could make the experience
              better for myself. What if I just pulled jobs directly from the
              companies I actually cared about? I started exploring (with AI as
              a thought partner) whether there were public APIs I could use to
              source job listings or if there was another way to collect the
              data.
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
              Current status: Right now I&apos;m digging into the Greenhouse
              APIs, figuring out how job listings are structured, what
              information is publicly available, and what it would actually take
              to aggregate this data into something useful.
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
    </section>
  );
}
