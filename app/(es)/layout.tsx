import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jehu Lara — Fundador y CEO de Reperta",
    template: "%s — Jehu Lara",
  },
  description:
    "Jehu Lara, fundador y CEO de Reperta, un estudio independiente de Monterrey que investiga problemas de negocio para construir nuevas empresas.",
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
