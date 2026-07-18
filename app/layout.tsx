import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { award, identity, positioning } from "@/content/site";

const libre = Libre_Franklin({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zanderleon.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: positioning.title,
  description: positioning.description,
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: siteUrl,
  award: award.jsonLd,
  alumniOf: "Morris County School of Technology",
  sameAs: [identity.github, identity.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libre.variable} ${sourceSerif.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
