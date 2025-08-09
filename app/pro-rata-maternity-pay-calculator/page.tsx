"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Copy,
  Calendar,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Zap,
  Lock,
  Award,
  HelpCircle,
  Percent,
  DollarSign,
  User,
  Clock3,
  Building,
  Baby,
  Heart,
  CalendarDays,
  Calculator as CalculatorIcon,
  CheckCircle2,
  XCircle,
  Info as InfoIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MaternityInputs {
  averageWeeklyPay: number;
  employmentStartDate: string;
  expectedWeekOfChildbirth: string;
  isPayVariable: boolean;
  variablePayments: number[];
  annualSalary: number;
  averageWeeklyHours: number;
}

interface MaternityResults {
  isEligible: boolean;
  eligibilityReason: string;
  qualifyingWeek: string;
  averageWeeklyEarnings: number;
  weeksEmployed: number;
  breakdown: {
    period: string;
    weeks: number;
    rate: number;
    weeklyAmount: number;
    totalAmount: number;
    description: string;
  }[];
  totalSMP: number;
  explanation: string;
}

interface ValidationErrors {
  averageWeeklyPay?: string;
  employmentStartDate?: string;
  expectedWeekOfChildbirth?: string;
  variablePayments?: string;
  annualSalary?: string;
  averageWeeklyHours?: string;
}

