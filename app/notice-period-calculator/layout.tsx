import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Notice Period Calculator UK 2025 | Statutory & Contractual Notice | Pro Rata Pay",
  description:
    "Free UK notice period calculator 2025. Calculate statutory notice periods, pro-rata pay for part-time employees, resignation vs dismissal notice. Instant results with UK employment law compliance.",
  keywords: [
    "notice period calculator UK",
    "statutory notice period calculator",
    "pro rata notice pay calculator",
    "part-time notice period UK",
    "how much notice do I need to give UK",
    "UK employment law notice periods",
    "contractual notice period calculator",
    "resignation notice calculator",
    "dismissal notice calculator",
    "part-time employee leaving notice",
    "notice period UK law",
    "employment notice calculator",
    "worker notice period UK",
    "employee resignation notice",
    "employer dismissal notice",
    "notice pay calculator UK",
    "final pay notice period",
    "UK notice period rules",
    "employment rights notice",
    "work notice period calculator",
  ],
  openGraph: {
    title: "Notice Period Calculator UK 2025 | Statutory & Contractual Notice",
    description:
      "Free UK notice period calculator 2025. Calculate statutory notice periods, pro-rata pay for part-time employees, resignation vs dismissal notice. Instant results with UK employment law compliance.",
    type: "website",
    url: "https://proratacalculator.co.uk/notice-period-calculator",
    images: [
      {
        url: "https://proratacalculator.co.uk/screenshot.png",
        width: 1200,
        height: 630,
        alt: "UK Notice Period Calculator - Calculate statutory and contractual notice periods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notice Period Calculator UK 2025 | Statutory & Contractual Notice",
    description:
      "Free UK notice period calculator 2025. Calculate statutory notice periods, pro-rata pay for part-time employees, resignation vs dismissal notice. Instant results with UK employment law compliance.",
  },
  alternates: {
    canonical: "https://proratacalculator.co.uk/notice-period-calculator",
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

export default function NoticePeriodCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
