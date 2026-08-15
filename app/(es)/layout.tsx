import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jehu Lara — Calidad y analítica",
    template: "%s — Jehu Lara",
  },
  description:
    "Jehu Lara convierte datos operativos en decisiones auditables mediante supuestos claros, evidencia reproducible y límites honestos.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}

