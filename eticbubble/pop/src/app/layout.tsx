import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bubbleup.pt"),
  title: "Shower Thoughts | Where Fleeting Ideas Find Their Voice",
  description:
    "Share your most profound shower thoughts in a space where scarcity breeds creativity. Limited to 10 thoughts per user, making each one count.",
  keywords:
    "shower thoughts, ideas, creativity, social platform, thoughts sharing, social media, limited posts",
  authors: [{ name: "JoaoCardosoDev", url: "https://www.bubbleup.pt" }],
  creator: "JoaoCardosoDev",
  alternates: {
    canonical: "https://www.bubbleup.pt",
    languages: {
      en: "https://www.bubbleup.pt",
      "en-US": "https://www.bubbleup.pt",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bubbleup.pt",
    title: "Shower Thoughts | Where Fleeting Ideas Find Their Voice",
    description:
      "Share your most profound shower thoughts in a space where scarcity breeds creativity. Limited to 10 thoughts per user, making each one count.",
    siteName: "Shower Thoughts",
    images: [
      {
        url: "https://www.bubbleup.pt/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bubble Up - Where Fleeting Ideas Find Their Voice",
        type: "image/jpeg",
      },
    ],
  },
  icons: [{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" }],
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rmm2lvr.css" />
      </head>
      <body>
        <Providers>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
        <Analytics />
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
