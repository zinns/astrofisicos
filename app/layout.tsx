import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { buildMetadata } from "@/lib/seo";

import "@/styles/globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      lang="es"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
