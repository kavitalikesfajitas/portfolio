import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-3xl font-bold uppercase tracking-tighter text-cream-1000 sm:text-5xl"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-10 text-xl font-bold uppercase tracking-tighter text-orange-1000 sm:text-2xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-6 text-lg font-bold uppercase tracking-tighter text-cream-1000"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="my-4 max-w-4xl text-sm leading-relaxed text-foreground-900 sm:text-base"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="my-4 ml-5 max-w-4xl list-disc space-y-2 text-sm leading-relaxed text-foreground-900 sm:text-base"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="my-4 ml-5 max-w-4xl list-decimal space-y-2 text-sm leading-relaxed text-foreground-900 sm:text-base"
        {...props}
      >
        {children}
      </ol>
    ),
    a: ({ href, children, ...props }) => {
      const className =
        "font-bold text-orange-1000 underline-offset-4 hover:underline";

      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={className} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    },
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-neutral-900 px-1.5 py-0.5 font-overpass-mono text-xs text-cream-800"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="my-5 max-w-4xl overflow-x-auto rounded-md border border-divider-1000 bg-neutral-910/80 p-4 text-sm text-cream-800"
        {...props}
      >
        {children}
      </pre>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-cream-1000" {...props}>
        {children}
      </strong>
    ),
    ...components,
  };
}
