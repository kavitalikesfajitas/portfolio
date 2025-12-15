import { notFound } from "next/navigation";
import { Container } from "../../main/components/Container";
import Link from "next/link";

// Define your project detail pages here - each key is the slug
const projectDetails: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  "contentful-graphql-proxy": () =>
    import("@content/work/contentful-graphql-proxy.mdx"),
  "opensea-swoosh-id": () => import("@content/work/opensea-swoosh-id.mdx"),
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
  return {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
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

  const { default: Content } = await projectLoader();

  return (
    <main className="bg-gray-950 text-white min-h-screen pt-24 pb-16">
      <Container maxWidth="4xl" size="full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
        <article className="prose prose-invert max-w-none">
          <Content />
        </article>
      </Container>
    </main>
  );
}
