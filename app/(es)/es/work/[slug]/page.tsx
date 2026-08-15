import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { getProject, getPublishedProjects, localize } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createMetadata({
    locale: "es",
    title: `Caso ${localize(project.title, "es")}`,
    description: `${localize(project.shortSummary, "es")} Revisa la evidencia, la validación y las conclusiones no respaldadas.`,
    englishPath: `/work/${slug}`,
    spanishPath: `/es/work/${slug}`,
  });
}

export default async function SpanishProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} locale="es" />;
}

