import { getProject } from "./projects";
import type { LocalizedText } from "./types";

interface WorkPreviewImage {
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
}

interface WorkPreviewFlow {
  kind: "flow";
  label: LocalizedText;
  stages: LocalizedText[];
}

export interface WorkPreview {
  id: string;
  status: "published" | "development";
  year: string;
  title: LocalizedText;
  projectType: LocalizedText;
  summary: LocalizedText;
  technologies: string[];
  notes?: LocalizedText[];
  boundary?: LocalizedText;
  caseSlug?: string;
  visual: WorkPreviewImage | WorkPreviewFlow;
}

const qualityOps = getProject("qualityops");
const paro = getProject("paro-live-oee-platform");
const dmaic = getProject("dmaic-pcba-case");

if (!qualityOps || !paro || !dmaic) {
  throw new Error("The published QualityOps, PARO, and DMAIC cases are required for selected work.");
}

export const selectedWorkItems: WorkPreview[] = [
  {
    id: qualityOps.slug,
    status: "published",
    year: qualityOps.year,
    title: qualityOps.title,
    projectType: qualityOps.projectType,
    summary: qualityOps.shortSummary,
    technologies: qualityOps.technologies,
    caseSlug: qualityOps.slug,
    visual: {
      kind: "image",
      src: qualityOps.images[0].src,
      width: qualityOps.images[0].width,
      height: qualityOps.images[0].height,
      alt: qualityOps.images[0].alt,
    },
  },
  {
    id: paro.slug,
    status: "published",
    year: paro.year,
    title: paro.title,
    projectType: paro.projectType,
    summary: paro.shortSummary,
    technologies: paro.technologies,
    caseSlug: paro.slug,
    visual: {
      kind: "image",
      src: paro.images[0].src,
      width: paro.images[0].width,
      height: paro.images[0].height,
      alt: paro.images[0].alt,
    },
  },
  {
    id: dmaic.slug,
    status: "published",
    year: dmaic.year,
    title: dmaic.title,
    projectType: dmaic.projectType,
    summary: dmaic.shortSummary,
    technologies: dmaic.technologies,
    caseSlug: dmaic.slug,
    visual: {
      kind: "image",
      src: dmaic.images[0].src,
      width: dmaic.images[0].width,
      height: dmaic.images[0].height,
      alt: dmaic.images[0].alt,
    },
  },
];
