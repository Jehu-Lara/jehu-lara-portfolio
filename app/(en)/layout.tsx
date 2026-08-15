import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jehu Lara — Quality & Analytics Engineer",
    template: "%s — Jehu Lara",
  },
  description:
    "Jehu Lara turns operational data into auditable decisions through clear assumptions, reproducible evidence, and honest boundaries.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

