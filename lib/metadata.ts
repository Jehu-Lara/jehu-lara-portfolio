import type { Metadata } from "next";
import type { Locale } from "@/content/types";

const socialImage = "/jehu-lara-social-card.png";

export function createMetadata({
  locale,
  title,
  description,
  englishPath,
  spanishPath,
}: {
  locale: Locale;
  title: string;
  description: string;
  englishPath: string;
  spanishPath: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: {
      languages: {
        en: englishPath,
        es: spanishPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Jehu Lara",
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_MX"],
      title,
      description,
      images: [{ url: socialImage, width: 1733, height: 907, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
