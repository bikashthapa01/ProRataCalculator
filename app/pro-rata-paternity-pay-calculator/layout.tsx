import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pro Rata Paternity Pay Calculator (SPP) – UK 2025",
  description:
    "Work out Statutory Paternity Pay for part-time or full-time UK workers using 2025 rules. Check eligibility and see your SPP rate instantly.",
  keywords: [
    "statutory paternity pay calculator",
    "SPP calculator UK",
    "paternity pay calculator",
    "part-time paternity pay",
    "pro rata paternity pay",
    "UK paternity leave calculator",
    "paternity pay entitlement",
    "SPP eligibility calculator",
    "statutory paternity pay 2025",
    "paternity pay rate UK",
    "paternity leave pay calculator",
    "UK employment rights paternity",
    "paternity pay 2025",
    "father's pay calculator",
    "paternity benefits UK",
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
    canonical: "/pro-rata-paternity-pay-calculator",
  },
  openGraph: {
    title: "Pro Rata Paternity Pay Calculator (SPP) – UK 2025",
    description:
      "Work out Statutory Paternity Pay for part-time or full-time UK workers using 2025 rules. Check eligibility and see your SPP rate instantly.",
    url: "https://proratacalculator.co.uk/pro-rata-paternity-pay-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Paternity Pay Calculator UK - Calculate your SPP entitlement for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Rata Paternity Pay Calculator (SPP) – UK 2025",
    description:
      "Work out Statutory Paternity Pay for part-time or full-time UK workers using 2025 rules. Check eligibility and see your SPP rate instantly.",
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

export default function ProRataPaternityPayCalculatorLayout({
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
            name: "Pro Rata Paternity Pay Calculator",
            description:
              "Work out Statutory Paternity Pay for part-time or full-time UK workers using 2025 rules. Check eligibility and see your SPP rate instantly.",
            url: "https://proratacalculator.co.uk/pro-rata-paternity-pay-calculator",
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
                name: "Pro Rata Paternity Pay Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-paternity-pay-calculator",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}
