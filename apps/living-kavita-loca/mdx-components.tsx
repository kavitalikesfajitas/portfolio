import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

/**
 * Custom components for MDX rendering.
 * These components will be used to render corresponding HTML elements in MDX files.
 * You can add more custom components here as needed.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with anchor links
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold mt-12 mb-6 first:mt-0 text-white"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold mt-10 mb-4 text-white" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-white" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-medium mt-6 mb-2 text-white" {...props}>
        {children}
      </h4>
    ),

    // Paragraphs and text
    p: ({ children, ...props }) => (
      <p className="my-4 leading-relaxed text-gray-300" {...props}>
        {children}
      </p>
    ),

    // Links
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href ?? "#"}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    },

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-gray-300" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-gray-300" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),

    // Code blocks
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg bg-gray-800/80 p-4 text-sm border border-gray-700"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => {
      // Check if it's inline code (no className means inline)
      const isInline = !props.className;
      if (isInline) {
        return (
          <code
            className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-cyan-300 font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="text-gray-100 font-mono" {...props}>
          {children}
        </code>
      );
    },

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-cyan-500 pl-4 italic text-gray-400"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: (props) => <hr className="my-8 border-gray-700" {...props} />,

    // Tables
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border-b border-gray-700 bg-gray-800/50 px-4 py-3 font-semibold text-white"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border-b border-gray-800 px-4 py-3 text-gray-300"
        {...props}
      >
        {children}
      </td>
    ),

    // Images with Next.js optimization
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        alt={props.alt || ""}
        width={800}
        height={450}
        className="my-6 rounded-lg"
      />
    ),

    // Strong and emphasis
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-white" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-gray-200" {...props}>
        {children}
      </em>
    ),

    // Allow overriding with custom components
    ...components,
  };
}
