import { profile } from "@/content/profile";

export function LinkedInLink({
  label,
  externalLabel,
  location,
  className,
}: {
  label: string;
  externalLabel: string;
  location: "navigation" | "hero" | "contact" | "footer";
  className?: string;
}) {
  return (
    <a
      className={className}
      href={profile.linkedInUrl}
      target="_blank"
      rel="noreferrer"
      data-linkedin-location={location}
    >
      <span className="linkedin-icon" aria-hidden="true">in</span>
      <span>{label}</span>
      <span className="sr-only"> ({externalLabel})</span>
    </a>
  );
}

