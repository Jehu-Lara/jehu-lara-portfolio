import Link from "next/link";
import { profile } from "@/content/profile";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import { routeFor } from "@/lib/routes";
import { LinkedInLink } from "./LinkedInLink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-name" href={routeFor(locale, "home")}>
          {profile.displayName}
        </Link>
        <p>{copy.footerNote}</p>
      </div>
      <div className="footer-socials">
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">
          {copy.github}
          <span className="sr-only"> ({copy.externalLink})</span>
        </a>
        <LinkedInLink
          label={copy.linkedin}
          externalLabel={copy.externalLink}
          location="footer"
        />
      </div>
    </footer>
  );
}
