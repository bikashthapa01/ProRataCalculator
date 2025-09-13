import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
  description:
    "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
  keywords: [
    "pro rata calculator blog",
    "UK employment law",
    "salary calculations",
    "pro rata work",
    "employment news",
    "UK employment guides",
    "part time salary",
    "holiday entitlement",
    "employment calculator",
    "UK employment 2025",
  ].join(", "),
  authors: [{ name: "Pro Rata Calculator UK" }],
  creator: "Pro Rata Calculator UK",
  publisher: "Pro Rata Calculator UK",
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "https://proratacalculator.co.uk/blog",
  },
  openGraph: {
    title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
    description:
      "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
    url: "https://proratacalculator.co.uk/blog",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://proratacalculator.co.uk/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Calculator Blog - UK Employment Law & Salary Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
    description:
      "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
    images: ["https://proratacalculator.co.uk/blog-og-image.jpg"],
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
    "application-name": "Pro Rata Calculator UK",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
