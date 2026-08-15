import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import type { PageKind } from "@/lib/routes";
import { siteCopy } from "@/content/site-copy";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteShell({
  locale,
  pageKind,
  slug,
  children,
}: {
  locale: Locale;
  pageKind: PageKind;
  slug?: string;
  children: ReactNode;
}) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {siteCopy[locale].skip}
      </a>
      <SiteHeader locale={locale} pageKind={pageKind} slug={slug} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

