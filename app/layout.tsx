import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.siteUrl,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: site.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og-default.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable}`}>
      <body className="font-sans text-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
