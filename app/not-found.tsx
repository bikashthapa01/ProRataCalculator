"use client";

import { motion } from "framer-motion";
import { Home, Search, Calculator, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-section px-8">
          <div className="max-w-container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="text-8xl font-bold text-primary-highlight mb-6">
                404
              </div>
              <h1 className="text-heading-lg font-bold mb-4">Page Not Found</h1>
              <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
                Sorry, the page you're looking for doesn't exist. It might have
                been moved, deleted, or you entered the wrong URL.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-card p-8 card-shadow mb-8"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                What You Can Do
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Go Home
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    Return to our homepage and start calculating your pro rata
                    salary.
                  </p>
                  <Link href="/" className="button-primary">
                    Homepage
                  </Link>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Use Calculator
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    Access our free pro rata calculator to work out your salary.
                  </p>
                  <Link href="/" className="button-primary">
                    Calculator
                  </Link>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Search FAQ
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    Find answers to common questions in our FAQ section.
                  </p>
                  <Link href="/faq" className="button-primary">
                    FAQ
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-effect rounded-card p-8 card-shadow mb-8"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                Popular Pages
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/about"
                  className="p-4 rounded-lg border border-primary-border hover:border-primary-highlight transition-colors text-center"
                >
                  <h3 className="font-semibold text-primary-text mb-1">
                    About
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Learn about our calculator
                  </p>
                </Link>
                <Link
                  href="/contact"
                  className="p-4 rounded-lg border border-primary-border hover:border-primary-highlight transition-colors text-center"
                >
                  <h3 className="font-semibold text-primary-text mb-1">
                    Contact
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Get in touch with us
                  </p>
                </Link>
                <Link
                  href="/privacy"
                  className="p-4 rounded-lg border border-primary-border hover:border-primary-highlight transition-colors text-center"
                >
                  <h3 className="font-semibold text-primary-text mb-1">
                    Privacy
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Our privacy policy
                  </p>
                </Link>
                <Link
                  href="/terms"
                  className="p-4 rounded-lg border border-primary-border hover:border-primary-highlight transition-colors text-center"
                >
                  <h3 className="font-semibold text-primary-text mb-1">
                    Terms
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Terms of service
                  </p>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-effect rounded-card p-8 card-shadow"
            >
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="button-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
                <Link href="/" className="button-primary">
                  Back to Homepage
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
