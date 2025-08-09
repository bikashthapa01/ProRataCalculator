"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-section px-8">
          <div className="max-w-container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">Privacy Policy</span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
                Last updated: January 2025
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-card p-8 card-shadow mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-primary-highlight" />
                <h2 className="text-2xl font-bold text-primary-text">
                  Your Privacy Matters
                </h2>
              </div>
              <p className="text-primary-secondary leading-relaxed">
                We are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy
                explains how we collect, use, and protect your data when you use
                our Pro Rata Calculator.
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="w-6 h-6 text-primary-highlight" />
                  <h2 className="text-2xl font-bold text-primary-text">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-4 text-primary-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Calculator Inputs
                    </h3>
                    <p>
                      When you use our calculator, we temporarily process the
                      salary and hours information you enter. This data is used
                      solely for calculation purposes and is not stored
                      permanently on our servers.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Usage Analytics
                    </h3>
                    <p>
                      We collect anonymous usage statistics to improve our
                      calculator's performance and user experience. This
                      includes information about how our calculator is used, but
                      does not include personal data.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Technical Information
                    </h3>
                    <p>
                      We may collect technical information such as your IP
                      address, browser type, and device information for security
                      and performance purposes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="w-6 h-6 text-primary-highlight" />
                  <h2 className="text-2xl font-bold text-primary-text">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="space-y-4 text-primary-secondary">
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-highlight">•</span>
                      <span>
                        To provide accurate pro rata salary calculations
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-highlight">•</span>
                      <span>
                        To improve our calculator's functionality and user
                        experience
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-highlight">•</span>
                      <span>
                        To ensure the security and performance of our website
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-highlight">•</span>
                      <span>
                        To comply with legal obligations and protect our rights
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Data Protection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="w-6 h-6 text-primary-highlight" />
                  <h2 className="text-2xl font-bold text-primary-text">
                    Data Protection
                  </h2>
                </div>
                <div className="space-y-4 text-primary-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Security Measures
                    </h3>
                    <p>
                      We implement appropriate technical and organizational
                      security measures to protect your data against
                      unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Data Retention
                    </h3>
                    <p>
                      Calculator inputs are processed in real-time and are not
                      stored permanently. Anonymous usage analytics may be
                      retained for up to 2 years to improve our services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Third-Party Services
                    </h3>
                    <p>
                      We may use trusted third-party services for analytics and
                      performance monitoring. These services are bound by strict
                      data protection agreements.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Your Rights
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-primary-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Right to Access
                    </h3>
                    <p>
                      You have the right to request information about what
                      personal data we hold about you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Right to Rectification
                    </h3>
                    <p>
                      You can request that we correct any inaccurate personal
                      data we hold about you.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Right to Erasure
                    </h3>
                    <p>
                      You can request that we delete your personal data in
                      certain circumstances.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Right to Object
                    </h3>
                    <p>
                      You have the right to object to our processing of your
                      personal data.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Cookies
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    We use cookies to improve your experience on our website.
                    These cookies help us:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Remember your preferences</li>
                    <li>• Analyze website traffic and usage</li>
                    <li>• Improve our calculator's performance</li>
                    <li>• Provide a better user experience</li>
                  </ul>
                  <p>
                    You can control cookie settings through your browser
                    preferences. However, disabling cookies may affect the
                    functionality of our calculator.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Contact Us
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@proratacalculator.co.uk
                    </p>
                    <p>
                      <strong>Subject:</strong> Privacy Policy Inquiry
                    </p>
                  </div>
                  <p>
                    We will respond to your inquiry within 30 days of receipt.
                  </p>
                </div>
              </motion.div>

              {/* Updates to Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Updates to This Policy
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    We may update this Privacy Policy from time to time to
                    reflect changes in our practices or for other operational,
                    legal, or regulatory reasons.
                  </p>
                  <p>
                    We will notify you of any material changes by posting the
                    new Privacy Policy on this page and updating the "Last
                    updated" date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically
                    to stay informed about how we protect your information.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
