import { notFound } from "next/navigation";
import clsx from "clsx";
import { Container } from "@/app/main/components/Container";
import { Badge } from "@kavita-likes-fajitas/shadcn-ui-lib/components/ui/badge";
import { NonMainNav } from "@/app/components/Nav/NonMainNav";
import { TechBadge } from "@kavita-likes-fajitas/ui-library/TechBadge";
import { Hero } from "./components/Hero";

// Define your project detail pages here - each key is the slug
const projectDetails: Record<string, () => Promise<typeof import("*.mdx")>> = {
  "contentful-graphql-proxy": () =>
    import("@/content/work/contentful-graphql-proxy.mdx"),
  "opensea-swoosh-id": () => import("@/content/work/opensea-swoosh-id.mdx"),
  // Add more project details here as you create them
};

// Generate static paths for all projects
export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectLoader = projectDetails[slug];

  if (!projectLoader) {
    return { title: "Project Not Found" };
  }

  const { metadata } = await projectLoader();
  return {
    title: metadata.title ?? "Project",
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectLoader = projectDetails[slug];

  if (!projectLoader) {
    notFound();
  }

  const { default: Content, metadata } = await projectLoader();

  return (
    <main className="bg-gray-1000 text-white relative flex flex-col min-h-screen">
      <NonMainNav />
      <div>
        <Hero height="md" className="opacity-40" image={metadata.heroImage}>
          <div
            className={clsx(
              "container mx-auto max-w-6xl relative z-10 text-center",
            )}
          >
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Hero>
      </div>
      <Container maxWidth="4xl" size="full">
        <div className="flex flex-col basis-1/2 gap-2 pb-6">
          <div className="pl-1 underline font-bold">Stack</div>
          <div className="flex flex-row h-fit gap-1 flex-wrap">
            {metadata.tech?.map((tag) => (
              <TechBadge key={tag} tech={tag} size={"md"} />
            ))}
          </div>
        </div>
        <article className="prose prose-invert max-w-none">
          <Content />
        </article>
      </Container>
    </main>
  );
}
