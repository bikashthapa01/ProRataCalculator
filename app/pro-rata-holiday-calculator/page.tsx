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
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface HolidayInputs {
  startDate: string;
  endDate: string;
  fullTimeDays: number;
  actualDays: number;
  calculationType: "days" | "hours";
  isLeaver: boolean;
  isTermTime: boolean;
}

interface HolidayResults {
  statutoryDays: number;
  statutoryHours: number;
  proRataDays: number;
  proRataHours: number;
  percentage: number;
  explanation: string;
}

interface ValidationErrors {
  startDate?: string;
  endDate?: string;
  fullTimeDays?: string;
  actualDays?: string;
}

export default function ProRataHolidayCalculatorPage() {
  const [inputs, setInputs] = useState<HolidayInputs>({
    startDate: "",
    endDate: "",
    fullTimeDays: 260, // Standard UK working days
    actualDays: 0,
    calculationType: "days",
    isLeaver: false,
    isTermTime: false,
  });

  const [results, setResults] = useState<HolidayResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // UK Statutory Holiday Entitlement (2025)
  const STATUTORY_HOLIDAY_DAYS = 28; // 5.6 weeks × 5 days
  const STATUTORY_HOLIDAY_HOURS = 224; // 5.6 weeks × 40 hours

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate start date
    if (!inputs.startDate) {
      newErrors.startDate = "Please enter your start date";
    }

    // Validate end date if leaver
    if (inputs.isLeaver && !inputs.endDate) {
      newErrors.endDate = "Please enter your end date";
    } else if (inputs.isLeaver && inputs.startDate && inputs.endDate) {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      if (start >= end) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Validate full-time days
    if (!inputs.fullTimeDays || inputs.fullTimeDays <= 0) {
      newErrors.fullTimeDays = "Please enter valid full-time working days";
    } else if (inputs.fullTimeDays > 365) {
      newErrors.fullTimeDays = "Working days cannot exceed 365";
    }

    // Validate actual days
    if (!inputs.actualDays || inputs.actualDays <= 0) {
      newErrors.actualDays = "Please enter your working days";
    } else if (inputs.actualDays > inputs.fullTimeDays) {
      newErrors.actualDays = `Working days cannot exceed full-time days (${inputs.fullTimeDays})`;
    }

    return newErrors;
  };

  const calculateHoliday = (): HolidayResults => {
    const startDate = new Date(inputs.startDate);
    const endDate = inputs.isLeaver ? new Date(inputs.endDate) : new Date();

    // Calculate working period
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const workingDays = inputs.actualDays;
    const fullTimeDays = inputs.fullTimeDays;

    // Calculate pro rata percentage
    const percentage = (workingDays / fullTimeDays) * 100;

    // Calculate pro rata holiday
    const proRataDays = Math.round(
      (STATUTORY_HOLIDAY_DAYS * workingDays) / fullTimeDays
    );
    const proRataHours = Math.round(
      (STATUTORY_HOLIDAY_HOURS * workingDays) / fullTimeDays
    );

    // Generate explanation
    const explanation = `Based on ${workingDays} working days out of ${fullTimeDays} full-time days (${percentage.toFixed(
      1
    )}% of full-time), you are entitled to ${proRataDays} days (${proRataHours} hours) of statutory holiday.`;

    return {
      statutoryDays: STATUTORY_HOLIDAY_DAYS,
      statutoryHours: STATUTORY_HOLIDAY_HOURS,
      proRataDays,
      proRataHours,
      percentage,
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

    const calculatedResults = calculateHoliday();
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

    const resultsText = `Pro Rata Holiday Calculation Results:

Statutory Holiday Entitlement: ${results.statutoryDays} days (${
      results.statutoryHours
    } hours)
Your Pro Rata Entitlement: ${results.proRataDays} days (${
      results.proRataHours
    } hours)
Percentage of Full-Time: ${results.percentage.toFixed(1)}%

${results.explanation}

Calculated using Pro Rata Holiday Calculator UK - https://proratacalculator.co.uk/pro-rata-holiday-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (field: keyof HolidayInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">2025 Updated</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Pro Rata Holiday Calculator
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Calculate your statutory pro rata holiday entitlement for
                part-time, fixed-term, or leaving jobs in the UK. The most
                accurate 2025 pro rata holiday calculator with HMRC-compliant
                calculations.
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
                <span className="text-sm font-medium">HMRC-Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Free & Private</span>
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
                      Your Holiday Entitlement
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

                  {/* Results Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-primary-secondary font-medium">
                            Entitlement Type
                          </th>
                          <th className="text-right py-2 text-primary-secondary font-medium">
                            Days
                          </th>
                          <th className="text-right py-2 text-primary-secondary font-medium">
                            Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-primary-text">
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">
                                Statutory Full-Time
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-blue-500">
                            {results.statutoryDays}
                          </td>
                          <td className="text-right py-3 font-semibold text-blue-500">
                            {results.statutoryHours}
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 bg-gradient-to-r from-green-500/10 to-blue-500/10">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="font-medium">
                                Your Pro Rata Entitlement
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-green-500">
                            {results.proRataDays}
                          </td>
                          <td className="text-right py-3 font-semibold text-green-500">
                            {results.proRataHours}
                          </td>
                        </tr>
                        <tr className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Percent className="w-4 h-4 text-purple-500" />
                              <span className="font-medium">
                                Percentage of Full-Time
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-purple-500">
                            {results.percentage.toFixed(1)}%
                          </td>
                          <td className="text-right py-3 font-semibold text-purple-500">
                            -
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Explanation */}
                  <div className="mt-4 p-4 bg-card-background rounded-lg border border-white/10">
                    <p className="text-sm text-primary-secondary">
                      {results.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculator Form - Full Screen and Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Holiday Entitlement
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
                  {/* First Row - Start Date and Employment Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={inputs.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.startDate ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {showErrors && errors.startDate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.startDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Employment Type */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Employment Type
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange("isLeaver", false)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            !inputs.isLeaver
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Current Employee
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange("isLeaver", true)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            inputs.isLeaver
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Leaving Employee
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Second Row - End Date (if leaver) and Full-Time Days */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* End Date - Only show if leaver */}
                    {inputs.isLeaver && (
                      <div className="bg-card-background rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          End Date *
                        </label>
                        <input
                          type="date"
                          value={inputs.endDate}
                          onChange={(e) =>
                            handleInputChange("endDate", e.target.value)
                          }
                          className={`input-field w-full text-sm ${
                            showErrors && errors.endDate ? "border-red-500" : ""
                          }`}
                          required
                        />
                        {showErrors && errors.endDate && (
                          <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.endDate}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Full-Time Working Days */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Full-Time Working Days per Year
                      </label>
                      <input
                        type="number"
                        value={inputs.fullTimeDays}
                        onChange={(e) =>
                          handleInputChange(
                            "fullTimeDays",
                            parseInt(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.fullTimeDays
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="260"
                        min="1"
                        max="365"
                      />
                      {showErrors && errors.fullTimeDays && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullTimeDays}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Third Row - Your Working Days and Term Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Your Working Days */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Your Working Days per Year *
                      </label>
                      <input
                        type="number"
                        value={inputs.actualDays || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "actualDays",
                            parseInt(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.actualDays
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="130"
                        min="1"
                        max={inputs.fullTimeDays}
                      />
                      {showErrors && errors.actualDays && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.actualDays}</span>
                        </div>
                      )}
                    </div>

                    {/* Term Time Option */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Term-Time Only
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleInputChange("isTermTime", false)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            !inputs.isTermTime
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange("isTermTime", true)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            inputs.isTermTime
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Holiday Entitlement</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  How UK Statutory Holiday Entitlement Works
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Understanding your legal holiday rights and how pro rata
                  calculations work in the UK.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Legal Framework */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary-highlight" />
                      <span>Legal Framework</span>
                    </h3>
                    <div className="space-y-3 text-sm text-primary-secondary">
                      <p>
                        <strong>Statutory Minimum:</strong> All UK workers are
                        entitled to at least 5.6 weeks (28 days) of paid holiday
                        per year.
                      </p>
                      <p>
                        <strong>Pro Rata Calculation:</strong> Part-time workers
                        receive holiday entitlement proportional to their
                        working time.
                      </p>
                      <p>
                        <strong>Formula:</strong> (Your working days ÷ Full-time
                        working days) × 28 days
                      </p>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary-highlight" />
                      <span>Key Scenarios</span>
                    </h3>
                    <div className="space-y-3 text-sm text-primary-secondary">
                      <div>
                        <strong>Part-Time Workers:</strong> Calculate based on
                        your actual working days vs full-time equivalent.
                      </div>
                      <div>
                        <strong>Mid-Year Starters:</strong> Holiday entitlement
                        is calculated from your start date to the end of the
                        holiday year.
                      </div>
                      <div>
                        <strong>Leaving Employees:</strong> You're entitled to
                        holiday pay for any unused holiday when you leave.
                      </div>
                      <div>
                        <strong>Term-Time Workers:</strong> Special calculations
                        apply for those working only during school terms.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Worked Examples */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-primary-highlight" />
                      <span>Worked Examples</span>
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="p-3 bg-card-background rounded-lg border border-white/10">
                        <h4 className="font-medium text-primary-text mb-2">
                          Example 1: Part-Time Worker
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Working 3 days per week (156 days/year) vs full-time 5
                          days (260 days/year)
                        </p>
                        <p className="text-primary-text">
                          <strong>Calculation:</strong> (156 ÷ 260) × 28 = 16.8
                          days
                        </p>
                      </div>
                      <div className="p-3 bg-card-background rounded-lg border border-white/10">
                        <h4 className="font-medium text-primary-text mb-2">
                          Example 2: Mid-Year Starter
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Starting in July (6 months remaining in holiday year)
                        </p>
                        <p className="text-primary-text">
                          <strong>Calculation:</strong> (6 ÷ 12) × 28 = 14 days
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
                        <span>
                          This calculator provides statutory minimum
                          entitlements
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Your employer may offer more generous holiday terms
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Bank holidays can be included in your 28-day
                          entitlement
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Always check your employment contract for specific
                          terms
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
                    What is the minimum holiday entitlement in the UK?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    All UK workers are legally entitled to at least 5.6 weeks
                    (28 days) of paid holiday per year. This includes bank
                    holidays unless your contract states otherwise.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How is pro rata holiday calculated?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Pro rata holiday is calculated by dividing your working days
                    by full-time working days, then multiplying by 28 days. For
                    example: (156 days ÷ 260 days) × 28 = 16.8 days.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What if I start work mid-year?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Your holiday entitlement is calculated from your start date
                    to the end of the holiday year. Use our calculator with your
                    start date to get your pro rata entitlement.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Can I carry over unused holiday?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Generally, you cannot carry over statutory holiday to the
                    next year. However, some employers allow this, and there are
                    exceptions for certain circumstances.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What happens to my holiday when I leave?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    You're entitled to holiday pay for any unused holiday when
                    you leave. Your employer should pay you for this in your
                    final salary payment.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Do bank holidays count towards my entitlement?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Bank holidays can be included in your 28-day statutory
                    entitlement. Check your employment contract to see how your
                    employer handles bank holidays.
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
                <div className="grid md:grid-cols-2 gap-4">
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
                    href="/"
                    className="flex items-center space-x-3 p-4 bg-card-background rounded-lg border border-white/10 hover:border-primary-highlight transition-colors"
                  >
                    <Calculator className="w-5 h-5 text-primary-highlight" />
                    <div>
                      <h4 className="font-medium text-primary-text">
                        Main Calculator
                      </h4>
                      <p className="text-sm text-primary-secondary">
                        General pro rata calculations
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
