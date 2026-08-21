import type { Project } from "./types";

const reportUrl = "/reports/Proyecto-DMAIC-FINAL.pdf";
const evidenceSha = "1F770A1BB0D1A2E70A6F18D25CCE2927F04A41F2BA6ACA6BD358CF7E11D49606";

export const dmaicProject: Project = {
  slug: "dmaic-pcba-case",
  status: "published",
  featured: true,
  year: "2026",
  title: { en: "DMAIC PCBA Case", es: "Caso DMAIC de PCBA" },
  shortSummary: {
    en: "An illustrative Lean Six Sigma case connecting MSA, capability, ANOVA, factorial DOE, financial modeling, and a bounded control roadmap.",
    es: "Un caso ilustrativo Lean Six Sigma que conecta MSA, capacidad, ANOVA, DOE factorial, modelado financiero y una hoja de ruta de control acotada.",
  },
  projectType: {
    en: "Independent DMAIC technical case with illustrative data",
    es: "Caso técnico DMAIC independiente con datos ilustrativos",
  },
  audience: [
    { en: "Quality and process engineers", es: "Ingenieros de calidad y procesos" },
    { en: "Continuous-improvement teams", es: "Equipos de mejora continua" },
    { en: "Manufacturing decision-makers", es: "Responsables de decisiones de manufactura" },
  ],
  role: {
    en: "Authored the DMAIC case and its analytical evidence: charter, VSM, MSA, capability, ANOVA, 2² factorial DOE, response optimization, PFMEA, Control Plan, financial model, and sustainment roadmap.",
    es: "Elaboré el caso DMAIC y su evidencia analítica: charter, VSM, MSA, capacidad, ANOVA, DOE factorial 2², optimización de respuesta, PFMEA, Plan de Control, modelo financiero y hoja de sostenimiento.",
  },
  problem: [
    {
      en: "The illustrative PCBA assembly scenario begins with 13.5 days of lead time, 5.0% total scrap, and 3.1% scrap attributed to high torque.",
      es: "El escenario ilustrativo de ensamble PCBA parte de 13.5 días de lead time, 5.0 % de scrap total y 3.1 % atribuido a torque alto.",
    },
    {
      en: "The case tests whether measurement evidence and designed experiments can narrow the improvement hypothesis before any plant release or savings claim.",
      es: "El caso prueba si la evidencia de medición y los experimentos diseñados pueden acotar la hipótesis de mejora antes de cualquier liberación de planta o afirmación de ahorro.",
    },
  ],
  approach: [
    {
      en: "Frame the business problem through a charter, CTQs, a current-state VSM, and explicit projected financial assumptions.",
      es: "Enmarcar el problema mediante charter, CTQ, VSM actual y supuestos financieros proyectados explícitos.",
    },
    {
      en: "Qualify the torque measurement system, quantify the baseline capability gap, and separate sample evidence from the annual financial baseline.",
      es: "Calificar el sistema de medición de torque, cuantificar la brecha de capacidad y separar la evidencia muestral de la línea base financiera anual.",
    },
    {
      en: "Use ANOVA and a 2² factorial DOE to test factors, inspect diagnostics, and propose a centered operating condition.",
      es: "Usar ANOVA y un DOE factorial 2² para probar factores, revisar diagnósticos y proponer una condición operativa centrada.",
    },
    {
      en: "Treat the 30-piece pilot as exploratory evidence and carry unresolved stability, PPAP, finance, and plant-validation gates into Control.",
      es: "Tratar el piloto de 30 piezas como evidencia exploratoria y trasladar a Control los gates pendientes de estabilidad, PPAP, Finanzas y validación en planta.",
    },
  ],
  architecture: [
    {
      label: { en: "Define", es: "Definir" },
      description: { en: "Charter, VOC/CTQ, scope, VSM, timeline, and projected COPQ frame the decision.", es: "Charter, VOC/CTQ, alcance, VSM, cronograma y COPQ proyectado enmarcan la decisión." },
    },
    {
      label: { en: "Measure", es: "Medir" },
      description: { en: "Pareto, Gage R&R, normality, and baseline capability establish the measurement and performance evidence.", es: "Pareto, Gage R&R, normalidad y capacidad inicial establecen la evidencia de medición y desempeño." },
    },
    {
      label: { en: "Analyze + Improve", es: "Analizar + Mejorar" },
      description: { en: "ANOVA, factorial DOE, diagnostics, and response optimization narrow a proposed operating condition.", es: "ANOVA, DOE factorial, diagnósticos y optimización de respuesta acotan una condición operativa propuesta." },
    },
    {
      label: { en: "Control", es: "Controlar" },
      description: { en: "Exploratory pilot evidence feeds PFMEA, Control Plan, training, transfer, and a 30/60/90 validation path.", es: "La evidencia exploratoria del piloto alimenta PFMEA, Plan de Control, capacitación, transferencia y validación 30/60/90." },
    },
  ],
  validation: [
    {
      en: "The illustrative defect sample contains 100 observations; Torque Alto represents 62% of that sample. This denominator is not interchangeable with the 3.1% annual attribution used in the financial model.",
      es: "La muestra ilustrativa contiene 100 observaciones; Torque Alto representa 62 %. Este denominador no es intercambiable con el 3.1 % anual usado en el modelo financiero.",
    },
    {
      en: "Gage R&R reports 3.37% total GRR. Baseline capability reports mean 15.4 lb-in, Cp 1.12, Cpk 0.67, and Anderson–Darling p=0.0152.",
      es: "Gage R&R reporta 3.37 % de GRR total. La capacidad inicial reporta media 15.4 lb-in, Cp 1.12, Cpk 0.67 y Anderson–Darling p=0.0152.",
    },
    {
      en: "ANOVA identifies tool speed at p<0.001 with R²=66.93%. The factorial DOE and response optimizer support a proposed Low Speed / 85 psi setup with fitted torque 15.000 lb-in.",
      es: "ANOVA identifica velocidad de herramienta con p<0.001 y R²=66.93 %. El DOE factorial y el optimizador respaldan una configuración propuesta de velocidad baja / 85 psi con torque ajustado de 15.000 lb-in.",
    },
    {
      en: "The 30-piece pilot reports mean 15.008 lb-in, Cpk 1.97, and Ppk 2.92, but lag-1 autocorrelation near −0.736 prevents a sustained-stability claim.",
      es: "El piloto de 30 piezas reporta media 15.008 lb-in, Cpk 1.97 y Ppk 2.92, pero la autocorrelación lag-1 cercana a −0.736 impide afirmar estabilidad sostenida.",
    },
  ],
  findings: [
    {
      value: "62%",
      label: { en: "Torque Alto share", es: "Participación de Torque Alto" },
      represents: { en: "Its share of the 100-observation illustrative defect sample.", es: "Su participación en la muestra ilustrativa de 100 defectos." },
      matters: { en: "It prioritizes torque as the critical quality focus for deeper analysis.", es: "Prioriza torque como foco crítico de calidad para profundizar el análisis." },
      doesNotShow: { en: "It does not prove plant-wide causality or equal the annual 3.1% attribution.", es: "No prueba causalidad en planta ni equivale a la atribución anual de 3.1 %." },
    },
    {
      value: "Cpk 0.67",
      label: { en: "baseline capability", es: "capacidad inicial" },
      represents: { en: "Normal-model capability for the illustrative n=100 torque sample.", es: "Capacidad bajo modelo normal para la muestra ilustrativa de torque n=100." },
      matters: { en: "The centered specification is not met at baseline.", es: "La especificación centrada no se cumple en la línea base." },
      doesNotShow: { en: "Normality is rejected at p=0.0152, so the model understates the observed tail problem.", es: "La normalidad se rechaza con p=0.0152, por lo que el modelo subestima el problema observado en la cola." },
    },
    {
      value: "Cpk 1.97",
      label: { en: "exploratory pilot", es: "piloto exploratorio" },
      represents: { en: "The 30-piece illustrative pilot under the proposed setup.", es: "El piloto ilustrativo de 30 piezas bajo la configuración propuesta." },
      matters: { en: "The mean aligns closely with the 15.000 lb-in model prediction.", es: "La media se alinea estrechamente con la predicción de 15.000 lb-in." },
      doesNotShow: { en: "Alternation and r₁≈−0.736 mean sustained production stability is not demonstrated.", es: "La alternancia y r₁≈−0.736 implican que no se demuestra estabilidad productiva sostenida." },
    },
    {
      value: "116.7%",
      label: { en: "projected ROI", es: "ROI proyectado" },
      represents: { en: "USD 19,760 modeled annual savings against USD 9,120 investment.", es: "USD 19,760 de ahorro anual modelado frente a USD 9,120 de inversión." },
      matters: { en: "It makes the financial assumptions inspectable before approval.", es: "Vuelve inspeccionables los supuestos financieros antes de aprobarlos." },
      doesNotShow: { en: "It is not realized savings; Finance validation and plant execution remain pending.", es: "No son ahorros realizados; faltan validación de Finanzas y ejecución en planta." },
    },
  ],
  boundaries: [
    { en: "The complete case uses an illustrative dataset. No client, production, or certified plant result is claimed.", es: "El caso completo usa un dataset ilustrativo. No se afirma ningún resultado de cliente, producción o planta certificada." },
    { en: "Lead time 4.06 days and scrap below 0.5% are design targets, not achieved operating results.", es: "Lead time de 4.06 días y scrap menor a 0.5 % son objetivos de diseño, no resultados operativos logrados." },
    { en: "The proposed Low Speed / 85 psi setting requires confirmation in natural production order across shifts, lots, operators, and real conditions.", es: "La configuración propuesta de velocidad baja / 85 psi requiere confirmación en orden natural de producción, entre turnos, lotes, operadores y condiciones reales." },
    { en: "The pilot capability indices remain exploratory until independence, stability, larger-sample evidence, and PPAP are complete.", es: "Los índices de capacidad del piloto siguen siendo exploratorios hasta completar independencia, estabilidad, muestra ampliada y PPAP." },
    { en: "ROI and payback are projections from stated assumptions; Finance sign-off is pending.", es: "ROI y payback son proyecciones basadas en supuestos declarados; falta aprobación de Finanzas." },
  ],
  evidencePresentation: {
    title: { en: "DMAIC evidence dashboard in five views", es: "Dashboard de evidencia DMAIC en cinco vistas" },
    description: {
      en: "A concise English dashboard built from the validated technical report, with authentic Minitab evidence and explicit release gates.",
      es: "Un dashboard conciso en inglés construido desde el reporte técnico validado, con evidencia auténtica de Minitab y gates explícitos de liberación.",
    },
    items: [
      ["overview", "overview", "Outcome frame", "Marco de resultados", "Targets, exploratory pilot evidence, projected ROI, and explicit limits.", "Objetivos, evidencia exploratoria del piloto, ROI proyectado y límites explícitos."],
      ["measure", "metrics", "Measure phase", "Fase Medir", "Pareto, baseline capability, and measurement-system evidence.", "Pareto, capacidad inicial y evidencia del sistema de medición."],
      ["analyze-improve", "validation", "Analyze and Improve", "Analizar y Mejorar", "ANOVA, factorial DOE, and the proposed centered setup.", "ANOVA, DOE factorial y la configuración centrada propuesta."],
      ["control", "validation", "Control and release gates", "Control y gates de liberación", "Exploratory capability, modeled financial case, and unresolved validation.", "Capacidad exploratoria, caso financiero modelado y validación pendiente."],
      ["roadmap", "roadmap", "Methodology and sustainment", "Metodología y sostenimiento", "The 16-week path from Define through Control and plant validation.", "La ruta de 16 semanas desde Definir hasta Control y validación en planta."],
    ].map(([id, kind, enTitle, esTitle, enCaption, esCaption], index) => ({
      id,
      kind: kind as "overview" | "metrics" | "validation" | "roadmap",
      title: { en: enTitle, es: esTitle },
      caption: { en: enCaption, es: esCaption },
      body: [],
      image: {
        src: { en: `${String(index + 1).padStart(2, "0")}-${id}.png`, es: `${String(index + 1).padStart(2, "0")}-${id}.png` },
        alt: { en: `DMAIC dashboard slide: ${enTitle}.`, es: `Diapositiva del dashboard DMAIC: ${esTitle}.` },
        width: 1920,
        height: 1080,
      },
    })),
  },
  disciplines: ["Lean Six Sigma", "DMAIC", "Quality engineering", "DOE", "Process capability"],
  technologies: ["Minitab", "Gage R&R", "ANOVA", "DOE", "PFMEA"],
  repositoryUrl: reportUrl,
  evidenceDate: "2026-08-20",
  evidenceCommit: evidenceSha,
  evidenceDocuments: ["Proyecto DMAIC FINAL.pdf — 38 pages"],
  images: [
    {
      src: "/dmaic-case-thumbnail-1000x750.png",
      width: 1000,
      height: 750,
      alt: { en: "DMAIC PCBA case thumbnail with bounded lead-time, scrap, pilot capability, and projected ROI metrics.", es: "Thumbnail del caso DMAIC PCBA con métricas acotadas de lead time, scrap, capacidad piloto y ROI proyectado." },
      longDescription: { en: "A navy evidence thumbnail labels the dataset illustrative and distinguishes design targets, exploratory pilot capability, and projected financial return.", es: "Un thumbnail azul marino etiqueta el dataset como ilustrativo y distingue objetivos de diseño, capacidad piloto exploratoria y retorno financiero proyectado." },
      attribution: { en: "Project-authored summary derived from Proyecto DMAIC FINAL.pdf.", es: "Resumen del autor derivado de Proyecto DMAIC FINAL.pdf." },
    },
  ],
  links: [
    { label: { en: "Open full technical report", es: "Abrir reporte técnico completo" }, url: reportUrl, kind: "evidence" },
  ],
  archiveDisciplines: {
    en: "Lean Six Sigma · DMAIC · Minitab · DOE · PFMEA",
    es: "Lean Six Sigma · DMAIC · Minitab · DOE · PFMEA",
  },
  caseCopy: {
    evidenceDisplayDate: { en: "Aug 20, 2026", es: "20 ago 2026" },
    evidenceStamp: { en: "Evidence package as of Aug 20, 2026", es: "Paquete de evidencia al 20 ago 2026" },
    boundaryTitle: { en: "A rigorous method, deliberately separated from achieved results", es: "Un método riguroso, separado deliberadamente de resultados logrados" },
    boundaryBody: { en: "This case demonstrates DMAIC reasoning on illustrative data. It does not claim client results, sustained plant capability, approved PPAP, or realized savings.", es: "Este caso demuestra razonamiento DMAIC con datos ilustrativos. No afirma resultados de cliente, capacidad sostenida en planta, PPAP aprobado ni ahorros realizados." },
    architectureIntro: { en: "The workflow advances only when the evidence supports the next gate—from measurement adequacy to factor analysis, pilot evidence, and controlled transfer.", es: "El flujo avanza solo cuando la evidencia respalda el siguiente gate: desde adecuación de medición hasta análisis de factores, piloto y transferencia controlada." },
    validationTitle: { en: "Phase evidence and release gates", es: "Evidencia por fase y gates de liberación" },
    findingsTitle: { en: "Decision-facing evidence", es: "Evidencia orientada a decisión" },
    findingsIntro: { en: "Every metric states what it supports—and what remains unverified.", es: "Cada métrica declara qué respalda y qué permanece sin verificar." },
    limitsTitle: { en: "Honest limits", es: "Límites honestos" },
    provenanceIntro: { en: "The public case is bounded by the 38-page technical report and its SHA-256 fingerprint.", es: "El caso público está delimitado por el reporte técnico de 38 páginas y su huella SHA-256." },
    licensing: { en: "Project-authored portfolio evidence. No external-data or open-source license claim is made for the report.", es: "Evidencia de portafolio creada por el autor. No se afirma licencia de datos externos ni de código abierto para el reporte." },
    programmingLanguages: [],
    structuredDataType: "CreativeWork",
    evidenceSourceUrl: reportUrl,
    evidenceSourceLabel: { en: "report PDF", es: "PDF del reporte" },
    sourceTypeLabel: { en: "Evidence file", es: "Archivo de evidencia" },
    sourceIdentifierLabel: { en: "SHA-256", es: "SHA-256" },
    heroLinks: [
      { label: { en: "Open full report", es: "Abrir reporte completo" }, url: reportUrl, kind: "evidence" },
    ],
  },
};
