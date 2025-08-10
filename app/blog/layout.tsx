import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog - Pro Rata Calculator | Latest News & Updates",
  description:
    "Stay updated with the latest news, guides, and insights about statutory sick pay, employment law, and pro rata calculations. Expert advice and practical tips.",
  keywords:
    "blog, statutory sick pay, employment law, pro rata calculator, sick pay news, employment updates",
  openGraph: {
    title: "Blog - Pro Rata Calculator",
    description:
      "Latest news and insights about statutory sick pay and employment law",
    type: "website",
    url: "https://proratacalculator.co.uk/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Pro Rata Calculator",
    description:
      "Latest news and insights about statutory sick pay and employment law",
  },
  alternates: {
    canonical: "https://proratacalculator.co.uk/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#111221]">{children}</main>
      <Footer />
    </>
  );
}
