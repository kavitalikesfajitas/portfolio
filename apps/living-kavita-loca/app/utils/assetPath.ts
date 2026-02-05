/**
 * Utility to generate asset paths that respect Next.js basePath
 * For use with videos and other non-image assets in MDX
 */

// Get basePath from environment (set during build)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepends the Next.js basePath to an asset path
 * @param path - The asset path (e.g., "/videos/membership-card.mov")
 * @returns The full path with basePath prefix
 *
 * @example
 * // In PR preview with basePath="/pr-34"
 * assetPath("/videos/video.mov") // returns "/pr-34/videos/video.mov"
 *
 * // In production with no basePath
 * assetPath("/videos/video.mov") // returns "/videos/video.mov"
 */
export function assetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
