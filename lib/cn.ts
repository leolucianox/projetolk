// Tiny classnames joiner — avoids a clsx dependency for this project.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
