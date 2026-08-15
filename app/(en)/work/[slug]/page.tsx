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
    locale: "en",
    title: `${localize(project.title, "en")} case study`,
    description: `${localize(project.shortSummary, "en")} Read the evidence, validation, and unsupported conclusions.`,
    englishPath: `/work/${slug}`,
    spanishPath: `/es/work/${slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyView project={project} locale="en" />;
}

