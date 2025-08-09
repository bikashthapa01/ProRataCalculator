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
  Shield,
  Heart,
  Baby,
  User,
  Percent,
  PoundSterling,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Users,
  BookOpen,
  HelpCircle,
  ExternalLink,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  calculateSPP,
  SPPInputs,
  SPPResults,
  formatCurrency,
} from "@/lib/utils";

interface ValidationErrors {
  averageWeeklyEarnings?: string;
  employmentStartDate?: string;
  expectedWeekOfChildbirth?: string;
  plannedLeaveStartDate?: string;
  weeksOfLeave?: string;
  annualSalary?: string;
  averageWeeklyHours?: string;
}

export default function ProRataPaternityPayCalculatorPage() {
  const [inputs, setInputs] = useState<SPPInputs>({
    averageWeeklyEarnings: 0,
    employmentStartDate: "",
    expectedWeekOfChildbirth: "",
    plannedLeaveStartDate: "",
    weeksOfLeave: 2,
    annualSalary: 0,
    averageWeeklyHours: 0,
  });

  const [results, setResults] = useState<SPPResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate average weekly earnings
    if (!inputs.averageWeeklyEarnings || inputs.averageWeeklyEarnings <= 0) {
      newErrors.averageWeeklyEarnings =
        "Please enter your average weekly earnings";
    } else if (inputs.averageWeeklyEarnings > 10000) {
      newErrors.averageWeeklyEarnings = "Weekly earnings cannot exceed £10,000";
    }

    // Validate employment start date
    if (!inputs.employmentStartDate) {
      newErrors.employmentStartDate = "Please enter your employment start date";
    }

    // Validate expected week of childbirth
    if (!inputs.expectedWeekOfChildbirth) {
      newErrors.expectedWeekOfChildbirth =
        "Please enter the expected week of childbirth";
    } else if (inputs.employmentStartDate && inputs.expectedWeekOfChildbirth) {
      const startDate = new Date(inputs.employmentStartDate);
      const childbirthDate = new Date(inputs.expectedWeekOfChildbirth);
      if (childbirthDate <= startDate) {
        newErrors.expectedWeekOfChildbirth =
          "Expected childbirth must be after employment start date";
      }
    }

    // Validate planned leave start date
    if (!inputs.plannedLeaveStartDate) {
      newErrors.plannedLeaveStartDate =
        "Please enter your planned leave start date";
    }

    // Validate weeks of leave
    if (
      !inputs.weeksOfLeave ||
      inputs.weeksOfLeave < 1 ||
      inputs.weeksOfLeave > 2
    ) {
      newErrors.weeksOfLeave = "You can take 1 or 2 weeks of paternity leave";
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

    const calculatedResults = calculateSPP(inputs);
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

    const resultsText = `Statutory Paternity Pay (SPP) Calculation Results:

Eligibility: ${results.isEligible ? "Eligible" : "Not Eligible"}
${results.eligibilityReason}

Your Paternity Pay: ${formatCurrency(results.totalSPP)}
Weekly Rate: ${formatCurrency(results.weeklyRate)}
Weeks of Leave: ${inputs.weeksOfLeave}
Average Weekly Earnings: ${formatCurrency(inputs.averageWeeklyEarnings)}

${results.explanation}

Calculated using Pro Rata Paternity Pay Calculator UK - https://proratacalculator.co.uk/pro-rata-paternity-pay-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof SPPInputs,
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
    setShowErrors(false);
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-6"
            >
              <Baby className="w-5 h-5" />
              <span className="font-semibold">2025 Updated</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pro Rata Paternity Pay (SPP) Calculator
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Work out Statutory Paternity Pay for part-time or full-time UK
              workers using 2025 rules. Check eligibility and see your SPP rate
              instantly.
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
              <span className="text-sm font-medium">Uses GOV.UK Rules</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Last Updated: 2025</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full border border-purple-500/20">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">No Data Saved</span>
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Your Paternity Pay Entitlement
                  </h2>
                  <button
                    onClick={handleCopyResults}
                    className="flex items-center space-x-2 text-blue-400 hover:text-white transition-colors"
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
                  className={`mb-6 p-4 rounded-lg border ${
                    results.isEligible
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {results.isEligible ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium text-white">
                      {results.eligibilityReason}
                    </span>
                  </div>
                </div>

                {/* Main Result */}
                {results.isEligible && (
                  <div className="text-center mb-6">
                    <div className="flex items-center gap-2 mb-2 justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-green-400">
                        Your Paternity Pay
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      {formatCurrency(results.totalSPP)}
                    </div>
                    <p className="text-gray-400">
                      {formatCurrency(results.weeklyRate)}/week for{" "}
                      {inputs.weeksOfLeave} week
                      {inputs.weeksOfLeave > 1 ? "s" : ""}
                    </p>
                  </div>
                )}

                {/* Breakdown Table */}
                {results.isEligible && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-gray-400 font-medium">
                            Calculation Step
                          </th>
                          <th className="text-right py-2 text-gray-400 font-medium">
                            Amount
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
                                {item.icon === "percent" && (
                                  <Percent className="w-4 h-4 text-green-500" />
                                )}
                                {item.icon === "shield" && (
                                  <Shield className="w-4 h-4 text-purple-500" />
                                )}
                                {item.icon === "calculator" && (
                                  <Calculator className="w-4 h-4 text-orange-500" />
                                )}
                                {item.icon === "calendar" && (
                                  <Calendar className="w-4 h-4 text-red-500" />
                                )}
                                {item.icon === "check-circle" && (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                <span className="font-medium">
                                  {item.label}
                                </span>
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
                )}

                {/* Explanation */}
                <div className="mt-4 p-4 bg-[#2c2470]/20 rounded-lg border border-[#2c2470]/30">
                  <p className="text-sm text-gray-300">{results.explanation}</p>
                  <p className="text-sm text-gray-300 mt-2">
                    <strong>Qualifying Week:</strong> {results.qualifyingWeek} |{" "}
                    <strong>Weeks Employed:</strong> {results.weeksEmployed}
                  </p>
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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Calculate Your Paternity Pay
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your details to calculate your SPP entitlement
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
              {/* Main Inputs Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Average Weekly Earnings */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <PoundSterling className="w-4 h-4" />
                    <span>Average Weekly Earnings (£) *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    step="0.01"
                    value={inputs.averageWeeklyEarnings}
                    onChange={(e) =>
                      handleInputChange("averageWeeklyEarnings", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="500"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Must be at least £125/week for 2025/26
                    </span>
                  </div>
                  {errors.averageWeeklyEarnings && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.averageWeeklyEarnings}
                    </p>
                  )}
                </div>

                {/* Weeks of Leave */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Weeks of Paternity Leave *</span>
                  </label>
                  <select
                    value={inputs.weeksOfLeave}
                    onChange={(e) =>
                      handleInputChange(
                        "weeksOfLeave",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  >
                    <option value={1}>1 week</option>
                    <option value={2}>2 weeks</option>
                  </select>
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Can be taken consecutively or separately
                    </span>
                  </div>
                  {errors.weeksOfLeave && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.weeksOfLeave}
                    </p>
                  )}
                </div>
              </div>

              {/* Date Inputs Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Employment Start Date */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <User className="w-4 h-4" />
                    <span>Employment Start Date *</span>
                  </label>
                  <input
                    type="date"
                    value={inputs.employmentStartDate}
                    onChange={(e) =>
                      handleInputChange("employmentStartDate", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Must be 26+ weeks before qualifying week
                    </span>
                  </div>
                  {errors.employmentStartDate && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.employmentStartDate}
                    </p>
                  )}
                </div>

                {/* Expected Week of Childbirth */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Baby className="w-4 h-4" />
                    <span>Expected Week of Childbirth *</span>
                  </label>
                  <input
                    type="date"
                    value={inputs.expectedWeekOfChildbirth}
                    onChange={(e) =>
                      handleInputChange(
                        "expectedWeekOfChildbirth",
                        e.target.value
                      )
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Due date or estimated week of birth
                    </span>
                  </div>
                  {errors.expectedWeekOfChildbirth && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.expectedWeekOfChildbirth}
                    </p>
                  )}
                </div>
              </div>

              {/* Planned Leave Start Date */}
              <div>
                <label className="flex items-center space-x-2 text-white font-medium mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Planned Leave Start Date *</span>
                </label>
                <input
                  type="date"
                  value={inputs.plannedLeaveStartDate}
                  onChange={(e) =>
                    handleInputChange("plannedLeaveStartDate", e.target.value)
                  }
                  className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                />
                <div className="flex items-center space-x-1 mt-1">
                  <Info className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Can be taken within 52 weeks of birth
                  </span>
                </div>
                {errors.plannedLeaveStartDate && showErrors && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.plannedLeaveStartDate}
                  </p>
                )}
              </div>

              {/* Advanced Options Toggle */}
              <div className="border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center justify-between w-full text-white hover:text-blue-400 transition-colors"
                >
                  <span className="font-medium">
                    Advanced Options (Annual Salary Helper)
                  </span>
                  <motion.div
                    animate={{ rotate: showAdvancedOptions ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                <p className="text-gray-400 text-sm mt-1">
                  Calculate weekly earnings from annual salary and hours
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
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <div>
                      <label className="flex items-center space-x-2 text-white font-medium mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Annual Salary (£)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={inputs.annualSalary || ""}
                        onChange={(e) =>
                          handleInputChange("annualSalary", e.target.value)
                        }
                        className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                        placeholder="25000"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 text-white font-medium mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Average Weekly Hours</span>
                      </label>
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Calculate Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                  !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate My Paternity Pay</span>
              </button>
            </form>
          </motion.div>

          {/* How This Is Calculated Explainer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
              <button
                onClick={() => setShowExplainer(!showExplainer)}
                className="flex items-center justify-between w-full text-white hover:text-blue-400 transition-colors"
              >
                <h3 className="text-lg font-semibold">
                  How This Is Calculated
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2">
                          Eligibility Requirements
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Employed for 26+ weeks by qualifying week (15
                              weeks before birth)
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Average weekly earnings of £125+ (2025/26)
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Be the biological father, partner, or adoptive
                              parent
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">
                          Payment Calculation
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <Calculator className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Weekly rate = lower of £187.18 or 90% of your
                              average weekly earnings
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Calendar className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>
                              Total = Weekly rate × Number of weeks (1 or 2)
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>
                              For part-time: Use actual weekly earnings (no
                              extra pro-rata)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
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
          {/* How SPP Works in the UK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              How Statutory Paternity Pay Works in the UK
            </h2>
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  Statutory Paternity Pay (SPP) ensures new fathers and partners
                  receive financial support during paternity leave. The 2025
                  rules provide greater flexibility, allowing you to split your
                  leave and take it within the first 52 weeks after birth.
                </p>
                <p className="text-gray-300 mb-4">
                  For part-time workers, SPP is calculated using your actual
                  average weekly earnings - no additional pro-rata adjustment is
                  needed if your earnings already reflect your part-time hours.
                  This ensures fair treatment regardless of your working
                  pattern.
                </p>
              </div>
            </div>
          </motion.div>

          {/* SPP Calculation Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              UK SPP Calculation Methods
            </h2>
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Standard Rate Calculation
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Calculator className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Weekly rate = Lower of £187.18 or 90% of average weekly
                        earnings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Percent className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Example: £300/week earnings = £270/week SPP (90% of
                        £300)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>
                        High earners get maximum £187.18/week (statutory cap)
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Part-Time Worker Rates
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Use actual average weekly earnings (already reflects
                        part-time)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>No additional pro-rata adjustment needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Same calculation method as full-time workers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Paternity Rights in the UK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Your Paternity Rights in the UK
            </h2>
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  Understanding your paternity rights helps ensure you receive
                  fair treatment and support during this important time. Here's
                  what UK employees should know about paternity entitlements:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Leave Flexibility (2024+ Rules)
                    </h4>
                    <p className="text-gray-300 text-sm">
                      You can now split your 2 weeks of paternity leave into
                      separate weeks and take them anytime within the first 52
                      weeks after birth. This gives much more flexibility than
                      the old 56-day limit.
                    </p>
                  </div>
                  <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Notice Requirements
                    </h4>
                    <p className="text-gray-300 text-sm">
                      You must give your employer at least 28 days' notice of
                      when you want to start paternity leave. This can be done
                      verbally or in writing, but written notice is recommended.
                    </p>
                  </div>
                  <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Job Protection
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Your job is protected while on paternity leave. You have
                      the right to return to the same job with the same terms
                      and conditions, including any pay rises or improvements.
                    </p>
                  </div>
                  <div className="bg-[#2c2470]/20 rounded-xl p-4 border border-[#2c2470]/30">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Enhanced Pay Schemes
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Many employers offer enhanced paternity pay above the
                      statutory minimum. Check your employment contract or
                      company handbook for additional benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>Who is eligible for SPP?</span>
                </h3>
                <p className="text-gray-300">
                  You must be employed by the same employer for at least 26
                  weeks by the qualifying week (15th week before expected
                  childbirth) and earn at least £125 per week on average. You
                  must also be the biological father, partner, or adoptive
                  parent of the child.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>How is SPP calculated for part-time workers?</span>
                </h3>
                <p className="text-gray-300">
                  SPP is calculated based on your actual average weekly
                  earnings, regardless of whether you work part-time or
                  full-time. The rate is the lower of £187.18 per week or 90% of
                  your average weekly earnings. No additional pro-rata
                  adjustment is needed if your average weekly earnings already
                  reflect your part-time hours.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>What's the SPP weekly rate for 2025?</span>
                </h3>
                <p className="text-gray-300">
                  For 2025/26, the SPP weekly rate is the lower of £187.18 per
                  week or 90% of your average weekly earnings. This rate applies
                  for up to 2 weeks of paternity leave, which can be taken
                  consecutively or separately within the first 52 weeks after
                  birth.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>Can I split my paternity leave?</span>
                </h3>
                <p className="text-gray-300">
                  Yes, from April 2024, you can split your 2 weeks of paternity
                  leave into two separate one-week blocks. You can take these at
                  any time within the first 52 weeks after the child's birth,
                  giving you more flexibility than before.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>Is SPP taxable?</span>
                </h3>
                <p className="text-gray-300">
                  Yes, SPP is subject to tax and National Insurance
                  contributions in the same way as your normal salary. Your
                  employer will deduct these automatically when paying your SPP.
                </p>
              </div>

              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>
                    What if my employer offers enhanced paternity pay?
                  </span>
                </h3>
                <p className="text-gray-300">
                  Many employers offer enhanced paternity pay that's higher than
                  the statutory minimum. This is usually outlined in your
                  employment contract or company policy. Enhanced schemes often
                  provide full pay for some or all of your paternity leave.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Calculators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-blue-400" />
                <span>Related Calculators</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <a
                  href="/pro-rata-maternity-pay-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-blue-400 transition-colors group"
                >
                  <Baby className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-blue-300">
                      Maternity Pay Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate SMP for expecting mothers
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </a>
                <a
                  href="/pro-rata-salary-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-blue-400 transition-colors group"
                >
                  <TrendingUp className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-blue-300">
                      Pro Rata Salary Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate part-time salary rates
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </a>
                <a
                  href="/pro-rata-sick-pay-calculator"
                  className="flex items-center space-x-3 p-4 bg-[#2c2470]/20 rounded-lg border border-white/10 hover:border-blue-400 transition-colors group"
                >
                  <Shield className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  <div>
                    <h4 className="font-medium text-white group-hover:text-blue-300">
                      Sick Pay Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate SSP entitlements
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
