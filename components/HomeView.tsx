import { profile } from "@/content/profile";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import { getPublishedProjects } from "@/content/projects";
import { routeFor } from "@/lib/routes";
import { ProjectCard } from "./ProjectCard";
import { SiteShell } from "./SiteShell";
import { StructuredData } from "./StructuredData";
import { LinkedInLink } from "./LinkedInLink";

export function HomeView({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const projects = getPublishedProjects().sort((a, b) =>
    Number(b.slug === "manufacturing-rag-assistant") - Number(a.slug === "manufacturing-rag-assistant"),
  );

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
        <div className="hero__identity">
          <p className="eyebrow">{profile.displayName}</p>
          <p className="professional-label">{profile.professionalLabel[locale]}</p>
        </div>
        <div className="hero__statement">
          <h1 id="home-title">{profile.headline[locale]}</h1>
          <p>{profile.introduction[locale]}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#reperta">
              {copy.exploreVenture}
            </a>
            <a className="button button--secondary" href="#selected-work">
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
      </section>

      <section className="section current-venture" id="reperta" aria-labelledby="reperta-title">
        <div className="current-venture__identity">
          <p className="current-venture__label">{copy.currentVenture}</p>
          <h2 id="reperta-title" className="current-venture__wordmark">
            {profile.currentVenture.name.toLowerCase()}<span aria-hidden="true">.</span>
          </h2>
          <p className="current-venture__stage">{profile.currentVenture.stage[locale]}</p>
        </div>
        <div className="current-venture__body">
          <h3>{copy.ventureMission}</h3>
          <p>{profile.currentVenture.description[locale]}</p>
          <div className="current-venture__actions">
            <a className="button button--primary" href={profile.currentVenture.urls[locale]} target="_blank" rel="noreferrer">
              {copy.exploreVenture}
              <span className="sr-only"> ({copy.externalLink})</span>
            </a>
            <a className="current-venture__method" href={profile.currentVenture.methodologyUrls[locale]} target="_blank" rel="noreferrer">
              {copy.ventureMethodology}
              <span className="sr-only"> ({copy.externalLink})</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section selected-work" id="selected-work" aria-labelledby="selected-title">
        <div className="section-heading">
          <h2 id="selected-title">{copy.selectedWork}</h2>
          <p>{copy.selectedWorkIntro}</p>
        </div>
        <div className="selected-work-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}
        </div>
        <div className="work__evidence-note">
          <p>
            {locale === "en"
              ? "Public evidence available: three versioned open-source cases and one report-backed DMAIC case."
              : "Evidencia pública disponible: tres casos abiertos versionados y un caso DMAIC respaldado por reporte."}
          </p>
        </div>
      </section>

      <section className="section principles" aria-labelledby="principles-title">
        <div className="section-heading section-heading--narrow">
          <h2 id="principles-title">{copy.principlesTitle}</h2>
        </div>
        <ol className="principle-grid">
          {copy.principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="principle-number" aria-hidden="true">0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section capabilities" aria-labelledby="capabilities-title">
        <div className="section-heading section-heading--narrow">
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
          <h2 id="about-title">{copy.aboutTitle}</h2>
        </div>
        <div>
          <p className="lead-copy">{copy.aboutBody}</p>
          <p className="role-line">
            {profile.focusAreas[locale].join(" · ")}
          </p>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
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
