import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Pro Rata Calculator UK 2025",
  description:
    "Our terms of service outline the conditions for using our free pro rata calculator. Please read these terms carefully before using our service.",
  keywords:
    "terms of service, terms and conditions, calculator terms, UK calculator terms",
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
    canonical: "https://proratacalculator.co.uk/terms",
  },
  openGraph: {
    title: "Terms of Service | Pro Rata Calculator UK 2025",
    description:
      "Our terms of service outline the conditions for using our free pro rata calculator. Please read these terms carefully before using our service.",
    url: "https://proratacalculator.co.uk/terms",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terms of Service - Pro Rata Calculator UK 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Pro Rata Calculator UK 2025",
    description:
      "Our terms of service outline the conditions for using our free pro rata calculator.",
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

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
