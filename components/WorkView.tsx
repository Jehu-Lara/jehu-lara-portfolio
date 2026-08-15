import { getPublishedProjects } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import { SiteShell } from "./SiteShell";

export function WorkView({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const projects = getPublishedProjects();
  return (
    <SiteShell locale={locale} pageKind="work">
      <header className="archive-hero grid-frame">
        <p className="eyebrow">01 / {copy.archiveEyebrow}</p>
        <h1>{copy.archiveTitle}</h1>
        <p>{copy.archiveIntro}</p>
        <p className="archive-count">
          {projects.length.toString().padStart(2, "0")} / {locale === "en" ? "published cases" : "casos publicados"}
        </p>
      </header>
      <section className="project-archive" aria-label={copy.archiveTitle}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </section>
    </SiteShell>
  );
}

