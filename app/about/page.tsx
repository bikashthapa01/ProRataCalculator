"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Shield,
  Users,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-section px-8">
          <div className="max-w-container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-heading-lg font-bold mb-4">
                About Our{" "}
                <span className="gradient-text">Pro Rata Calculator</span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                We provide a free, accurate, and UK-compliant pro rata salary
                calculator to help employees and employers calculate
                proportional salaries for part-time, reduced hours, and
                temporary work arrangements.
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-card p-8 card-shadow mb-16"
            >
              <div className="text-center">
                <Calculator className="w-16 h-16 text-primary-highlight mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-primary-text mb-4">
                  Our Mission
                </h2>
                <p className="text-primary-secondary text-lg leading-relaxed max-w-3xl mx-auto">
                  To provide the most accurate, user-friendly, and UK-compliant
                  pro rata salary calculator available online. We believe
                  everyone deserves clear, transparent calculations for their
                  work arrangements, whether you're working part-time, on
                  reduced hours, or in temporary positions.
                </p>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-effect rounded-card p-6 card-shadow text-center"
              >
                <Shield className="w-12 h-12 text-primary-highlight mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-text mb-3">
                  HMRC Compliant
                </h3>
                <p className="text-primary-secondary">
                  All calculations follow UK employment law and HMRC guidelines
                  for accurate, compliant results you can trust.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-effect rounded-card p-6 card-shadow text-center"
              >
                <Clock className="w-12 h-12 text-primary-highlight mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-text mb-3">
                  Instant Results
                </h3>
                <p className="text-primary-secondary">
                  Get your pro rata calculations in seconds with our fast,
                  responsive calculator that works on all devices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-effect rounded-card p-6 card-shadow text-center"
              >
                <Users className="w-12 h-12 text-primary-highlight mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-text mb-3">
                  User-Friendly
                </h3>
                <p className="text-primary-secondary">
                  Designed with simplicity in mind - no registration required,
                  no personal data collected, just accurate calculations.
                </p>
              </motion.div>
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-effect rounded-card p-8 card-shadow mb-16"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-8 text-center">
                Why Choose Our Pro Rata Calculator?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-text mb-4">
                    Accuracy & Compliance
                  </h3>
                  <ul className="space-y-3 text-primary-secondary">
                    <li className="flex items-start space-x-2">
                      <Award className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>HMRC-compliant calculations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Award className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>UK employment law compliant</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Award className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>Updated for 2025 standards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Award className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>Multiple calculation methods</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-text mb-4">
                    User Experience
                  </h3>
                  <ul className="space-y-3 text-primary-secondary">
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>Instant calculations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>Mobile-first design</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>No registration required</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <span>Clear explanations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-effect rounded-card p-8 card-shadow mb-16"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-8 text-center">
                How Our Calculator Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Enter Your Details
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Input your full-time salary, frequency, and working hours or
                    percentage.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Get Instant Results
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Receive accurate calculations for yearly, monthly, weekly,
                    and daily pay.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Understand Your Pay
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Clear explanations and breakdowns of your pro rata salary.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass-effect rounded-card p-8 card-shadow text-center"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-4">
                Questions or Feedback?
              </h2>
              <p className="text-primary-secondary mb-6">
                We're committed to providing the best pro rata calculator
                experience. If you have questions, suggestions, or feedback,
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/contact" className="button-primary">
                  Contact Us
                </a>
                <a href="/faq" className="button-secondary">
                  View FAQ
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
