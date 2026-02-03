import {
  Monitor,
  Box,
  Code2,
  Database,
  Cloud,
  Wrench,
  Library,
  Cpu,
  Github,
  Hexagon,
  Layers,
  Package,
} from "lucide-react";

export enum TechType {
  Language = "language",
  Library = "library",
  Framework = "framework",
  Runtime = "runtime",
  Tool = "tool",
  ThreeD = "3d",
  Database = "database",
  Cloud = "cloud",
  CICD = "ci/cd",
  API = "api",
  Cache = "cache",
  Other = "other",
}

export type TechMapType = Record<string, { label: string; type: TechType }>;

export const TECH_MAP: TechMapType = {
  // Languages
  typescript: { label: "TypeScript", type: TechType.Language },
  javascript: { label: "JavaScript", type: TechType.Language },
  python: { label: "Python", type: TechType.Language },

  // Libraries
  react: { label: "React", type: TechType.Library },
  tailwind: { label: "Tailwind", type: TechType.Library },

  // Frameworks
  nextjs: { label: "Next.js", type: TechType.Framework },

  // Runtimes
  nodejs: { label: "Node.js", type: TechType.Runtime },

  // Tools
  figma: { label: "Figma", type: TechType.Tool },
  docker: { label: "Docker", type: TechType.Tool },

  // 3D
  blender: { label: "Blender", type: TechType.ThreeD },
  webgl: { label: "WebGL", type: TechType.ThreeD },
  threejs: { label: "Three.js", type: TechType.ThreeD },
  unity: { label: "Unity", type: TechType.ThreeD },

  // Databases
  postgres: { label: "PostgreSQL", type: TechType.Database },
  mongodb: { label: "MongoDB", type: TechType.Database },

  // Cloud
  aws: { label: "AWS", type: TechType.Cloud },
  vercel: { label: "Vercel", type: TechType.Cloud },

  // API
  graphql: { label: "GraphQL", type: TechType.API },
  apollo: { label: "Apollo GraphQL", type: TechType.API },

  // Cache
  redis: { label: "Redis", type: TechType.Cache },
  memcached: { label: "Memcached", type: TechType.Cache },
} as const;

export type TechKey = keyof typeof TECH_MAP;

export const IconMap = {
  [TechType.Language]: Code2,
  [TechType.Library]: Library,
  [TechType.Framework]: Monitor,
  [TechType.Runtime]: Cpu,
  [TechType.Tool]: Wrench,
  [TechType.ThreeD]: Box,
  [TechType.Database]: Database,
  [TechType.Cloud]: Cloud,
  [TechType.CICD]: Github,
  [TechType.API]: Hexagon,
  [TechType.Cache]: Layers,
  [TechType.Other]: Package,
};
