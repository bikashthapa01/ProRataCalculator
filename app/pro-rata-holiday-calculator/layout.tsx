import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Holiday Calculator – Statutory Entitlement for Part-Time & Leavers (UK 2025)",
  description:
    "Calculate your statutory pro rata holiday entitlement for part-time, fixed-term, or leaving jobs in the UK. The most accurate 2025 pro rata holiday calculator, plus guides, FAQs, and legal info.",
  keywords: [
    "pro rata holiday calculator",
    "holiday entitlement calculator UK",
    "part time holiday entitlement",
    "statutory holiday calculator",
    "holiday pay calculator",
    "pro rata holiday entitlement",
    "UK holiday calculator 2025",
    "leaving job holiday pay",
    "mid year holiday entitlement",
    "term time holiday calculation",
    "holiday entitlement part time",
    "statutory minimum holiday UK",
    "holiday calculation formula",
    "employment law holiday rights",
    "HMRC holiday entitlement",
  ],
  authors: [{ name: "Pro Rata Calculator UK" }],
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "/pro-rata-holiday-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Holiday Calculator – Statutory Entitlement for Part-Time & Leavers (UK 2025)",
    description:
      "Calculate your statutory pro rata holiday entitlement for part-time, fixed-term, or leaving jobs in the UK. The most accurate 2025 pro rata holiday calculator, plus guides, FAQs, and legal info.",
    url: "https://proratacalculator.co.uk/pro-rata-holiday-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-holiday-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Holiday Calculator UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Holiday Calculator – Statutory Entitlement for Part-Time & Leavers (UK 2025)",
    description:
      "Calculate your statutory pro rata holiday entitlement for part-time, fixed-term, or leaving jobs in the UK. The most accurate 2025 pro rata holiday calculator.",
    images: ["/og-holiday-calculator.jpg"],
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

export default function ProRataHolidayCalculatorLayout({
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
            name: "Pro Rata Holiday Calculator",
            description:
              "Calculate your statutory pro rata holiday entitlement for part-time, fixed-term, or leaving jobs in the UK",
            url: "https://proratacalculator.co.uk/pro-rata-holiday-calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web Browser",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            softwareVersion: "1.0",
            releaseNotes:
              "2025 updated with latest UK statutory holiday calculations",
            featureList: [
              "Pro rata holiday entitlement calculation",
              "Part-time worker holiday calculator",
              "Leaving employee holiday pay calculator",
              "Mid-year starter holiday entitlement",
              "Term-time worker holiday calculation",
              "UK statutory minimum holiday calculator",
              "HMRC-compliant holiday calculations",
            ],
            screenshot:
              "https://proratacalculator.co.uk/screenshot-holiday-calculator.jpg",
            softwareHelp:
              "https://proratacalculator.co.uk/pro-rata-holiday-calculator",
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
                name: "Pro Rata Holiday Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-holiday-calculator",
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
                name: "What is the minimum holiday entitlement in the UK?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All UK workers are legally entitled to at least 5.6 weeks (28 days) of paid holiday per year. This includes bank holidays unless your contract states otherwise.",
                },
              },
              {
                "@type": "Question",
                name: "How is pro rata holiday calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pro rata holiday is calculated by dividing your working days by full-time working days, then multiplying by 28 days. For example: (156 days ÷ 260 days) × 28 = 16.8 days.",
                },
              },
              {
                "@type": "Question",
                name: "What if I start work mid-year?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Your holiday entitlement is calculated from your start date to the end of the holiday year. Use our calculator with your start date to get your pro rata entitlement.",
                },
              },
              {
                "@type": "Question",
                name: "Can I carry over unused holiday?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Generally, you cannot carry over statutory holiday to the next year. However, some employers allow this, and there are exceptions for certain circumstances.",
                },
              },
              {
                "@type": "Question",
                name: "What happens to my holiday when I leave?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You're entitled to holiday pay for any unused holiday when you leave. Your employer should pay you for this in your final salary payment.",
                },
              },
              {
                "@type": "Question",
                name: "Do bank holidays count towards my entitlement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bank holidays can be included in your 28-day statutory entitlement. Check your employment contract to see how your employer handles bank holidays.",
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
