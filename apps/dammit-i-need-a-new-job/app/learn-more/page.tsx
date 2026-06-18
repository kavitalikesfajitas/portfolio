import Link from "next/link";

export const metadata = {
  title: "Learn More | Dammit I Gotta Get A New Job",
  description:
    "The product and engineering decisions behind the Dammit job search experiment.",
};

const decisionNotes = [
  {
    title: "Company Logo Generation",
    href: "/learn-more/decisions/company-logo-generation",
    description:
      "Why seeded company logos live in public assets, how the fetch script keeps builds practical, and where logo storage needs to move when companies become dynamic.",
  },
  {
    title: "Job API Decisions",
    href: "/learn-more/decisions/job-api",
    description:
      "Why the MVP starts with Greenhouse, uses departments as the first discovery surface, validates external payloads with Zod, and treats company taxonomy as signal instead of truth.",
  },
];

export default function LearnMorePage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-neutral-950 text-cream-1000">
      <main className="flex w-full max-w-7xl flex-1 flex-col gap-10 px-5 py-8 font-overpass-mono sm:px-10 sm:py-10">
        <section className="border-b border-divider-1000 pb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-tighter text-orange-1000">
            Learn more
          </p>
          <h1 className="text-3xl font-bold uppercase tracking-tighter text-cream-1000 sm:text-5xl">
            The decisions behind Dammit
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-foreground-900 sm:text-base">
            This started as a practical job-search experiment, but the
            interesting part is the thinking around it: what data to trust, what
            should stay static, what can become dynamic later, and where a
            little visual polish makes the whole thing easier to scan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-tighter text-orange-1000 sm:text-2xl">
            Decision notes
          </h2>
          <div className="my-6 grid gap-4 lg:grid-cols-2">
            {decisionNotes.map((note) => {
              const isExternal = note.href.startsWith("http");
              const className =
                "rounded-md border border-divider-1000 bg-neutral-910/80 p-5 no-underline transition-colors hover:border-orange-1000";
              const content = (
                <>
                  <span className="block text-sm font-bold uppercase tracking-tighter text-orange-1000">
                    {note.title}
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-foreground-900">
                    {note.description}
                  </span>
                </>
              );

              if (isExternal) {
                return (
                  <a
                    key={note.href}
                    href={note.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={note.href} href={note.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-divider-1000 pt-10">
          <h2 className="text-xl font-bold uppercase tracking-tighter text-orange-1000 sm:text-2xl">
            What belongs here
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground-900 sm:text-base">
            This page is the front door for the thought process. Individual
            decision pages can go deeper, but this page should stay skimmable:
            what we decided, why it mattered, and where to read the longer note.
          </p>
        </section>
      </main>
    </div>
  );
}
