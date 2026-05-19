import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Part-Time Pay Calculator UK 2025 | Calculate Hourly Wage & Weekly Earnings",
  description:
    "Free UK part-time pay calculator 2025. Calculate your hourly wage, weekly hours, and get instant estimates of weekly, monthly, and annual gross pay. Perfect for part-time workers, freelancers, and contractors.",
  keywords: [
    "part time pay calculator UK 2025",
    "hourly wage calculator",
    "weekly pay calculator",
    "part time salary calculator",
    "hourly rate calculator UK",
    "weekly hours calculator",
    "part time earnings calculator",
    "freelance pay calculator",
    "contractor pay calculator",
    "UK part time calculator",
    "hourly pay calculator",
    "weekly earnings calculator",
    "part time work calculator",
    "flexible work calculator",
    "side job calculator",
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
    canonical: "https://proratacalculator.co.uk/part-time-pay-calculator",
  },
  openGraph: {
    title:
      "Part-Time Pay Calculator UK 2025 | Calculate Hourly Wage & Weekly Earnings",
    description:
      "Free UK part-time pay calculator 2025. Calculate your hourly wage, weekly hours, and get instant estimates of weekly, monthly, and annual gross pay.",
    url: "https://proratacalculator.co.uk/part-time-pay-calculator",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Part-Time Pay Calculator UK 2025 - Calculate your hourly wage and weekly earnings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Part-Time Pay Calculator UK 2025 | Calculate Hourly Wage & Weekly Earnings",
    description:
      "Free UK part-time pay calculator 2025. Calculate your hourly wage, weekly hours, and get instant estimates of weekly, monthly, and annual gross pay.",
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
    "apple-mobile-web-app-title": "Part-Time Pay Calc",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-tap-highlight": "no",
    "theme-color": "#3b82f6",
  },
};

export default function PartTimePayCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

