import Link from "next/link";
import { ArrowRight } from "@kavita-likes-fajitas/kavita-fajita-icons";

export const metadata = {
  title: "Learn More | Dammit I Gotta Get A New Job",
  description: "Project notes for the Dammit job search experiment.",
};

const decisionNotes = [
  {
    title: "The Back Story",
    href: "/learn-more/back-story",
    label: "Article",
    description:
      "Why this started, why Greenhouse comes first, and why the process became worth documenting.",
  },
  {
    title: "Company Logo Generation",
    href: "/learn-more/decisions/company-logo-generation",
    label: "Decision note",
    description: "Static assets for now; reviewed logo URLs later.",
  },
  {
    title: "Job API Decisions",
    href: "/learn-more/decisions/job-api",
    label: "Decision note",
    description: "Greenhouse first, department-led discovery, normalized data.",
  },
];

export default function LearnMorePage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-8 font-overpass-mono sm:px-10 sm:py-10">
        <section className="border-b border-divider-1000 pb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-tighter text-orange-1000">
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

        <section>
          <div className="grid gap-4 lg:grid-cols-3">
            {decisionNotes.map((note) => (
              <article
                key={note.href}
                className="rounded-md border border-divider-1000 bg-neutral-910/80 p-5"
              >
                <p className="mb-3 text-xs font-bold uppercase tracking-tighter text-cream-800">
                  {note.label}
                </p>
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
      </main>
    </div>
  );
}
