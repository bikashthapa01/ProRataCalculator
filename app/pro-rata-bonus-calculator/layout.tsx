import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Bonus Calculator – UK Part-Time & Partial-Year Bonus Tool (2025)",
  description:
    "Work out your pro rata bonus entitlement for part-time or partial-year UK jobs. Instantly calculate your actual bonus, see a breakdown, and learn your rights.",
  keywords: [
    "pro rata bonus calculator",
    "UK bonus calculator",
    "part-time bonus calculator",
    "partial year bonus",
    "bonus entitlement UK",
    "employment bonus calculator",
    "UK employment rights",
    "bonus pro rata calculation",
    "part-time worker bonus",
    "annual bonus calculator",
    "employee bonus rights",
    "bonus calculation 2025",
    "UK employment law bonus",
    "pro rata employment benefits",
    "bonus for part-time staff",
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
    canonical: "/pro-rata-bonus-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Bonus Calculator – UK Part-Time & Partial-Year Bonus Tool (2025)",
    description:
      "Work out your pro rata bonus entitlement for part-time or partial-year UK jobs. Instantly calculate your actual bonus, see a breakdown, and learn your rights.",
    url: "https://proratacalculator.co.uk/pro-rata-bonus-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Bonus Calculator UK - Calculate your part-time and partial-year bonus entitlement for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Bonus Calculator – UK Part-Time & Partial-Year Bonus Tool (2025)",
    description:
      "Work out your pro rata bonus entitlement for part-time or partial-year UK jobs. Instantly calculate your actual bonus, see a breakdown, and learn your rights.",
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

export default function ProRataBonusCalculatorLayout({
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
            name: "Pro Rata Bonus Calculator",
            description:
              "Work out your pro rata bonus entitlement for part-time or partial-year UK jobs. Instantly calculate your actual bonus, see a breakdown, and learn your rights.",
            url: "https://proratacalculator.co.uk/pro-rata-bonus-calculator",
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
                name: "Pro Rata Bonus Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-bonus-calculator",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}
