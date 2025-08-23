"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Calendar,
  Clock,
  PoundSterling,
  Info,
  CheckCircle,
  ArrowRight,
  Percent,
  Users,
  AlertCircle,
  FileText,
  MapPin,
  CreditCard,
  Banknote,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProRataTaxImplicationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-section px-8">
          <div className="max-w-container mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">2025 Tax Year Guide</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Pro Rata Salary Tax Implications in 2025
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Understanding how pro rata work affects your tax obligations,
                National Insurance contributions, and take-home pay in the
                2025/26 tax year.
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-card p-8 card-shadow border border-white/20 mb-12"
            >
              <div className="flex items-start space-x-4">
                <Info className="w-8 h-8 text-primary-highlight flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-primary-text mb-4">
                    How Pro Rata Work Affects Your Tax Position
                  </h2>
                  <p className="text-primary-secondary text-lg leading-relaxed mb-6">
                    When you work part-time or for a partial year, your tax
                    obligations change proportionally. Understanding these
                    changes is crucial for accurate financial planning and
                    ensuring you're not overpaying or underpaying tax.
                  </p>
                  <p className="text-primary-secondary text-lg leading-relaxed">
                    For comprehensive tax calculations and detailed breakdowns,
                    you can use our partner's{" "}
                    <a
                      href="https://freetaxcalculator.co.uk/income-tax-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-highlight hover:text-primary-text underline font-semibold"
                    >
                      advanced UK income tax calculator
                    </a>{" "}
                    alongside our pro rata tools.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Tax Changes 2025 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Key Tax Changes for 2025/26
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <PoundSterling className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Personal Allowance
                    </h3>
                  </div>
                  <p className="text-primary-secondary text-sm mb-3">
                    The personal allowance remains at £12,570 for 2025/26. For
                    pro rata workers, this allowance is applied proportionally
                    based on your working period.
                  </p>
                  <a
                    href="https://freetaxcalculator.co.uk/tax-code-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                  >
                    Calculate your tax code →
                  </a>
                </div>

                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      National Insurance
                    </h3>
                  </div>
                  <p className="text-primary-secondary text-sm mb-3">
                    NI thresholds and rates are updated for 2025/26. Part-time
                    workers pay NI proportionally, but thresholds remain the
                    same regardless of hours worked.
                  </p>
                  <a
                    href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                  >
                    Calculate NI contributions →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Pro Rata Tax Scenarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Common Pro Rata Tax Scenarios
              </h2>
              <div className="space-y-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>Part-Time Work (20 hours per week)</span>
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    Working 20 hours instead of 37.5 hours means you're working
                    53.3% of full-time. Your salary, tax, and NI contributions
                    are calculated proportionally.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-primary-secondary">Full-time salary</p>
                      <p className="font-semibold text-primary-text">£30,000</p>
                    </div>
                    <div>
                      <p className="text-primary-secondary">Pro rata salary</p>
                      <p className="font-semibold text-primary-text">£16,000</p>
                    </div>
                    <div>
                      <p className="text-primary-secondary">Tax band</p>
                      <p className="font-semibold text-primary-text">
                        Basic rate
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://freetaxcalculator.co.uk/income-tax-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                    >
                      Calculate exact tax for this scenario →
                    </a>
                  </div>
                </div>

                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span>Partial Year Employment (6 months)</span>
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    Working for only part of the tax year affects your personal
                    allowance and tax calculations. You may be entitled to a
                    refund if you've overpaid.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-primary-secondary">Annual salary</p>
                      <p className="font-semibold text-primary-text">£30,000</p>
                    </div>
                    <div>
                      <p className="text-primary-secondary">6-month salary</p>
                      <p className="font-semibold text-primary-text">£15,000</p>
                    </div>
                    <div>
                      <p className="text-primary-secondary">
                        Personal allowance
                      </p>
                      <p className="font-semibold text-primary-text">£6,285</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://freetaxcalculator.co.uk/p60-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                    >
                      Calculate end-of-year tax position →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tax Planning Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Tax Planning Tips for Pro Rata Workers
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Monitor Your Tax Code
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          Ensure your tax code reflects your pro rata status.
                          Use our partner's{" "}
                          <a
                            href="https://freetaxcalculator.co.uk/tax-code-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-highlight hover:text-primary-text underline"
                          >
                            tax code calculator
                          </a>{" "}
                          to verify.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Check NI Contributions
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          Verify your National Insurance contributions are
                          calculated correctly for your working hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Plan for Tax Refunds
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          If you've overpaid tax due to pro rata calculations,
                          you may be entitled to a refund.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Avoid Underpayment
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          Ensure you're paying enough tax throughout the year to
                          avoid large bills at the end.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Consider Benefits
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          Lower income from pro rata work may make you eligible
                          for tax credits or Universal Credit.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-4 card-shadow border border-white/20">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-primary-text mb-1">
                          Keep Records
                        </h4>
                        <p className="text-primary-secondary text-sm">
                          Maintain detailed records of your working hours and
                          salary changes for tax purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tools and Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Essential Tools for Pro Rata Tax Planning
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Pro Rata Calculator
                    </h3>
                  </div>
                  <p className="text-primary-secondary text-sm mb-4">
                    Our main tool for calculating pro rata salaries and
                    understanding the impact on your take-home pay.
                  </p>
                  <a
                    href="/pro-rata-salary-calculator"
                    className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                  >
                    Calculate pro rata salary →
                  </a>
                </div>

                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Income Tax Calculator
                    </h3>
                  </div>
                  <p className="text-primary-secondary text-sm mb-4">
                    Advanced tax calculations with detailed breakdowns for
                    different income levels and tax codes.
                  </p>
                  <a
                    href="https://freetaxcalculator.co.uk/income-tax-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                  >
                    Calculate income tax →
                  </a>
                </div>

                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      National Insurance Calculator
                    </h3>
                  </div>
                  <p className="text-primary-secondary text-sm mb-4">
                    Calculate your NI contributions and understand how they
                    affect your overall tax position.
                  </p>
                  <a
                    href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-highlight hover:text-primary-text transition-colors text-sm font-medium"
                  >
                    Calculate NI contributions →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center"
            >
              <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
                <h3 className="text-2xl font-bold text-primary-text mb-4">
                  Ready to Calculate Your Pro Rata Tax Position?
                </h3>
                <p className="text-primary-secondary mb-6 max-w-2xl mx-auto">
                  Use our pro rata calculator combined with advanced tax tools
                  to get a complete picture of your financial situation in 2025.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/pro-rata-salary-calculator"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white font-semibold px-6 py-3 rounded-xl hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Pro Rata Salary</span>
                  </a>

                  <a
                    href="https://freetaxcalculator.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Explore Tax Calculators</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
