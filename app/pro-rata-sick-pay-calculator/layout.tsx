import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Sick Pay Calculator – UK Statutory Sick Pay (SSP) Tool (2025)",
  description:
    "Calculate your Statutory Sick Pay (SSP) for part-time or pro rata workers in the UK, with up-to-date 2025 rates. Find out your entitlement and see a full SSP breakdown.",
  keywords: [
    "statutory sick pay calculator",
    "SSP calculator UK",
    "sick pay calculator 2025",
    "part-time sick pay",
    "pro rata sick pay",
    "UK sick pay calculator",
    "statutory sick pay 2025",
    "sick pay entitlement",
    "SSP rates 2025",
    "sick pay for part-time workers",
    "UK employment calculator",
    "sick pay calculator UK",
  ],
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
    canonical: "/pro-rata-sick-pay-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Sick Pay Calculator – UK Statutory Sick Pay (SSP) Tool (2025)",
    description:
      "Calculate your Statutory Sick Pay (SSP) for part-time or pro rata workers in the UK, with up-to-date 2025 rates. Find out your entitlement and see a full SSP breakdown.",
    url: "https://proratacalculator.co.uk/pro-rata-sick-pay-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Sick Pay Calculator UK - Calculate Statutory Sick Pay (SSP) for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Sick Pay Calculator – UK Statutory Sick Pay (SSP) Tool (2025)",
    description:
      "Calculate your Statutory Sick Pay (SSP) for part-time or pro rata workers in the UK, with up-to-date 2025 rates. Find out your entitlement and see a full SSP breakdown.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "geo.region": "GB",
    "geo.placename": "United Kingdom",
    "geo.position": "54.2361;-4.5481",
    ICBM: "54.2361, -4.5481",
  },
};

export default function ProRataSickPayCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Schema.org JSON-LD for WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pro Rata Sick Pay Calculator",
            description:
              "Calculate your Statutory Sick Pay (SSP) for part-time or pro rata workers in the UK, with up-to-date 2025 rates. Find out your entitlement and see a full SSP breakdown.",
            url: "https://proratacalculator.co.uk/pro-rata-sick-pay-calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            softwareVersion: "1.0",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            author: {
              "@type": "Organization",
              name: "Pro Rata Calculator UK",
              url: "https://proratacalculator.co.uk",
            },
          }),
        }}
      />

      {/* Schema.org JSON-LD for BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://proratacalculator.co.uk",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Pro Rata Sick Pay Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-sick-pay-calculator",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}
