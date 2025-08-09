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
  XCircle,
  AlertCircle,
  FileText,
  Users,
  Target,
  Zap,
  HelpCircle,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import {
  calculateBonus,
  formatCurrency,
  type BonusInputs,
  type BonusResults,
} from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ValidationErrors {
  fullBonusAmount?: string;
  fullTimeWeeklyHours?: string;
  actualWeeklyHours?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
  bonusPeriodStartDate?: string;
  bonusPeriodEndDate?: string;
}

export default function ProRataBonusCalculatorPage() {
  const [inputs, setInputs] = useState<BonusInputs>({
    fullBonusAmount: 0,
    fullTimeWeeklyHours: 37.5,
    actualWeeklyHours: 0,
  });

  const [results, setResults] = useState<BonusResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate full bonus amount
    if (!inputs.fullBonusAmount || inputs.fullBonusAmount <= 0) {
      newErrors.fullBonusAmount = "Please enter the full bonus amount";
    } else if (inputs.fullBonusAmount > 1000000) {
      newErrors.fullBonusAmount =
        "Bonus amount seems too high. Please check and try again.";
    }

    // Validate full-time weekly hours
    if (!inputs.fullTimeWeeklyHours || inputs.fullTimeWeeklyHours <= 0) {
      newErrors.fullTimeWeeklyHours = "Please enter full-time weekly hours";
    } else if (inputs.fullTimeWeeklyHours > 80) {
      newErrors.fullTimeWeeklyHours =
        "Full-time hours seem too high. Please check and try again.";
    }

    // Validate actual weekly hours
    if (!inputs.actualWeeklyHours || inputs.actualWeeklyHours <= 0) {
      newErrors.actualWeeklyHours = "Please enter your actual weekly hours";
    } else if (inputs.actualWeeklyHours > inputs.fullTimeWeeklyHours) {
      newErrors.actualWeeklyHours =
        "Actual hours cannot exceed full-time hours";
    } else if (inputs.actualWeeklyHours > 80) {
      newErrors.actualWeeklyHours =
        "Actual hours seem too high. Please check and try again.";
    }

    // Validate dates if provided
    if (inputs.employmentStartDate && inputs.employmentEndDate) {
      const startDate = new Date(inputs.employmentStartDate);
      const endDate = new Date(inputs.employmentEndDate);
      if (startDate >= endDate) {
        newErrors.employmentEndDate = "End date must be after start date";
      }
    }

    if (inputs.bonusPeriodStartDate && inputs.bonusPeriodEndDate) {
      const startDate = new Date(inputs.bonusPeriodStartDate);
      const endDate = new Date(inputs.bonusPeriodEndDate);
      if (startDate >= endDate) {
        newErrors.bonusPeriodEndDate =
          "Bonus period end date must be after start date";
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
  }, [inputs, showErrors]);

  const handleCalculate = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    setShowErrors(true);

    if (Object.keys(newErrors).length === 0) {
      const bonusResults = calculateBonus(inputs);
      setResults(bonusResults);

      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultText = `Pro Rata Bonus Calculation Results:
Final Bonus: ${formatCurrency(results.finalBonus)}
Part-Time Factor: ${(results.partTimeFactor * 100).toFixed(1)}%
${
  results.partialYearFactor < 1
    ? `Partial Year Factor: ${(results.partialYearFactor * 100).toFixed(1)}%`
    : ""
}
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
    field: keyof BonusInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "string"
          ? field.includes("Date")
            ? value
            : parseFloat(value) || 0
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-16">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Pro Rata Bonus Calculator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Work out your pro rata bonus entitlement for part-time or
              partial-year UK jobs. Instantly calculate your actual bonus, see a
              breakdown, and learn your rights.
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
                  Your Bonus Results
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

              {/* Final Bonus Display */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-400">
                    Your Pro Rata Bonus
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {formatCurrency(results.finalBonus)}
                </div>
                <p className="text-gray-300">{results.explanation}</p>
              </div>

              {/* Results Table */}
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
                            {item.icon === "calculator" && (
                              <Calculator className="w-4 h-4 text-purple-500" />
                            )}
                            {item.icon === "calendar" && (
                              <Calendar className="w-4 h-4 text-orange-500" />
                            )}
                            {item.icon === "trending-down" && (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            )}
                            {item.icon === "check-circle" && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 font-semibold text-blue-500">
                          {item.formattedValue}
                        </td>
                        <td className="text-right py-3 text-primary-secondary">
                          {item.description}
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
                  Calculate Your Pro Rata Bonus
                </h2>
                <p className="text-primary-secondary text-sm">
                  Enter your bonus details to calculate your pro rata
                  entitlement
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
              {/* Basic Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Bonus Amount */}
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Full Annual Bonus Amount
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-white"
                      title="The total bonus amount offered in your contract or by your employer"
                    >
                      <HelpCircle className="w-3 h-3 inline" />
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={inputs.fullBonusAmount}
                      onChange={(e) =>
                        handleInputChange("fullBonusAmount", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="4000"
                    />
                    <PoundSterling className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.fullBonusAmount && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.fullBonusAmount}
                    </p>
                  )}
                </div>

                {/* Full-Time Weekly Hours */}
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Full-Time Weekly Hours
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-white"
                      title="The standard full-time working hours per week at your workplace"
                    >
                      <HelpCircle className="w-3 h-3 inline" />
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="80"
                      step="0.5"
                      value={inputs.fullTimeWeeklyHours}
                      onChange={(e) =>
                        handleInputChange("fullTimeWeeklyHours", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="37.5"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.fullTimeWeeklyHours && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.fullTimeWeeklyHours}
                    </p>
                  )}
                </div>

                {/* Actual Weekly Hours */}
                <div className="bg-card rounded-lg p-3 border border-white/10">
                  <label className="block text-primary-text font-medium mb-1 text-sm">
                    Your Actual Weekly Hours
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-white"
                      title="The number of hours you actually work per week"
                    >
                      <HelpCircle className="w-3 h-3 inline" />
                    </button>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5"
                      max="80"
                      step="0.5"
                      value={inputs.actualWeeklyHours}
                      onChange={(e) =>
                        handleInputChange("actualWeeklyHours", e.target.value)
                      }
                      className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                      placeholder="20"
                    />
                    <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.actualWeeklyHours && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.actualWeeklyHours}
                    </p>
                  )}
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="bg-card rounded-lg p-3 border border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center justify-between w-full text-primary-text hover:text-primary-highlight transition-colors"
                >
                  <span className="font-medium">
                    Advanced Options (Partial Year Employment)
                  </span>
                  <motion.div
                    animate={{ rotate: showAdvancedOptions ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <p className="text-primary-secondary text-sm mt-1">
                  Add employment dates if you started or left partway through
                  the bonus period
                </p>
              </div>

              {/* Advanced Options */}
              <AnimatePresence>
                {showAdvancedOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Employment Start Date */}
                      <div className="bg-card rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Employment Start Date (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={inputs.employmentStartDate || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "employmentStartDate",
                                e.target.value
                              )
                            }
                            className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                          />
                        </div>
                        {errors.employmentStartDate && showErrors && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.employmentStartDate}
                          </p>
                        )}
                      </div>

                      {/* Employment End Date */}
                      <div className="bg-card rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Employment End Date (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={inputs.employmentEndDate || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "employmentEndDate",
                                e.target.value
                              )
                            }
                            className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                          />
                        </div>
                        {errors.employmentEndDate && showErrors && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.employmentEndDate}
                          </p>
                        )}
                      </div>

                      {/* Bonus Period Start Date */}
                      <div className="bg-card rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Bonus Period Start Date (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={inputs.bonusPeriodStartDate || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bonusPeriodStartDate",
                                e.target.value
                              )
                            }
                            className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Defaults to April 6th (UK tax year)
                        </p>
                        {errors.bonusPeriodStartDate && showErrors && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.bonusPeriodStartDate}
                          </p>
                        )}
                      </div>

                      {/* Bonus Period End Date */}
                      <div className="bg-card rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Bonus Period End Date (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={inputs.bonusPeriodEndDate || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "bonusPeriodEndDate",
                                e.target.value
                              )
                            }
                            className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Defaults to April 5th next year
                        </p>
                        {errors.bonusPeriodEndDate && showErrors && (
                          <p className="text-red-400 text-sm mt-1">
                            {errors.bonusPeriodEndDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white font-semibold py-4 px-6 rounded-xl hover:from-[#6a45e6] hover:to-[#1a1b2a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Calculate Pro Rata Bonus
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
          {/* What is Pro Rata Bonus Section */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              How Pro Rata Bonuses Work in the UK
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Pro rata bonuses ensure fair treatment for part-time workers and
                employees who join or leave during the bonus period. The
                calculation considers both your working hours and the time
                you've been employed during the bonus period.
              </p>
              <p className="text-gray-300 mb-4">
                UK employment law doesn't mandate bonuses, but if your employer
                offers them, they must be applied fairly across all eligible
                employees, including part-time workers on a proportional basis.
              </p>
            </div>
          </div>

          {/* Bonus Calculation Methods */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              UK Bonus Calculation Methods
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Part-Time Pro Rata
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Bonus = Full Amount × (Your Hours ÷ Full-Time Hours)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calculator className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Example: £4,000 × (20 hours ÷ 40 hours) = £2,000
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Applied to all part-time employees proportionally
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Partial Year Pro Rata
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Bonus = Amount × (Days Worked ÷ Total Days in Period)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Usually based on calendar days, not working days
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span>Applies to leavers and new starters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Employee Rights and Tips */}
          <div className="bg-[#18192a] rounded-3xl p-8 shadow-2xl border border-[#2c2470]/30">
            <h2 className="text-3xl font-bold text-white mb-6">
              Your Bonus Rights in the UK
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Understanding your bonus rights helps ensure you receive fair
                treatment. Here's what UK employees should know about bonus
                entitlements:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Contractual Bonuses
                  </h4>
                  <p className="text-gray-300 text-sm">
                    If your bonus is written in your contract, your employer
                    must pay it according to the terms specified, including any
                    pro rata arrangements.
                  </p>
                </div>
                <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Discretionary Bonuses
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Even discretionary bonuses must be awarded fairly and
                    without discrimination. Part-time workers shouldn't be
                    excluded solely based on their hours.
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
                  How are bonuses pro rated in the UK?
                </h3>
                <p className="text-gray-300">
                  UK bonuses are typically pro rated based on two factors:
                  part-time hours and partial employment periods. For part-time
                  workers, the bonus is reduced proportionally based on hours
                  worked vs full-time hours. For partial-year employment, the
                  bonus is reduced based on the time actually employed during
                  the bonus period.
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do I get my full bonus if I leave early?
                </h3>
                <p className="text-gray-300">
                  If you leave before the end of the bonus period, your bonus is
                  usually pro rated based on the time you actually worked. This
                  depends on your employment contract terms and company policy.
                  Most employers will pay a proportional amount based on the
                  period you were employed.
                </p>
              </div>

              <div className="border-b border-[#2c2470]/30 pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  How does part-time work affect my bonus?
                </h3>
                <p className="text-gray-300">
                  Part-time workers typically receive a pro rata bonus
                  calculated as: (Your weekly hours ÷ Full-time weekly hours) ×
                  Full bonus amount. For example, if you work 20 hours and
                  full-time is 40 hours, you'd receive 50% of the full bonus
                  amount.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What if I'm both part-time and started mid-year?
                </h3>
                <p className="text-gray-300">
                  If you're both part-time and worked for only part of the bonus
                  period, both factors are applied. Your bonus = Full bonus ×
                  (Your hours ÷ Full-time hours) × (Days worked ÷ Total days in
                  bonus period). This ensures fair treatment for all employment
                  situations.
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
