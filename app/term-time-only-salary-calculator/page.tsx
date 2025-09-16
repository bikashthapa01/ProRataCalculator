"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Copy,
  Calendar,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
  School,
  GraduationCap,
  BookOpen,
  Users,
  PoundSterling,
  Percent,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  calculateTTO,
  TTOInputs,
  TTOResults,
  formatCurrency,
} from "@/lib/utils";

interface ValidationErrors {
  fteAnnualSalary?: string;
  fullTimeWeeklyHours?: string;
  contractedWeeklyHours?: string;
  termWeeksWorked?: string;
  paidHolidayWeeks?: string;
  bankHolidayWeeks?: string;
}

export default function TermTimeOnlySalaryCalculatorPage() {
  const [inputs, setInputs] = useState<TTOInputs>({
    fteAnnualSalary: 0,
    fullTimeWeeklyHours: 37.5,
    contractedWeeklyHours: 0,
    termWeeksWorked: 39,
    paidHolidayWeeks: 5.6,
    bankHolidayWeeks: 0,
    dailyDivisor: 5,
    spreadOver12Months: true,
  });

  const [results, setResults] = useState<TTOResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Removed auto-calculation - now only calculates when user clicks button

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate FTE annual salary
    if (!inputs.fteAnnualSalary || inputs.fteAnnualSalary <= 0) {
      newErrors.fteAnnualSalary = "Please enter the FTE annual salary";
    } else if (inputs.fteAnnualSalary > 200000) {
      newErrors.fteAnnualSalary =
        "Salary seems too high. Please check and try again.";
    }

    // Validate full-time weekly hours
    if (!inputs.fullTimeWeeklyHours || inputs.fullTimeWeeklyHours <= 0) {
      newErrors.fullTimeWeeklyHours = "Please enter full-time weekly hours";
    } else if (inputs.fullTimeWeeklyHours > 80) {
      newErrors.fullTimeWeeklyHours =
        "Full-time hours seem too high. Please check and try again.";
    }

    // Validate contracted weekly hours
    if (!inputs.contractedWeeklyHours || inputs.contractedWeeklyHours <= 0) {
      newErrors.contractedWeeklyHours =
        "Please enter your contracted weekly hours";
    } else if (inputs.contractedWeeklyHours > inputs.fullTimeWeeklyHours) {
      newErrors.contractedWeeklyHours =
        "Contracted hours cannot exceed full-time hours";
    }

    // Validate term weeks
    if (!inputs.termWeeksWorked || inputs.termWeeksWorked <= 0) {
      newErrors.termWeeksWorked = "Please enter term weeks worked";
    } else if (inputs.termWeeksWorked > 45) {
      newErrors.termWeeksWorked =
        "Term weeks seem too high. Please check and try again.";
    }

    // Validate paid holiday weeks
    if (inputs.paidHolidayWeeks < 0) {
      newErrors.paidHolidayWeeks = "Paid holiday weeks cannot be negative";
    } else if (inputs.paidHolidayWeeks > 15) {
      newErrors.paidHolidayWeeks =
        "Paid holiday weeks seem too high. Please check and try again.";
    }

    // Validate bank holiday weeks
    if (inputs.bankHolidayWeeks < 0) {
      newErrors.bankHolidayWeeks = "Bank holiday weeks cannot be negative";
    } else if (inputs.bankHolidayWeeks > 5) {
      newErrors.bankHolidayWeeks =
        "Bank holiday weeks seem too high. Please check and try again.";
    }

    return newErrors;
  };

  const handleCalculate = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setShowErrors(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const calculatedResults = calculateTTO(inputs);
    setResults(calculatedResults);

    // Scroll to results after a short delay
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultsText = `Term-Time Only Salary Calculation Results:

Annual TTO Salary: ${formatCurrency(results.annualTTOSalary)}
${results.monthlyLabel}: ${formatCurrency(results.monthlyPay)}
Weekly Pay: ${formatCurrency(results.weeklyPay)}
Daily Pay: ${formatCurrency(results.dailyPay)}

FTE Comparison: ${results.fteComparisonPercent}% of full-time equivalent
Hours Factor: ${(results.hoursFactor * 100).toFixed(1)}%
Paid Weeks: ${results.paidWeeks}
TTO Pay Factor: ${(results.ttoPayFactor * 100).toFixed(1)}%

${results.explanation}

Calculated using Term-Time Only Salary Calculator UK - https://proratacalculator.co.uk/term-time-only-salary-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof TTOInputs,
    value: string | number | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" && field !== "spreadOver12Months"
          ? parseFloat(value) || 0
          : value,
    }));
    setShowErrors(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />

      {/* Breadcrumb Navigation */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1b2e] to-[#18192a]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-[#B1B3C7]">
            <Link href="/" className="hover:text-[#9B7FFF] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/pro-rata-salary-calculator"
              className="hover:text-[#9B7FFF] transition-colors"
            >
              Pro Rata Calculators
            </Link>
            <span>/</span>
            <span className="text-[#9B7FFF]">
              Term-Time Only Salary Calculator
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6"
            >
              <School className="w-5 h-5" />
              <span className="font-semibold">2025 Updated</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Term-Time Only Salary Calculator UK 2025 | Free TTO Pay
                Calculator
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Convert an FTE salary to a UK term-time only salary. Enter term
              weeks, paid holidays, and hours to get annual, monthly, weekly,
              and daily pay with FTE comparison. Perfect for school support
              staff, teaching assistants, and education workers.
            </motion.p>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Accurate TTO Logic</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Real-Time Updates</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full border border-purple-500/20">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">For Education Workers</span>
            </div>
          </motion.div>

          {/* Results Section - Only shown when results exist */}
          <AnimatePresence>
            {results && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-card p-6 card-shadow border border-white/20 mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Your Term-Time Only Salary
                  </h2>
                  <button
                    onClick={handleCopyResults}
                    className="flex items-center space-x-2 text-green-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                {/* Main Result Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <PoundSterling className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-white">Annual</span>
                    </div>
                    <p className="text-2xl font-bold text-green-500">
                      {formatCurrency(results.annualTTOSalary)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-white">Monthly</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">
                      {formatCurrency(results.monthlyPay)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {inputs.spreadOver12Months
                        ? "Spread over 12 months"
                        : "Paid months only"}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-white">Weekly</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-500">
                      {formatCurrency(results.weeklyPay)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-orange-500" />
                      <span className="font-medium text-white">Daily</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-500">
                      {formatCurrency(results.dailyPay)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Based on {inputs.dailyDivisor} days/week
                    </p>
                  </div>
                </div>

                {/* FTE Comparison */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Percent className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-white">
                      FTE Comparison
                    </span>
                  </div>
                  <p className="text-xl font-bold text-yellow-500">
                    {results.fteComparisonPercent}% of full-time equivalent
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {results.explanation}
                  </p>
                </div>

                {/* Breakdown Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-gray-400 font-medium">
                          Calculation Step
                        </th>
                        <th className="text-right py-2 text-gray-400 font-medium">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {results.breakdown.map((item, index) => (
                        <tr key={index} className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              {item.icon === "pound-sterling" && (
                                <PoundSterling className="w-4 h-4 text-blue-500" />
                              )}
                              {item.icon === "clock" && (
                                <Clock className="w-4 h-4 text-green-500" />
                              )}
                              {item.icon === "calendar" && (
                                <Calendar className="w-4 h-4 text-purple-500" />
                              )}
                              {item.icon === "percent" && (
                                <Percent className="w-4 h-4 text-orange-500" />
                              )}
                              {item.icon === "check-circle" && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {item.description}
                            </p>
                          </td>
                          <td className="py-3 text-right">
                            <span className="font-semibold text-white">
                              {item.formattedValue}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect rounded-card p-8 card-shadow border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Calculate Your TTO Salary
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your contract details for instant calculation
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-6"
            >
              {/* Primary Inputs Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* FTE Annual Salary */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <PoundSterling className="w-4 h-4" />
                    <span>FTE Annual Salary (£) *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="200000"
                    step="100"
                    value={inputs.fteAnnualSalary}
                    onChange={(e) =>
                      handleInputChange("fteAnnualSalary", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="30000"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Full-time equivalent annual salary
                    </span>
                  </div>
                  {errors.fteAnnualSalary && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.fteAnnualSalary}
                    </p>
                  )}
                </div>

                {/* Contracted Weekly Hours */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Your Contracted Weekly Hours *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    step="0.5"
                    value={inputs.contractedWeeklyHours}
                    onChange={(e) =>
                      handleInputChange("contractedWeeklyHours", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="25"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Hours per week as stated in your contract
                    </span>
                  </div>
                  {errors.contractedWeeklyHours && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.contractedWeeklyHours}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours and Weeks Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full-Time Weekly Hours */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>Full-Time Weekly Hours</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    step="0.5"
                    value={inputs.fullTimeWeeklyHours}
                    onChange={(e) =>
                      handleInputChange("fullTimeWeeklyHours", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="37.5"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Standard full-time hours at your workplace
                    </span>
                  </div>
                  {errors.fullTimeWeeklyHours && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.fullTimeWeeklyHours}
                    </p>
                  )}
                </div>

                {/* Term Weeks */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Term Weeks Worked Per Year</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="45"
                    step="0.1"
                    value={inputs.termWeeksWorked}
                    onChange={(e) =>
                      handleInputChange("termWeeksWorked", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="39"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Typical school term weeks (39 is common)
                    </span>
                  </div>
                  {errors.termWeeksWorked && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.termWeeksWorked}
                    </p>
                  )}
                </div>
              </div>

              {/* Holiday Weeks Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Paid Holiday Weeks */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Paid Holiday Weeks</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.1"
                    value={inputs.paidHolidayWeeks}
                    onChange={(e) =>
                      handleInputChange("paidHolidayWeeks", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="5.6"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Statutory minimum is 5.6 weeks (28 days)
                    </span>
                  </div>
                  {errors.paidHolidayWeeks && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.paidHolidayWeeks}
                    </p>
                  )}
                </div>

                {/* Bank Holiday Weeks */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Bank Holiday Weeks (Optional)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={inputs.bankHolidayWeeks}
                    onChange={(e) =>
                      handleInputChange("bankHolidayWeeks", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="0"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Some LAs include bank holidays separately
                    </span>
                  </div>
                  {errors.bankHolidayWeeks && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.bankHolidayWeeks}
                    </p>
                  )}
                </div>
              </div>

              {/* Display Options */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Daily Divisor */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Target className="w-4 h-4" />
                    <span>Daily Pay Calculation</span>
                  </label>
                  <select
                    value={inputs.dailyDivisor}
                    onChange={(e) =>
                      handleInputChange(
                        "dailyDivisor",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  >
                    <option value={5}>5 days per week</option>
                    <option value={5.5}>5.5 days per week</option>
                    <option value={6}>6 days per week</option>
                  </select>
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      How many days to divide weekly pay by
                    </span>
                  </div>
                </div>

                {/* Spread Pay Toggle */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Monthly Pay Display</span>
                  </label>
                  <div className="flex items-center space-x-4 p-3 bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.spreadOver12Months}
                        onChange={(e) =>
                          handleInputChange(
                            "spreadOver12Months",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-[#7c53ff] bg-transparent border-gray-300 rounded focus:ring-[#7c53ff] focus:ring-2"
                      />
                      <span className="text-white text-sm">
                        Spread pay evenly over 12 months
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Many employers spread TTO pay over the full year
                    </span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate My TTO Salary</span>
              </button>
            </form>
          </motion.div>

          {/* Formula Explainer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
              <button
                onClick={() => setShowExplainer(!showExplainer)}
                className="flex items-center justify-between w-full text-white hover:text-green-400 transition-colors"
              >
                <h3 className="text-lg font-semibold">
                  How TTO Salary Is Calculated
                </h3>
                <motion.div
                  animate={{ rotate: showExplainer ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {showExplainer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4 text-gray-300"
                  >
                    <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                      <h4 className="font-semibold text-white mb-2">
                        The Formula
                      </h4>
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Hours Factor</strong> = Your Hours ÷ Full-Time
                          Hours
                        </p>
                        <p>
                          <strong>Paid Weeks</strong> = Term Weeks + Holiday
                          Weeks + Bank Holiday Weeks
                        </p>
                        <p>
                          <strong>TTO Pay Factor</strong> = Paid Weeks ÷ 52
                        </p>
                        <p>
                          <strong>Annual TTO Salary</strong> = FTE Salary ×
                          Hours Factor × TTO Pay Factor
                        </p>
                      </div>
                    </div>
                    {results && (
                      <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                        <h4 className="font-semibold text-white mb-2">
                          Your Calculation
                        </h4>
                        <div className="text-sm space-y-1">
                          <p>
                            Hours Factor = {inputs.contractedWeeklyHours} ÷{" "}
                            {inputs.fullTimeWeeklyHours} ={" "}
                            {(results.hoursFactor * 100).toFixed(1)}%
                          </p>
                          <p>
                            Paid Weeks = {inputs.termWeeksWorked} +{" "}
                            {inputs.paidHolidayWeeks} +{" "}
                            {inputs.bankHolidayWeeks} = {results.paidWeeks}
                          </p>
                          <p>
                            TTO Pay Factor = {results.paidWeeks} ÷ 52 ={" "}
                            {(results.ttoPayFactor * 100).toFixed(1)}%
                          </p>
                          <p>
                            Annual TTO ={" "}
                            {formatCurrency(inputs.fteAnnualSalary)} ×{" "}
                            {(results.hoursFactor * 100).toFixed(1)}% ×{" "}
                            {(results.ttoPayFactor * 100).toFixed(1)}% ={" "}
                            {formatCurrency(results.annualTTOSalary)}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO-Rich Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Comprehensive Guide Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Complete Guide to Term-Time Only Salary Calculation UK 2025
              </h2>

              <div className="prose prose-invert max-w-none space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    What is Term-Time Only Salary?
                  </h2>
                  <p className="text-gray-300 mb-4">
                    A term-time only (TTO) salary is a payment structure
                    commonly used in UK schools and educational institutions. It
                    allows employees to work only during school term time while
                    receiving their full statutory holiday entitlement. This
                    arrangement is particularly popular among school support
                    staff, teaching assistants, learning support assistants, and
                    administrative personnel.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Unlike traditional full-time contracts that span 52 weeks
                    per year, term-time only contracts typically cover around 39
                    weeks of actual work plus paid holiday weeks. This means
                    employees receive their salary even during school holidays
                    when they&apos;re not required to work.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    How Term-Time Only Salary is Calculated
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The calculation involves two main factors that reduce the
                    full-time equivalent (FTE) salary. For general{" "}
                    <a
                      href="/pro-rata-salary-calculator"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      pro rata salary calculations
                    </a>{" "}
                    (without term-time reduction), see our dedicated calculator.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    <li>
                      <strong>Hours Factor:</strong> Your contracted hours ÷
                      Full-time hours (e.g., 25 ÷ 37.5 = 66.7%)
                    </li>
                    <li>
                      <strong>TTO Pay Factor:</strong> Paid weeks ÷ 52 weeks
                      (e.g., 44.6 ÷ 52 = 85.8%)
                    </li>
                    <li>
                      <strong>Final Calculation:</strong> FTE Salary × Hours
                      Factor × TTO Pay Factor
                    </li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    For example, if you earn £30,000 FTE, work 25 hours per week
                    (66.7% hours factor), and have 44.6 paid weeks (85.8% TTO
                    factor), your annual TTO salary would be: £30,000 × 0.667 ×
                    0.858 = £17,160.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Term-Time Only Salary Benefits
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                      <h4 className="font-semibold text-white mb-2">
                        For Employees
                      </h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Work-life balance during school holidays</li>
                        <li>• Full statutory holiday entitlement</li>
                        <li>
                          • Consistent monthly income (if spread over 12 months)
                        </li>
                        <li>• Perfect for parents with school-age children</li>
                      </ul>
                    </div>
                    <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                      <h4 className="font-semibold text-white mb-2">
                        For Employers
                      </h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Cost-effective staffing during term time</li>
                        <li>• Reduced overhead during holidays</li>
                        <li>• Attracts quality education professionals</li>
                        <li>• Flexible workforce management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Common Term-Time Only Salary Scenarios
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm bg-[#2c2470]/20 rounded-lg border border-[#2c2470]/30">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Role
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Typical Hours
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            FTE Salary Range
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            TTO Salary Range
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">Teaching Assistant</td>
                          <td className="py-3 px-4">25-30 hours</td>
                          <td className="py-3 px-4">£18,000 - £25,000</td>
                          <td className="py-3 px-4">£15,000 - £21,000</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">
                            Learning Support Assistant
                          </td>
                          <td className="py-3 px-4">20-25 hours</td>
                          <td className="py-3 px-4">£16,000 - £22,000</td>
                          <td className="py-3 px-4">£13,000 - £18,000</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4">School Administrator</td>
                          <td className="py-3 px-4">30-35 hours</td>
                          <td className="py-3 px-4">£20,000 - £28,000</td>
                          <td className="py-3 px-4">£17,000 - £24,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Catering Staff</td>
                          <td className="py-3 px-4">15-20 hours</td>
                          <td className="py-3 px-4">£15,000 - £20,000</td>
                          <td className="py-3 px-4">£12,000 - £17,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Legal Requirements for Term-Time Only Contracts
                  </h2>
                  <p className="text-gray-300 mb-4">
                    All term-time only contracts in the UK must comply with
                    employment law requirements. For detailed{" "}
                    <a
                      href="/pro-rata-holiday-calculator"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      holiday entitlement calculations
                    </a>
                    , use our dedicated holiday calculator.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    <li>
                      <strong>Statutory Holiday Entitlement:</strong> Minimum
                      5.6 weeks (28 days) paid holiday per year as outlined in
                      the{" "}
                      <a
                        href="https://www.gov.uk/calculate-your-holiday-entitlement"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 underline"
                      >
                        UK government holiday entitlement calculator
                      </a>
                    </li>
                    <li>
                      <strong>National Minimum Wage:</strong> Must meet current{" "}
                      <a
                        href="https://www.gov.uk/national-minimum-wage-rates"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 underline"
                      >
                        NMW rates
                      </a>{" "}
                      for hours worked
                    </li>
                    <li>
                      <strong>Pension Contributions:</strong> Eligible for
                      workplace pension schemes
                    </li>
                    <li>
                      <strong>Sick Pay:</strong> Entitled to{" "}
                      <a
                        href="https://www.gov.uk/statutory-sick-pay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 underline"
                      >
                        Statutory Sick Pay (SSP)
                      </a>{" "}
                      when applicable
                    </li>
                    <li>
                      <strong>Maternity/Paternity Pay:</strong> Full{" "}
                      <a
                        href="https://www.gov.uk/maternity-pay-leave"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 underline"
                      >
                        statutory entitlements
                      </a>{" "}
                      apply
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    How Term-Time Only Contracts Work in the UK
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Term-time only (TTO) contracts are common in UK schools and
                    education settings. These contracts allow you to work only
                    during school term time while still receiving your statutory
                    holiday entitlement as defined by{" "}
                    <a
                      href="https://www.gov.uk/employment-contracts-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      UK employment law
                    </a>
                    . Your annual salary is calculated by applying both an hours
                    factor (for part-time work) and a TTO pay factor (for the
                    reduced working year).
                  </p>
                  <p className="text-gray-300 mb-4">
                    Most TTO employees work around 39 weeks per year plus
                    receive 5.6 weeks paid holiday (the statutory minimum). Some
                    local authorities provide additional holiday weeks or
                    include bank holidays separately. The exact terms depend on
                    your employer&apos;s policy and local authority agreements.
                  </p>
                  <p className="text-gray-300">
                    For related calculations, check our{" "}
                    <a
                      href="/pro-rata-salary-calculator"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      pro rata salary calculator
                    </a>{" "}
                    for general part-time work or our{" "}
                    <a
                      href="/pro-rata-holiday-calculator"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      holiday entitlement calculator
                    </a>{" "}
                    for detailed holiday calculations. For sick pay
                    entitlements, see our{" "}
                    <a
                      href="/pro-rata-sick-pay-calculator"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      statutory sick pay calculator
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Term-Time Only Salary Calculator - Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>How do I calculate term-time only salary?</span>
                </h3>
                <p className="text-gray-300">
                  To calculate term-time only (TTO) salary, multiply the FTE
                  annual salary by the hours factor (your hours ÷ full-time
                  hours) and the TTO pay factor (paid weeks ÷ 52 weeks). Paid
                  weeks typically include 39 term weeks plus 5.6 statutory
                  holiday weeks.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    What is the difference between term-time only and pro-rata
                    salary?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Term-time only salary applies both an hours reduction (for
                  part-time work) and a time reduction (for working fewer weeks
                  per year). Pro-rata salary typically only applies an hours
                  reduction for part-time work over the full 52-week year. TTO
                  contracts are specifically designed for education sector roles
                  that follow the academic calendar.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>What are typical term weeks in the UK?</span>
                </h3>
                <p className="text-gray-300">
                  UK schools typically work 39 weeks per year, which includes
                  three terms with half-term breaks. However, this can vary by
                  local authority and school type. Some areas may have 38 or 40
                  term weeks depending on their academic calendar.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>Do term-time contracts include paid holidays?</span>
                </h3>
                <p className="text-gray-300">
                  Yes, term-time only contracts must include statutory paid
                  holiday entitlement. The minimum is 5.6 weeks (28 days) as
                  required by{" "}
                  <a
                    href="https://www.gov.uk/calculate-your-holiday-entitlement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    UK employment law
                  </a>
                  , but many local authorities provide more. Some include bank
                  holidays within the holiday allocation, while others add them
                  separately.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    Do term-time only employees get paid during school holidays?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Yes, term-time only employees receive their salary during
                  school holidays as part of their paid holiday entitlement.
                  This is typically 5.6 weeks (28 days) minimum, but many local
                  authorities provide more. The salary is often spread evenly
                  over 12 months for consistent monthly income.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    Why is my monthly pay the same if I only work in term time?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Many employers spread term-time only pay evenly over 12 months
                  to provide consistent monthly income. This means you receive
                  the same amount each month, even during school holidays when
                  you&apos;re not working. Some employers pay only during worked
                  and holiday weeks instead.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>Can I negotiate my term-time only salary?</span>
                </h3>
                <p className="text-gray-300">
                  Yes, term-time only salaries can often be negotiated,
                  especially for experienced staff or specialized roles. Factors
                  that may influence negotiations include your qualifications,
                  experience, the school&apos;s budget, local authority pay
                  scales, and market rates for similar positions in your area.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>How does part-time TTO work?</span>
                </h3>
                <p className="text-gray-300">
                  Part-time term-time only contracts apply both an hours
                  reduction and a TTO reduction. For example, working 20 hours
                  instead of 37.5 hours (53.3% hours factor) for 39+5.6 weeks
                  instead of 52 weeks (85.8% TTO factor) results in 45.7% of the
                  full-time equivalent salary.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    How does overtime work with term-time only contracts?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Overtime arrangements vary by employer. Some schools pay
                  overtime for additional hours worked during term time, while
                  others may offer time off in lieu. Check your contract and
                  local authority policy for specific overtime rates and
                  conditions.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    Are term-time only salaries subject to tax and National
                    Insurance?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Yes, term-time only salaries are subject to the same tax and
                  National Insurance deductions as any other employment income.
                  Your employer will deduct PAYE tax and National Insurance
                  contributions based on your annual salary amount, regardless
                  of the term-time only nature of your contract.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>What jobs typically use TTO contracts?</span>
                </h3>
                <p className="text-gray-300">
                  Term-time only contracts are common for school support staff,
                  teaching assistants, learning support assistants, school
                  administrators, catering staff, and some technical roles.
                  They&apos;re particularly popular in primary and secondary
                  schools across all local authorities.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    What are the advantages of term-time only contracts?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Term-time only contracts offer work-life balance during school
                  holidays, making them ideal for parents with school-age
                  children. They provide full statutory holiday entitlement,
                  consistent monthly income (when spread over 12 months), and
                  allow employees to enjoy extended breaks without financial
                  penalty. For employers, they offer cost-effective staffing and
                  flexible workforce management.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  <span>
                    How do I convert from full-time to term-time only salary?
                  </span>
                </h3>
                <p className="text-gray-300">
                  To convert from full-time to term-time only salary, multiply
                  your current FTE salary by the hours factor (your new hours ÷
                  full-time hours) and the TTO pay factor (paid weeks ÷ 52). For
                  example, if you earn £30,000 FTE and move to 25 hours per week
                  with 44.6 paid weeks: £30,000 × (25÷37.5) × (44.6÷52) =
                  £17,160 annual TTO salary.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Calculators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-green-400" />
                <span>Related Calculators</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <a
                  href="/pro-rata-salary-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-green-400 transition-colors group"
                >
                  <TrendingUp className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-green-300">
                      Pro Rata Salary Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate part-time salary rates
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                </a>
                <a
                  href="/pro-rata-holiday-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-green-400 transition-colors group"
                >
                  <Calendar className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-green-300">
                      Pro Rata Holiday Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate your holiday entitlement
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                </a>
                <a
                  href="/pro-rata-sick-pay-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-green-400 transition-colors group"
                >
                  <Shield className="w-6 h-6 text-red-400 group-hover:text-red-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-green-300">
                      Sick Pay Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate SSP entitlements
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Official Government Resources */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="glass-effect rounded-card p-6 card-shadow border border-blue-500/20"
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  Official UK Government Resources
                </h3>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>
                    For authoritative information on UK employment law and
                    entitlements, refer to these official government resources:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <a
                        href="https://www.gov.uk/calculate-your-holiday-entitlement"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Holiday Entitlement Calculator
                      </a>{" "}
                      - Official government tool for statutory holiday
                      calculations
                    </li>
                    <li>
                      <a
                        href="https://www.gov.uk/national-minimum-wage-rates"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        National Minimum Wage Rates
                      </a>{" "}
                      - Current NMW rates and compliance requirements
                    </li>
                    <li>
                      <a
                        href="https://www.gov.uk/employment-contracts-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Employment Contracts and Conditions
                      </a>{" "}
                      - Official guidance on UK employment law
                    </li>
                    <li>
                      <a
                        href="https://www.gov.uk/statutory-sick-pay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Statutory Sick Pay (SSP)
                      </a>{" "}
                      - SSP entitlements and eligibility criteria
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1b2e] to-[#18192a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="glass-effect rounded-card p-6 card-shadow border border-yellow-500/20"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">
                  Important Disclaimer
                </h3>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>
                    <strong>
                      This calculator is for guidance purposes only.
                    </strong>{" "}
                    The results provided are estimates based on the information
                    you enter and should not be considered as definitive salary
                    calculations.
                  </p>
                  <p>
                    <strong>Always verify with your employer:</strong> Actual
                    term-time only salaries may vary based on your specific
                    contract, local authority policies, school agreements, and
                    individual circumstances.
                  </p>
                  <p>
                    <strong>Legal compliance:</strong> This calculator assumes
                    compliance with UK employment law, including statutory
                    holiday entitlements and National Minimum Wage requirements.
                    Your actual contract terms may differ.
                  </p>
                  <p>
                    <strong>Tax implications:</strong> The calculator shows
                    gross salary amounts. Actual take-home pay will depend on
                    your tax code, National Insurance contributions, pension
                    deductions, and other factors.
                  </p>
                  <p>
                    <strong>Seek professional advice:</strong> For important
                    employment decisions, salary negotiations, or legal matters,
                    consult with HR professionals, employment lawyers, or
                    relevant trade unions.
                  </p>
                  <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-white/10">
                    Last updated: September 16, 2025. Calculator accuracy
                    subject to UK employment law changes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
