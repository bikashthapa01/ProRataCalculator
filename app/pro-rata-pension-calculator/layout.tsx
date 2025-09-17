import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Pension Calculator UK 2025 | Free Workplace Pension Calculator",
  description:
    "Free UK pro rata pension calculator for part-time and term-time only employees. Calculate workplace pension contributions, auto-enrolment eligibility, and employee/employer contributions with 2025/26 rates.",
  keywords: [
    "pro rata pension calculator",
    "part-time pension calculator UK",
    "workplace pension calculator",
    "auto enrolment pension calculator",
    "pension contributions calculator",
    "part-time pension contributions",
    "pro rata pension contributions",
    "workplace pension UK",
    "pension calculator 2025",
    "auto enrolment calculator",
    "employee pension contributions",
    "employer pension contributions",
    "pensionable earnings calculator",
    "qualifying earnings pension",
    "part-time worker pension",
    "term-time pension calculator",
    "school staff pension calculator",
    "teaching assistant pension",
    "education worker pension",
    "UK pension calculator",
    "pension contribution rates",
    "workplace pension scheme",
    "pension auto enrolment",
    "part-time pension rights",
    "pension eligibility calculator",
    "workplace pension contributions",
    "pension calculator UK 2025",
    "auto enrolment eligibility",
    "pension contribution calculator",
    "workplace pension rates",
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
    canonical: "/pro-rata-pension-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Pension Calculator UK 2025 | Free Workplace Pension Calculator",
    description:
      "Free UK pro rata pension calculator for part-time and term-time only employees. Calculate workplace pension contributions, auto-enrolment eligibility, and employee/employer contributions with 2025/26 rates.",
    url: "https://proratacalculator.co.uk/pro-rata-pension-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Pension Calculator UK - Calculate workplace pension contributions for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Pension Calculator UK 2025 | Free Workplace Pension Calculator",
    description:
      "Free UK pro rata pension calculator for part-time and term-time only employees. Calculate workplace pension contributions, auto-enrolment eligibility, and employee/employer contributions with 2025/26 rates.",
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

export default function ProRataPensionCalculatorLayout({
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
            name: "Pro Rata Pension Calculator UK 2025",
            description:
              "Free UK pro rata pension calculator for part-time and term-time only employees. Calculate workplace pension contributions, auto-enrolment eligibility, and employee/employer contributions with 2025/26 rates.",
            url: "https://proratacalculator.co.uk/pro-rata-pension-calculator",
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
              "pro rata pension calculator, part-time pension calculator UK, workplace pension calculator, auto enrolment pension calculator",
            inLanguage: "en-GB",
            audience: {
              "@type": "Audience",
              audienceType:
                "Part-time workers, term-time only employees, workplace pension contributors",
            },
            featureList: [
              "Calculate workplace pension contributions",
              "Auto-enrolment eligibility check",
              "Employee and employer contribution calculations",
              "Qualifying earnings vs full salary options",
              "2025/26 tax year thresholds",
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
                name: "Pro Rata Calculators",
                item: "https://proratacalculator.co.uk/pro-rata-salary-calculator",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Pro Rata Pension Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-pension-calculator",
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
                name: "How do I calculate pro rata pension contributions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To calculate pro rata pension contributions, multiply your pensionable earnings by your contribution rate. For qualifying earnings, subtract the lower earnings limit (£6,240) from your salary, then apply the contribution percentage. Both employee and employer contributions are calculated separately.",
                },
              },
              {
                "@type": "Question",
                name: "What are qualifying earnings for pension contributions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Qualifying earnings are calculated as your salary minus the lower earnings limit (£6,240 for 2025/26), up to the upper earnings limit (£50,270). Only earnings between these thresholds are used for pension contribution calculations under the qualifying earnings method.",
                },
              },
              {
                "@type": "Question",
                name: "Am I eligible for auto-enrolment into a workplace pension?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You're eligible for auto-enrolment if you're aged 22-66, earn at least £10,000 per year from one job, and work in the UK. Part-time workers earning above this threshold are automatically enrolled, regardless of their hours worked.",
                },
              },
              {
                "@type": "Question",
                name: "What are the minimum pension contribution rates?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The minimum contribution rates for auto-enrolment are 3% from the employer and 5% from the employee (including tax relief), totaling 8% of qualifying earnings. These rates apply to earnings between the lower and upper earnings limits.",
                },
              },
              {
                "@type": "Question",
                name: "How do pension contributions work for part-time workers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Part-time workers pay pension contributions based on their actual earnings, not their full-time equivalent. If you earn above the £10,000 threshold, you're eligible for auto-enrolment and pay contributions on your pensionable earnings, whether you work part-time or full-time.",
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
