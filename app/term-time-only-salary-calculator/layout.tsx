import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Term-Time Only Salary Calculator (UK 2025) – Pro Rata School Pay",
  description:
    "Convert an FTE salary to a UK term-time only salary. Enter term weeks, paid holidays, and hours to get annual, monthly, weekly, and daily pay with FTE comparison.",
  keywords: [
    "term time only salary calculator",
    "TTO salary calculator UK",
    "school term time salary",
    "education salary calculator",
    "pro rata school pay",
    "term time contract calculator",
    "school support staff salary",
    "teaching assistant salary calculator",
    "term time only pay",
    "school holidays pay calculator",
    "education worker salary",
    "term time employment calculator",
    "school contract calculator",
    "FTE to TTO converter",
    "term time pay rates UK",
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
    canonical: "/term-time-only-salary-calculator",
  },
  openGraph: {
    title: "Term-Time Only Salary Calculator (UK 2025) – Pro Rata School Pay",
    description:
      "Convert an FTE salary to a UK term-time only salary. Enter term weeks, paid holidays, and hours to get annual, monthly, weekly, and daily pay with FTE comparison.",
    url: "https://proratacalculator.co.uk/term-time-only-salary-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Term-Time Only Salary Calculator UK - Calculate your school contract pay for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Term-Time Only Salary Calculator (UK 2025) – Pro Rata School Pay",
    description:
      "Convert an FTE salary to a UK term-time only salary. Enter term weeks, paid holidays, and hours to get annual, monthly, weekly, and daily pay with FTE comparison.",
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

export default function TermTimeOnlySalaryCalculatorLayout({
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
            name: "Term-Time Only Salary Calculator",
            description:
              "Convert an FTE salary to a UK term-time only salary. Enter term weeks, paid holidays, and hours to get annual, monthly, weekly, and daily pay with FTE comparison.",
            url: "https://proratacalculator.co.uk/term-time-only-salary-calculator",
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
                name: "Term-Time Only Salary Calculator",
                item: "https://proratacalculator.co.uk/term-time-only-salary-calculator",
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
                name: "How do I calculate term-time only salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To calculate term-time only (TTO) salary, multiply the FTE annual salary by the hours factor (your hours ÷ full-time hours) and the TTO pay factor (paid weeks ÷ 52 weeks). Paid weeks typically include 39 term weeks plus 5.6 statutory holiday weeks.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical term weeks in the UK?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "UK schools typically work 39 weeks per year, which includes three terms with half-term breaks. However, this can vary by local authority and school type. Some areas may have 38 or 40 term weeks depending on their academic calendar.",
                },
              },
              {
                "@type": "Question",
                name: "Do term-time contracts include paid holidays?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, term-time only contracts must include statutory paid holiday entitlement. The minimum is 5.6 weeks (28 days) but many local authorities provide more. Some include bank holidays within the holiday allocation, while others add them separately.",
                },
              },
              {
                "@type": "Question",
                name: "Why is my monthly pay the same if I only work in term time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Many employers spread term-time only pay evenly over 12 months to provide consistent monthly income. This means you receive the same amount each month, even during school holidays when you're not working. Some employers pay only during worked and holiday weeks instead.",
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
