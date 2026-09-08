import type { Project } from "./types";

const evidenceCommit = "60420f12444c2886be793db785be1f6e6d0508db";
const repositoryUrl = "https://github.com/Jehu-Lara/manufacturing-rag-assistant";
const demoUrl = "https://jehulara-manufacturing-rag-assistant-live.hf.space";
const deckUrl = "/presentations/manufacturing-rag-assistant/manufacturing-rag-assistant-evidence-deck.pptx";

const slides = [
  ["overview", "overview", "01-overview.png", "A RAG demo that shows its work", "Una demo RAG que muestra su evidencia"],
  ["architecture", "architecture", "02-architecture.png", "Retrieval and generation stay inspectable", "La recuperación y la generación permanecen inspeccionables"],
  ["evaluation", "metrics", "03-evaluation.png", "Evaluate retrieval and generation separately", "Evalúa recuperación y generación por separado"],
  ["live-evidence", "image", "04-live-evidence.png", "One concise answer keeps its source in view", "Respuesta breve. Fuente visible."],
  ["boundaries", "roadmap", "05-boundaries.png", "The limits stay visible", "Los límites permanecen visibles"],
] as const;

export const ragProject: Project = {
  slug: "manufacturing-rag-assistant",
  status: "published",
  featured: true,
  year: "2026",
  title: { en: "Manufacturing RAG Assistant", es: "Asistente RAG de Manufactura" },
  shortSummary: {
    en: "A bilingual public demo that retrieves from a controlled manufacturing corpus, cites its sources, and refuses when evidence is insufficient.",
    es: "Demo pública bilingüe que recupera información de un corpus controlado de manufactura, cita sus fuentes y rechaza cuando la evidencia es insuficiente.",
  },
  projectType: {
    en: "Independent open-source retrieval-augmented generation demo",
    es: "Demo independiente y abierta de generación aumentada por recuperación",
  },
  audience: [
    { en: "Manufacturing and quality teams", es: "Equipos de manufactura y calidad" },
    { en: "RAG and search engineers", es: "Ingenieros de RAG y búsqueda" },
    { en: "Technical reviewers", es: "Revisores técnicos" },
  ],
  role: {
    en: "Designed and built the controlled corpus, hybrid retrieval, evidence threshold, cited bilingual answer flow, protected container boundary, evaluation suite, and reproducible deployment pipeline.",
    es: "Diseñé y construí el corpus controlado, la recuperación híbrida, el umbral de evidencia, el flujo bilingüe con citas, el límite protegido del contenedor, la evaluación y el pipeline reproducible de despliegue.",
  },
  problem: [
    {
      en: "General assistants can answer fluently without exposing whether the answer is supported by the documents that matter.",
      es: "Los asistentes generales pueden responder con fluidez sin mostrar si la respuesta está respaldada por los documentos relevantes.",
    },
    {
      en: "This demo tests a narrower behavior: retrieve evidence from a declared manufacturing corpus, answer with citations, or refuse.",
      es: "Esta demo prueba un comportamiento más acotado: recuperar evidencia de un corpus de manufactura declarado, responder con citas o rechazar.",
    },
  ],
  approach: [
    {
      en: "Index nine public and five clearly labeled synthetic documents into 228 inspectable chunks.",
      es: "Indexar nueve documentos públicos y cinco sintéticos claramente identificados en 228 fragmentos inspeccionables.",
    },
    {
      en: "Combine BM25 lexical retrieval with BAAI/bge-m3 semantic retrieval before applying an evidence threshold.",
      es: "Combinar recuperación léxica BM25 con recuperación semántica BAAI/bge-m3 antes de aplicar un umbral de evidencia.",
    },
    {
      en: "Require cited output and turn weak or uncited results into an explicit refusal.",
      es: "Exigir respuestas con citas y convertir resultados débiles o sin citas en un rechazo explícito.",
    },
    {
      en: "Expose only the UI, health, and readiness routes through nginx while keeping the query API internal.",
      es: "Exponer solo la interfaz, health y readiness mediante nginx y mantener interna la API de consulta.",
    },
  ],
  architecture: [
    { label: { en: "Controlled corpus", es: "Corpus controlado" }, description: { en: "Nine public and five labeled synthetic manufacturing documents.", es: "Nueve documentos públicos y cinco sintéticos etiquetados de manufactura." } },
    { label: { en: "Hybrid retrieval", es: "Recuperación híbrida" }, description: { en: "BM25 and BAAI/bge-m3 retrieve lexical and semantic evidence.", es: "BM25 y BAAI/bge-m3 recuperan evidencia léxica y semántica." } },
    { label: { en: "Refusal gate", es: "Gate de rechazo" }, description: { en: "A documented threshold blocks evidence that is too weak.", es: "Un umbral documentado bloquea evidencia demasiado débil." } },
    { label: { en: "Answer with sources", es: "Respuesta con fuentes" }, description: { en: "The external LLM generates only after retrieval passes; uncited output is rejected.", es: "El LLM externo genera solo después de superar la recuperación; una salida sin citas se rechaza." } },
  ],
  validation: [
    { en: "On the profile actually served (contextual-v1 with expansion off), the frozen retrieval evaluation reports Recall@5 of 0.887 overall: 0.917 in English (n=48) and 0.844 in Spanish (n=32).", es: "En el perfil realmente servido (contextual-v1 con expansión desactivada), la evaluación congelada reporta Recall@5 de 0.887: 0.917 en inglés (n=48) y 0.844 en español (n=32)." },
    { en: "Recall@3 is 0.825 and mean reciprocal rank is 0.721 on that same retrieval profile and eval_set v1.1.0.", es: "Recall@3 es 0.825 y el rango recíproco medio es 0.721 en el mismo perfil de recuperación y eval_set v1.1.0." },
    { en: "Generation metrics remain historical raw-v1 / eval_set v1.0.0 measurements: correct refusal 0.900, false refusal 0.200, human-reviewed faithfulness 29/30 (0.967), and citation accuracy 23/30 (0.767). They were not re-measured on contextual-v1.", es: "Las métricas de generación siguen siendo mediciones históricas de raw-v1 / eval_set v1.0.0: rechazo correcto 0.900, rechazo falso 0.200, fidelidad revisada por personas 29/30 (0.967) y precisión de citas 23/30 (0.767). No se volvieron a medir en contextual-v1." },
    { en: "On Sep 7, 2026, the public deployment, bilingual UI, privacy notice, and linked evidence were re-verified; the answer capture shown in the deck remains dated Aug 29.", es: "El 7 de septiembre de 2026 se volvieron a verificar el despliegue público, la interfaz bilingüe, el aviso de privacidad y la evidencia enlazada; la captura de respuesta del deck conserva su fecha del 29 de agosto." },
  ],
  findings: [
    { value: "14", label: { en: "corpus documents", es: "documentos del corpus" }, represents: { en: "Nine public and five synthetic documents with explicit provenance.", es: "Nueve documentos públicos y cinco sintéticos con procedencia explícita." }, matters: { en: "The answerable scope is visible and reproducible.", es: "El alcance respondible es visible y reproducible." }, doesNotShow: { en: "It is not broad industrial knowledge coverage.", es: "No es cobertura amplia de conocimiento industrial." } },
    { value: "228", label: { en: "indexed chunks", es: "fragmentos indexados" }, represents: { en: "The searchable units built from the controlled corpus.", es: "Las unidades de búsqueda construidas desde el corpus controlado." }, matters: { en: "Retrieval operates over a bounded, inspectable index.", es: "La recuperación opera sobre un índice acotado e inspeccionable." }, doesNotShow: { en: "It is not a scale or latency benchmark.", es: "No es una prueba de escala ni latencia." } },
    { value: "0.887", label: { en: "Recall@5", es: "Recall@5" }, represents: { en: "Retrieval coverage at five results on eval_set v1.1.0 and the served contextual-v1/off profile.", es: "Cobertura de recuperación con cinco resultados en eval_set v1.1.0 y el perfil servido contextual-v1/off." }, matters: { en: "Retrieval quality is measured independently from answer fluency.", es: "La calidad de recuperación se mide independientemente de la fluidez." }, doesNotShow: { en: "It does not guarantee every answer is correct.", es: "No garantiza que toda respuesta sea correcta." } },
    { value: "0.900", label: { en: "historical correct refusal", es: "rechazo correcto histórico" }, represents: { en: "The raw-v1 / eval_set v1.0.0 generation run's rate for refusing unsupported questions.", es: "La tasa de rechazo de preguntas sin respaldo en la ejecución histórica raw-v1 / eval_set v1.0.0." }, matters: { en: "Abstention was evaluated as product behavior.", es: "La abstención se evaluó como comportamiento del producto." }, doesNotShow: { en: "It was not re-measured on contextual-v1; historical false refusal was 0.200.", es: "No se volvió a medir en contextual-v1; el rechazo falso histórico fue 0.200." } },
    { value: "0.967", label: { en: "historical faithfulness", es: "fidelidad histórica" }, represents: { en: "Twenty-nine of thirty human-reviewed raw-v1 answers stayed supported by retrieved evidence.", es: "Veintinueve de treinta respuestas históricas raw-v1 revisadas permanecieron respaldadas por la evidencia recuperada." }, matters: { en: "Grounding was evaluated separately from retrieval.", es: "El respaldo se evaluó por separado de la recuperación." }, doesNotShow: { en: "It was not re-measured on contextual-v1; historical citation accuracy was 0.767 and missed its target.", es: "No se volvió a medir en contextual-v1; la precisión histórica de citas fue 0.767 y no alcanzó su meta." } },
  ],
  boundaries: [
    { en: "This is a functional public portfolio demo, not a production or industrial system.", es: "Es una demo pública funcional de portafolio, no un sistema productivo ni industrial." },
    { en: "It represents no factory, client deployment, business result, savings, or error elimination.", es: "No representa fábrica, despliegue de cliente, resultado empresarial, ahorro ni eliminación de errores." },
    { en: "Coverage is limited to the controlled corpus; unsupported questions should be refused.", es: "La cobertura se limita al corpus controlado; las preguntas sin respaldo deben rechazarse." },
    { en: "Questions and retrieved context are sent to the configured external LLM provider; confidential or regulated input should not be entered.", es: "Las preguntas y el contexto recuperado se envían al proveedor LLM configurado; no deben ingresarse datos confidenciales ni regulados." },
    { en: "Hugging Face may cold-start the Space, and live availability can change after the evidence date.", es: "Hugging Face puede reiniciar el Space en frío y la disponibilidad puede cambiar después de la fecha de evidencia." },
    { en: "Generation metrics are historical raw-v1 measurements, were not re-measured on contextual-v1, and historical citation accuracy remained below target.", es: "Las métricas de generación son mediciones históricas de raw-v1, no se volvieron a medir en contextual-v1 y la precisión histórica de citas quedó debajo de la meta." },
    { en: "Spanish questions depend strongly on cross-lingual semantic retrieval because BM25 has little lexical overlap with the English-only corpus; the contextual profile improves measured retrieval but does not remove that design constraint.", es: "Las preguntas en español dependen en gran medida de la recuperación semántica multilingüe porque BM25 tiene poca coincidencia léxica con el corpus solo en inglés; el perfil contextual mejora la medición, pero no elimina esa restricción de diseño." },
  ],
  evidencePresentation: {
    title: { en: "Manufacturing RAG Assistant in five evidence views", es: "Manufacturing RAG Assistant en cinco vistas de evidencia" },
    description: { en: "A bilingual walkthrough of scope, architecture, separate evaluation, authentic live evidence, and explicit limits.", es: "Recorrido bilingüe por alcance, arquitectura, evaluación separada, evidencia auténtica en vivo y límites explícitos." },
    items: slides.map(([id, kind, file, en, es]) => ({
      id,
      kind,
      title: { en, es },
      caption: { en: `${en}. Evidence updated Sep 7, 2026; live-answer capture dated Aug 29.`, es: `${es}. Evidencia actualizada el 7 sep 2026; captura de respuesta del 29 ago.` },
      body: [],
      image: { src: { en: file, es: file }, alt: { en: `${en} presentation slide.`, es: `Diapositiva: ${es}.` }, width: 1920, height: 1080 },
    })),
  },
  disciplines: ["Retrieval-augmented generation", "Manufacturing knowledge", "Evaluation", "AI safety"],
  technologies: ["Python", "FastAPI", "BM25", "BAAI/bge-m3", "Docker", "Hugging Face Spaces"],
  repositoryUrl,
  evidenceDate: "2026-09-07",
  evidenceCommit,
  evidenceDocuments: ["README.md", "SPEC.md", "corpus/SOURCES.md", "eval/reports/retrieval_report_v1.1.0__contextual-v1__off.md", "eval/reports/generation_eval_v1.0.0.md", "eval/reports/threshold_analysis_v1.0.0.md", "nginx.conf", ".github/workflows/deploy-hf-space.yml"],
  images: [{
    src: "/manufacturing-rag-assistant-thumbnail.png",
    width: 1000,
    height: 750,
    alt: { en: "Manufacturing RAG Assistant portfolio thumbnail with a concise cited live answer.", es: "Thumbnail del Asistente RAG de Manufactura con una respuesta breve y citada de la demo real." },
    longDescription: { en: "A navy and teal portfolio card showing the public demo's concise answer and its 21 CFR Part 211 source.", es: "Tarjeta de portafolio en azul marino y turquesa que muestra una respuesta breve de la demo pública y su fuente 21 CFR Part 211." },
    attribution: { en: "Authentic public-demo capture, Aug 29, 2026.", es: "Captura auténtica de la demo pública, 29 ago 2026." },
  }],
  links: [
    { label: { en: "Live demo", es: "Demo en vivo" }, url: demoUrl, kind: "evidence" },
    { label: { en: "GitHub repository", es: "Repositorio GitHub" }, url: repositoryUrl, kind: "repository" },
    { label: { en: "Pinned evidence commit", es: "Commit de evidencia fijado" }, url: `${repositoryUrl}/commit/${evidenceCommit}`, kind: "evidence" },
    { label: { en: "Download evidence deck", es: "Descargar presentación de evidencia" }, url: deckUrl, kind: "evidence" },
    { label: { en: "Repository license", es: "Licencia del repositorio" }, url: `${repositoryUrl}/blob/${evidenceCommit}/LICENSE`, kind: "license" },
  ],
  archiveDisciplines: { en: "RAG · Manufacturing knowledge · Hybrid retrieval · Evaluation", es: "RAG · Conocimiento de manufactura · Recuperación híbrida · Evaluación" },
  caseCopy: {
    evidenceDisplayDate: { en: "Sep 7, 2026", es: "7 sep 2026" },
    evidenceStamp: { en: "Evidence updated Sep 7, 2026", es: "Evidencia actualizada el 7 sep 2026" },
    boundaryTitle: { en: "Grounded answers, deliberately bounded", es: "Respuestas con evidencia, deliberadamente acotadas" },
    boundaryBody: { en: "This public demo answers from a controlled corpus and refuses when evidence is weak. It does not establish production readiness, industrial use, business results, or comprehensive manufacturing coverage.", es: "Esta demo pública responde desde un corpus controlado y rechaza cuando la evidencia es débil. No establece preparación productiva, uso industrial, resultados empresariales ni cobertura integral de manufactura." },
    architectureIntro: { en: "The flow keeps corpus provenance, retrieval, refusal, generation, citations, and the public boundary inspectable.", es: "El flujo mantiene inspeccionables la procedencia del corpus, recuperación, rechazo, generación, citas y límite público." },
    validationTitle: { en: "Evaluation and live verification", es: "Evaluación y verificación en vivo" },
    findingsTitle: { en: "Measured evidence", es: "Evidencia medida" },
    findingsIntro: { en: "Retrieval, refusal, faithfulness, and citation quality remain distinct signals.", es: "Recuperación, rechazo, fidelidad y calidad de citas permanecen como señales distintas." },
    limitsTitle: { en: "Honest limits", es: "Límites honestos" },
    provenanceIntro: { en: "Claims are bounded by the pinned repository commit, documented evaluations, and a dated live check.", es: "Las afirmaciones están delimitadas por el commit fijado, las evaluaciones documentadas y una comprobación en vivo fechada." },
    licensing: { en: "Project code and documentation are published under the repository's MIT license; source documents retain their original terms.", es: "El código y la documentación se publican bajo la licencia MIT del repositorio; los documentos fuente conservan sus términos originales." },
    programmingLanguages: ["Python", "JavaScript", "HTML", "CSS"],
    heroLinks: [
      { label: { en: "Live demo", es: "Demo en vivo" }, url: demoUrl, kind: "evidence" },
      { label: { en: "View code", es: "Ver código" }, url: repositoryUrl, kind: "repository" },
      { label: { en: "Download evidence deck", es: "Descargar presentación" }, url: deckUrl, kind: "evidence" },
    ],
  },
};
