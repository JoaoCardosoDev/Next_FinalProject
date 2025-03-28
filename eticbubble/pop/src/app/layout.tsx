import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bubbleup.pt"),
  title: "Shower Thoughts | Where Fleeting Ideas Find Their Voice",
  description:
    "Share your most profound shower thoughts in a space where scarcity breeds creativity. Limited to 10 thoughts per user, making each one count.",
  keywords:
    "shower thoughts, ideas, creativity, social platform, thoughts sharing, ephemeral content, limited posts",
  authors: [{ name: "JoaoCardosoDev", url: "https://www.bubbleup.pt" }],
  creator: "JoaoCardosoDev",
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
      </body>
    </html>
  );
}
