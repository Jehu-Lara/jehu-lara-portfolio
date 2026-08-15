import { WorkView } from "@/components/WorkView";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  locale: "en",
  title: "Work — Jehu Lara",
  description:
    "An extensible archive of Jehu Lara's technical projects, with scope, evidence, findings, and explicit analytical boundaries.",
  englishPath: "/work",
  spanishPath: "/es/work",
});

export default function WorkPage() {
  return <WorkView locale="en" />;
}

