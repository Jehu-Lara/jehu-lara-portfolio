import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jehu Lara — Founder & CEO of Reperta",
    template: "%s — Jehu Lara",
  },
  description:
    "Jehu Lara, founder and CEO of Reperta, an independent studio in Monterrey investigating business problems to build new companies.",
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
