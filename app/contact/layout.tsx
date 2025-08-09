import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Pro Rata Calculator UK 2025",
  description:
    "Get in touch with us for questions, feedback, or support with our pro rata calculator. We're here to help with your salary calculation needs.",
  keywords:
    "contact us, calculator support, feedback, pro rata calculator help",
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
    canonical: "https://proratacalculator.co.uk/contact",
  },
  openGraph: {
    title: "Contact Us | Pro Rata Calculator UK 2025",
    description:
      "Get in touch with us for questions, feedback, or support with our pro rata calculator. We're here to help with your salary calculation needs.",
    url: "https://proratacalculator.co.uk/contact",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Us - Pro Rata Calculator UK 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Pro Rata Calculator UK 2025",
    description:
      "Get in touch with us for questions, feedback, or support with our pro rata calculator.",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
