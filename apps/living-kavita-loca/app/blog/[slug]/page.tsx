import { notFound } from "next/navigation";
import { Container } from "../../main/components/Container";
import Link from "next/link";

// Define your blog posts here - each key is the slug
const blogPosts: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  "hello-world": () => import("@content/blog/hello-world.mdx"),
  // Add more blog posts here as you create them
  // "another-post": () => import("@content/blog/another-post.mdx"),
};

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // You could extract metadata from the MDX file if needed
  return {
    title: slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postLoader = blogPosts[slug];

  if (!postLoader) {
    notFound();
  }

  const { default: Content } = await postLoader();

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
