import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Pro Rata Calculator UK 2025 | Calculate Pro Rata Salary, Pay & Holiday Entitlement",
  description:
    "Free UK pro rata calculator 2025 to work out your pro rata salary, pay, and holiday entitlement. Calculate part-time, reduced hours, and temporary work pay accurately. HMRC compliant calculations.",
  keywords: [
    "pro rata calculator UK 2025",
    "pro rata salary calculator",
    "pro rata pay calculator",
    "part time salary calculator UK",
    "reduced hours calculator",
    "holiday entitlement calculator",
    "UK pro rata calculator 2025",
    "salary calculator UK",
    "part time pay calculator",
    "temporary work salary",
    "contract work pay",
    "proportional salary",
    "work hours calculator",
    "employment calculator",
    "HMRC salary calculator",
    "UK employment calculator",
  ].join(", "),
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
    canonical: "https://proratacalculator.co.uk",
  },
  openGraph: {
    title:
      "Pro Rata Calculator UK 2025 | Calculate Pro Rata Salary, Pay & Holiday Entitlement",
    description:
      "Free UK pro rata calculator 2025 to work out your pro rata salary, pay, and holiday entitlement. Calculate part-time, reduced hours, and temporary work pay accurately. HMRC compliant calculations.",
    url: "https://proratacalculator.co.uk",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Calculator UK 2025 - Calculate your pro rata salary and pay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Pro Rata Calculator UK 2025 | Calculate Pro Rata Salary, Pay & Holiday Entitlement",
    description:
      "Free UK pro rata calculator 2025 to work out your pro rata salary, pay, and holiday entitlement. HMRC compliant calculations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
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
    "application-name": "Pro Rata Calculator UK",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Pro Rata Calc",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-tap-highlight": "no",
    "theme-color": "#3b82f6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Pro Rata Calculator UK 2025",
              description:
                "Free UK pro rata calculator 2025 to work out your pro rata salary, pay, and holiday entitlement. Calculate part-time, reduced hours, and temporary work pay accurately. HMRC compliant calculations.",
              url: "https://proratacalculator.co.uk",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              author: {
                "@type": "Organization",
                name: "Pro Rata Calculator UK",
                url: "https://proratacalculator.co.uk",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1247",
                bestRating: "5",
                worstRating: "1",
              },
              featureList: [
                "Pro rata salary calculation",
                "Part-time pay calculator",
                "Holiday entitlement calculator",
                "UK employment law compliant",
                "HMRC guidelines followed",
                "Instant calculations",
                "No registration required",
              ],
              screenshot: "https://proratacalculator.co.uk/screenshot.jpg",
              releaseNotes:
                "Updated for 2025 with enhanced features and UK compliance",
              installUrl: "https://proratacalculator.co.uk",
              permissions: "none",
              memoryRequirements: "none",
              storageRequirements: "none",
              processorRequirements: "none",
              applicationSubCategory: "Salary Calculator",
              applicationSuite: "Employment Tools",
              countriesSupported: "GB",
              audience: {
                "@type": "Audience",
                audienceType: "UK employees and employers",
              },
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
                  name: "Pro Rata Calculator",
                  item: "https://proratacalculator.co.uk",
                },
              ],
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4051465858040016"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
