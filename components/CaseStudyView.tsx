import type { Locale, Project } from "@/content/types";
import { localize } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";
import { EvidenceGallery } from "./EvidenceGallery";
import { SiteShell } from "./SiteShell";
import { StructuredData } from "./StructuredData";

function SectionHeader({ index, title, id }: { index: string; title: string; id: string }) {
  return (
    <div className="case-section__heading">
      <p className="eyebrow">{index}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

export function CaseStudyView({ project, locale }: { project: Project; locale: Locale }) {
  const copy = siteCopy[locale];
  const isEnglish = locale === "en";
  const commitUrl = `${project.repositoryUrl}/commit/${project.evidenceCommit}`;
  const caseCopy = project.caseCopy;

  return (
    <SiteShell locale={locale} pageKind="project" slug={project.slug}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: localize(project.title, locale),
          description: localize(project.shortSummary, locale),
          codeRepository: project.repositoryUrl,
          license: `${project.repositoryUrl}/blob/${project.evidenceCommit}/LICENSE`,
          dateModified: project.evidenceDate,
          programmingLanguage: caseCopy?.programmingLanguages ?? ["Python", "SQL", "DAX"],
        }}
      />

      <header className="case-hero grid-frame">
        <p className="eyebrow">01 / {copy.caseStudy}</p>
        <div className="case-hero__title">
          <h1>{localize(project.title, locale)}</h1>
          <p>{localize(project.projectType, locale)}</p>
        </div>
        <p className="case-hero__summary">{localize(project.shortSummary, locale)}</p>
        <dl className="case-facts">
          <div>
            <dt>{copy.status}</dt>
            <dd>{copy.published}</dd>
          </div>
          <div>
            <dt>{isEnglish ? "Evidence" : "Evidencia"}</dt>
            <dd>{caseCopy ? localize(caseCopy.evidenceDisplayDate, locale) : isEnglish ? "Aug 14, 2026" : "14 ago 2026"}</dd>
          </div>
          <div>
            <dt>{isEnglish ? "Stack" : "Tecnologías"}</dt>
            <dd>{project.technologies.join(" · ")}</dd>
          </div>
        </dl>
        <p className="evidence-stamp">
          {caseCopy ? localize(caseCopy.evidenceStamp, locale) : isEnglish ? "Evidence as of Aug 14, 2026" : "Evidencia al 14 ago 2026"} · {isEnglish ? "source" : "fuente"}{" "}
          <a href={commitUrl} target="_blank" rel="noreferrer">
            {project.evidenceCommit.slice(0, 7)}
            <span className="sr-only"> ({copy.externalLink})</span>
          </a>
        </p>
        {caseCopy?.heroLinks?.length ? (
          <ul className="case-hero__actions" aria-label={isEnglish ? "Project links" : "Enlaces del proyecto"}>
            {caseCopy.heroLinks.map((link) => (
              <li key={link.url}>
                <a className="button" href={link.url} target="_blank" rel="noreferrer">
                  {localize(link.label, locale)} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> ({copy.externalLink})</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <aside className="boundary-banner" aria-labelledby="boundary-banner-title">
        <p className="eyebrow">{copy.limitsLabel}</p>
        <h2 id="boundary-banner-title">
          {caseCopy
            ? localize(caseCopy.boundaryTitle, locale)
            : isEnglish
              ? "Descriptive evidence, deliberately bounded"
              : "Evidencia descriptiva, deliberadamente acotada"}
        </h2>
        <p>
          {caseCopy
            ? localize(caseCopy.boundaryBody, locale)
            : isEnglish
              ? "This case demonstrates a reproducible analytical workflow and internal reconciliation. It does not demonstrate process capability, causal drivers, production readiness, or industrial scale."
              : "Este caso demuestra un flujo analítico reproducible y reconciliación interna. No demuestra capacidad de proceso, causas, preparación para producción ni escala industrial."}
        </p>
      </aside>

      <section className="case-section" aria-labelledby="summary-title">
        <SectionHeader index="02" id="summary-title" title={isEnglish ? "Executive summary" : "Resumen ejecutivo"} />
        <div className="case-section__content prose">
          <p>{localize(project.problem[0], locale)}</p>
          <p>{localize(project.problem[1], locale)}</p>
          <div className="role-box">
            <h3>{isEnglish ? "My scope" : "Mi alcance"}</h3>
            <p>{localize(project.role, locale)}</p>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="approach-title">
        <SectionHeader index="03" id="approach-title" title={isEnglish ? "What I built" : "Qué construí"} />
        <div className="case-section__content">
          <ol className="numbered-list">
            {project.approach.map((item, index) => (
              <li key={localize(item, locale)}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <p>{localize(item, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-section case-section--architecture" aria-labelledby="architecture-title">
        <SectionHeader index="04" id="architecture-title" title={isEnglish ? "Architecture and data flow" : "Arquitectura y flujo de datos"} />
        <div className="case-section__content">
          <p className="section-intro">
            {caseCopy
              ? localize(caseCopy.architectureIntro, locale)
              : isEnglish
                ? "Each stage narrows a different risk: source integrity, calculation clarity, persistence integrity, independent querying, decision communication, and regression protection."
                : "Cada etapa reduce un riesgo distinto: integridad de fuentes, claridad de cálculo, integridad de persistencia, consulta independiente, comunicación de decisiones y protección ante regresiones."}
          </p>
          <ol className="architecture-flow">
            {project.architecture.map((stage, index) => (
              <li key={localize(stage.label, locale)}>
                <span className="architecture-flow__number">{(index + 1).toString().padStart(2, "0")}</span>
                <h3>{localize(stage.label, locale)}</h3>
                <p>{localize(stage.description, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-section" aria-labelledby="validation-title">
        <SectionHeader index="05" id="validation-title" title={caseCopy ? localize(caseCopy.validationTitle, locale) : isEnglish ? "Validation and reconciliation" : "Validación y reconciliación"} />
        <div className="case-section__content">
          <ul className="validation-list">
            {project.validation.map((item) => (
              <li key={localize(item, locale)}>{localize(item, locale)}</li>
            ))}
          </ul>
          <EvidenceGallery project={project} locale={locale} />
        </div>
      </section>

      <section className="findings-section" aria-labelledby="findings-title">
        <div className="findings-section__heading">
          <p className="eyebrow">06</p>
          <h2 id="findings-title">{caseCopy ? localize(caseCopy.findingsTitle, locale) : isEnglish ? "Evidence-backed findings" : "Hallazgos respaldados por evidencia"}</h2>
          <p>
            {caseCopy
              ? localize(caseCopy.findingsIntro, locale)
              : isEnglish
                ? "Every number carries its meaning and its boundary."
                : "Cada cifra incluye su significado y su límite."}
          </p>
        </div>
        <div className="finding-grid">
          {project.findings.map((finding) => (
            <article key={finding.value + finding.label.en} className="finding-card">
              <p className="finding-card__value">{finding.value}</p>
              <h3>{localize(finding.label, locale)}</h3>
              <dl>
                <div>
                  <dt>{isEnglish ? "Represents" : "Representa"}</dt>
                  <dd>{localize(finding.represents, locale)}</dd>
                </div>
                <div>
                  <dt>{isEnglish ? "Why it matters" : "Por qué importa"}</dt>
                  <dd>{localize(finding.matters, locale)}</dd>
                </div>
                <div>
                  <dt>{isEnglish ? "Does not show" : "No demuestra"}</dt>
                  <dd>{localize(finding.doesNotShow, locale)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section limits-section" aria-labelledby="limits-title">
        <SectionHeader index="07" id="limits-title" title={caseCopy ? localize(caseCopy.limitsTitle, locale) : isEnglish ? "Boundaries and unsupported conclusions" : "Límites y conclusiones no respaldadas"} />
        <div className="case-section__content">
          <ul className="limits-list">
            {project.boundaries.map((boundary) => (
              <li key={localize(boundary, locale)}>{localize(boundary, locale)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-section provenance-section" aria-labelledby="provenance-title">
        <SectionHeader index="08" id="provenance-title" title={isEnglish ? "Source and provenance" : "Fuente y procedencia"} />
        <div className="case-section__content">
          <p>
            {caseCopy
              ? localize(caseCopy.provenanceIntro, locale)
              : isEnglish
                ? "All public technical statements on this page are bounded by the pinned repository evidence."
                : "Todas las afirmaciones técnicas públicas de esta página están delimitadas por la evidencia fijada del repositorio."}
          </p>
          <details className="provenance-disclosure">
            <summary>{copy.provenance}</summary>
            <dl>
              <div>
                <dt>{isEnglish ? "Repository" : "Repositorio"}</dt>
                <dd><a href={project.repositoryUrl}>{project.repositoryUrl}</a></dd>
              </div>
              <div>
                <dt>SHA</dt>
                <dd><a href={commitUrl}>{project.evidenceCommit}</a></dd>
              </div>
              <div>
                <dt>{isEnglish ? "Evidence date" : "Fecha de evidencia"}</dt>
                <dd>{project.evidenceDate}</dd>
              </div>
              <div>
                <dt>{isEnglish ? "Documents consulted" : "Documentos consultados"}</dt>
                <dd>
                  <ul>
                    {project.evidenceDocuments.map((document) => <li key={document}>{document}</li>)}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>{isEnglish ? "Licensing" : "Licencias"}</dt>
                <dd>
                  {caseCopy
                    ? localize(caseCopy.licensing, locale)
                    : isEnglish
                      ? "Project-authored code and documentation are MIT. The original UCI SECOM files and derived representations, including the screenshot, retain CC BY 4.0."
                      : "El código y la documentación del proyecto usan MIT. Los archivos originales UCI SECOM y sus representaciones derivadas, incluida la captura, conservan CC BY 4.0."}
                </dd>
              </div>
            </dl>
          </details>
          <ul className="source-links">
            {project.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {localize(link.label, locale)} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> ({copy.externalLink})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
