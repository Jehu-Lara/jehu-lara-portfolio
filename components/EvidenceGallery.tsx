"use client";

/* eslint-disable @next/next/no-img-element -- the pinned evidence image must retain its authentic file and dimensions */

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { EvidencePresentationItem, Locale, Project } from "@/content/types";
import { localize } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";

export function EvidenceGallery({ project, locale }: { project: Project; locale: Locale }) {
  const copy = siteCopy[locale];
  const items = project.evidencePresentation.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const currentItem = items[currentIndex];

  function imageSource(item: EvidencePresentationItem) {
    return `/presentations/qualityops/${locale}/${localize(item.image.src, locale)}`;
  }

  function slideStatus(index: number) {
    return locale === "en"
      ? `Slide ${index + 1} of ${items.length}`
      : `Diapositiva ${index + 1} de ${items.length}`;
  }

  function select(index: number) {
    setCurrentIndex(Math.max(0, Math.min(items.length - 1, index)));
  }

  function handleArrowKey(key: string) {
    if (key === "ArrowLeft") select(currentIndex - 1);
    if (key === "ArrowRight") select(currentIndex + 1);
  }

  function openLightbox() {
    dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
  }

  function renderSlide(item: EvidencePresentationItem, index: number, expanded = false) {
    const title = localize(item.title, locale);
    const caption = localize(item.caption, locale);
    const status = slideStatus(index);
    const slideClass = `evidence-slide evidence-slide--deck${expanded ? " evidence-slide--expanded" : ""}`;
    return (
      <figure className={slideClass} aria-label={`${status}: ${title}`}>
        <img
          className="evidence-slide__image"
          src={imageSource(item)}
          width={item.image.width}
          height={item.image.height}
          alt={localize(item.image.alt, locale)}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="sr-only">{status}. {title}. {caption}</figcaption>
      </figure>
    );
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    if (event.key === "Escape" && dialogRef.current?.open) {
      event.preventDefault();
      dialogRef.current?.close();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      handleArrowKey(event.key);
    }
  }

  return (
    <section
      className="evidence-gallery"
      aria-label={copy.presentationLabel}
    >
      <header className="evidence-gallery__header">
        <div>
          <p className="eyebrow">{locale === "en" ? "Visual evidence" : "Evidencia visual"}</p>
          <h3>{localize(project.evidencePresentation.title, locale)}</h3>
          <p>{localize(project.evidencePresentation.description, locale)}</p>
        </div>
        <p className="evidence-gallery__counter" aria-live="polite" aria-atomic="true">
          <span>{currentIndex + 1}</span> {copy.presentationOf} {items.length}
        </p>
      </header>

      <div
        className="evidence-gallery__viewport"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") pointerStartX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current === null || event.pointerType === "mouse") return;
          const distance = event.clientX - pointerStartX.current;
          pointerStartX.current = null;
          if (Math.abs(distance) < 45) return;
          select(distance > 0 ? currentIndex - 1 : currentIndex + 1);
        }}
      >
        {renderSlide(currentItem, currentIndex)}
      </div>

      <div className="evidence-gallery__caption">
        <div className="evidence-gallery__caption-copy">
          <p className="evidence-gallery__slide-status">{slideStatus(currentIndex)}</p>
          <h4>{localize(currentItem.title, locale)}</h4>
          <p>{localize(currentItem.caption, locale)}</p>
          {currentItem.body.length > 0 ? (
            <div className="evidence-gallery__body">
              {currentItem.body.map((paragraph) => (
                <p key={paragraph.en}>{localize(paragraph, locale)}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="evidence-gallery__caption-actions">
          <button
            ref={openButtonRef}
            className="evidence-gallery__expand"
            type="button"
            onClick={openLightbox}
            onKeyDown={onKeyDown}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">+</span> {copy.presentationExpand}
          </button>
          <a href={imageSource(currentItem)} target="_blank" rel="noreferrer">
            {locale === "en" ? "Open full-resolution slide" : "Abrir diapositiva en resolución completa"}
            <span className="sr-only"> ({copy.externalLink})</span>
          </a>
        </div>
      </div>

      <div className="evidence-gallery__controls">
        <button type="button" onClick={() => select(currentIndex - 1)} onKeyDown={onKeyDown} disabled={currentIndex === 0}>
          <span aria-hidden="true">←</span> {copy.presentationPrevious}
        </button>
        <button type="button" onClick={() => select(currentIndex + 1)} onKeyDown={onKeyDown} disabled={currentIndex === items.length - 1}>
          {copy.presentationNext} <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="evidence-gallery__thumbnails" role="group" aria-label={copy.presentationThumbnails}>
        {items.map((item, index) => {
          return (
            <button
              key={item.id}
              type="button"
              className="evidence-thumbnail"
              aria-current={index === currentIndex ? "true" : undefined}
              aria-label={`${index + 1}: ${localize(item.title, locale)}`}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              <img
                src={imageSource(item)}
                alt=""
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                decoding="async"
              />
              <span>{localize(item.title, locale)}</span>
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="evidence-lightbox"
        aria-labelledby="evidence-lightbox-title"
        aria-describedby="evidence-lightbox-caption"
        onKeyDown={onKeyDown}
        onClose={() => openButtonRef.current?.focus()}
      >
        <div className="evidence-lightbox__bar">
          <p id="evidence-lightbox-title">
            {currentIndex + 1} {copy.presentationOf} {items.length} · {localize(currentItem.title, locale)}
          </p>
          <form method="dialog">
            <button ref={closeButtonRef} type="submit">{copy.presentationClose}</button>
          </form>
        </div>
        <div className="evidence-lightbox__slide">{renderSlide(currentItem, currentIndex, true)}</div>
        <div className="evidence-lightbox__caption" id="evidence-lightbox-caption">
          <strong>{localize(currentItem.title, locale)}</strong>
          <p>{localize(currentItem.caption, locale)}</p>
        </div>
      </dialog>
    </section>
  );
}
