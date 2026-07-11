import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";

export const metadata = {
  title: "Learn More | Dammit I Gotta Get A New Job",
  description: "Project notes for the Dammit job search experiment.",
};

const articles = [
  {
    title: "The Back Story",
    href: "/learn-more/back-story",
    description:
      "Why this started, why Greenhouse comes first, and why the process became worth documenting.",
  },
  {
    title: "When a Map Becomes a Database",
    href: "/learn-more/scaling",
    description:
      "The small map-vs-list refactor and the big database question are the same instinct at two scales.",
  },
];

const decisionNotes = [
  {
    title: "Company Logo Generation",
    href: "/learn-more/decisions/company-logo-generation",
    description: "Static assets for now; reviewed logo URLs later.",
  },
  {
    title: "Job API Decisions",
    href: "/learn-more/decisions/job-api",
    description: "Greenhouse first, department-led discovery, normalized data.",
  },
];

const sections = [
  {
    title: "Articles",
    description: "The story and context around the project.",
    items: articles,
  },
  {
    title: "Decision notes",
    description: "The implementation choices worth writing down.",
    items: decisionNotes,
  },
];

export default function LearnMorePage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-8 font-overpass-mono sm:px-10 sm:py-10">
        <section className="border-b border-divider-1000 pb-10">
          <p className="mb-4 text-sm font-bold uppercase leading-none tracking-tighter text-orange-1000 sm:text-base">
            Learn more
          </p>
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-cream-1000 sm:text-5xl">
            Project notes
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-foreground-900 sm:text-base">
            A little insight into the story behind the project and the decisions
            I made along the way. This is obviously a pet project, but it would
            be amiss to not think about what would need to change if it ever had
            to scale.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-cream-800 sm:text-base">
            Tiny flex: these started as docs in the repo. I repurposed them as
            MDX so the same source stays readable on GitHub and renders here in
            the site.
          </p>
        </section>

        {sections.map((section) => (
          <section
            key={section.title}
            className="grid gap-4 border-b border-divider-1000 pb-8 last:border-b-0 last:pb-0 lg:grid-cols-[220px_minmax(0,1fr)]"
          >
            <div>
              <h2 className="text-lg font-bold uppercase tracking-tighter text-orange-1000 sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-foreground-900 sm:text-sm">
                {section.description}
              </p>
            </div>

            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
              {section.items.map((note) => (
                <article
                  key={note.href}
                  className="rounded-md border border-divider-1000 bg-neutral-910/80 p-5"
                >
                  <h3 className="text-sm font-bold uppercase tracking-tighter">
                    <Link
                      href={note.href}
                      className="inline-flex items-center gap-2 text-orange-1000 underline-offset-4 hover:underline"
                    >
                      <span>{note.title}</span>
                      <ArrowRight className="size-4 shrink-0" aria-hidden />
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-900">
                    {note.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
