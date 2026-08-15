import { HomeView } from "@/components/HomeView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "es",
  title: "Jehu Lara — Calidad y analítica",
  description:
    "Portafolio personal de calidad, operaciones y analítica construido con trazabilidad, validación y límites honestos.",
  englishPath: "/",
  spanishPath: "/es",
});

export default function SpanishHomePage() {
  return <HomeView locale="es" />;
}

