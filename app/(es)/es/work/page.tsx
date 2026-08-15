import { WorkView } from "@/components/WorkView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "es",
  title: "Proyectos — Jehu Lara",
  description:
    "Archivo extensible de proyectos técnicos de Jehu Lara con alcance, evidencia, hallazgos y límites analíticos explícitos.",
  englishPath: "/work",
  spanishPath: "/es/work",
});

export default function SpanishWorkPage() {
  return <WorkView locale="es" />;
}

