import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Redundancy Pay Calculator – UK Statutory Redundancy Tool (2025)",
  description:
    "Calculate your statutory redundancy pay including pro rata for part-time or partial-year work. The most accurate and user-friendly UK redundancy pay calculator for 2025.",
  keywords: [
    "pro rata redundancy pay calculator",
    "redundancy pay calculator UK",
    "statutory redundancy calculator",
    "redundancy pay entitlement",
    "UK redundancy calculator 2025",
    "part time redundancy pay",
    "redundancy calculation formula",
    "statutory redundancy pay UK",
    "redundancy pay rates 2025",
    "continuous service redundancy",
    "age based redundancy pay",
    "weekly wage cap redundancy",
    "redundancy pay eligibility",
    "employment law redundancy",
    "HMRC redundancy pay",
  ],
  authors: [{ name: "Pro Rata Calculator UK" }],
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "/pro-rata-redundancy-pay-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Redundancy Pay Calculator – UK Statutory Redundancy Tool (2025)",
    description:
      "Calculate your statutory redundancy pay including pro rata for part-time or partial-year work. The most accurate and user-friendly UK redundancy pay calculator for 2025.",
    url: "https://proratacalculator.co.uk/pro-rata-redundancy-pay-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-redundancy-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Redundancy Pay Calculator UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Redundancy Pay Calculator – UK Statutory Redundancy Tool (2025)",
    description:
      "Calculate your statutory redundancy pay including pro rata for part-time or partial-year work. The most accurate and user-friendly UK redundancy pay calculator for 2025.",
    images: ["/og-redundancy-calculator.jpg"],
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

export default function ProRataRedundancyPayCalculatorLayout({
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
            name: "Pro Rata Redundancy Pay Calculator",
            description:
              "Calculate your statutory redundancy pay including pro rata for part-time or partial-year work in the UK",
            url: "https://proratacalculator.co.uk/pro-rata-redundancy-pay-calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web Browser",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            softwareVersion: "1.0",
            releaseNotes:
              "2025 updated with latest UK statutory redundancy pay calculations",
            featureList: [
              "Pro rata redundancy pay calculation",
              "Part-time worker redundancy calculator",
              "Age-based redundancy pay rates",
              "Weekly wage cap calculations",
              "Continuous service calculations",
              "UK statutory redundancy calculator",
              "HMRC-compliant redundancy calculations",
            ],
            screenshot:
              "https://proratacalculator.co.uk/screenshot-redundancy-calculator.jpg",
            softwareHelp:
              "https://proratacalculator.co.uk/pro-rata-redundancy-pay-calculator",
            maintainer: {
              "@type": "Organization",
              name: "Pro Rata Calculator UK",
              url: "https://proratacalculator.co.uk",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
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
                name: "Pro Rata Redundancy Pay Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-redundancy-pay-calculator",
              },
            ],
          }),
        }}
      />

      {/* Schema.org JSON-LD for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is eligible for redundancy pay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You must be at least 18 years old and have at least 2 years of continuous service with your employer to be eligible for statutory redundancy pay.",
                },
              },
              {
                "@type": "Question",
                name: "How is redundancy pay calculated in the UK?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Redundancy pay is calculated based on your age, years of service, and weekly wage (capped at £700). Rates are: 1.5 weeks' pay for age 41+, 1 week for age 22-40, and 0.5 weeks for age 18-21.",
                },
              },
              {
                "@type": "Question",
                name: "What's the cap on weekly wage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For 2025/26, the weekly wage cap is £700. Even if you earn more, your redundancy pay calculation will be based on £700 per week.",
                },
              },
              {
                "@type": "Question",
                name: "How does pro rata redundancy work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For part-time workers, redundancy pay is calculated proportionally based on your actual working hours compared to full-time hours. For example, if you work 20 hours out of 37.5 full-time hours, your redundancy pay is multiplied by 0.53.",
                },
              },
              {
                "@type": "Question",
                name: "What counts as continuous service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Continuous service includes all employment with the same employer, including any breaks of less than one week. It starts from your first day of employment.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get redundancy pay if I'm under 18?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, you must be at least 18 years old to be eligible for statutory redundancy pay. However, your employer may offer discretionary redundancy pay.",
                },
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}
