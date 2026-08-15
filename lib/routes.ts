import type { Locale } from "@/content/types";

export type PageKind = "home" | "work" | "project";

export function routeFor(
  locale: Locale,
  kind: PageKind,
  slug?: string,
): string {
  const prefix = locale === "es" ? "/es" : "";
  if (kind === "home") return prefix || "/";
  if (kind === "work") return `${prefix}/work`;
  return `${prefix}/work/${slug}`;
}

