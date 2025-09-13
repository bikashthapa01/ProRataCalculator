import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Term-Time Only Salary Calculator UK 2025 | Free TTO Pay Calculator",
  description:
    "Free UK term-time only salary calculator. Convert FTE salary to TTO pay for school staff, teaching assistants & education workers. Calculate annual, monthly, weekly & daily pay with holiday entitlement included.",
  keywords: [
    "term time only salary calculator",
    "TTO salary calculator UK",
    "term time only salary",
    "school term time salary calculator",
    "education salary calculator",
    "pro rata school pay calculator",
    "term time contract calculator",
    "school support staff salary",
    "teaching assistant salary calculator",
    "term time only pay calculator",
    "school holidays pay calculator",
    "education worker salary calculator",
    "term time employment calculator",
    "school contract calculator",
    "FTE to TTO converter",
    "term time pay rates UK",
    "school staff salary calculator",
    "learning support assistant pay",
    "school administrator salary",
    "term time only benefits",
    "UK school employment calculator",
    "term time only salary UK",
    "school term time pay",
    "education sector salary",
    "TTO contract calculator",
    "school holiday pay",
    "term time only employment",
    "education worker pay",
    "school support staff pay",
    "teaching assistant TTO salary",
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
    title: "Term-Time Only Salary Calculator UK 2025 | Free TTO Pay Calculator",
    description:
      "Free UK term-time only salary calculator. Convert FTE salary to TTO pay for school staff, teaching assistants & education workers. Calculate annual, monthly, weekly & daily pay with holiday entitlement included.",
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
    title: "Term-Time Only Salary Calculator UK 2025 | Free TTO Pay Calculator",
    description:
      "Free UK term-time only salary calculator. Convert FTE salary to TTO pay for school staff, teaching assistants & education workers. Calculate annual, monthly, weekly & daily pay with holiday entitlement included.",
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
            name: "Term-Time Only Salary Calculator UK 2025",
            description:
              "Free UK term-time only salary calculator. Convert FTE salary to TTO pay for school staff, teaching assistants & education workers.",
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
            keywords:
              "term time only salary calculator, TTO salary calculator UK, school term time salary, education salary calculator",
            inLanguage: "en-GB",
            audience: {
              "@type": "Audience",
              audienceType:
                "Education workers, school staff, teaching assistants",
            },
            featureList: [
              "Calculate term-time only salary from FTE pay",
              "Annual, monthly, weekly, and daily pay calculations",
              "Holiday entitlement included",
              "FTE comparison percentages",
              "Real-time calculation updates",
            ],
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
                name: "What is the difference between term-time only and pro-rata salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Term-time only salary applies both an hours reduction (for part-time work) and a time reduction (for working fewer weeks per year). Pro-rata salary typically only applies an hours reduction for part-time work over the full 52-week year. TTO contracts are specifically designed for education sector roles that follow the academic calendar.",
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
                name: "Do term-time only employees get paid during school holidays?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, term-time only employees receive their salary during school holidays as part of their paid holiday entitlement. This is typically 5.6 weeks (28 days) minimum, but many local authorities provide more. The salary is often spread evenly over 12 months for consistent monthly income.",
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
              {
                "@type": "Question",
                name: "Can I negotiate my term-time only salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, term-time only salaries can often be negotiated, especially for experienced staff or specialized roles. Factors that may influence negotiations include your qualifications, experience, the school's budget, local authority pay scales, and market rates for similar positions in your area.",
                },
              },
              {
                "@type": "Question",
                name: "How does part-time TTO work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Part-time term-time only contracts apply both an hours reduction and a TTO reduction. For example, working 20 hours instead of 37.5 hours (53.3% hours factor) for 39+5.6 weeks instead of 52 weeks (85.8% TTO factor) results in 45.7% of the full-time equivalent salary.",
                },
              },
              {
                "@type": "Question",
                name: "What jobs typically use TTO contracts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Term-time only contracts are common for school support staff, teaching assistants, learning support assistants, school administrators, catering staff, and some technical roles. They're particularly popular in primary and secondary schools across all local authorities.",
                },
              },
              {
                "@type": "Question",
                name: "How do I convert from full-time to term-time only salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To convert from full-time to term-time only salary, multiply your current FTE salary by the hours factor (your new hours ÷ full-time hours) and the TTO pay factor (paid weeks ÷ 52). For example, if you earn £30,000 FTE and move to 25 hours per week with 44.6 paid weeks: £30,000 × (25÷37.5) × (44.6÷52) = £17,160 annual TTO salary.",
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
