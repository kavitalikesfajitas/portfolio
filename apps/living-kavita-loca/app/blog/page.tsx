import Link from "next/link";
import { Container } from "../main/components/Container";

// Define your blog posts metadata here
const blogPosts = [
  {
    slug: "hello-world",
    title: "Hello World",
    description:
      "Welcome to my blog! My first post about MDX and what's coming next.",
    date: "December 11, 2025",
    readTime: "3 min read",
  },
  // Add more posts here as you create them
];

export default function BlogIndex() {
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

        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400 text-lg mb-12">
          Thoughts on engineering, design, and creative coding.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
