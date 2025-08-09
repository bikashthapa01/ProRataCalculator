import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pro Rata Calculator UK 2025 | Free Salary Calculator",
  description:
    "Learn about our free UK pro rata calculator. We provide accurate, HMRC-compliant salary calculations for part-time, reduced hours, and temporary work arrangements.",
  keywords:
    "about pro rata calculator, UK salary calculator, free calculator, HMRC compliant",
  authors: [{ name: "Pro Rata Calculator UK" }],
  creator: "Pro Rata Calculator UK",
  publisher: "Pro Rata Calculator UK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "https://proratacalculator.co.uk/about",
  },
  openGraph: {
    title: "About Pro Rata Calculator UK 2025 | Free Salary Calculator",
    description:
      "Learn about our free UK pro rata calculator. We provide accurate, HMRC-compliant salary calculations for part-time, reduced hours, and temporary work arrangements.",
    url: "https://proratacalculator.co.uk/about",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Pro Rata Calculator UK 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pro Rata Calculator UK 2025 | Free Salary Calculator",
    description:
      "Learn about our free UK pro rata calculator. We provide accurate, HMRC-compliant salary calculations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "GB",
    "geo.placename": "United Kingdom",
    "geo.position": "54.2361;-4.5481",
    ICBM: "54.2361, -4.5481",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
