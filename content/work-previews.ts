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

if (!qualityOps) {
  throw new Error("The published QualityOps case is required for selected work.");
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
    id: "paro",
    status: "development",
    year: "2026",
    title: { en: "PARO", es: "PARO" },
    projectType: {
      en: "Operational data platform for manufacturing",
      es: "Plataforma de datos operativos para manufactura",
    },
    summary: {
      en: "Captures downtime events and production records, calculates OEE deterministically and auditably, and exposes an analytics schema connectable to Power BI.",
      es: "Captura paros y registros de producción, calcula OEE de forma determinista y auditable, y expone un esquema analítico conectable a Power BI.",
    },
    technologies: ["Python 3.14", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic", "PostgreSQL"],
    notes: [
      {
        en: "The OEE engine, migrations, HTTP API, and two analytical views already exist.",
        es: "El motor OEE, las migraciones, la API HTTP y dos vistas analíticas ya existen.",
      },
      {
        en: "Local development uses SQLite; PostgreSQL is validated in CI.",
        es: "El desarrollo local usa SQLite; PostgreSQL se valida en CI.",
      },
    ],
    boundary: {
      en: "Synthetic demonstration data · No frontend, authentication, sensors, or MES integration",
      es: "Datos de demostración sintéticos · Sin frontend, autenticación, sensores ni integración MES",
    },
    visual: {
      kind: "flow",
      label: {
        en: "PARO operational data flow",
        es: "Flujo de datos operativos de PARO",
      },
      stages: [
        { en: "Downtime events", es: "Eventos de paro" },
        { en: "OEE engine", es: "Motor OEE" },
        { en: "PostgreSQL views", es: "Vistas PostgreSQL" },
        { en: "Power BI", es: "Power BI" },
      ],
    },
  },
];
