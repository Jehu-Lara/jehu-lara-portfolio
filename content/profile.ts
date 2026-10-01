import type { LocalizedText } from "./types";

export const profile = {
  displayName: "Jehu Lara",
  professionalLabel: {
    en: "Founder & CEO of Reperta",
    es: "Fundador y CEO de Reperta",
  } satisfies LocalizedText,
  headline: {
    en: "From real problems to new companies.",
    es: "De problemas reales a nuevas empresas.",
  } satisfies LocalizedText,
  introduction: {
    en: "I'm building Reperta, an independent studio in Monterrey that investigates business problems to develop companies that solve them.",
    es: "Estoy construyendo Reperta, un estudio independiente de Monterrey que investiga problemas de negocio para desarrollar empresas que los resuelvan.",
  } satisfies LocalizedText,
  githubUrl: "https://github.com/Jehu-Lara",
  linkedInUrl: "https://www.linkedin.com/in/jehu-lara-corona-601956332/",
  email: "Jehulara422@gmail.com",
  gmailComposeUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=Jehulara422%40gmail.com",
  focusAreas: {
    en: ["Business research", "Product strategy", "Prototyping"],
    es: ["Investigación de negocio", "Estrategia de producto", "Prototipos"],
  },
  currentVenture: {
    name: "Reperta",
    urls: {
      en: "https://reperta.com.mx/en/",
      es: "https://reperta.com.mx/",
    },
    methodologyUrls: {
      en: "https://reperta.com.mx/en/what-we-learn/",
      es: "https://reperta.com.mx/lo-que-aprendemos/",
    },
    stage: {
      en: "In development · Research and discovery",
      es: "En desarrollo · Investigación y descubrimiento",
    } satisfies LocalizedText,
    description: {
      en: "I lead strategy, priorities, and the team. My current work combines research, opportunity assessment, and prototypes to decide what is worth building.",
      es: "Dirijo la estrategia, las prioridades y el equipo. Mi trabajo actual combina investigación, evaluación de oportunidades y prototipos para decidir qué vale la pena construir.",
    } satisfies LocalizedText,
  },
} as const;
