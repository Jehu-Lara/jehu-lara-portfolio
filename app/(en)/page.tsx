import { HomeView } from "@/components/HomeView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "en",
  title: "Jehu Lara — Quality & Analytics Engineer",
  description:
    "A personal evidence portfolio for quality, operations, and analytics work built with traceability, validation, and honest limits.",
  englishPath: "/",
  spanishPath: "/es",
});

export default function HomePage() {
  return <HomeView locale="en" />;
}

