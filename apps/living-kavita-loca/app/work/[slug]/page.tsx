import { notFound } from "next/navigation";
import { Container } from "@/app/main/components/Container";
import { NonMainNav } from "@/app/components/Nav/NonMainNav";
import { TechBadge } from "@kavita-likes-fajitas/ui-library/TechBadge";
import { Hero } from "./components/Hero";
import fs from "fs";
import path from "path";

// Generate static paths for all work items dynamically
export async function generateStaticParams() {
  const workDir = path.join(process.cwd(), "content/work");
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = path.basename(file, ".mdx");
    return { slug };
  });
}

// Generate metadata for each work item
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const { metadata } = await import(`@/content/work/${slug}.mdx`);
    return {
      title: metadata.title ?? "Work",
    };
  } catch {
    return { title: "Work Not Found" };
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Content;
  let metadata;
  try {
    const mdxModule = await import(`@/content/work/${slug}.mdx`);
    Content = mdxModule.default;
    metadata = mdxModule.metadata;
  } catch {
    notFound();
  }

  return (
    <main className="bg-gray-1000 text-white relative flex flex-col min-h-screen">
      <NonMainNav />
      <div>
        <Hero height="md" className="opacity-40" image={metadata.heroImage} />
      </div>
      <Container maxWidth="4xl" size="full">
        <div className="flex flex-col basis-1/2 gap-2 pb-6">
          <div className="pl-1 underline font-bold">Stack</div>
          <div className="flex flex-row h-fit gap-1 flex-wrap">
            {metadata.tech?.map((tag: string) => (
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
