"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
                <span className="gradient-text">Terms of Service</span>
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
                <FileText className="w-6 h-6 text-primary-highlight" />
                <h2 className="text-2xl font-bold text-primary-text">
                  Agreement to Terms
                </h2>
              </div>
              <p className="text-primary-secondary leading-relaxed">
                By accessing and using our Pro Rata Calculator, you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Service Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Service Description
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    Our Pro Rata Calculator is a free online tool designed to
                    help users calculate proportional salaries for part-time,
                    reduced hours, and temporary work arrangements in the UK.
                  </p>
                  <p>
                    The calculator provides estimates based on the information
                    you provide and follows UK employment law principles and
                    HMRC guidelines.
                  </p>
                  <p>
                    We strive to provide accurate calculations, but the results
                    are estimates and should not be considered as professional
                    financial or legal advice.
                  </p>
                </div>
              </motion.div>

              {/* User Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  User Responsibilities
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Accurate Information
                    </h3>
                    <p>
                      You are responsible for providing accurate and complete
                      information when using our calculator. The accuracy of
                      results depends on the quality of data you input.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Appropriate Use
                    </h3>
                    <p>
                      You agree to use our calculator only for lawful purposes
                      and in accordance with these terms. You must not use the
                      service for any fraudulent or illegal activities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      No Misuse
                    </h3>
                    <p>
                      You must not attempt to gain unauthorized access to our
                      systems, interfere with the service, or use automated
                      tools to access our calculator.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Disclaimers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-primary-highlight" />
                  <h2 className="text-2xl font-bold text-primary-text">
                    Disclaimers
                  </h2>
                </div>
                <div className="space-y-4 text-primary-secondary">
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      No Professional Advice
                    </h3>
                    <p>
                      Our calculator provides estimates for informational
                      purposes only. The results should not be considered as
                      professional financial, legal, or tax advice. We recommend
                      consulting with qualified professionals for specific
                      advice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Accuracy of Results
                    </h3>
                    <p>
                      While we strive for accuracy, we cannot guarantee that the
                      calculator results will be completely accurate for all
                      situations. Results may vary based on individual
                      circumstances and should be verified independently.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-text mb-2">
                      Service Availability
                    </h3>
                    <p>
                      We do not guarantee that our calculator will be available
                      at all times. We may suspend, modify, or discontinue the
                      service at any time without notice.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Intellectual Property
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    All content, features, and functionality of our Pro Rata
                    Calculator, including but not limited to text, graphics,
                    logos, and software, are owned by us and are protected by
                    copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may use our calculator for personal, non-commercial
                    purposes only. You may not reproduce, distribute, modify, or
                    create derivative works without our express written consent.
                  </p>
                </div>
              </motion.div>

              {/* Privacy and Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-primary-highlight" />
                  <h2 className="text-2xl font-bold text-primary-text">
                    Privacy and Data Protection
                  </h2>
                </div>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    Your privacy is important to us. Our collection and use of
                    personal information is governed by our Privacy Policy,
                    which is incorporated into these terms by reference.
                  </p>
                  <p>
                    By using our calculator, you consent to our collection and
                    use of information as described in our Privacy Policy.
                  </p>
                </div>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Limitation of Liability
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    To the maximum extent permitted by law, we shall not be
                    liable for any indirect, incidental, special, consequential,
                    or punitive damages, including but not limited to loss of
                    profits, data, or use, arising from your use of our
                    calculator.
                  </p>
                  <p>
                    Our total liability to you for any claims arising from your
                    use of our service shall not exceed the amount you paid for
                    the service (if any), or £50, whichever is greater.
                  </p>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Termination
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    We may terminate or suspend your access to our calculator
                    immediately, without prior notice or liability, for any
                    reason whatsoever, including without limitation if you
                    breach the Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the calculator will
                    cease immediately. If you wish to terminate your use of our
                    service, you may simply discontinue using our calculator.
                  </p>
                </div>
              </motion.div>

              {/* Governing Law */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Governing Law
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    These Terms shall be interpreted and governed by the laws of
                    the United Kingdom, without regard to its conflict of law
                    provisions.
                  </p>
                  <p>
                    Any disputes arising from these terms or your use of our
                    calculator shall be resolved in the courts of the United
                    Kingdom.
                  </p>
                </div>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Changes to Terms
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will try to provide at
                    least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our
                    sole discretion. By continuing to use our calculator after
                    any revisions become effective, you agree to be bound by the
                    revised terms.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="glass-effect rounded-card p-8 card-shadow"
              >
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4 text-primary-secondary">
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> terms@proratacalculator.co.uk
                    </p>
                    <p>
                      <strong>Subject:</strong> Terms of Service Inquiry
                    </p>
                  </div>
                  <p>
                    We will respond to your inquiry within 30 days of receipt.
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
