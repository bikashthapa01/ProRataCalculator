import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Pro Rata Calculator UK 2025",
  description:
    "Find answers to frequently asked questions about our pro rata calculator. Learn how to calculate pro rata salary, understand UK employment law, and get help with our calculator.",
  keywords:
    "pro rata calculator FAQ, frequently asked questions, UK salary calculator help, pro rata salary questions, calculator support",
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
    canonical: "https://proratacalculator.co.uk/faq",
  },
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Pro Rata Calculator UK 2025",
    description:
      "Find answers to frequently asked questions about our pro rata calculator. Learn how to calculate pro rata salary, understand UK employment law, and get help with our calculator.",
    url: "https://proratacalculator.co.uk/faq",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ - Pro Rata Calculator UK 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Frequently Asked Questions | Pro Rata Calculator UK 2025",
    description:
      "Find answers to frequently asked questions about our pro rata calculator.",
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

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
