import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Part-Time Commission Calculator UK 2025 | Pro-Rata Sales Targets & Commission",
  description:
    "Free UK part-time commission calculator 2025. Calculate fair commission for sales workers, adjust targets based on hours worked, pro-rata commission calculations. Instant results for part-time sales staff.",
  keywords: [
    "part-time commission calculator",
    "UK commission calculator for sales",
    "pro rata target calculator",
    "part-time sales bonus calculator",
    "calculate commission UK",
    "how to adjust sales targets for part-time workers",
    "commission calculator part-time",
    "sales target calculator UK",
    "part-time sales commission",
    "pro-rata commission calculator",
    "sales bonus calculator UK",
    "commission rate calculator",
    "part-time sales targets",
    "fair commission calculation",
    "sales commission UK",
    "part-time worker commission",
    "reduced hours commission",
    "sales performance calculator",
    "commission structure calculator",
    "part-time sales pay calculator",
  ],
  openGraph: {
    title: "Part-Time Commission Calculator UK 2025 | Pro-Rata Sales Targets",
    description:
      "Free UK part-time commission calculator 2025. Calculate fair commission for sales workers, adjust targets based on hours worked, pro-rata commission calculations. Instant results for part-time sales staff.",
    type: "website",
    url: "https://proratacalculator.co.uk/commission-calculator",
    images: [
      {
        url: "https://proratacalculator.co.uk/screenshot.png",
        width: 1200,
        height: 630,
        alt: "UK Part-Time Commission Calculator - Calculate fair commission for sales workers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Part-Time Commission Calculator UK 2025 | Pro-Rata Sales Targets",
    description:
      "Free UK part-time commission calculator 2025. Calculate fair commission for sales workers, adjust targets based on hours worked, pro-rata commission calculations. Instant results for part-time sales staff.",
  },
  alternates: {
    canonical: "https://proratacalculator.co.uk/commission-calculator",
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
};

export default function CommissionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


