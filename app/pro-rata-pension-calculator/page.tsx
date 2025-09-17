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
  TrendingUp,
  Percent,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  Target,
  PoundSterling,
  Users,
  Download,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PensionInputs {
  annualSalary: number | string;
  weeklyHours: number | string;
  employerRate: number | string;
  employeeRate: number | string;
  pensionableEarningsType: "qualifying" | "full";
  taxYear: string;
  age: number | string;
}

interface PensionResults {
  isEligible: boolean;
  eligibilityReasons: string[];
  pensionableEarnings: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  monthlyContribution: number;
  breakdown: {
    grossSalary: number;
    lowerEarningsLimit: number;
    upperEarningsLimit: number;
    qualifyingEarnings: number;
    employeeRate: number;
    employerRate: number;
  };
}

interface ValidationErrors {
  annualSalary?: string;
  weeklyHours?: string;
  employerRate?: string;
  employeeRate?: string;
  age?: string;
}

export default function ProRataPensionCalculatorPage() {
  const [inputs, setInputs] = useState<PensionInputs>({
    annualSalary: "",
    weeklyHours: "",
    employerRate: "",
    employeeRate: "",
    pensionableEarningsType: "qualifying",
    taxYear: "2025/26",
    age: "",
  });

  const [results, setResults] = useState<PensionResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Pension calculation logic
  const calculatePension = (inputs: PensionInputs): PensionResults => {
    const annualSalary =
      typeof inputs.annualSalary === "string"
        ? parseFloat(inputs.annualSalary) || 0
        : inputs.annualSalary;
    const employerRate =
      typeof inputs.employerRate === "string"
        ? parseFloat(inputs.employerRate) || 0
        : inputs.employerRate;
    const employeeRate =
      typeof inputs.employeeRate === "string"
        ? parseFloat(inputs.employeeRate) || 0
        : inputs.employeeRate;
    const age =
      typeof inputs.age === "string" ? parseFloat(inputs.age) || 0 : inputs.age;
    const { pensionableEarningsType } = inputs;

    // Auto-enrolment eligibility with specific reasons
    const eligibilityReasons: string[] = [];

    if (age < 22) {
      eligibilityReasons.push("You must be at least 22 years old");
    }
    if (age > 66) {
      eligibilityReasons.push("You must be 66 years old or younger");
    }
    if (annualSalary < 10000) {
      eligibilityReasons.push("You must earn at least £10,000 per year");
    }

    const isEligible = eligibilityReasons.length === 0;

    // 2025/26 thresholds
    const lowerEarningsLimit = 6240;
    const upperEarningsLimit = 50270;

    // Calculate pensionable earnings
    let pensionableEarnings: number;
    if (pensionableEarningsType === "qualifying") {
      if (annualSalary <= lowerEarningsLimit) {
        pensionableEarnings = 0;
      } else if (annualSalary > upperEarningsLimit) {
        pensionableEarnings = upperEarningsLimit - lowerEarningsLimit;
      } else {
        pensionableEarnings = annualSalary - lowerEarningsLimit;
      }
    } else {
      pensionableEarnings = annualSalary;
    }

    // Calculate contributions
    const employeeContribution = (pensionableEarnings * employeeRate) / 100;
    const employerContribution = (pensionableEarnings * employerRate) / 100;
    const totalContribution = employeeContribution + employerContribution;
    const monthlyContribution = totalContribution / 12;

    return {
      isEligible,
      eligibilityReasons,
      pensionableEarnings,
      employeeContribution,
      employerContribution,
      totalContribution,
      monthlyContribution,
      breakdown: {
        grossSalary: annualSalary,
        lowerEarningsLimit,
        upperEarningsLimit,
        qualifyingEarnings: pensionableEarnings,
        employeeRate,
        employerRate,
      },
    };
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate annual salary
    const annualSalary =
      typeof inputs.annualSalary === "string"
        ? parseFloat(inputs.annualSalary)
        : inputs.annualSalary;
    if (
      !inputs.annualSalary ||
      inputs.annualSalary === "" ||
      annualSalary <= 0
    ) {
      newErrors.annualSalary = "Please enter your annual salary";
    } else if (annualSalary > 200000) {
      newErrors.annualSalary =
        "Salary seems too high. Please check and try again.";
    }

    // Validate weekly hours
    const weeklyHours =
      typeof inputs.weeklyHours === "string"
        ? parseFloat(inputs.weeklyHours)
        : inputs.weeklyHours;
    if (!inputs.weeklyHours || inputs.weeklyHours === "" || weeklyHours <= 0) {
      newErrors.weeklyHours = "Please enter your weekly hours";
    } else if (weeklyHours > 80) {
      newErrors.weeklyHours =
        "Weekly hours seem too high. Please check and try again.";
    }

    // Validate employer rate
    const employerRate =
      typeof inputs.employerRate === "string"
        ? parseFloat(inputs.employerRate)
        : inputs.employerRate;
    if (
      !inputs.employerRate ||
      inputs.employerRate === "" ||
      employerRate < 0 ||
      employerRate > 20
    ) {
      newErrors.employerRate = "Employer rate must be between 0% and 20%";
    }

    // Validate employee rate
    const employeeRate =
      typeof inputs.employeeRate === "string"
        ? parseFloat(inputs.employeeRate)
        : inputs.employeeRate;
    if (
      !inputs.employeeRate ||
      inputs.employeeRate === "" ||
      employeeRate < 0 ||
      employeeRate > 20
    ) {
      newErrors.employeeRate = "Employee rate must be between 0% and 20%";
    }

    // Validate age
    const age =
      typeof inputs.age === "string" ? parseFloat(inputs.age) : inputs.age;
    if (!inputs.age || inputs.age === "" || age < 16 || age > 100) {
      newErrors.age = "Please enter a valid age";
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

    const calculatedResults = calculatePension(inputs);
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

    const annualSalary =
      typeof inputs.annualSalary === "string"
        ? parseFloat(inputs.annualSalary) || 0
        : inputs.annualSalary;

    const eligibilityText = results.isEligible
      ? "✅ ELIGIBLE for auto-enrolment"
      : `❌ NOT ELIGIBLE for auto-enrolment\nReasons: ${results.eligibilityReasons.join(
          ", "
        )}`;

    const resultsText = `Pro Rata Pension Calculation Results:

Annual Salary: £${annualSalary.toLocaleString()}
Pensionable Earnings: £${results.pensionableEarnings.toLocaleString()}
Employee Contribution (${
      results.breakdown.employeeRate
    }%): £${results.employeeContribution.toFixed(2)}
Employer Contribution (${
      results.breakdown.employerRate
    }%): £${results.employerContribution.toFixed(2)}
Total Annual Contribution: £${results.totalContribution.toFixed(2)}
Monthly Contribution: £${results.monthlyContribution.toFixed(2)}

Auto-enrolment Status: ${eligibilityText}

Calculated using Pro Rata Pension Calculator UK - https://proratacalculator.co.uk/pro-rata-pension-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof PensionInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" &&
        field !== "pensionableEarningsType" &&
        field !== "taxYear"
          ? value === ""
            ? ""
            : parseFloat(value.replace(/^0+/, "")) || ""
          : value,
    }));
    setShowErrors(false);
  };

  const formatCurrency = (amount: number): string => {
    return `£${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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
            <span className="text-[#9B7FFF]">Pro Rata Pension Calculator</span>
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
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-6"
            >
              <Shield className="w-5 h-5" />
              <span className="font-semibold">2025 Updated</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pro Rata Pension Calculator UK 2025 | Free Workplace Pension
                Calculator
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Calculate your workplace pension contributions for part-time and
              term-time only employees. Work out employee and employer
              contributions, auto-enrolment eligibility, and total pension
              contributions with our free UK pension calculator.
            </motion.p>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Auto-Enrolment Ready</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full border border-purple-500/20">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">2025/26 Tax Year</span>
            </div>
            <div className="flex items-center space-x-2 bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full border border-pink-500/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Part-Time Friendly</span>
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
                    Your Pension Contributions
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

                {/* Auto-enrolment Status */}
                <div
                  className={`p-4 rounded-lg border mb-6 ${
                    results.isEligible
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {results.isEligible ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span
                      className={`font-semibold ${
                        results.isEligible ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      Auto-Enrolment Status
                    </span>
                  </div>

                  {results.isEligible ? (
                    <div className="text-sm text-green-300">
                      <p className="mb-2">
                        ✅ <strong>You qualify for auto-enrolment!</strong>
                      </p>
                      <p>
                        Your employer must automatically enrol you into a
                        workplace pension scheme.
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-red-300">
                      <p className="mb-2">
                        ❌{" "}
                        <strong>You do not qualify for auto-enrolment</strong>
                      </p>
                      <div className="space-y-1">
                        <p className="font-medium">Reasons:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          {results.eligibilityReasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="mt-2 text-xs text-red-200">
                        Note: You can still opt into a workplace pension if your
                        employer offers one.
                      </p>
                    </div>
                  )}
                </div>

                {/* Main Result Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <PoundSterling className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-white">
                        Pensionable Earnings
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">
                      {formatCurrency(results.pensionableEarnings)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-white">
                        Employee Pays
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-purple-500">
                      {formatCurrency(results.employeeContribution)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {results.breakdown.employeeRate}% of pensionable earnings
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-pink-500" />
                      <span className="font-medium text-white">
                        Employer Pays
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-pink-500">
                      {formatCurrency(results.employerContribution)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {results.breakdown.employerRate}% of pensionable earnings
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-white">
                        Total Annual
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-500">
                      {formatCurrency(results.totalContribution)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      £{results.monthlyContribution.toFixed(2)} per month
                    </p>
                  </div>
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
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <PoundSterling className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              Gross Annual Salary
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-semibold text-white">
                            {formatCurrency(results.breakdown.grossSalary)}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span className="font-medium">
                              Lower Earnings Limit (LEL)
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Qualifying earnings threshold
                          </p>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-semibold text-white">
                            {formatCurrency(
                              results.breakdown.lowerEarningsLimit
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">
                              Upper Earnings Limit (UEL)
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Maximum qualifying earnings
                          </p>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-semibold text-white">
                            {formatCurrency(
                              results.breakdown.upperEarningsLimit
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <Percent className="w-4 h-4 text-purple-500" />
                            <span className="font-medium">
                              Pensionable Earnings
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {inputs.pensionableEarningsType === "qualifying"
                              ? "Salary minus LEL (up to UEL)"
                              : "Full salary"}
                          </p>
                        </td>
                        <td className="py-3 text-right">
                          <span className="font-semibold text-white">
                            {formatCurrency(
                              results.breakdown.qualifyingEarnings
                            )}
                          </span>
                        </td>
                      </tr>
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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Calculate Your Pension Contributions
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your salary and pension details for instant calculation
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
                {/* Annual Salary */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <PoundSterling className="w-4 h-4" />
                    <span>Annual Salary (Gross) *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="200000"
                    step="100"
                    value={inputs.annualSalary}
                    onChange={(e) =>
                      handleInputChange("annualSalary", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="25000"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Your gross annual salary before tax
                    </span>
                  </div>
                  {errors.annualSalary && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.annualSalary}
                    </p>
                  )}
                </div>

                {/* Weekly Hours */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Weekly Hours Worked *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="80"
                    step="0.5"
                    value={inputs.weeklyHours}
                    onChange={(e) =>
                      handleInputChange("weeklyHours", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="37.5"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Hours per week (for FTE calculation)
                    </span>
                  </div>
                  {errors.weeklyHours && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.weeklyHours}
                    </p>
                  )}
                </div>
              </div>

              {/* Pension Rates Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Employer Rate */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Shield className="w-4 h-4" />
                    <span>Employer Pension Rate (%) *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={inputs.employerRate}
                    onChange={(e) =>
                      handleInputChange("employerRate", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="3"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Minimum 3% for auto-enrolment
                    </span>
                  </div>
                  {errors.employerRate && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.employerRate}
                    </p>
                  )}
                </div>

                {/* Employee Rate */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>Employee Pension Rate (%) *</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={inputs.employeeRate}
                    onChange={(e) =>
                      handleInputChange("employeeRate", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="5"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      Minimum 5% for auto-enrolment
                    </span>
                  </div>
                  {errors.employeeRate && showErrors && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.employeeRate}
                    </p>
                  )}
                </div>
              </div>

              {/* Options Row */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Pensionable Earnings Type */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Target className="w-4 h-4" />
                    <span>Pensionable Earnings</span>
                  </label>
                  <select
                    value={inputs.pensionableEarningsType}
                    onChange={(e) =>
                      handleInputChange(
                        "pensionableEarningsType",
                        e.target.value as "qualifying" | "full"
                      )
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  >
                    <option value="qualifying">Qualifying Earnings</option>
                    <option value="full">Full Salary</option>
                  </select>
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      How pensionable earnings are calculated
                    </span>
                  </div>
                </div>

                {/* Tax Year */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Tax Year</span>
                  </label>
                  <select
                    value={inputs.taxYear}
                    onChange={(e) =>
                      handleInputChange("taxYear", e.target.value)
                    }
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                  >
                    <option value="2025/26">2025/26</option>
                    <option value="2024/25">2024/25</option>
                  </select>
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      For threshold calculations
                    </span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="flex items-center space-x-2 text-white font-medium mb-2">
                    <Users className="w-4 h-4" />
                    <span>Age</span>
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="100"
                    value={inputs.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full bg-[#2c2470]/30 border border-[#2c2470]/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent"
                    placeholder="30"
                  />
                  <div className="flex items-center space-x-1 mt-1">
                    <Info className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      For auto-enrolment eligibility
                    </span>
                  </div>
                  {errors.age && showErrors && (
                    <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                  )}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate My Pension Contributions</span>
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
                className="flex items-center justify-between w-full text-white hover:text-blue-400 transition-colors"
              >
                <h3 className="text-lg font-semibold">
                  How Pension Contributions Are Calculated
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
                        Auto-Enrolment Eligibility
                      </h4>
                      <div className="text-sm space-y-2">
                        <p>• Aged 22-66 years old</p>
                        <p>
                          • Earn at least £10,000/year from one job (2025/26)
                        </p>
                        <p>• Work in the UK</p>
                      </div>
                    </div>
                    <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                      <h4 className="font-semibold text-white mb-2">
                        Qualifying Earnings Method
                      </h4>
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Lower Earnings Limit (LEL):</strong> £6,240
                        </p>
                        <p>
                          <strong>Upper Earnings Limit (UEL):</strong> £50,270
                        </p>
                        <p>
                          <strong>Pensionable Earnings:</strong> Salary - LEL
                          (up to UEL)
                        </p>
                        <p>
                          <strong>Example:</strong> £20,000 salary = £13,760
                          pensionable earnings
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#2c2470]/20 rounded-lg p-4 border border-[#2c2470]/30">
                      <h4 className="font-semibold text-white mb-2">
                        Contribution Calculation
                      </h4>
                      <div className="text-sm space-y-2">
                        <p>
                          <strong>Employee Contribution:</strong> Pensionable
                          Earnings × Employee %
                        </p>
                        <p>
                          <strong>Employer Contribution:</strong> Pensionable
                          Earnings × Employer %
                        </p>
                        <p>
                          <strong>Total Contribution:</strong> Employee +
                          Employer
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Comprehensive Guide Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Complete Guide to Pro Rata Pension Contributions UK 2025
              </h2>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  Understanding Workplace Pension Auto-Enrolment
                </h3>
                <p className="text-gray-300 mb-4">
                  Since 2012, UK employers have been legally required to
                  automatically enrol eligible workers into workplace pension
                  schemes. This system ensures that millions of workers are
                  saving for their retirement, with both employee and employer
                  contributions building up over time.
                </p>

                <h3 className="text-xl font-semibold text-blue-400 mb-4 mt-6">
                  Who Qualifies for Auto-Enrolment?
                </h3>
                <p className="text-gray-300 mb-4">
                  To be automatically enrolled into a workplace pension, you
                  must meet three key criteria:
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                  <li>
                    <strong>Age:</strong> Between 22 and 66 years old
                  </li>
                  <li>
                    <strong>Earnings:</strong> At least £10,000 per year from
                    one job (2025/26 threshold)
                  </li>
                  <li>
                    <strong>Location:</strong> Work in the UK
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-blue-400 mb-4 mt-6">
                  How Pro Rata Pension Contributions Work
                </h3>
                <p className="text-gray-300 mb-4">
                  Pro rata pension contributions ensure that part-time workers
                  pay pension contributions based on their actual earnings, not
                  their full-time equivalent. This means:
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                  <li>
                    If you work 20 hours per week, you pay contributions on your
                    20-hour salary
                  </li>
                  <li>
                    If you earn £15,000 per year, you pay contributions on
                    £15,000
                  </li>
                  <li>
                    Your employer also contributes based on your actual earnings
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-blue-400 mb-4 mt-6">
                  Qualifying Earnings vs Full Salary Method
                </h3>
                <p className="text-gray-300 mb-4">
                  Most workplace pensions use the{" "}
                  <strong>qualifying earnings method</strong>, which means
                  contributions are calculated on earnings between the Lower
                  Earnings Limit (£6,240) and Upper Earnings Limit (£50,270).
                  Some schemes use the <strong>full salary method</strong>,
                  calculating contributions on your entire salary.
                </p>

                <h3 className="text-xl font-semibold text-blue-400 mb-4 mt-6">
                  Minimum Contribution Rates 2025/26
                </h3>
                <p className="text-gray-300 mb-4">
                  The minimum contribution rates for auto-enrolment are:
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                  <li>
                    <strong>Employee:</strong> 5% of qualifying earnings
                    (including tax relief)
                  </li>
                  <li>
                    <strong>Employer:</strong> 3% of qualifying earnings
                  </li>
                  <li>
                    <strong>Total:</strong> 8% of qualifying earnings
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-blue-400 mb-4 mt-6">
                  Benefits of Workplace Pension Contributions
                </h3>
                <p className="text-gray-300 mb-4">
                  Contributing to a workplace pension offers several advantages:
                </p>
                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                  <li>
                    <strong>Employer contributions:</strong> Free money from
                    your employer
                  </li>
                  <li>
                    <strong>Tax relief:</strong> Government adds 20% tax relief
                    to your contributions
                  </li>
                  <li>
                    <strong>Compound growth:</strong> Your pension pot grows
                    over time
                  </li>
                  <li>
                    <strong>Retirement security:</strong> Additional income in
                    retirement
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12"
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    How do I calculate my pro rata pension contributions?
                  </h3>
                  <p className="text-gray-300">
                    Use our calculator above by entering your annual salary,
                    weekly hours, and pension rates. The calculator will show
                    you exactly how much you and your employer contribute based
                    on your actual earnings, not your full-time equivalent.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    What are qualifying earnings for pension contributions?
                  </h3>
                  <p className="text-gray-300">
                    Qualifying earnings are calculated as your salary minus the
                    lower earnings limit (£6,240 for 2025/26), up to the upper
                    earnings limit (£50,270). Only earnings between these
                    thresholds are used for pension contribution calculations
                    under the qualifying earnings method.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Am I eligible for auto-enrolment into a workplace pension?
                  </h3>
                  <p className="text-gray-300">
                    You&apos;re eligible for auto-enrolment if you&apos;re aged
                    22-66, earn at least £10,000 per year from one job, and work
                    in the UK. Part-time workers earning above this threshold
                    are automatically enrolled, regardless of their hours
                    worked.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    What are the minimum pension contribution rates?
                  </h3>
                  <p className="text-gray-300">
                    The minimum contribution rates for auto-enrolment are 3%
                    from the employer and 5% from the employee (including tax
                    relief), totaling 8% of qualifying earnings. These rates
                    apply to earnings between the lower and upper earnings
                    limits.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    How do pension contributions work for part-time workers?
                  </h3>
                  <p className="text-gray-300">
                    Part-time workers pay pension contributions based on their
                    actual earnings, not their full-time equivalent. If you earn
                    above the £10,000 threshold, you&apos;re eligible for
                    auto-enrolment and pay contributions on your pensionable
                    earnings, whether you work part-time or full-time.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    Can I opt out of workplace pension contributions?
                  </h3>
                  <p className="text-gray-300">
                    Yes, you can opt out of workplace pension contributions, but
                    you&apos;ll lose your employer&apos;s contributions and tax
                    relief. You can opt out within one month of being enrolled,
                    or opt out later and rejoin every 12 months.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    What happens if I have multiple jobs?
                  </h3>
                  <p className="text-gray-300">
                    Each job is assessed separately for auto-enrolment. If you
                    earn £10,000 or more from any single job, you&apos;ll be
                    enrolled into that employer&apos;s pension scheme. You can
                    be enrolled into multiple schemes if you have multiple
                    qualifying jobs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    How often are pension contributions deducted?
                  </h3>
                  <p className="text-gray-300">
                    Pension contributions are typically deducted from your
                    salary each pay period (weekly, monthly, etc.) along with
                    your other deductions. Your employer will also make their
                    contribution at the same time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Calculators Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Related Pro Rata Calculators
              </h2>
              <p className="text-gray-300 mb-6">
                Explore our comprehensive suite of pro rata calculators for all
                your employment calculations:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/pro-rata-salary-calculator"
                  className="group bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Calculator className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Pro Rata Salary Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Calculate your pro rata salary for part-time, reduced hours,
                    or temporary work with accurate UK tax calculations.
                  </p>
                </Link>

                <Link
                  href="/pro-rata-holiday-calculator"
                  className="group bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-white/10 hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                      Pro Rata Holiday Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Work out your holiday entitlement for part-time work,
                    including bank holidays and leave calculations.
                  </p>
                </Link>

                <Link
                  href="/pro-rata-sick-pay-calculator"
                  className="group bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6 rounded-lg border border-white/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-red-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                      Pro Rata Sick Pay Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Calculate your Statutory Sick Pay (SSP) entitlement for
                    part-time workers with 2025 rates.
                  </p>
                </Link>

                <Link
                  href="/term-time-only-salary-calculator"
                  className="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      Term-Time Only Salary Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Convert an FTE salary to a UK term-time only salary for
                    education workers.
                  </p>
                </Link>

                <Link
                  href="/pro-rata-maternity-pay-calculator"
                  className="group bg-gradient-to-r from-pink-500/10 to-red-500/10 p-6 rounded-lg border border-white/10 hover:border-pink-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="w-6 h-6 text-pink-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                      Pro Rata Maternity Pay Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Calculate your maternity pay entitlement including Statutory
                    Maternity Pay (SMP) for part-time workers.
                  </p>
                </Link>

                <Link
                  href="/pro-rata-bonus-calculator"
                  className="group bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      Pro Rata Bonus Calculator
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Work out your pro rata bonus entitlement for part-time or
                    partial-year UK jobs.
                  </p>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Official Government Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-blue-400 mb-4">
                    Official UK Government Resources
                  </h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      For authoritative information on UK workplace pensions and
                      auto-enrolment, refer to these official government
                      resources:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <a
                          href="https://www.gov.uk/workplace-pensions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          Workplace Pensions Overview
                        </a>{" "}
                        - Complete guide to workplace pension schemes
                      </li>
                      <li>
                        <a
                          href="https://www.gov.uk/automatic-enrolment"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          Automatic Enrolment Information
                        </a>{" "}
                        - Official auto-enrolment guidance for employees
                      </li>
                      <li>
                        <a
                          href="https://www.gov.uk/calculate-your-holiday-entitlement"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          Holiday Entitlement Calculator
                        </a>{" "}
                        - Official government tool for holiday calculations
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12"
          >
            <div className="glass-effect rounded-card p-6 card-shadow border border-orange-500/20">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">
                    Important Disclaimer
                  </h3>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>
                      This pension calculator is for informational purposes only
                      and should not be considered as financial advice. Pension
                      contribution calculations may vary depending on your
                      specific workplace pension scheme, employer policies, and
                      individual circumstances.
                    </p>
                    <p>
                      <strong>Key Points:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        Always check with your employer or pension provider for
                        accurate contribution rates
                      </li>
                      <li>
                        Some schemes may use different calculation methods or
                        thresholds
                      </li>
                      <li>
                        Tax relief and contribution limits may vary based on
                        your circumstances
                      </li>
                      <li>
                        This calculator uses 2025/26 tax year thresholds and
                        rates
                      </li>
                    </ul>
                    <p className="mt-3 text-xs text-gray-400">
                      Last updated: September 16, 2025
                    </p>
                  </div>
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
