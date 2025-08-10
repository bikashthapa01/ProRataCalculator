"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Copy,
  TrendingUp,
  Calendar,
  Clock,
  PoundSterling,
  Info,
  CheckCircle,
  Shield,
  CalendarDays,
  Calculator as CalculatorIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Users,
  Target,
  Zap,
} from "lucide-react";
import {
  calculateSSP,
  formatCurrency,
  type SSPInputs,
  type SSPResults,
} from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ValidationErrors {
  workingDaysPerWeek?: string;
  sickDays?: string;
  averageWeeklyPay?: string;
  annualSalary?: string;
  averageWeeklyHours?: string;
}

export default function ProRataSickPayCalculatorPage() {
  const [inputs, setInputs] = useState<SSPInputs>({
    workingDaysPerWeek: 5,
    sickDays: 7,
    averageWeeklyPay: 0,
    annualSalary: 0,
    averageWeeklyHours: 0,
  });

  const [results, setResults] = useState<SSPResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [calculationMethod, setCalculationMethod] = useState<
    "weekly" | "annual"
  >("weekly");
  const resultsRef = useRef<HTMLDivElement>(null);

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate working days per week
    if (!inputs.workingDaysPerWeek || inputs.workingDaysPerWeek <= 0) {
      newErrors.workingDaysPerWeek = "Please enter your working days per week";
    } else if (inputs.workingDaysPerWeek > 7) {
      newErrors.workingDaysPerWeek =
        "Working days cannot exceed 7 days per week";
    }

    // Validate sick days
    if (!inputs.sickDays || inputs.sickDays <= 0) {
      newErrors.sickDays = "Please enter the number of sick days";
    } else if (inputs.sickDays > 365) {
      newErrors.sickDays = "Sick days cannot exceed 365 days";
    }

    // Validate weekly pay or annual salary
    if (calculationMethod === "weekly") {
      if (!inputs.averageWeeklyPay || inputs.averageWeeklyPay <= 0) {
        newErrors.averageWeeklyPay = "Please enter your average weekly pay";
      } else if (inputs.averageWeeklyPay > 10000) {
        newErrors.averageWeeklyPay =
          "Weekly pay seems too high. Please check and try again.";
      }
    } else {
      if (!inputs.annualSalary || inputs.annualSalary <= 0) {
        newErrors.annualSalary = "Please enter your annual salary";
      } else if (inputs.annualSalary > 1000000) {
        newErrors.annualSalary =
          "Annual salary seems too high. Please check and try again.";
      }
      if (!inputs.averageWeeklyHours || inputs.averageWeeklyHours <= 0) {
        newErrors.averageWeeklyHours = "Please enter your average weekly hours";
      } else if (inputs.averageWeeklyHours > 168) {
        newErrors.averageWeeklyHours = "Weekly hours cannot exceed 168 hours";
      }
    }

    return newErrors;
  };

  // Update validation when inputs change
  useEffect(() => {
    if (showErrors) {
      const newErrors = validateForm();
      setErrors(newErrors);
    }
  }, [inputs, calculationMethod, showErrors]);

  const handleCalculate = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    setShowErrors(true);

    if (Object.keys(newErrors).length === 0) {
      const sspResults = calculateSSP(inputs);
      setResults(sspResults);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultText = `SSP Calculation Results:
Total SSP: ${formatCurrency(results.totalSSP)}
Daily SSP Rate: ${formatCurrency(results.dailySSPRate)}
Qualifying Days: ${results.qualifyingDays}
Period Covered: ${results.periodCovered} weeks
${results.explanation}

Calculated using proratacalculator.co.uk`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof SSPInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-16">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Pro Rata Sick Pay Calculator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Calculate your statutory sick pay for part-time, full-time, or
              variable hours using 2025 SSP rates. Clear eligibility checks and
              a complete breakdown.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Results Section - At Top */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AnimatePresence>
          {results && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-card p-6 card-shadow border border-white/20 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary-text">
                  Your SSP Results
                </h2>
                <button
                  onClick={handleCopyResults}
                  className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Eligibility Status */}
              <div
                className={`p-4 rounded-xl mb-6 ${
                  results.isEligible
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  {results.isEligible ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span
                    className={`font-semibold ${
                      results.isEligible ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {results.isEligible
                      ? "You qualify for SSP"
                      : "You do not qualify for SSP"}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{results.explanation}</p>
              </div>

              {/* Results Table */}
              {results.isEligible && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-primary-secondary font-medium">
                          Breakdown
                        </th>
                        <th className="text-right py-2 text-primary-secondary font-medium">
                          Amount
                        </th>
                        <th className="text-right py-2 text-primary-secondary font-medium">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-primary-text">
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <PoundSterling className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">Total SSP</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-blue-500">
                          {formatCurrency(results.totalSSP)}
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          {results.qualifyingDays} qualifying days
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <CalculatorIcon className="w-4 h-4 text-green-500" />
                            <span className="font-medium">Daily SSP Rate</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-green-500">
                          {formatCurrency(results.dailySSPRate)}
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          Per working day
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">Qualifying Days</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-purple-500">
                          {results.qualifyingDays} days
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          Working days during sick period
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Period Covered</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-orange-500">
                          {results.periodCovered} weeks
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          Sick leave duration
                        </td>
                      </tr>
                      <tr className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-indigo-500" />
                            <span className="font-medium">Weekly SSP Rate</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-indigo-500">
                          {formatCurrency(results.weeklySSP)}
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          2025/26 standard rate
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculator Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-text">
                  Calculate Your SSP
                </h2>
                <p className="text-primary-secondary text-sm">
                  Enter your details below to calculate your statutory sick pay
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="space-y-4"
            >
              {/* Calculation Method Toggle */}
              <div className="bg-card rounded-lg p-3 border border-white/10">
                <label className="block text-primary-text font-medium mb-2 text-sm">
                  Calculation Method
                </label>
                <div className="flex bg-[#2c2470]/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setCalculationMethod("weekly")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      calculationMethod === "weekly"
                        ? "bg-[#7c53ff] text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Weekly Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalculationMethod("annual")}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      calculationMethod === "annual"
                        ? "bg-[#7c53ff] text-white shadow-lg"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Annual Salary
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Working Days per Week */}
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Working Days per Week
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={inputs.workingDaysPerWeek}
                      onChange={(e) =>
                        handleInputChange("workingDaysPerWeek", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="5"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.workingDaysPerWeek && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.workingDaysPerWeek}
                    </p>
                  )}
                </div>

                {/* Sick Days */}
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Number of Sick Days (Consecutive)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={inputs.sickDays}
                      onChange={(e) =>
                        handleInputChange("sickDays", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="7"
                    />
                    <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.sickDays && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.sickDays}
                    </p>
                  )}
                </div>
              </div>

              {/* Weekly Pay or Annual Salary */}
              {calculationMethod === "weekly" ? (
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Average Gross Weekly Pay
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={inputs.averageWeeklyPay}
                      onChange={(e) =>
                        handleInputChange("averageWeeklyPay", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="500"
                    />
                    <PoundSterling className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.averageWeeklyPay && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.averageWeeklyPay}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-3 border border-white/10">
                    <label className="block text-primary-text font-medium mb-1 text-sm">
                      Annual Salary
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={inputs.annualSalary || ""}
                        onChange={(e) =>
                          handleInputChange("annualSalary", e.target.value)
                        }
                        className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                        placeholder="25000"
                      />
                      <PoundSterling className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.annualSalary && showErrors && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.annualSalary}
                      </p>
                    )}
                  </div>
                  <div className="bg-card rounded-lg p-3 border border-white/10">
                    <label className="block text-primary-text font-medium mb-1 text-sm">
                      Average Weekly Hours
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="168"
                        step="0.5"
                        value={inputs.averageWeeklyHours || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "averageWeeklyHours",
                            e.target.value
                          )
                        }
                        className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                        placeholder="37.5"
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.averageWeeklyHours && showErrors && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.averageWeeklyHours}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white font-semibold py-4 px-6 rounded-xl hover:from-[#6a45e6] hover:to-[#1a1b2a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate SSP
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* SEO-Rich Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          {/* What is SSP Section */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              What is Statutory Sick Pay (SSP)?
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Statutory Sick Pay (SSP) is a legal requirement for UK employers
                to pay eligible employees when they&apos;re off work due to
                illness. For 2025/26, the SSP rate is{" "}
                <strong>£116.75 per week</strong>, paid only for qualifying days
                (your normal working days).
              </p>
              <p className="text-gray-300 mb-4">
                SSP is particularly important for part-time workers, as the
                calculation takes into account your actual working days rather
                than a standard full-time week. This ensures fair treatment for
                employees with varying schedules.
              </p>
            </div>
          </div>

          {/* Eligibility Requirements */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              SSP Eligibility Requirements for 2025
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Who Qualifies for SSP?
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      You must be classed as an employee (not self-employed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Earn at least £123 per week (2025/26 threshold)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Be off work for at least 4 consecutive days (including
                      non-working days)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Have been employed for at least 2 years</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  2025 SSP Rates & Limits
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Weekly SSP rate:</strong> £116.75
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Minimum sick days:</strong> 4 consecutive days
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Maximum period:</strong> 28 weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Minimum earnings:</strong> £123 per week
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How SSP Works for Part-Time Workers */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              How SSP Works for Part-Time Workers
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                SSP calculations for part-time workers are based on{" "}
                <strong>qualifying days</strong> - your normal working days.
                This ensures fair treatment regardless of your working pattern.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Daily SSP Rate Calculation
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Your daily SSP rate = £116.75 ÷ your working days per week
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    <strong>Example:</strong> If you work 3 days per week, your
                    daily SSP rate would be £38.92 (£116.75 ÷ 3).
                  </p>
                </div>
                <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Qualifying Days
                  </h4>
                  <p className="text-gray-300 text-sm">
                    SSP is only paid for working days that fall within your sick
                    period.
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    <strong>Example:</strong> If you&apos;re sick for 7 days but
                    only work Monday-Wednesday, you&apos;ll receive SSP for 3
                    qualifying days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Who qualifies for SSP?
                </h3>
                <p className="text-gray-300">
                  You must be classed as an employee, earn at least £123/week
                  (2025/26), and be off work for at least 4 consecutive days
                  (including non-working days).
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  How is sick pay calculated for part-time workers?
                </h3>
                <p className="text-gray-300">
                  SSP is paid only for &quot;qualifying days&quot; (your normal
                  working days). For part-time workers, this means your actual
                  working days. The daily SSP rate is calculated by dividing the
                  weekly SSP (£116.75) by your number of qualifying days per
                  week.
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is the SSP weekly rate for 2025?
                </h3>
                <p className="text-gray-300">
                  The Statutory Sick Pay rate for 2025/26 is £116.75 per week,
                  paid only for qualifying days (your normal working days).
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  How many days can I claim SSP?
                </h3>
                <p className="text-gray-300">
                  SSP can be paid for up to 28 weeks. You must be off work for
                  at least 4 consecutive days (including non-working days) to
                  qualify, and SSP is only paid for qualifying days.
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What happens if I don&apos;t qualify for SSP?
                </h3>
                <p className="text-gray-300">
                  If you don&apos;t qualify for SSP, you may be eligible for
                  Employment and Support Allowance (ESA) or Universal Credit.
                  Contact your local Jobcentre Plus or visit GOV.UK for more
                  information.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can my employer pay more than SSP?
                </h3>
                <p className="text-gray-300">
                  Yes, many employers offer enhanced sick pay schemes that pay
                  more than the statutory minimum. Check your employment
                  contract or speak to your HR department for details of your
                  company&apos;s sick pay policy.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
