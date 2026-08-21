import { profile } from "@/content/profile";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import { selectedWorkItems } from "@/content/work-previews";
import { routeFor } from "@/lib/routes";
import { SelectedWorkReel } from "./SelectedWorkReel";
import { SiteShell } from "./SiteShell";
import { StructuredData } from "./StructuredData";
import { LinkedInLink } from "./LinkedInLink";

export function HomeView({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];

  return (
    <SiteShell locale={locale} pageKind="home">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: profile.displayName,
            description: profile.introduction[locale],
            sameAs: [profile.githubUrl, profile.linkedInUrl],
          },
        }}
      />
      <section className="hero grid-frame" aria-labelledby="home-title">
        <div className="hero__index" aria-hidden="true">
          01 / PROFILE
        </div>
        <div className="hero__identity">
          <p className="eyebrow">{profile.displayName}</p>
          <p className="professional-label">{profile.professionalLabel}</p>
        </div>
        <div className="hero__statement">
          <h1 id="home-title">{profile.headline[locale]}</h1>
          <p>{profile.introduction[locale]}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#selected-work">
              {copy.viewWork}
            </a>
            <a
              className="button button--secondary"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              {copy.github}
              <span className="sr-only"> ({copy.externalLink})</span>
            </a>
            <LinkedInLink
              className="button button--secondary"
              label={copy.linkedin}
              externalLabel={copy.externalLink}
              location="hero"
            />
          </div>
        </div>
        <div className="hero__evidence-note">
          <span aria-hidden="true">↘</span>
          <p>
            {locale === "en"
              ? "Public evidence available: two versioned open-source cases."
              : "Evidencia pública disponible: dos casos de código abierto versionados."}
          </p>
        </div>
      </section>

      <section className="section selected-work" id="selected-work" aria-labelledby="selected-title">
        <div className="section-heading">
          <p className="eyebrow">02 / {copy.selectedWork}</p>
          <h2 id="selected-title">{copy.selectedWork}</h2>
          <p>{copy.selectedWorkIntro}</p>
        </div>
        <SelectedWorkReel items={selectedWorkItems} locale={locale} />
      </section>

      <section className="section principles" aria-labelledby="principles-title">
        <div className="section-heading section-heading--narrow">
          <p className="eyebrow">03 / {copy.principlesEyebrow}</p>
          <h2 id="principles-title">{copy.principlesTitle}</h2>
        </div>
        <ol className="principle-grid">
          {copy.principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="principle-number">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading section-heading--narrow">
          <p className="eyebrow">04 / {copy.capabilitiesEyebrow}</p>
          <h2 id="capabilities-title">{copy.capabilitiesTitle}</h2>
        </div>
        <ul className="capability-list">
          {copy.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className="section about" id="about" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">05 / {copy.aboutEyebrow}</p>
          <h2 id="about-title">{copy.aboutTitle}</h2>
        </div>
        <div>
          <p className="lead-copy">{copy.aboutBody}</p>
          <p className="role-line">
            {profile.targetRoles.join(" · ")}
          </p>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">06 / {copy.contactEyebrow}</p>
        <h2 id="contact-title">{copy.contactTitle}</h2>
        <p>{copy.contactBody}</p>
        <div className="contact__actions">
          <a
            className="button button--outline-light"
            href={profile.gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
          >
            {profile.email}
            <span className="sr-only"> ({copy.externalLink})</span>
          </a>
          <a className="button button--light" href={profile.githubUrl} target="_blank" rel="noreferrer">
            {copy.visitGithub} <span aria-hidden="true">↗</span>
            <span className="sr-only"> ({copy.externalLink})</span>
          </a>
          <LinkedInLink
            className="button button--outline-light"
            label={copy.visitLinkedin}
            externalLabel={copy.externalLink}
            location="contact"
          />
        </div>
        <a className="contact__archive-link" href={routeFor(locale, "work")}>
          {copy.archiveTitle} <span aria-hidden="true">→</span>
        </a>
      </section>
    </SiteShell>
  );
}
