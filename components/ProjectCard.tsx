import Link from "next/link";
import type { Locale, Project } from "@/content/types";
import { localize } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";
import { routeFor } from "@/lib/routes";

export function ProjectCard({
  project,
  locale,
  compact = false,
}: {
  project: Project;
  locale: Locale;
  compact?: boolean;
}) {
  const copy = siteCopy[locale];
  const image = project.images[0];
  const disciplines = project.archiveDisciplines
    ? localize(project.archiveDisciplines, locale)
    : locale === "es"
      ? "Análisis de manufactura · Python · PostgreSQL · Power BI"
      : "Manufacturing analytics · Python · PostgreSQL · Power BI";

  return (
    <article className={`project-card${compact ? " project-card--compact" : ""}`}>
      <div className="project-card__media">
        {/* Static evidence has intrinsic dimensions; native img avoids a client image runtime. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={localize(image.alt, locale)}
          loading={compact ? "eager" : "lazy"}
          fetchPriority={compact ? "high" : "auto"}
          decoding="async"
        />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="status-dot">{copy.published}</span>
          <span>{project.year}</span>
        </div>
        <h3>{localize(project.title, locale)}</h3>
        <p className="project-card__type">{localize(project.projectType, locale)}</p>
        <p>{localize(project.shortSummary, locale)}</p>
        <p className="project-card__disciplines">{disciplines}</p>
        <Link className="text-link" href={routeFor(locale, "project", project.slug)}>
          {copy.viewCase} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
