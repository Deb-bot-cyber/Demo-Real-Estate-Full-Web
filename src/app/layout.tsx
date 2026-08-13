import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "@fontsource/tasa-orbiter/index.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA Estates | Luxury Real Estate & Exceptional Properties",
  description:
    "Discover exceptional homes, investment opportunities, and premium properties with AURA Estates. Explore curated real estate across the world's most desirable locations.",
  keywords: [
    "Luxury Real Estate",
    "High-end Properties",
    "Modern Penthouses",
    "Architectural Homes",
    "AURA Estates",
    "Miami Luxury Real Estate",
    "Los Angeles Mansions",
  ],
  authors: [{ name: "AURA Luxury Real Estate" }],
  openGraph: {
    title: "AURA Estates | Luxury Real Estate & Exceptional Properties",
    description:
      "Curated luxury real estate across the world's most desirable locations.",
    url: "https://aura-estates.com",
    siteName: "AURA Estates",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AURA Estates Luxury Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA Estates | Luxury Real Estate",
    description:
      "Curated luxury real estate across the world's most desirable locations.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=tasa-orbiter@300,400,500,600,700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#FAF9F5] text-[#18181B] font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">

        {children}
      </body>
    </html>
  );
}
