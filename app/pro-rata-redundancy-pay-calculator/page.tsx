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
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface RedundancyInputs {
  weeklyWage: number;
  fullTimeHours: number;
  actualHours: number;
  age: number;
  yearsOfService: number;
}

interface RedundancyResults {
  totalRedundancyPay: number;
  breakdown: {
    year: number;
    age: number;
    rate: number;
    pay: number;
    capped: boolean;
  }[];
  explanation: string;
  stepByStepBreakdown: string;
  eligibility: string;
  weeklyWageCapped: number;
  proRataMultiplier: number;
  totalStatutoryWeeks: number;
}

interface ValidationErrors {
  weeklyWage?: string;
  fullTimeHours?: string;
  actualHours?: string;
  age?: string;
  yearsOfService?: string;
}

export default function ProRataRedundancyPayCalculatorPage() {
  const [inputs, setInputs] = useState<RedundancyInputs>({
    weeklyWage: 0,
    fullTimeHours: 37.5,
    actualHours: 0,
    age: 25,
    yearsOfService: 0,
  });

  const [results, setResults] = useState<RedundancyResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // UK Statutory Redundancy Pay Constants (2025/26)
  const WEEKLY_WAGE_CAP = 700; // £700 per week cap
  const MAX_YEARS_SERVICE = 20; // Maximum 20 years of service
  const MIN_AGE_ELIGIBLE = 18; // Minimum age for redundancy pay

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate weekly wage
    if (!inputs.weeklyWage || inputs.weeklyWage <= 0) {
      newErrors.weeklyWage = "Please enter your weekly wage";
    } else if (inputs.weeklyWage > 10000) {
      newErrors.weeklyWage = "Weekly wage cannot exceed £10,000";
    }

    // Validate full-time hours
    if (!inputs.fullTimeHours || inputs.fullTimeHours <= 0) {
      newErrors.fullTimeHours = "Please enter full-time weekly hours";
    } else if (inputs.fullTimeHours > 168) {
      newErrors.fullTimeHours = "Weekly hours cannot exceed 168";
    }

    // Validate actual hours
    if (!inputs.actualHours || inputs.actualHours <= 0) {
      newErrors.actualHours = "Please enter your actual weekly hours";
    } else if (inputs.actualHours > inputs.fullTimeHours) {
      newErrors.actualHours = `Actual hours cannot exceed full-time hours (${inputs.fullTimeHours})`;
    }

    // Validate age
    if (!inputs.age || inputs.age < 16) {
      newErrors.age = "Please enter a valid age (16 or over)";
    } else if (inputs.age > 100) {
      newErrors.age = "Please enter a valid age";
    }

    // Validate years of service
    if (!inputs.yearsOfService || inputs.yearsOfService < 0) {
      newErrors.yearsOfService = "Please enter years of service";
    } else if (inputs.yearsOfService > MAX_YEARS_SERVICE) {
      newErrors.yearsOfService = `Years of service cannot exceed ${MAX_YEARS_SERVICE}`;
    }

    return newErrors;
  };

  const calculateRedundancyPay = (): RedundancyResults => {
    // Apply weekly wage cap (2025/26: £700 per week)
    const cappedWeeklyWage = Math.min(inputs.weeklyWage, WEEKLY_WAGE_CAP);

    // Calculate pro rata multiplier (to be applied after total calculation)
    const proRataMultiplier = inputs.actualHours / inputs.fullTimeHours;

    // Calculate total statutory weeks entitlement by age band
    let totalStatutoryWeeks = 0;
    const breakdown = [];

    // Cap years of service at 20 years maximum
    const cappedYearsOfService = Math.min(
      inputs.yearsOfService,
      MAX_YEARS_SERVICE
    );

    // Calculate weeks entitlement for each year of service
    // Start from the most recent year (current age) and work backwards
    for (let year = 1; year <= cappedYearsOfService; year++) {
      // Calculate age for this specific year of service
      // For year 1: current age, for year 2: current age - 1, etc.
      const ageForYear = inputs.age - (year - 1);

      // Determine statutory rate based on age for this year
      let statutoryRate = 0;
      if (ageForYear >= 41) {
        statutoryRate = 1.5; // 1.5 weeks' pay for age 41+
      } else if (ageForYear >= 22) {
        statutoryRate = 1.0; // 1 week's pay for age 22-40
      } else if (ageForYear >= 18) {
        statutoryRate = 0.5; // 0.5 weeks' pay for age 18-21
      } else {
        statutoryRate = 0; // No redundancy pay under 18
      }

      // Add to total statutory weeks (don't round intermediate calculations)
      totalStatutoryWeeks += statutoryRate;

      breakdown.push({
        year,
        age: ageForYear,
        rate: statutoryRate,
        pay: 0, // Will be calculated after pro rata application
        capped: inputs.weeklyWage > WEEKLY_WAGE_CAP,
      });
    }

    // Calculate total redundancy pay: statutory weeks × capped weekly wage × pro rata multiplier
    const totalRedundancyPayBeforeRounding =
      totalStatutoryWeeks * cappedWeeklyWage * proRataMultiplier;

    // Round final result to nearest pound (UK standard)
    const totalRedundancyPay = Math.round(totalRedundancyPayBeforeRounding);

    // Update breakdown with actual pay amounts (for display purposes only)
    breakdown.forEach((item, index) => {
      const yearPayBeforeRounding =
        item.rate * cappedWeeklyWage * proRataMultiplier;
      item.pay = Math.round(yearPayBeforeRounding);
    });

    // Generate step-by-step explanation
    const statutoryWeeksText = totalStatutoryWeeks === 1 ? "week" : "weeks";
    const explanation = `Based on ${cappedYearsOfService} years of service, age ${
      inputs.age
    }, weekly wage of £${inputs.weeklyWage.toLocaleString()} (capped at £${WEEKLY_WAGE_CAP}), and working ${
      inputs.actualHours
    } hours out of ${inputs.fullTimeHours} full-time hours (${(
      proRataMultiplier * 100
    ).toFixed(
      1
    )}% of full-time), your statutory redundancy pay is £${totalRedundancyPay.toLocaleString()}.`;

    // Generate detailed step-by-step breakdown
    const stepByStepBreakdown = `${totalStatutoryWeeks.toFixed(
      1
    )} statutory ${statutoryWeeksText} × £${cappedWeeklyWage.toLocaleString()} × ${(
      proRataMultiplier * 100
    ).toFixed(1)}% = £${totalRedundancyPay.toLocaleString()}`;

    // Generate eligibility explanation
    let eligibility = "You are eligible for statutory redundancy pay.";
    if (inputs.age < 18) {
      eligibility =
        "You must be at least 18 years old to be eligible for statutory redundancy pay.";
    } else if (inputs.yearsOfService < 2) {
      eligibility =
        "You need at least 2 years of continuous service to be eligible for statutory redundancy pay.";
    }

    return {
      totalRedundancyPay,
      breakdown,
      explanation,
      stepByStepBreakdown,
      eligibility,
      weeklyWageCapped: cappedWeeklyWage,
      proRataMultiplier,
      totalStatutoryWeeks,
    };
  };

  const handleCalculate = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setShowErrors(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const calculatedResults = calculateRedundancyPay();
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

    const resultsText = `Pro Rata Redundancy Pay Calculation Results:

Total Redundancy Pay: £${results.totalRedundancyPay.toLocaleString()}
Weekly Wage (Capped): £${results.weeklyWageCapped.toLocaleString()}
Years of Service: ${inputs.yearsOfService}
Age: ${inputs.age}
Pro Rata Multiplier: ${(results.proRataMultiplier * 100).toFixed(1)}%

${results.explanation}

${results.eligibility}

Calculated using Pro Rata Redundancy Pay Calculator UK - https://proratacalculator.co.uk/pro-rata-redundancy-pay-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (field: keyof RedundancyInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false);
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  const getAgeBandRate = (age: number) => {
    if (age >= 41) return 1.5;
    if (age >= 22) return 1.0;
    if (age >= 18) return 0.5;
    return 0;
  };

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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">2025 Updated</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Pro Rata Redundancy Pay Calculator
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Find out your exact statutory redundancy pay entitlement for
                part-time, full-time, and partial-year workers in the UK. Fully
                up-to-date for 2025/26.
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
                <span className="text-sm font-medium">
                  UK Government Formula
                </span>
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
                      Your Redundancy Pay Entitlement
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

                  {/* Results Summary */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-primary-text">
                          Total Redundancy Pay
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-red-500">
                        £{results.totalRedundancyPay.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-primary-text">
                          Years of Service
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-500">
                        {inputs.yearsOfService}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Percent className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-primary-text">
                          Pro Rata Multiplier
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        {(results.proRataMultiplier * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-primary-secondary font-medium">
                            Year
                          </th>
                          <th className="text-left py-2 text-primary-secondary font-medium">
                            Age
                          </th>
                          <th className="text-center py-2 text-primary-secondary font-medium">
                            Rate (Weeks)
                          </th>
                          <th className="text-right py-2 text-primary-secondary font-medium">
                            Pay (£)
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
                                  Year {item.year}
                                </span>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="font-medium">{item.age}</span>
                            </td>
                            <td className="py-3 text-center">
                              <span
                                className={`font-semibold ${
                                  item.rate === 1.5
                                    ? "text-red-500"
                                    : item.rate === 1.0
                                    ? "text-blue-500"
                                    : item.rate === 0.5
                                    ? "text-green-500"
                                    : "text-gray-500"
                                }`}
                              >
                                {item.rate}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <span className="font-semibold text-primary-text">
                                £{item.pay.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Explanation */}
                  <div className="mt-4 p-4 bg-card-background rounded-lg border border-white/10">
                    <p className="text-sm text-primary-secondary mb-3">
                      {results.explanation}
                    </p>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-lg border border-blue-500/20">
                      <p className="text-sm font-medium text-primary-text mb-1">
                        Step-by-step calculation:
                      </p>
                      <p className="text-sm text-primary-secondary">
                        {results.stepByStepBreakdown}
                      </p>
                    </div>
                    <p className="text-sm text-primary-secondary mt-3">
                      <strong>Eligibility:</strong> {results.eligibility}
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
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Redundancy Pay
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
                  {/* First Row - Weekly Wage and Full-Time Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Weekly Wage */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Weekly Wage Before Tax (£) *
                      </label>
                      <input
                        type="number"
                        value={inputs.weeklyWage || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "weeklyWage",
                            parseFloat(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.weeklyWage
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="500"
                        min="0"
                        max="10000"
                        step="0.01"
                      />
                      {showErrors && errors.weeklyWage && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.weeklyWage}</span>
                        </div>
                      )}
                      <p className="text-xs text-primary-secondary mt-1">
                        Capped at £700 per week for 2025/26
                      </p>
                    </div>

                    {/* Full-Time Hours */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Full-Time Weekly Hours
                      </label>
                      <input
                        type="number"
                        value={inputs.fullTimeHours}
                        onChange={(e) =>
                          handleInputChange(
                            "fullTimeHours",
                            parseFloat(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.fullTimeHours
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="37.5"
                        min="1"
                        max="168"
                        step="0.5"
                      />
                      {showErrors && errors.fullTimeHours && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullTimeHours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second Row - Actual Hours and Age */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Actual Hours */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Your Actual Weekly Hours *
                      </label>
                      <input
                        type="number"
                        value={inputs.actualHours || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "actualHours",
                            parseFloat(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.actualHours
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="20"
                        min="1"
                        max={inputs.fullTimeHours}
                        step="0.5"
                      />
                      {showErrors && errors.actualHours && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.actualHours}</span>
                        </div>
                      )}
                    </div>

                    {/* Age */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Age at Redundancy *
                      </label>
                      <input
                        type="number"
                        value={inputs.age}
                        onChange={(e) =>
                          handleInputChange("age", parseInt(e.target.value))
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.age ? "border-red-500" : ""
                        }`}
                        placeholder="30"
                        min="16"
                        max="100"
                      />
                      {showErrors && errors.age && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.age}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Third Row - Years of Service */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Years of Service */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Years of Continuous Service *
                      </label>
                      <input
                        type="number"
                        value={inputs.yearsOfService || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "yearsOfService",
                            parseFloat(e.target.value)
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.yearsOfService
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="5"
                        min="0"
                        max={MAX_YEARS_SERVICE}
                        step="0.1"
                      />
                      {showErrors && errors.yearsOfService && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.yearsOfService}</span>
                        </div>
                      )}
                      <p className="text-xs text-primary-secondary mt-1">
                        Maximum 20 years of service
                      </p>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Redundancy Pay</span>
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
                  How UK Statutory Redundancy Pay Works
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Understanding your legal redundancy pay rights and how pro
                  rata calculations work in the UK.
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
                        <strong>Eligibility:</strong> You must be at least 18
                        years old and have at least 2 years of continuous
                        service.
                      </p>
                      <p>
                        <strong>Weekly Wage Cap:</strong> £700 per week for
                        2025/26 (your actual wage is capped at this amount).
                      </p>
                      <p>
                        <strong>Maximum Service:</strong> 20 years of continuous
                        service.
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
                          <strong>Age 41+:</strong> 1.5 weeks' pay per year
                        </span>
                        <span className="text-red-500 font-semibold">1.5x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>Age 22-40:</strong> 1 week's pay per year
                        </span>
                        <span className="text-blue-500 font-semibold">
                          1.0x
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>Age 18-21:</strong> 0.5 weeks' pay per year
                        </span>
                        <span className="text-green-500 font-semibold">
                          0.5x
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>
                          <strong>Under 18:</strong> No redundancy pay
                        </span>
                        <span className="text-gray-500 font-semibold">0x</span>
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
                          Example 1: Full-Time Worker
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Age 35, 5 years service, £600/week, 37.5 hours
                        </p>
                        <p className="text-primary-text">
                          <strong>Calculation:</strong> 5 years × 1.0 × £600 =
                          £3,000
                        </p>
                      </div>
                      <div className="p-3 bg-card-background rounded-lg border border-white/10">
                        <h4 className="font-medium text-primary-text mb-2">
                          Example 2: Part-Time Worker
                        </h4>
                        <p className="text-primary-secondary mb-2">
                          Age 45, 3 years service, £500/week, 20 hours (vs 37.5
                          full-time)
                        </p>
                        <p className="text-primary-text">
                          <strong>Calculation:</strong> 3 years × 1.5 × £500 ×
                          (20/37.5) = £1,200
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
                          Your employer may offer more generous redundancy terms
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Continuous service includes all employment with the
                          same employer
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
                    Who is eligible for redundancy pay?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    You must be at least 18 years old and have at least 2 years
                    of continuous service with your employer to be eligible for
                    statutory redundancy pay.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How is redundancy pay calculated in the UK?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Redundancy pay is calculated based on your age, years of
                    service, and weekly wage (capped at £700). Rates are: 1.5
                    weeks' pay for age 41+, 1 week for age 22-40, and 0.5 weeks
                    for age 18-21.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What's the cap on weekly wage?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    For 2025/26, the weekly wage cap is £700. Even if you earn
                    more, your redundancy pay calculation will be based on £700
                    per week.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How does pro rata redundancy work?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    For part-time workers, redundancy pay is calculated
                    proportionally based on your actual working hours compared
                    to full-time hours. For example, if you work 20 hours out of
                    37.5 full-time hours, your redundancy pay is multiplied by
                    0.53.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What counts as continuous service?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Continuous service includes all employment with the same
                    employer, including any breaks of less than one week. It
                    starts from your first day of employment.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Can I get redundancy pay if I'm under 18?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    No, you must be at least 18 years old to be eligible for
                    statutory redundancy pay. However, your employer may offer
                    discretionary redundancy pay.
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
