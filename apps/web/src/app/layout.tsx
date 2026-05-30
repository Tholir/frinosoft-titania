import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frinosoft:Titania — D&D 5e Character Builder",
  description:
    "Creador de personajes de Dungeons & Dragons 5e con asistencia de IA y soporte para contenido Homebrew.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Courier+Prime&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-[#f4e4bc] text-[#2c1810] dark:bg-[#1a1209] dark:text-[#f4e4bc]">
        {children}
      </body>
    </html>
  );
}
