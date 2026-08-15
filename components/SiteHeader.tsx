import Link from "next/link";
import { profile } from "@/content/profile";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import { routeFor, type PageKind } from "@/lib/routes";
import { LinkedInLink } from "./LinkedInLink";

export function SiteHeader({
  locale,
  pageKind,
  slug,
}: {
  locale: Locale;
  pageKind: PageKind;
  slug?: string;
}) {
  const copy = siteCopy[locale];
  const home = routeFor(locale, "home");
  const work = routeFor(locale, "work");
  const alternateLocale: Locale = locale === "en" ? "es" : "en";
  const alternate = routeFor(alternateLocale, pageKind, slug);
  const links = [
    { href: work, label: copy.work },
    { href: `${home === "/" ? "" : home}/#about`, label: copy.about },
    {
      href: profile.githubUrl,
      label: copy.github,
      external: true,
    },
    {
      href: profile.linkedInUrl,
      label: copy.linkedin,
      external: true,
      linkedin: true,
    },
    { href: `${home === "/" ? "" : home}/#contact`, label: copy.contact },
  ];

  const navigation = (
    <>
      {links.map((link) =>
        link.linkedin ? (
          <LinkedInLink
            key={link.label}
            label={link.label}
            externalLabel={copy.externalLink}
            location="navigation"
          />
        ) : link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
            <span className="sr-only"> ({copy.externalLink})</span>
          </a>
        ) : (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ),
      )}
    </>
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href={home} aria-label={`${profile.displayName} — home`}>
          <span aria-hidden="true">JL</span>
          <span>{profile.displayName}</span>
        </Link>

        <nav className="desktop-nav" aria-label={copy.navigation}>
          {navigation}
        </nav>

        <div className="language-switch" aria-label={copy.languageNavigation}>
          <span aria-current="page">{locale.toUpperCase()}</span>
          <span aria-hidden="true">/</span>
          <Link href={alternate} hrefLang={alternateLocale} lang={alternateLocale}>
            {alternateLocale.toUpperCase()}
          </Link>
        </div>

        <details className="mobile-nav">
          <summary>{copy.menu}</summary>
          <nav aria-label={copy.navigation}>{navigation}</nav>
        </details>
      </div>
    </header>
  );
}
