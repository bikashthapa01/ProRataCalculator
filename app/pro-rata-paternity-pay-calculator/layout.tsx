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
                name: "Who is eligible for SPP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You must be employed by the same employer for at least 26 weeks by the qualifying week (15th week before expected childbirth) and earn at least £125 per week on average. You must also be the biological father, partner, or adoptive parent of the child.",
                },
              },
              {
                "@type": "Question",
                name: "How is SPP calculated for part-time workers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SPP is calculated based on your actual average weekly earnings, regardless of whether you work part-time or full-time. The rate is the lower of £187.18 per week or 90% of your average weekly earnings. No additional pro-rata adjustment is needed if your average weekly earnings already reflect your part-time hours.",
                },
              },
              {
                "@type": "Question",
                name: "What's the SPP weekly rate for 2025?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For 2025/26, the SPP weekly rate is the lower of £187.18 per week or 90% of your average weekly earnings. This rate applies for up to 2 weeks of paternity leave, which can be taken consecutively or separately within the first 52 weeks after birth.",
                },
              },
              {
                "@type": "Question",
                name: "Can I split my paternity leave?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, from April 2024, you can split your 2 weeks of paternity leave into two separate one-week blocks. You can take these at any time within the first 52 weeks after the child's birth, giving you more flexibility than before.",
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
