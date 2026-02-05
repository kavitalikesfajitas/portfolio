// Centralized work items configuration
// Add new work items here and they'll show up in navigation and be generated as pages

export const WORK_ITEMS = [
  {
    slug: "opensea-swoosh-id",
    title: "Dynamic SVG for Swoosh ID",
  },
  {
    slug: "contentful-graphql-proxy",
    title: "Contentful GraphQL Proxy",
  },
  {
    slug: "pr-deploy-previews",
    title: "PR Deploy Previews",
  },
] as const;

export type WorkItem = (typeof WORK_ITEMS)[number];
