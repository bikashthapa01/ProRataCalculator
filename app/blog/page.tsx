import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
  description:
    "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
  keywords: [
    "pro rata calculator blog",
    "UK employment law",
    "salary calculations",
    "pro rata work",
    "employment news",
    "UK employment guides",
    "part time salary",
    "holiday entitlement",
    "employment calculator",
    "UK employment 2025",
  ].join(", "),
  authors: [{ name: "Pro Rata Calculator UK" }],
  creator: "Pro Rata Calculator UK",
  publisher: "Pro Rata Calculator UK",
  metadataBase: new URL("https://proratacalculator.co.uk"),
  alternates: {
    canonical: "https://proratacalculator.co.uk/blog",
  },
  openGraph: {
    title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
    description:
      "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
    url: "https://proratacalculator.co.uk/blog",
    siteName: "Pro Rata Calculator UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://proratacalculator.co.uk/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pro Rata Calculator Blog - UK Employment Law & Salary Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Rata Calculator Blog | UK Employment Law & Salary Guides 2025",
    description:
      "Expert insights on UK employment law, salary calculations, and pro rata work. Stay updated with the latest employment news and practical guides for 2025.",
    images: ["https://proratacalculator.co.uk/blog-og-image.jpg"],
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
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />
      <main className="pt-20">
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-6 py-3 rounded-full mb-8">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Blog</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                Pro Rata Calculator Blog
              </span>
            </h1>

            <p className="text-xl text-[#B1B3C7] mb-12 leading-relaxed">
              Expert guides on UK employment law, salary calculations, and pro
              rata work. Articles coming soon.
            </p>

            <div className="glass-effect rounded-2xl border border-white/10 p-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Articles Coming Soon
              </h2>
              <p className="text-[#B1B3C7]">
                We&apos;re working on in-depth guides covering UK employment law,
                pro rata calculations, and salary advice. Check back soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
