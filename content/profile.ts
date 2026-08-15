import type { LocalizedText } from "./types";

export const profile = {
  displayName: "Jehu Lara",
  professionalLabel: "Quality & Analytics Engineer",
  positioningIsEmploymentClaim: false,
  headline: {
    en: "I turn operational data into auditable decisions.",
    es: "Convierto datos operativos en decisiones auditables.",
  } satisfies LocalizedText,
  introduction: {
    en: "I build quality, operations, and analytics work around explicit assumptions, reproducible evidence, and clear decision boundaries.",
    es: "Construyo análisis de calidad, operaciones y datos con supuestos explícitos, evidencia reproducible y límites claros para decidir.",
  } satisfies LocalizedText,
  githubUrl: "https://github.com/Jehu-Lara",
  linkedInUrl: "https://www.linkedin.com/in/jehu-lara-corona-601956332/",
  email: "Jehulara422@gmail.com",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=Jehulara422%40gmail.com",
  targetRoles: [
    "Quality Engineer",
    "Manufacturing Data Analyst",
    "Analytics Engineer",
  ],
} as const;
