import { HomeView } from "@/components/HomeView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "es",
  title: "Jehu Lara — Fundador y CEO de Reperta",
  description:
    "Conoce a Jehu Lara, fundador y CEO de Reperta. Explora su iniciativa actual en Monterrey y su trabajo técnico en calidad, datos e IA aplicada.",
  englishPath: "/",
  spanishPath: "/es",
});

export default function SpanishHomePage() {
  return <HomeView locale="es" />;
}
