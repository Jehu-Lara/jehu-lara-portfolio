import { HomeView } from "@/components/HomeView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "en",
  title: "Jehu Lara — Founder & CEO of Reperta",
  description:
    "Meet Jehu Lara, founder and CEO of Reperta. Explore his current venture in Monterrey and technical work in quality, data, and applied AI.",
  englishPath: "/",
  spanishPath: "/es",
});

export default function HomePage() {
  return <HomeView locale="en" />;
}
