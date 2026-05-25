import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eileen & Eduard – Unsere Hochzeit | 10.07.2026",
  description: "Wir heiraten! Alle Infos zur Hochzeit von Eileen und Eduard am 10. Juli 2026 in Wulfen und Hamminkeln.",
  openGraph: {
    title: "Eileen & Eduard – Unsere Hochzeit",
    description: "10. Juli 2026 – St. Matthäus Kirche Wulfen & Hecheltjens Hof Hamminkeln",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
