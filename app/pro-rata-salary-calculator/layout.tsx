import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Rata Salary Calculator – UK Part-Time & Partial-Year Pay Tool (2025)",
  description:
    "Calculate your true part-time or pro rata salary for any UK job. Enter your full-time salary, weekly hours, and work period to get instant pro rata pay results.",
  keywords: [
    "pro rata salary calculator",
    "part time salary calculator UK",
    "calculate pro rata pay",
    "UK salary calculator",
    "part-time pay calculator",
    "pro rata calculator UK",
    "salary pro rata tool",
    "UK employment calculator",
    "part-time work calculator",
    "pro rata salary UK 2025",
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
    canonical: "/pro-rata-salary-calculator",
  },
  openGraph: {
    title:
      "Pro Rata Salary Calculator – UK Part-Time & Partial-Year Pay Tool (2025)",
    description:
      "Calculate your true part-time or pro rata salary for any UK job. Enter your full-time salary, weekly hours, and work period to get instant pro rata pay results.",
    url: "https://proratacalculator.co.uk/pro-rata-salary-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Salary Calculator UK - Calculate part-time and partial-year salaries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Salary Calculator – UK Part-Time & Partial-Year Pay Tool (2025)",
    description:
      "Calculate your true part-time or pro rata salary for any UK job. Enter your full-time salary, weekly hours, and work period to get instant pro rata pay results.",
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

export default function ProRataSalaryCalculatorLayout({
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
            name: "Pro Rata Salary Calculator",
            description:
              "Calculate your true part-time or pro rata salary for any UK job. Enter your full-time salary, weekly hours, and work period to get instant pro rata pay results.",
            url: "https://proratacalculator.co.uk/pro-rata-salary-calculator",
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
                name: "Pro Rata Salary Calculator",
                item: "https://proratacalculator.co.uk/pro-rata-salary-calculator",
              },
            ],
          }),
        }}
      />

      {children}
    </>
  );
}
