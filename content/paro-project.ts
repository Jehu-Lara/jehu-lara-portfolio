import type { Project } from "./types";

const evidenceCommit = "9ad5798940efb6960deb3433bdd01a95a52aef50";
const repositoryUrl = "https://github.com/Jehu-Lara/paro-public";
const demoUrl = "https://paro-public.onrender.com/demo";

export const paroProject: Project = {
  slug: "paro-live-oee-platform",
  status: "published",
  featured: true,
  year: "2026",
  title: { en: "PARO Live OEE", es: "PARO OEE en vivo" },
  shortSummary: {
    en: "A read-only OEE and downtime visibility demo driven by deterministic synthetic 15-minute data.",
    es: "Una demo de solo lectura para visibilidad de OEE y paros, alimentada con datos sintéticos deterministas cada 15 minutos.",
  },
  projectType: {
    en: "Independent open-source manufacturing analytics project",
    es: "Proyecto independiente y abierto de analítica de manufactura",
  },
  audience: [
    { en: "Manufacturing operations teams", es: "Equipos de operaciones de manufactura" },
    { en: "Continuous-improvement engineers", es: "Ingenieros de mejora continua" },
    { en: "Technical reviewers", es: "Revisores técnicos" },
  ],
  role: {
    en: "Designed and built the OEE domain engine, FastAPI application service, persistence contracts, protected rolling simulator, read-only web dashboard, Power BI Import model, tests, and deployment gates.",
    es: "Diseñé y construí el motor de dominio OEE, el servicio de aplicación en FastAPI, los contratos de persistencia, el simulador rolling protegido, el dashboard web de solo lectura, el modelo Import de Power BI, las pruebas y los gates de despliegue.",
  },
  problem: [
    {
      en: "When OEE and downtime are assembled after the shift, loss visibility arrives too late and the number can become detached from the events that produced it.",
      es: "Cuando OEE y los paros se consolidan después del turno, la visibilidad de pérdidas llega tarde y el número puede separarse de los eventos que lo originaron.",
    },
    {
      en: "PARO tests a bounded alternative: one audited calculation path, recent synthetic facts, explicit freshness, and a read-only decision surface that never pretends to be an MES or sensor feed.",
      es: "PARO prueba una alternativa acotada: una sola ruta de cálculo auditada, hechos sintéticos recientes, frescura explícita y una superficie de decisión de solo lectura que nunca pretende ser un MES ni un feed de sensores.",
    },
  ],
  approach: [
    {
      en: "Protect every write with an API key while keeping the trusted-ingest token limited to rate-limit exemption.",
      es: "Proteger cada escritura con una API key y limitar el token trusted-ingest a la exención del rate limit.",
    },
    {
      en: "Regenerate deterministic production days with absolute IDs, then send only missing closed buckets and close open downtime events optimistically.",
      es: "Regenerar jornadas deterministas con IDs absolutos, enviar solo buckets cerrados faltantes y cerrar eventos abiertos con concurrencia optimista.",
    },
    {
      en: "Load persisted facts through an application service that invokes the Decimal-based domain OEE function exactly once.",
      es: "Cargar hechos persistidos mediante un servicio de aplicación que invoca exactamente una vez la función OEE de dominio basada en Decimal.",
    },
    {
      en: "Expose freshness, OEE components, output, warnings, and a downtime Pareto through a read-only API and web dashboard.",
      es: "Exponer frescura, componentes OEE, producción, warnings y Pareto de paros mediante una API y dashboard web de solo lectura.",
    },
    {
      en: "Prepare a Power BI Import model that consumes API results without rebuilding OEE in DAX.",
      es: "Preparar un modelo Import de Power BI que consume los resultados de la API sin reconstruir OEE en DAX.",
    },
  ],
  architecture: [
    {
      label: { en: "Authenticated ingest", es: "Ingesta autenticada" },
      description: {
        en: "Production and downtime writes require an API key; trusted ingest remains an independent rate-limit concern.",
        es: "Las escrituras de producción y paro requieren API key; trusted ingest permanece como una preocupación independiente de rate limit.",
      },
    },
    {
      label: { en: "Application service", es: "Servicio de aplicación" },
      description: {
        en: "A read service gathers line facts and calls paro.domain.oee.calculate_oee exactly once.",
        es: "Un servicio de lectura reúne los hechos de línea y llama exactamente una vez a paro.domain.oee.calculate_oee.",
      },
    },
    {
      label: { en: "PostgreSQL", es: "PostgreSQL" },
      description: {
        en: "Request-scoped transactions, idempotency keys, and optimistic event closure preserve traceability without claiming batch atomicity.",
        es: "Transacciones por request, llaves de idempotencia y cierre optimista preservan trazabilidad sin afirmar atomicidad de lote.",
      },
    },
    {
      label: { en: "Decision views", es: "Vistas de decisión" },
      description: {
        en: "The web dashboard polls every 60 seconds; synthetic source facts advance on a 15-minute cadence. Power BI is Import mode.",
        es: "El dashboard web consulta cada 60 segundos; los hechos sintéticos avanzan cada 15 minutos. Power BI usa modo Import.",
      },
    },
  ],
  validation: [
    {
      en: "The complete local suite contains 208 tests, including crossed credential combinations, secret-log canaries, readiness/liveness behavior, deterministic replay, non-colliding days, open-event closure, and 48-hour catch-up.",
      es: "La suite local completa contiene 208 pruebas, incluidas combinaciones cruzadas de credenciales, canarios de secretos en logs, readiness/liveness, repetición determinista, jornadas sin colisiones, cierre de eventos y catch-up de 48 horas.",
    },
    {
      en: "A full synthetic production day stays inside the configured 70–80% OEE band after correcting the serial-line counting model; the dashboard uses the same domain result.",
      es: "Una jornada sintética completa permanece dentro de la banda OEE configurada de 70–80 % después de corregir el conteo de línea serial; el dashboard usa el mismo resultado de dominio.",
    },
    {
      en: "The PBIR structural validator reports zero errors. Power BI Desktop refreshed successfully and the final evidence uses the authentic Desktop capture.",
      es: "El validador estructural PBIR reporta cero errores. Power BI Desktop actualizó correctamente y la evidencia final usa la captura auténtica de Desktop.",
    },
  ],
  findings: [
    {
      value: "15 min",
      label: { en: "synthetic feed cadence", es: "cadencia del feed sintético" },
      represents: {
        en: "The rolling driver materializes the latest closed quarter-hour, not a streaming sensor event.",
        es: "El driver rolling materializa el último cuarto de hora cerrado, no un evento de sensor en streaming.",
      },
      matters: {
        en: "The dashboard can expose data-through and fresh/stale state without overstating immediacy.",
        es: "El dashboard puede exponer data-through y estado fresh/stale sin exagerar inmediatez.",
      },
      doesNotShow: {
        en: "It does not demonstrate real-time MES integration or sensor latency.",
        es: "No demuestra integración MES en tiempo real ni latencia de sensores.",
      },
    },
    {
      value: "48 h",
      label: { en: "bounded catch-up", es: "catch-up acotado" },
      represents: {
        en: "A missed cron run can reconcile recent deterministic IDs without unbounded replay.",
        es: "Una ejecución cron perdida puede reconciliar IDs deterministas recientes sin repetición ilimitada.",
      },
      matters: {
        en: "Recovery cost remains bounded and a larger outage becomes an explicit gap.",
        es: "El costo de recuperación permanece acotado y una interrupción mayor se vuelve un gap explícito.",
      },
      doesNotShow: {
        en: "It is not a promise of global batch atomicity or zero data loss.",
        es: "No es una promesa de atomicidad global de lote ni de cero pérdida de datos.",
      },
    },
    {
      value: "208",
      label: { en: "local automated tests", es: "pruebas automatizadas locales" },
      represents: {
        en: "The complete test collection at the pinned evidence commit.",
        es: "La colección completa de pruebas en el commit de evidencia fijado.",
      },
      matters: {
        en: "It exercises calculation, persistence, API, auth, simulator, and presentation contracts.",
        es: "Ejercita contratos de cálculo, persistencia, API, autenticación, simulador y presentación.",
      },
      doesNotShow: {
        en: "A passing local suite is not production uptime or industrial validation.",
        es: "Una suite local aprobada no equivale a uptime productivo ni validación industrial.",
      },
    },
    {
      value: "22.1%",
      label: { en: "illustrative base ROI", es: "ROI base ilustrativo" },
      represents: {
        en: "A sensitivity case using explicit assumptions: $3,500 implementation, $600 annual operations, and $5,005 modeled reporting-time benefit.",
        es: "Un caso de sensibilidad con supuestos explícitos: $3,500 de implementación, $600 de operación anual y $5,005 de beneficio modelado por tiempo de reporte.",
      },
      matters: {
        en: "The model can be replaced with client-approved cadence, time, rate, and realization inputs.",
        es: "El modelo puede sustituirse con cadencia, tiempo, tarifa y realización aprobados por el cliente.",
      },
      doesNotShow: {
        en: "It is not achieved savings or a forecast; downtime and scrap benefits remain $0.",
        es: "No son ahorros logrados ni un pronóstico; los beneficios por downtime y scrap permanecen en $0.",
      },
    },
  ],
  boundaries: [
    {
      en: "All displayed manufacturing data is synthetic portfolio data; no client, plant, or production result is represented.",
      es: "Todos los datos de manufactura mostrados son sintéticos para portafolio; no representan resultados de cliente, planta ni producción.",
    },
    {
      en: "The feed advances every 15 minutes and the page polls every 60 seconds. It is not streaming, real-time sensors, or MES connectivity.",
      es: "El feed avanza cada 15 minutos y la página consulta cada 60 segundos. No es streaming, sensores en tiempo real ni conectividad MES.",
    },
    {
      en: "Render write authentication and the 15-minute cron were active at verification; clients receive no write credentials.",
      es: "La autenticación de escritura en Render y el cron de 15 minutos estaban activos al verificar; los clientes no reciben credenciales de escritura.",
    },
    {
      en: "Power BI uses Import mode and shows a verified point-in-time refresh; it is not a streaming surface.",
      es: "Power BI usa modo Import y muestra una actualización puntual verificada; no es una superficie de streaming.",
    },
    {
      en: "ROI values are illustrative sensitivity scenarios, not savings claims. Avoided downtime and scrap are assigned zero benefit.",
      es: "Los valores ROI son escenarios ilustrativos de sensibilidad, no afirmaciones de ahorro. Downtime y scrap tienen beneficio cero.",
    },
  ],
  evidencePresentation: {
    title: { en: "PARO in three evidence views", es: "PARO en tres vistas de evidencia" },
    description: {
      en: "A concise walkthrough of the authentic dashboard, implemented architecture, security gates, verification status, ROI sensitivity, and honest limits.",
      es: "Un recorrido conciso por el dashboard auténtico, la arquitectura implementada, gates de seguridad, estado de verificación, sensibilidad ROI y límites honestos.",
    },
    items: [
      {
        id: "dashboard",
        kind: "image",
        title: { en: "Read-only OEE dashboard", es: "Dashboard OEE de solo lectura" },
        caption: {
          en: "Authentic Power BI Desktop capture of the synthetic shift view: OEE, A/P/Q, output, and downtime Pareto.",
          es: "Captura auténtica de Power BI Desktop de la vista de turno sintético: OEE, A/P/Q, producción y Pareto de paros.",
        },
        body: [],
        image: {
          src: { en: "01-case-study.png", es: "01-case-study.png" },
          alt: {
            en: "PARO case-study page with an authentic read-only OEE dashboard capture and synthetic-data disclosure.",
            es: "Página del caso PARO con captura auténtica del dashboard OEE de solo lectura y aviso de datos sintéticos.",
          },
          width: 1920,
          height: 1080,
        },
      },
      {
        id: "architecture",
        kind: "architecture",
        title: { en: "Architecture and verification", es: "Arquitectura y verificación" },
        caption: {
          en: "Authenticated ingest, one OEE calculation path, request-level persistence, read-only views, and current verification gates.",
          es: "Ingesta autenticada, una sola ruta de cálculo OEE, persistencia por request, vistas de solo lectura y gates actuales de verificación.",
        },
        body: [],
        image: {
          src: { en: "02-case-study.png", es: "02-case-study.png" },
          alt: {
            en: "PARO architecture from authenticated ingest through the OEE service and PostgreSQL to web and Power BI views.",
            es: "Arquitectura PARO desde ingesta autenticada, servicio OEE y PostgreSQL hasta vistas web y Power BI.",
          },
          width: 1920,
          height: 1080,
        },
      },
      {
        id: "roi",
        kind: "metrics",
        title: { en: "Illustrative ROI and limits", es: "ROI ilustrativo y límites" },
        caption: {
          en: "Three sensitivity scenarios retain the negative conservative case and exclude downtime/scrap benefits.",
          es: "Tres escenarios de sensibilidad conservan el caso conservador negativo y excluyen beneficios por downtime/scrap.",
        },
        body: [],
        image: {
          src: { en: "03-case-study.png", es: "03-case-study.png" },
          alt: {
            en: "PARO illustrative ROI scenarios with explicit costs, payback, and honest limits.",
            es: "Escenarios ROI ilustrativos de PARO con costos, payback y límites honestos explícitos.",
          },
          width: 1920,
          height: 1080,
        },
      },
    ],
  },
  disciplines: ["Manufacturing analytics", "Backend engineering", "OEE", "Data engineering"],
  technologies: ["Python 3.14", "FastAPI", "PostgreSQL", "Power BI", "GitHub Actions"],
  repositoryUrl,
  evidenceDate: "2026-08-20",
  evidenceCommit,
  evidenceDocuments: [
    "README.md",
    "docs/adr/0004-simulator-multi-agent-architecture.md",
    "docs/deployment.md",
    "docs/oee-definition.md",
    "docs/roi-model.md",
    "docs/upwork-portfolio.md",
    "PowerBi/README.md",
  ],
  images: [
    {
      src: "/paro-live-oee-thumbnail.png",
      width: 1000,
      height: 750,
      alt: {
        en: "PARO live synthetic OEE portfolio thumbnail with the authentic dashboard.",
        es: "Thumbnail de PARO OEE sintético con el dashboard auténtico.",
      },
      longDescription: {
        en: "The thumbnail preserves the authentic Power BI Desktop capture showing OEE 69.7%, Availability 81.6%, Performance 87.6%, Quality 97.6%, and an explicit synthetic-data disclosure.",
        es: "El thumbnail conserva la captura auténtica de Power BI Desktop con OEE 69.7 %, Availability 81.6 %, Performance 87.6 %, Quality 97.6 % y aviso explícito de datos sintéticos.",
      },
      attribution: {
        en: "Authentic Power BI Desktop capture generated from deterministic synthetic portfolio data.",
        es: "Captura auténtica de Power BI Desktop generada con datos sintéticos deterministas de portafolio.",
      },
    },
  ],
  links: [
    {
      label: { en: "PARO repository", es: "Repositorio PARO" },
      url: repositoryUrl,
      kind: "repository",
    },
    {
      label: { en: "Pinned implementation commit", es: "Commit de implementación fijado" },
      url: `${repositoryUrl}/commit/${evidenceCommit}`,
      kind: "evidence",
    },
    {
      label: { en: "Repository license", es: "Licencia del repositorio" },
      url: `${repositoryUrl}/blob/${evidenceCommit}/LICENSE`,
      kind: "license",
    },
  ],
  archiveDisciplines: {
    en: "Manufacturing analytics · FastAPI · PostgreSQL · Power BI · OEE",
    es: "Analítica de manufactura · FastAPI · PostgreSQL · Power BI · OEE",
  },
  caseCopy: {
    evidenceDisplayDate: { en: "Aug 20, 2026", es: "20 ago 2026" },
    evidenceStamp: {
      en: "Evidence as of Aug 20, 2026",
      es: "Evidencia al 20 ago 2026",
    },
    boundaryTitle: {
      en: "Live-updating visibility, deliberately bounded",
      es: "Visibilidad actualizable, deliberadamente acotada",
    },
    boundaryBody: {
      en: "This case demonstrates an auditable OEE workflow on synthetic data. It does not demonstrate sensor/MES integration, streaming, achieved savings, production uptime, or industrial validation.",
      es: "Este caso demuestra un flujo OEE auditable con datos sintéticos. No demuestra integración con sensores/MES, streaming, ahorros logrados, uptime productivo ni validación industrial.",
    },
    architectureIntro: {
      en: "Each stage keeps one concern explicit: authenticated writes, a single calculation path, transactional persistence, decision-facing views, and independent deployment gates.",
      es: "Cada etapa mantiene explícita una preocupación: escrituras autenticadas, una sola ruta de cálculo, persistencia transaccional, vistas de decisión y gates independientes de despliegue.",
    },
    validationTitle: { en: "Evidence and verification", es: "Evidencia y verificación" },
    findingsTitle: { en: "Decision-facing evidence", es: "Evidencia orientada a decisión" },
    findingsIntro: {
      en: "Every number carries its model, evidence state, and boundary.",
      es: "Cada cifra incluye su modelo, estado de evidencia y límite.",
    },
    limitsTitle: { en: "Honest limits", es: "Límites honestos" },
    provenanceIntro: {
      en: "All public statements on this page are bounded by the pinned implementation commit and the documented verification limits.",
      es: "Todas las afirmaciones públicas de esta página están delimitadas por el commit de implementación fijado y los límites de verificación documentados.",
    },
    licensing: {
      en: "Project-authored code, documentation, dashboard assets, and synthetic data are published under the repository's MIT license.",
      es: "El código, documentación, activos del dashboard y datos sintéticos creados para el proyecto se publican bajo la licencia MIT del repositorio.",
    },
    programmingLanguages: ["Python", "SQL", "DAX", "JavaScript"],
    heroLinks: [
      {
        label: { en: "Live demo", es: "Demo en vivo" },
        url: demoUrl,
        kind: "evidence",
      },
      {
        label: { en: "View code", es: "Ver código" },
        url: repositoryUrl,
        kind: "repository",
      },
      {
        label: { en: "Review deployment contract", es: "Revisar contrato de despliegue" },
        url: `${repositoryUrl}/blob/${evidenceCommit}/docs/deployment.md`,
        kind: "evidence",
      },
    ],
  },
};
