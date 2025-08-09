import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Maternity Pay Calculator – UK Statutory Maternity Pay (2025)",
  description:
    "Calculate your Statutory Maternity Pay (SMP) for part-time or pro rata earnings in the UK, up-to-date for 2025. Check eligibility, see full SMP breakdown, and understand your rights.",
  keywords: [
    "pro rata maternity pay calculator",
    "SMP calculator UK",
    "statutory maternity pay calculator",
    "maternity pay entitlement",
    "UK maternity calculator 2025",
    "part time maternity pay",
    "maternity pay calculation",
    "statutory maternity pay UK",
    "SMP rates 2025",
    "maternity pay eligibility",
    "maternity allowance calculator",
    "pregnancy pay calculator",
    "maternity pay rights",
    "employment law maternity",
    "HMRC maternity pay",
  ],
  authors: [{ name: "Pro Rata Calculator UK" }],
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "/pro-rata-maternity-pay-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Maternity Pay Calculator – UK Statutory Maternity Pay (2025)",
    description:
      "Calculate your Statutory Maternity Pay (SMP) for part-time or pro rata earnings in the UK, up-to-date for 2025. Check eligibility, see full SMP breakdown, and understand your rights.",
    url: "https://proratacalculator.co.uk/pro-rata-maternity-pay-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-maternity-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Maternity Pay Calculator UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Maternity Pay Calculator – UK Statutory Maternity Pay (2025)",
    description:
      "Calculate your Statutory Maternity Pay (SMP) for part-time or pro rata earnings in the UK, up-to-date for 2025.",
    images: ["/og-maternity-calculator.jpg"],
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

export default function ProRataMaternityPayCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Pro Rata Maternity Pay Calculator",
            description:
              "Calculate your Statutory Maternity Pay (SMP) for part-time or pro rata earnings in the UK, up-to-date for 2025.",
            url: "https://proratacalculator.co.uk/pro-rata-maternity-pay-calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            provider: {
              "@type": "Organization",
              name: "Pro Rata Calculator UK",
              url: "https://proratacalculator.co.uk",
            },
            dateModified: new Date().toISOString(),
            inLanguage: "en-GB",
            countryOfOrigin: "GB",
          }),
        }}
      />
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
                name: "Pro Rata Maternity Pay Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-maternity-pay-calculator",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who qualifies for SMP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You must be employed for at least 26 weeks by the qualifying week (15th week before expected childbirth) and earn at least £125 per week on average in the 8 weeks before the qualifying week.",
                },
              },
              {
                "@type": "Question",
                name: "How is SMP calculated for part-time workers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SMP is calculated based on your actual average weekly earnings, regardless of whether you work part-time or full-time. The same rates apply: 90% for the first 6 weeks, then the lower of £184.03/week or 90% for the next 33 weeks.",
                },
              },
              {
                "@type": "Question",
                name: "What is the SMP weekly cap for 2025?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For 2025/26, the SMP weekly cap is £184.03. This applies to the 33 weeks after the first 6 weeks. The first 6 weeks are paid at 90% of your average weekly earnings with no cap.",
                },
              },
              {
                "@type": "Question",
                name: "How to calculate average weekly pay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For fixed pay, use your regular weekly amount. For variable pay, calculate the average of your earnings in the 8 weeks before the qualifying week. Include all taxable earnings but exclude overtime unless it's guaranteed.",
                },
              },
              {
                "@type": "Question",
                name: "When does SMP start and end?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SMP can start from 11 weeks before your expected week of childbirth and is paid for up to 39 weeks. You must give your employer at least 28 days' notice of when you want SMP to start.",
                },
              },
              {
                "@type": "Question",
                name: "What if I don't qualify for SMP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you don't qualify for SMP, you may be eligible for Maternity Allowance (MA) from the government. MA is paid for up to 39 weeks at £187.18 per week (2025/26) if you meet the National Insurance contribution requirements.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