export default function ProRataMaternityPayCalculatorPage() {
  const [inputs, setInputs] = useState<MaternityInputs>({
    averageWeeklyPay: 0,
    employmentStartDate: "",
    expectedWeekOfChildbirth: "",
    isPayVariable: false,
    variablePayments: [],
    annualSalary: 0,
    averageWeeklyHours: 0,
  });

  const [results, setResults] = useState<MaternityResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // UK Statutory Maternity Pay Constants (2025/26)
  const MIN_WEEKS_EMPLOYED = 26; // Must be employed for at least 26 weeks
  const MIN_WEEKLY_EARNINGS = 125; // £125/week minimum (2025/26)
  const QUALIFYING_WEEK_OFFSET = 15; // 15 weeks before expected childbirth
  const FIRST_6_WEEKS_RATE = 0.9; // 90% of average weekly earnings
  const NEXT_33_WEEKS_CAP = 187.18; // £187.18/week cap (2025/26)
  const NEXT_33_WEEKS_RATE = 0.9; // 90% of average weekly earnings

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate average weekly pay
    if (!inputs.averageWeeklyPay || inputs.averageWeeklyPay <= 0) {
      newErrors.averageWeeklyPay = "Please enter your average weekly pay";
    } else if (inputs.averageWeeklyPay > 10000) {
      newErrors.averageWeeklyPay = "Weekly pay cannot exceed £10,000";
    }

    // Validate employment start date
    if (!inputs.employmentStartDate) {
      newErrors.employmentStartDate = "Please enter your employment start date";
    }

    // Validate expected week of childbirth
    if (!inputs.expectedWeekOfChildbirth) {
      newErrors.expectedWeekOfChildbirth =
        "Please enter your expected week of childbirth";
    } else if (inputs.employmentStartDate && inputs.expectedWeekOfChildbirth) {
      const startDate = new Date(inputs.employmentStartDate);
      const childbirthDate = new Date(inputs.expectedWeekOfChildbirth);
      if (childbirthDate <= startDate) {
        newErrors.expectedWeekOfChildbirth =
          "Expected childbirth must be after employment start date";
      }
    }

    // Validate variable payments if applicable
    if (inputs.isPayVariable && inputs.variablePayments.length < 8) {
      newErrors.variablePayments =
        "Please enter at least 8 weeks of variable pay";
    }

    return newErrors;
  };

  const calculateMaternityPay = (): MaternityResults => {
    // Calculate qualifying week (15 weeks before expected childbirth)
    const childbirthDate = new Date(inputs.expectedWeekOfChildbirth);
    const qualifyingWeekDate = new Date(childbirthDate);
    qualifyingWeekDate.setDate(
      qualifyingWeekDate.getDate() - QUALIFYING_WEEK_OFFSET * 7
    );

    // Calculate weeks employed
    const startDate = new Date(inputs.employmentStartDate);
    const weeksEmployed = Math.floor(
      (qualifyingWeekDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    );

    // Calculate average weekly earnings
    let averageWeeklyEarnings = inputs.averageWeeklyPay;
    if (inputs.isPayVariable && inputs.variablePayments.length >= 8) {
      const last8Weeks = inputs.variablePayments.slice(-8);
      averageWeeklyEarnings =
        last8Weeks.reduce((sum, pay) => sum + pay, 0) / last8Weeks.length;
    }

    // Check eligibility
    const isEligible =
      weeksEmployed >= MIN_WEEKS_EMPLOYED &&
      averageWeeklyEarnings >= MIN_WEEKLY_EARNINGS;

    let eligibilityReason = "";
    if (!isEligible) {
      if (weeksEmployed < MIN_WEEKS_EMPLOYED) {
        eligibilityReason = `You must be employed for at least ${MIN_WEEKS_EMPLOYED} weeks by the qualifying week (${
          MIN_WEEKS_EMPLOYED - weeksEmployed
        } weeks short)`;
      } else if (averageWeeklyEarnings < MIN_WEEKLY_EARNINGS) {
        eligibilityReason = `You must earn at least £${MIN_WEEKLY_EARNINGS}/week on average (you earn £${averageWeeklyEarnings.toFixed(
          2
        )})`;
      }
    } else {
      eligibilityReason = "You are eligible for Statutory Maternity Pay";
    }

    // Calculate SMP breakdown
    const breakdown = [];
    let totalSMP = 0;

    if (isEligible) {
      // First 6 weeks: 90% of average weekly earnings (no cap)
      const first6WeeksAmount = averageWeeklyEarnings * FIRST_6_WEEKS_RATE;
      const first6WeeksTotal = first6WeeksAmount * 6;
      totalSMP += first6WeeksTotal;

      breakdown.push({
        period: "First 6 weeks",
        weeks: 6,
        rate: FIRST_6_WEEKS_RATE * 100,
        weeklyAmount: first6WeeksAmount,
        totalAmount: first6WeeksTotal,
        description: "90% of your average weekly earnings (no cap)",
      });

      // Next 33 weeks: lower of £184.03/week or 90% of average weekly earnings
      const next33WeeksAmount = Math.min(
        NEXT_33_WEEKS_CAP,
        averageWeeklyEarnings * NEXT_33_WEEKS_RATE
      );
      const next33WeeksTotal = next33WeeksAmount * 33;
      totalSMP += next33WeeksTotal;

      breakdown.push({
        period: "Next 33 weeks",
        weeks: 33,
        rate: NEXT_33_WEEKS_RATE * 100,
        weeklyAmount: next33WeeksAmount,
        totalAmount: next33WeeksTotal,
        description: `Lower of £${NEXT_33_WEEKS_CAP}/week or 90% of your average weekly earnings`,
      });
    }

    // Generate explanation
    const explanation = `Based on ${weeksEmployed} weeks of employment, average weekly earnings of £${averageWeeklyEarnings.toFixed(
      2
    )}, and expected childbirth in week commencing ${childbirthDate.toLocaleDateString(
      "en-GB"
    )}, your Statutory Maternity Pay is £${totalSMP.toFixed(2)}.`;

    return {
      isEligible,
      eligibilityReason,
      qualifyingWeek: qualifyingWeekDate.toLocaleDateString("en-GB"),
      averageWeeklyEarnings,
      weeksEmployed,
      breakdown,
      totalSMP,
      explanation,
    };
  };

  const handleCalculate = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setShowErrors(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const calculatedResults = calculateMaternityPay();
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

    const resultsText = `Statutory Maternity Pay Calculation Results:

Eligibility: ${results.isEligible ? "Eligible" : "Not Eligible"}
${results.eligibilityReason}

Qualifying Week: ${results.qualifyingWeek}
Weeks Employed: ${results.weeksEmployed}
Average Weekly Earnings: £${results.averageWeeklyEarnings.toFixed(2)}

${results.explanation}

Total SMP: £${results.totalSMP.toFixed(2)}

Calculated using Pro Rata Maternity Pay Calculator UK - https://proratacalculator.co.uk/pro-rata-maternity-pay-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (field: keyof MaternityInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false);
  };

  const handleVariablePaymentChange = (index: number, value: number) => {
    const newPayments = [...inputs.variablePayments];
    newPayments[index] = value;
    setInputs((prev) => ({ ...prev, variablePayments: newPayments }));
    setShowErrors(false);
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full mb-6">
                <Baby className="w-5 h-5" />
                <span className="font-semibold">2025 Updated</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Pro Rata Maternity Pay Calculator
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Calculate your exact Statutory Maternity Pay, even if you work
                part-time or have variable pay. All calculations use 2025 rules.
              </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center space-x-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">GOV.UK Logic</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">No Data Saved</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/10 text-purple-500 px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">2025 Updated</span>
              </div>
            </motion.div>

            {/* Compact Results Table - Only shown when results exist */}
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
                      Your Maternity Pay Entitlement
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
                      <span className="font-medium text-primary-text">
                        {results.eligibilityReason}
                      </span>
                    </div>
                  </div>

                  {/* Results Summary */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-pink-500" />
                        <span className="font-medium text-primary-text">
                          Total SMP
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-pink-500">
                        £{results.totalSMP.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-primary-text">
                          Weeks Employed
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-500">
                        {results.weeksEmployed}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Percent className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-primary-text">
                          Average Weekly Pay
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        £{results.averageWeeklyEarnings.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  {results.isEligible && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 text-primary-secondary font-medium">
                              Period
                            </th>
                            <th className="text-center py-2 text-primary-secondary font-medium">
                              Weeks
                            </th>
                            <th className="text-center py-2 text-primary-secondary font-medium">
                              Rate
                            </th>
                            <th className="text-right py-2 text-primary-secondary font-medium">
                              Weekly (£)
                            </th>
                            <th className="text-right py-2 text-primary-secondary font-medium">
                              Total (£)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-primary-text">
                          {results.breakdown.map((item, index) => (
                            <tr key={index} className="border-b border-white/5">
                              <td className="py-3">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-blue-500" />
                                  <span className="font-medium">
                                    {item.period}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 text-center">
                                <span className="font-medium">
                                  {item.weeks}
                                </span>
                              </td>
                              <td className="py-3 text-center">
                                <span className="font-semibold text-green-500">
                                  {item.rate}%
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <span className="font-semibold text-primary-text">
                                  £{item.weeklyAmount.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <span className="font-semibold text-primary-text">
                                  £{item.totalAmount.toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="mt-4 p-4 bg-card-background rounded-lg border border-white/10">
                    <p className="text-sm text-primary-secondary">
                      {results.explanation}
                    </p>
                    <p className="text-sm text-primary-secondary mt-2">
                      <strong>Qualifying Week:</strong> {results.qualifyingWeek}
                    </p>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Maternity Pay
                    </h2>
                    <p className="text-primary-secondary text-sm">
                      Enter your details below
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
                  {/* First Row - Average Weekly Pay and Employment Start Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Average Weekly Pay */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Average Weekly Pay (£) *
                      </label>
                      <input
                        type="number"
                        value={inputs.averageWeeklyPay || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "averageWeeklyPay",
                            parseFloat(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.averageWeeklyPay
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="500"
                        min="0"
                        max="10000"
                        step="0.01"
                      />
                      {showErrors && errors.averageWeeklyPay && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.averageWeeklyPay}</span>
                        </div>
                      )}
                      <p className="text-xs text-primary-secondary mt-1">
                        Must be at least £125/week for 2025/26
                      </p>
                    </div>

                    {/* Employment Start Date */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Employment Start Date *
                      </label>
                      <input
                        type="date"
                        value={inputs.employmentStartDate}
                        onChange={(e) =>
                          handleInputChange(
                            "employmentStartDate",
                            e.target.value
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.employmentStartDate
                            ? "border-red-500"
                            : ""
                        }`}
                        required
                      />
                      {showErrors && errors.employmentStartDate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.employmentStartDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second Row - Expected Week of Childbirth and Pay Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Expected Week of Childbirth */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Expected Week of Childbirth *
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
                        className={`input-field w-full text-sm ${
                          showErrors && errors.expectedWeekOfChildbirth
                            ? "border-red-500"
                            : ""
                        }`}
                        required
                      />
                      {showErrors && errors.expectedWeekOfChildbirth && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.expectedWeekOfChildbirth}</span>
                        </div>
                      )}
                    </div>

                    {/* Pay Type */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Pay Type
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleInputChange("isPayVariable", false)
                          }
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            !inputs.isPayVariable
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Fixed Pay
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleInputChange("isPayVariable", true)
                          }
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            inputs.isPayVariable
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Variable Pay
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Variable Pay Section */}
                  {inputs.isPayVariable && (
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-medium text-primary-text mb-3">
                        Last 8 Weeks of Pay
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Array.from({ length: 8 }, (_, index) => (
                          <div key={index}>
                            <label className="block text-primary-text font-medium mb-1 text-xs">
                              Week {index + 1}
                            </label>
                            <input
                              type="number"
                              value={inputs.variablePayments[index] || ""}
                              onChange={(e) =>
                                handleVariablePaymentChange(
                                  index,
                                  parseFloat(e.target.value)
                                )
                              }
                              className="input-field w-full text-sm"
                              placeholder="500"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        ))}
                      </div>
                      {showErrors && errors.variablePayments && (
                        <div className="flex items-center space-x-2 mt-2 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.variablePayments}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Advanced Options */}
                  <div className="bg-card-background rounded-lg p-4 border border-white/10">
                    <button
                      type="button"
                      onClick={() =>
                        setShowAdvancedOptions(!showAdvancedOptions)
                      }
                      className="flex items-center space-x-2 text-primary-text hover:text-primary-highlight transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showAdvancedOptions ? "rotate-180" : ""
                        }`}
                      />
                      <span className="font-medium">
                        Advanced Options (Optional)
                      </span>
                    </button>

                    {showAdvancedOptions && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-primary-text font-medium mb-1 text-sm">
                            Annual Salary (£)
                          </label>
                          <input
                            type="number"
                            value={inputs.annualSalary || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "annualSalary",
                                parseFloat(e.target.value)
                              )
                            }
                            className="input-field w-full text-sm"
                            placeholder="25000"
                            min="0"
                            step="100"
                          />
                        </div>
                        <div>
                          <label className="block text-primary-text font-medium mb-1 text-sm">
                            Average Weekly Hours
                          </label>
                          <input
                            type="number"
                            value={inputs.averageWeeklyHours || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "averageWeeklyHours",
                                parseFloat(e.target.value)
                              )
                            }
                            className="input-field w-full text-sm"
                            placeholder="37.5"
                            min="0"
                            max="168"
                            step="0.5"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Maternity Pay</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* How SMP Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  How UK Statutory Maternity Pay Works
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Understanding your legal maternity pay rights and how SMP
                  calculations work in the UK.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Eligibility Requirements */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary-highlight" />
                      <span>Eligibility Requirements</span>
                    </h3>
                    <div className="space-y-3 text-sm text-primary-secondary">
                      <p>
                        <strong>Employment Duration:</strong> You must have
                        worked for the same employer for at least 26 weeks by
                        the qualifying week (15th week before expected
                        childbirth).
                      </p>
                      <p>
                        <strong>Minimum Earnings:</strong> You must earn at
                        least £125 per week on average in the 8 weeks before the
                        qualifying week.
                      </p>
                      <p>
                        <strong>Notice Period:</strong> You must give your
                        employer at least 28 days' notice of when you want your
                        SMP to start.
                      </p>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-primary-highlight" />
                      <span>Calculation Rates</span>
                    </h3>
                    <div className="space-y-3 text-sm text-primary-secondary">
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>First 6 weeks:</strong> 90% of average weekly
                          earnings
                        </span>
                        <span className="text-pink-500 font-semibold">90%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>Next 33 weeks:</strong> Lower of £187.18/week
                          or 90%
                        </span>
                        <span className="text-purple-500 font-semibold">
                          90% or £187.18
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>Total period:</strong> 39 weeks
                        </span>
                        <span className="text-blue-500 font-semibold">
                          39 weeks
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Worked Examples */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary-highlight" />
                      <span>Worked Examples</span>
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-3 bg-card-background rounded-lg border border-white/10">
                        <h4 className="font-medium text-primary-text mb-2">
                          Example 1: High Earner
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Average weekly pay: £600, 30 weeks employed
                        </p>
                        <p className="text-primary-text">
                          <strong>First 6 weeks:</strong> £600 × 90% = £540/week
                          <br />
                          <strong>Next 33 weeks:</strong> £187.18/week (capped)
                          <br />
                          <strong>Total:</strong> £3,240 + £6,176.94 = £9,416.94
                        </p>
                      </div>
                      <div className="p-3 bg-card-background rounded-lg border border-white/10">
                        <h4 className="font-medium text-primary-text mb-2">
                          Example 2: Part-Time Worker
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Average weekly pay: £200, 26 weeks employed
                        </p>
                        <p className="text-primary-text">
                          <strong>First 6 weeks:</strong> £200 × 90% = £180/week
                          <br />
                          <strong>Next 33 weeks:</strong> £180/week (90% of
                          earnings)
                          <br />
                          <strong>Total:</strong> £1,080 + £5,940 = £7,020
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Info className="w-5 h-5 text-primary-highlight" />
                      <span>Important Notes</span>
                    </h3>
                    <ul className="space-y-2 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>SMP is paid for up to 39 weeks</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          You can start SMP from 11 weeks before your due date
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Your employer pays SMP and claims it back from HMRC
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Always check your employment contract for enhanced
                          maternity pay
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Who qualifies for SMP?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    You must be employed for at least 26 weeks by the qualifying
                    week (15th week before expected childbirth) and earn at
                    least £125 per week on average in the 8 weeks before the
                    qualifying week.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How is SMP calculated for part-time workers?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    SMP is calculated based on your actual average weekly
                    earnings, regardless of whether you work part-time or
                    full-time. The same rates apply: 90% for the first 6 weeks,
                    then the lower of £187.18/week or 90% for the next 33 weeks.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What is the SMP weekly cap for 2025?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    For 2025/26, the SMP weekly cap is £187.18. This applies to
                    the 33 weeks after the first 6 weeks. The first 6 weeks are
                    paid at 90% of your average weekly earnings with no cap.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How to calculate average weekly pay?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    For fixed pay, use your regular weekly amount. For variable
                    pay, calculate the average of your earnings in the 8 weeks
                    before the qualifying week. Include all taxable earnings but
                    exclude overtime unless it's guaranteed.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    When does SMP start and end?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    SMP can start from 11 weeks before your expected week of
                    childbirth and is paid for up to 39 weeks. You must give
                    your employer at least 28 days' notice of when you want SMP
                    to start.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What if I don't qualify for SMP?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    If you don't qualify for SMP, you may be eligible for
                    Maternity Allowance (MA) from the government. MA is paid for
                    up to 39 weeks at £187.18 per week (2025/26) if you meet the
                    National Insurance contribution requirements.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Calculators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16"
            >
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-primary-highlight" />
                  <span>Try Our Other Calculators</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="/pro-rata-salary-calculator"
                    className="flex items-center space-x-3 p-4 bg-card-background rounded-lg border border-white/10 hover:border-primary-highlight transition-colors"
                  >
                    <TrendingUp className="w-5 h-5 text-primary-highlight" />
                    <div>
                      <h4 className="font-medium text-primary-text">
                        Pro Rata Salary Calculator
                      </h4>
                      <p className="text-sm text-primary-secondary">
                        Calculate your part-time salary with take-home pay
                      </p>
                    </div>
                  </a>
                  <a
                    href="/pro-rata-holiday-calculator"
                    className="flex items-center space-x-3 p-4 bg-card-background rounded-lg border border-white/10 hover:border-primary-highlight transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-primary-highlight" />
                    <div>
                      <h4 className="font-medium text-primary-text">
                        Pro Rata Holiday Calculator
                      </h4>
                      <p className="text-sm text-primary-secondary">
                        Calculate your holiday entitlement
                      </p>
                    </div>
                  </a>
                  <a
                    href="/pro-rata-redundancy-pay-calculator"
                    className="flex items-center space-x-3 p-4 bg-card-background rounded-lg border border-white/10 hover:border-primary-highlight transition-colors"
                  >
                    <DollarSign className="w-5 h-5 text-primary-highlight" />
                    <div>
                      <h4 className="font-medium text-primary-text">
                        Pro Rata Redundancy Calculator
                      </h4>
                      <p className="text-sm text-primary-secondary">
                        Calculate your redundancy pay
                      </p>
                    </div>
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
