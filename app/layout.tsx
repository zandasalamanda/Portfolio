import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Libre_Franklin } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { award, identity, positioning } from "@/content/site";
import { asset } from "@/lib/assets";

const libre = Libre_Franklin({
  variable: "--font-libre",
  subsets: ["latin"],
  /* 700 is declared nowhere in app/ or components/ — no font-bold, no <strong>,
     no 700 rule — so shipping it was ~15 KB of font nobody rendered. */
  weight: ["400", "500", "600", "900"],
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
  title: {
    default: positioning.title,
    template: "%s — Zander Leon",
  },
  description: positioning.description,
};

export const viewport: Viewport = {
  themeColor: "#0b0b0e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: siteUrl,
  jobTitle: "Software developer",
  award: award.jsonLd,
  alumniOf: "Morris County School of Technology",
  email: `mailto:${identity.email}`,
  sameAs: [identity.github, identity.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headshot = asset("portrait-round.png");
  const avatar =
    headshot.exists && headshot.width && headshot.height
      ? { url: headshot.url, width: headshot.width, height: headshot.height }
      : undefined;

  return (
    <html
      lang="en"
      className={`${libre.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader avatar={avatar} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
