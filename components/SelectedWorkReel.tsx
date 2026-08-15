"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { localize } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";
import type { Locale } from "@/content/types";
import type { WorkPreview } from "@/content/work-previews";
import { routeFor } from "@/lib/routes";

export function SelectedWorkReel({ items, locale }: { items: WorkPreview[]; locale: Locale }) {
  const copy = siteCopy[locale];
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const currentItem = items[currentIndex];

  function select(index: number) {
    setCurrentIndex((index + items.length) % items.length);
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      select(currentIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  }

  const status = currentItem.status === "published" ? copy.published : copy.inDevelopment;

  return (
    <section
      className="selected-work-reel"
      aria-roledescription="carousel"
      aria-label={copy.selectedWorkReelLabel}
    >
      <div className="selected-work-reel__toolbar">
        <p className="selected-work-reel__counter" aria-live="polite" aria-atomic="true">
          <span>{currentIndex + 1}</span> {copy.selectedWorkOf} {items.length}
        </p>
        <div className="selected-work-reel__controls">
          <button type="button" onClick={() => select(currentIndex - 1)} onKeyDown={onKeyDown} aria-label={copy.selectedWorkPrevious}>
            <span aria-hidden="true">←</span> {copy.selectedWorkPrevious}
          </button>
          <button type="button" onClick={() => select(currentIndex + 1)} onKeyDown={onKeyDown} aria-label={copy.selectedWorkNext}>
            {copy.selectedWorkNext} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className="selected-work-reel__viewport"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") pointerStartX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current === null || event.pointerType === "mouse") return;
          const distance = event.clientX - pointerStartX.current;
          pointerStartX.current = null;
          if (Math.abs(distance) < 45) return;
          select(currentIndex + (distance > 0 ? -1 : 1));
        }}
      >
        <article
          key={currentItem.id}
          className={`project-card project-card--preview project-card--${currentItem.visual.kind}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentIndex + 1} ${copy.selectedWorkOf} ${items.length}: ${localize(currentItem.title, locale)}`}
        >
          <div className={`project-card__media project-card__media--${currentItem.visual.kind}`}>
            {currentItem.visual.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element -- pinned evidence keeps its authentic dimensions
              <img
                src={currentItem.visual.src}
                width={currentItem.visual.width}
                height={currentItem.visual.height}
                alt={localize(currentItem.visual.alt, locale)}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : (
              <ol className="paro-flow" aria-label={localize(currentItem.visual.label, locale)}>
                {currentItem.visual.stages.map((stage, index) => (
                  <li key={stage.en}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <strong>{localize(stage, locale)}</strong>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="project-card__body">
            <div className="project-card__meta">
              <span className={`status-dot status-dot--${currentItem.status}`}>{status}</span>
              <span>{currentItem.year}</span>
            </div>
            <h3>{localize(currentItem.title, locale)}</h3>
            <p className="project-card__type">{localize(currentItem.projectType, locale)}</p>
            <p>{localize(currentItem.summary, locale)}</p>
            {currentItem.notes ? (
              <ul className="project-card__notes">
                {currentItem.notes.map((note) => <li key={note.en}>{localize(note, locale)}</li>)}
              </ul>
            ) : null}
            <p className="project-card__disciplines">{currentItem.technologies.join(" · ")}</p>
            {currentItem.boundary ? (
              <p className="project-card__boundary">{localize(currentItem.boundary, locale)}</p>
            ) : null}
            {currentItem.caseSlug ? (
              <Link className="text-link" href={routeFor(locale, "project", currentItem.caseSlug)}>
                {copy.viewCase} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <p className="project-card__availability">{copy.caseInDevelopment}</p>
            )}
          </div>
        </article>
      </div>

      <div className="selected-work-reel__indicators" role="group" aria-label={copy.selectedWorkIndicators}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className="selected-work-reel__indicator"
            data-work-preview-id={item.id}
            aria-current={index === currentIndex ? "true" : undefined}
            aria-label={`${index + 1}: ${localize(item.title, locale)}`}
            onClick={() => select(index)}
            onKeyDown={onKeyDown}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {localize(item.title, locale)}
          </button>
        ))}
      </div>
    </section>
  );
}
