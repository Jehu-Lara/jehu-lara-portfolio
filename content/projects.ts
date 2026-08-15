import type { Locale, Project } from "./types";

export const projects: Project[] = [
  {
    slug: "qualityops",
    status: "published",
    featured: true,
    year: "2026",
    title: { en: "QualityOps", es: "QualityOps" },
    shortSummary: {
      en: "Auditable manufacturing-data analysis across Python, PostgreSQL, SQL, Power BI, and CI.",
      es: "Análisis auditable de datos de manufactura con Python, PostgreSQL, SQL, Power BI y CI.",
    },
    projectType: {
      en: "Independent open-source technical project",
      es: "Proyecto técnico independiente y de código abierto",
    },
    audience: [
      {
        en: "Quality and operations teams",
        es: "Equipos de calidad y operaciones",
      },
      {
        en: "Manufacturing analysts",
        es: "Analistas de manufactura",
      },
      {
        en: "Technical reviewers",
        es: "Revisores técnicos",
      },
    ],
    role: {
      en: "Designed and built the package, data-quality controls, statistical validation, PostgreSQL persistence, audited SQL layer, Power BI evidence view, and automated checks.",
      es: "Diseñé y construí el paquete, los controles de calidad de datos, la validación estadística, la persistencia en PostgreSQL, la capa SQL auditada, la vista de evidencia en Power BI y las comprobaciones automatizadas.",
    },
    problem: [
      {
        en: "Manufacturing analyses can look precise while concealing choices about missing data, subgrouping, variation estimates, and the limits of descriptive evidence.",
        es: "Los análisis de manufactura pueden parecer precisos mientras ocultan decisiones sobre datos faltantes, subgrupos, estimaciones de variación y límites de la evidencia descriptiva.",
      },
      {
        en: "The project tests a narrower proposition: can an analysis make those choices inspectable and reconcile the resulting claims across independent technical layers?",
        es: "El proyecto pone a prueba una propuesta más acotada: ¿puede un análisis volver inspeccionables esas decisiones y reconciliar sus afirmaciones entre capas técnicas independientes?",
      },
    ],
    approach: [
      {
        en: "Create strict data-ingestion and statistical contracts in an installable Python package and CLI.",
        es: "Crear contratos estrictos de ingestión y estadística en un paquete instalable de Python y una CLI.",
      },
      {
        en: "Audit a public, externally sourced manufacturing dataset before persisting it without imputation.",
        es: "Auditar un conjunto público y externo de datos de manufactura antes de persistirlo sin imputación.",
      },
      {
        en: "Reconcile decision-facing Power BI measures against audited SQL and independent Python calculations.",
        es: "Reconciliar las medidas de Power BI orientadas a decisiones contra SQL auditado y cálculos independientes en Python.",
      },
    ],
    architecture: [
      {
        label: { en: "Excel / public SECOM", es: "Excel / SECOM público" },
        description: {
          en: "Controlled inputs enter through strict workbook selection or hash-verified public source files.",
          es: "Las entradas controladas llegan mediante selección estricta de libros o archivos públicos verificados por hash.",
        },
      },
      {
        label: { en: "Python", es: "Python" },
        description: {
          en: "Parsing, data-quality checks, statistical methods, and deterministic source oracles make assumptions explicit.",
          es: "El parseo, los controles de calidad, los métodos estadísticos y los oráculos deterministas hacen explícitos los supuestos.",
        },
      },
      {
        label: { en: "PostgreSQL", es: "PostgreSQL" },
        description: {
          en: "A normalized schema stores observations, sensors, and measurements through one transactional, idempotent load.",
          es: "Un esquema normalizado almacena observaciones, sensores y mediciones mediante una carga transaccional e idempotente.",
        },
      },
      {
        label: { en: "Audited SQL", es: "SQL auditado" },
        description: {
          en: "Twenty parameterized, read-only queries provide a second analytical and reconciliation layer.",
          es: "Veinte consultas parametrizadas y de solo lectura ofrecen una segunda capa de análisis y reconciliación.",
        },
      },
      {
        label: { en: "Power BI", es: "Power BI" },
        description: {
          en: "A one-page, read-only decision view communicates dataset health, observed outcomes, and descriptive associations.",
          es: "Una vista de una página y solo lectura comunica salud de datos, resultados observados y asociaciones descriptivas.",
        },
      },
      {
        label: { en: "CI evidence", es: "Evidencia de CI" },
        description: {
          en: "Automated checks protect calculation contracts, reconciliation evidence, documentation boundaries, and sensitive-data controls.",
          es: "Las comprobaciones automatizadas protegen contratos de cálculo, evidencia de reconciliación, límites documentales y controles de datos sensibles.",
        },
      },
    ],
    validation: [
      {
        en: "One-way ANOVA, Pearson correlation, and simple linear regression matched Minitab on the same versioned datasets within displayed precision and reached the same conclusions at α = 0.05.",
        es: "ANOVA de una vía, correlación de Pearson y regresión lineal simple coincidieron con Minitab sobre los mismos datos versionados dentro de la precisión mostrada y llegaron a las mismas conclusiones con α = 0.05.",
      },
      {
        en: "The PostgreSQL load validates source hashes and quality oracles before connecting, uses one transaction, rolls back on exceptions, and validates an identical second load without writing again.",
        es: "La carga a PostgreSQL valida hashes y oráculos de calidad antes de conectarse, usa una sola transacción, revierte ante excepciones y valida una segunda carga idéntica sin volver a escribir.",
      },
      {
        en: "Six DAX result sets reconciled against corresponding SQL queries and independent Python oracles. This establishes consistency inside the tested scope, not causal correctness.",
        es: "Seis conjuntos de resultados DAX se reconciliaron contra consultas SQL correspondientes y oráculos independientes en Python. Esto establece consistencia dentro del alcance probado, no exactitud causal.",
      },
    ],
    findings: [
      {
        value: "1,567",
        label: { en: "observations", es: "observaciones" },
        represents: {
          en: "Every source measurement row has a corresponding outcome and timestamp.",
          es: "Cada fila de mediciones de origen tiene un resultado y una marca de tiempo correspondientes.",
        },
        matters: {
          en: "It defines the bounded population inspected by this public dataset audit.",
          es: "Define la población acotada inspeccionada por esta auditoría del conjunto público.",
        },
        doesNotShow: {
          en: "It does not establish deployment scale or represent all manufacturing contexts.",
          es: "No establece escala de despliegue ni representa todos los contextos de manufactura.",
        },
      },
      {
        value: "1,463 / 104",
        label: { en: "observed pass / fail", es: "pass / fail observados" },
        represents: {
          en: "The labels in the source are strongly imbalanced: 93.36% pass and 6.64% fail.",
          es: "Las etiquetas de origen están fuertemente desbalanceadas: 93.36 % pass y 6.64 % fail.",
        },
        matters: {
          en: "The imbalance changes how outcome comparisons should be read and validated.",
          es: "El desbalance cambia cómo deben leerse y validarse las comparaciones de resultados.",
        },
        doesNotShow: {
          en: "It is not evidence of process health, capability, or acceptable performance.",
          es: "No es evidencia de salud, capacidad ni desempeño aceptable del proceso.",
        },
      },
      {
        value: "590",
        label: { en: "measurement sensors", es: "sensores de medición" },
        represents: {
          en: "The physical measurement columns preserved from the public source.",
          es: "Las columnas físicas de medición conservadas desde la fuente pública.",
        },
        matters: {
          en: "It creates a wide analytical surface where missingness and constant signals require explicit controls.",
          es: "Crea una superficie analítica amplia donde los faltantes y señales constantes requieren controles explícitos.",
        },
        doesNotShow: {
          en: "The source does not provide specification limits or a suitable within-subgroup sigma.",
          es: "La fuente no proporciona límites de especificación ni una sigma adecuada dentro de subgrupos.",
        },
      },
      {
        value: "924,530",
        label: { en: "measurement coordinates", es: "coordenadas de medición" },
        represents: {
          en: "The complete 1,567 × 590 observation-and-sensor grid, including missing coordinates.",
          es: "La cuadrícula completa de 1,567 × 590 observaciones y sensores, incluidos los faltantes.",
        },
        matters: {
          en: "The normalized database reconciles every coordinate rather than only non-null values.",
          es: "La base normalizada reconcilia cada coordenada, no solo los valores no nulos.",
        },
        doesNotShow: {
          en: "The count is not a capacity or industrial scalability benchmark.",
          es: "El conteo no es una prueba de capacidad ni de escalabilidad industrial.",
        },
      },
      {
        value: "41,951",
        label: { en: "missing measurements", es: "mediciones faltantes" },
        represents: {
          en: "Source NaN values retained as SQL NULL without imputation, across 538 sensors.",
          es: "Valores NaN de origen conservados como NULL de SQL sin imputación, distribuidos en 538 sensores.",
        },
        matters: {
          en: "Missingness is a material data-quality risk that must remain visible in interpretation.",
          es: "Los faltantes son un riesgo material de calidad de datos que debe permanecer visible al interpretar.",
        },
        doesNotShow: {
          en: "Missing values alone do not identify their operational cause or impact.",
          es: "Los valores faltantes por sí solos no identifican su causa ni impacto operativo.",
        },
      },
      {
        value: "20",
        label: { en: "audited SQL queries", es: "consultas SQL auditadas" },
        represents: {
          en: "A parameterized, read-only analytical contract over the persisted data.",
          es: "Un contrato analítico parametrizado y de solo lectura sobre los datos persistidos.",
        },
        matters: {
          en: "The queries add traceability and an independent layer for reconciling claims.",
          es: "Las consultas añaden trazabilidad y una capa independiente para reconciliar afirmaciones.",
        },
        doesNotShow: {
          en: "The number of queries does not demonstrate production capacity or industrial scale.",
          es: "El número de consultas no demuestra capacidad de producción ni escala industrial.",
        },
      },
    ],
    boundaries: [
      {
        en: "SECOM does not support Cp, Cpk, Pp, or Ppk conclusions because it lacks documented specification limits and a suitable within-subgroup sigma.",
        es: "SECOM no respalda conclusiones de Cp, Cpk, Pp o Ppk porque carece de límites de especificación documentados y una sigma adecuada dentro de subgrupos.",
      },
      {
        en: "Observed associations and standardized mean differences do not identify root causes or establish causality.",
        es: "Las asociaciones observadas y diferencias de medias estandarizadas no identifican causas raíz ni establecen causalidad.",
      },
      {
        en: "Reconciliation across Python, SQL, and DAX demonstrates consistency within the validated scope; it does not establish industrial validity.",
        es: "La reconciliación entre Python, SQL y DAX demuestra consistencia dentro del alcance validado; no establece validez industrial.",
      },
      {
        en: "The repository is an alpha portfolio artifact, not an operational quality-management system or a deployed service.",
        es: "El repositorio es un artefacto de portafolio en estado alfa, no un sistema operativo de gestión de calidad ni un servicio desplegado.",
      },
      {
        en: "The Power BI view is a local, read-only consumer of PostgreSQL and was not published to Power BI Service or Fabric.",
        es: "La vista de Power BI es un consumidor local y de solo lectura de PostgreSQL; no se publicó en Power BI Service ni Fabric.",
      },
      {
        en: "The statistical comparison reproduces selected results under explicit assumptions; it does not replace the reference tool.",
        es: "La comparación estadística reproduce resultados seleccionados bajo supuestos explícitos; no reemplaza la herramienta de referencia.",
      },
    ],
    evidencePresentation: {
      title: {
        en: "QualityOps evidence in five views",
        es: "Evidencia de QualityOps en cinco vistas",
      },
      description: {
        en: "A concise, keyboard-operable walkthrough of the problem, architecture, verified dataset evidence, authentic Power BI view, and analytical boundaries.",
        es: "Un recorrido conciso y operable con teclado por el problema, la arquitectura, la evidencia verificada, la vista auténtica de Power BI y los límites analíticos.",
      },
      items: [
        {
          id: "overview",
          kind: "overview",
          title: {
            en: "Auditable decisions from manufacturing data",
            es: "Decisiones auditables a partir de datos de manufactura",
          },
          caption: {
            en: "An evidence-first technical project that makes assumptions, data-quality signals, reconciliation, and decision boundaries inspectable.",
            es: "Un proyecto técnico centrado en evidencia que vuelve inspeccionables los supuestos, las señales de calidad de datos, la reconciliación y los límites de decisión.",
          },
          body: [
            {
              en: "Manufacturing analyses can look precise while concealing choices about missing data, variation, and statistical interpretation.",
              es: "Los análisis de manufactura pueden parecer precisos mientras ocultan decisiones sobre datos faltantes, variación e interpretación estadística.",
            },
            {
              en: "QualityOps tests whether those choices can remain traceable from controlled inputs through a decision-facing view.",
              es: "QualityOps prueba si esas decisiones pueden conservar su trazabilidad desde entradas controladas hasta una vista orientada a decisiones.",
            },
          ],
          image: {
            src: { en: "01-overview.png", es: "01-overview.png" },
            alt: {
              en: "QualityOps title slide presenting auditable decisions from manufacturing data.",
              es: "Diapositiva de apertura de QualityOps sobre decisiones auditables a partir de datos de manufactura.",
            },
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "architecture",
          kind: "architecture",
          title: {
            en: "From source to auditable evidence",
            es: "De la fuente a la evidencia auditable",
          },
          caption: {
            en: "Excel or public SECOM inputs move through Python controls, transactional PostgreSQL persistence, audited SQL, a read-only Power BI view, and CI evidence. Each stage addresses a distinct traceability or validation risk.",
            es: "Las entradas de Excel o SECOM público pasan por controles en Python, persistencia transaccional en PostgreSQL, SQL auditado, una vista de solo lectura en Power BI y evidencia de CI. Cada etapa atiende un riesgo distinto de trazabilidad o validación.",
          },
          body: [
            {
              en: "Hash-verified inputs move through deterministic Python controls, transactional PostgreSQL persistence, audited SQL and Power BI, and CI regression checks.",
              es: "Las entradas verificadas por hash pasan por controles deterministas en Python, persistencia transaccional en PostgreSQL, SQL auditado y Power BI, y verificaciones de regresión en CI.",
            },
          ],
          image: {
            src: { en: "02-architecture.png", es: "02-architecture.png" },
            alt: {
              en: "QualityOps architecture from Excel or public SECOM through Python, PostgreSQL, audited SQL, Power BI, and CI checks.",
              es: "Arquitectura de QualityOps desde Excel o SECOM público hasta Python, PostgreSQL, SQL auditado, Power BI y verificaciones de CI.",
            },
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "evidence",
          kind: "metrics",
          title: {
            en: "What the dataset says—and does not",
            es: "Lo que el dataset muestra—y lo que no",
          },
          caption: {
            en: "These counts describe the public SECOM data audited by the project. They are not process-capability or industrial-scale claims.",
            es: "Estos conteos describen los datos públicos SECOM auditados por el proyecto. No son afirmaciones de capacidad del proceso ni de escala industrial.",
          },
          body: [],
          image: {
            src: { en: "03-evidence.png", es: "03-evidence.png" },
            alt: {
              en: "QualityOps dataset evidence with observations, sensors, measurement coordinates, missing values, and observed pass and fail outcomes.",
              es: "Evidencia del dataset de QualityOps con observaciones, sensores, coordenadas de medición, valores faltantes y resultados observados aprobados y fallidos.",
            },
            width: 1920,
            height: 1080,
          },
          metrics: [
            {
              value: "1,567",
              label: { en: "observations", es: "observaciones" },
              interpretation: {
                en: "the complete source-row population inspected",
                es: "la población completa de filas de origen inspeccionada",
              },
            },
            {
              value: "590",
              label: { en: "sensors", es: "sensores" },
              interpretation: {
                en: "measurement columns preserved from the source",
                es: "columnas de medición conservadas desde la fuente",
              },
            },
            {
              value: "924,530",
              label: { en: "measurement coordinates", es: "coordenadas de medición" },
              interpretation: {
                en: "the complete observation-by-sensor grid",
                es: "la cuadrícula completa de observaciones por sensor",
              },
            },
            {
              value: "41,951",
              label: { en: "missing values", es: "valores faltantes" },
              interpretation: {
                en: "a visible data-quality risk retained without imputation",
                es: "un riesgo visible de calidad conservado sin imputación",
              },
            },
          ],
        },
        {
          id: "validation",
          kind: "validation",
          title: {
            en: "Validated across Minitab, Python, SQL, and DAX",
            es: "Validado con Minitab, Python, SQL y DAX",
          },
          caption: {
            en: "Reference-tool comparison and Python, SQL, and DAX reconciliation establish reproducibility within the tested scope; they do not replace Minitab or establish causality.",
            es: "La comparación con la herramienta de referencia y la reconciliación entre Python, SQL y DAX establecen reproducibilidad dentro del alcance probado; no sustituyen Minitab ni establecen causalidad.",
          },
          body: [
            {
              en: "Six DAX result sets matched audited SQL and independent Python calculations within the documented tolerances.",
              es: "Seis conjuntos de resultados DAX coincidieron con SQL auditado y cálculos independientes en Python dentro de las tolerancias documentadas.",
            },
            {
              en: "Selected statistical methods reproduced the reference-tool results under the same versioned data and explicit assumptions.",
              es: "Métodos estadísticos seleccionados reprodujeron los resultados de la herramienta de referencia con los mismos datos versionados y supuestos explícitos.",
            },
          ],
          image: {
            src: { en: "04-validation.png", es: "04-validation.png" },
            alt: {
              en: "QualityOps validation slide comparing Power BI evidence with Minitab reference results and reconciled Python, SQL, and DAX outputs.",
              es: "Diapositiva de validación de QualityOps que compara evidencia de Power BI con resultados de referencia de Minitab y salidas reconciliadas de Python, SQL y DAX.",
            },
            width: 1920,
            height: 1080,
          },
        },
        {
          id: "roadmap",
          kind: "roadmap",
          title: {
            en: "Delivered evidence, next steps, explicit limits",
            es: "Evidencia entregada, próximos pasos y límites explícitos",
          },
          caption: {
            en: "Delivered evidence, planned service and reproducibility work, deferred interpretation, and unsupported claims remain clearly separated.",
            es: "La evidencia entregada, el trabajo planificado de servicio y reproducibilidad, la interpretación diferida y las afirmaciones no respaldadas permanecen claramente separados.",
          },
          body: [
            {
              en: "The roadmap distinguishes completed analytical evidence from planned FastAPI and Docker work and from deferred interpretation work.",
              es: "El roadmap distingue la evidencia analítica completada del trabajo planificado con FastAPI y Docker y del trabajo de interpretación diferido.",
            },
            {
              en: "The project does not claim causality, production readiness, savings, or industrial scale.",
              es: "El proyecto no afirma causalidad, preparación productiva, ahorros ni escala industrial.",
            },
          ],
          image: {
            src: { en: "05-roadmap.png", es: "05-roadmap.png" },
            alt: {
              en: "QualityOps roadmap separating delivered evidence, planned work, deferred interpretation, and explicit claim boundaries.",
              es: "Roadmap de QualityOps que separa evidencia entregada, trabajo planificado, interpretación diferida y límites explícitos de las afirmaciones.",
            },
            width: 1920,
            height: 1080,
          },
        },
      ],
    },
    disciplines: ["Manufacturing analytics", "Data quality", "Validation"],
    technologies: ["Python", "PostgreSQL", "SQL", "Power BI", "CI"],
    repositoryUrl: "https://github.com/Jehu-Lara/qualityops",
    evidenceDate: "2026-08-14",
    evidenceCommit: "20046215bfdfbc56b4615f48b314bdd827d086e7",
    evidenceDocuments: [
      "README.md",
      "docs/portfolio-claims.md",
      "docs/powerbi-process-health.md",
      "docs/assets/powerbi-process-health.png",
      "docs/statistical-validation.md",
      "docs/postgresql-persistence.md",
      "docs/secom-dataset.md",
      "ROADMAP.md",
      "LICENSE",
    ],
    images: [
      {
        src: "/qualityops-powerbi-process-health.png",
        width: 2368,
        height: 1332,
        alt: {
          en: "Power BI Process Health page for the public SECOM dataset.",
          es: "Página Process Health de Power BI para el conjunto público SECOM.",
        },
        longDescription: {
          en: "The page reports 1,567 observations, 1,463 pass labels, 104 fail labels, a 6.64% observed fail rate, and 4.54% missing measurements. It includes outcome distribution, daily fail rate, sensor missingness, and standardized pass/fail mean-difference charts. A visible MATCH status records reconciliation with the audited evidence; the charts remain descriptive.",
          es: "La página reporta 1,567 observaciones, 1,463 etiquetas pass, 104 fail, una tasa fail observada de 6.64 % y 4.54 % de mediciones faltantes. Incluye gráficos de distribución de resultados, tasa fail diaria, faltantes por sensor y diferencias de medias estandarizadas entre pass y fail. Un estado MATCH visible registra la reconciliación con la evidencia auditada; los gráficos siguen siendo descriptivos.",
        },
        attribution: {
          en: "Authentic Power BI Desktop capture. Derived from UCI SECOM data, CC BY 4.0.",
          es: "Captura auténtica de Power BI Desktop. Derivada de datos UCI SECOM, CC BY 4.0.",
        },
      },
    ],
    links: [
      {
        label: { en: "QualityOps repository", es: "Repositorio de QualityOps" },
        url: "https://github.com/Jehu-Lara/qualityops",
        kind: "repository",
      },
      {
        label: { en: "Pinned evidence commit", es: "Commit de evidencia fijado" },
        url: "https://github.com/Jehu-Lara/qualityops/commit/20046215bfdfbc56b4615f48b314bdd827d086e7",
        kind: "evidence",
      },
      {
        label: { en: "Repository license", es: "Licencia del repositorio" },
        url: "https://github.com/Jehu-Lara/qualityops/blob/20046215bfdfbc56b4615f48b314bdd827d086e7/LICENSE",
        kind: "license",
      },
    ],
  },
];

export function getPublishedProjects(): Project[] {
  return projects.filter((project) => project.status === "published");
}

export function getProject(slug: string): Project | undefined {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function localize<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}
