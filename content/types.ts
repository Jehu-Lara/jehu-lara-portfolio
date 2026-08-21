export type Locale = "en" | "es";

export type LocalizedText = Record<Locale, string>;

export type ProjectStatus = "published" | "draft" | "archived";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  longDescription: LocalizedText;
  attribution: LocalizedText;
}

export interface ArchitectureStage {
  label: LocalizedText;
  description: LocalizedText;
}

export interface EvidenceFinding {
  value: string;
  label: LocalizedText;
  represents: LocalizedText;
  matters: LocalizedText;
  doesNotShow: LocalizedText;
}

export type EvidencePresentationKind =
  | "overview"
  | "architecture"
  | "metrics"
  | "image"
  | "validation"
  | "roadmap";

export interface EvidencePresentationMetric {
  value: string;
  label: LocalizedText;
  interpretation: LocalizedText;
}

export interface EvidencePresentationImage {
  src: LocalizedText;
  alt: LocalizedText;
  width: number;
  height: number;
}

export interface EvidencePresentationItem {
  id: string;
  kind: EvidencePresentationKind;
  title: LocalizedText;
  caption: LocalizedText;
  body: LocalizedText[];
  image: EvidencePresentationImage;
  metrics?: EvidencePresentationMetric[];
}

export interface EvidencePresentation {
  title: LocalizedText;
  description: LocalizedText;
  items: EvidencePresentationItem[];
}

export interface ProjectLink {
  label: LocalizedText;
  url: string;
  kind: "repository" | "evidence" | "license";
}

export interface CaseStudyCopy {
  evidenceDisplayDate: LocalizedText;
  evidenceStamp: LocalizedText;
  boundaryTitle: LocalizedText;
  boundaryBody: LocalizedText;
  architectureIntro: LocalizedText;
  validationTitle: LocalizedText;
  findingsTitle: LocalizedText;
  findingsIntro: LocalizedText;
  limitsTitle: LocalizedText;
  provenanceIntro: LocalizedText;
  licensing: LocalizedText;
  programmingLanguages: string[];
  structuredDataType?: "SoftwareSourceCode" | "CreativeWork";
  evidenceSourceUrl?: string;
  evidenceSourceLabel?: LocalizedText;
  sourceTypeLabel?: LocalizedText;
  sourceIdentifierLabel?: LocalizedText;
  heroLinks?: ProjectLink[];
}

export interface Project {
  slug: string;
  status: ProjectStatus;
  featured: boolean;
  year: string;
  title: LocalizedText;
  shortSummary: LocalizedText;
  projectType: LocalizedText;
  audience: LocalizedText[];
  role: LocalizedText;
  problem: LocalizedText[];
  approach: LocalizedText[];
  architecture: ArchitectureStage[];
  validation: LocalizedText[];
  findings: EvidenceFinding[];
  boundaries: LocalizedText[];
  evidencePresentation: EvidencePresentation;
  disciplines: string[];
  technologies: string[];
  repositoryUrl: string;
  evidenceDate: string;
  evidenceCommit: string;
  evidenceDocuments: string[];
  images: ProjectImage[];
  links: ProjectLink[];
  archiveDisciplines?: LocalizedText;
  caseCopy?: CaseStudyCopy;
}
