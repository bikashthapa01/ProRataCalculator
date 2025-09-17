"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Copy,
  Calendar,
  Clock,
  PoundSterling,
  Info,
  CheckCircle,
  ChevronDown,
  AlertTriangle,
  Users,
  AlertCircle,
  FileText,
  Scale,
  ArrowRight,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NoticePeriodInputs {
  employmentStartDate: string;
  endDate: string;
  isResignation: boolean;
  hasContractualNotice: boolean;
  contractualNoticePeriod: number;
  contractualNoticeUnit: "weeks" | "days";
  weeklyHours: number;
  weeklyWage: number;
  hourlyRate: number;
  payFrequency: "weekly" | "monthly";
}

interface NoticePeriodResults {
  lengthOfService: {
    years: number;
    months: number;
    days: number;
    totalDays: number;
  };
  noticePeriod: {
    weeks: number;
    days: number;
    type: "statutory" | "contractual";
    description: string;
  };
  finalPay: {
    totalGrossPay: number;
    weeklyPay: number;
    dailyPay: number;
    hourlyPay: number;
  };
  statutoryText: string;
}

interface ValidationErrors {
  employmentStartDate?: string;
  endDate?: string;
  weeklyHours?: string;
  weeklyWage?: string;
  hourlyRate?: string;
  contractualNoticePeriod?: string;
}

// Calculate length of service
function calculateLengthOfService(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const remainingDays = diffDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;

  return {
    years,
    months,
    days,
    totalDays: diffDays,
  };
}

// Calculate statutory notice period based on UK law
function calculateStatutoryNotice(
  lengthOfService: number,
  isResignation: boolean
) {
  if (lengthOfService < 30) {
    return {
      weeks: 0,
      days: 0,
      type: "statutory" as const,
      description: "Less than 1 month - no statutory notice required",
    };
  }

  if (isResignation) {
    // Employee resigning - only 1 week notice required if employed for over 1 month
    return {
      weeks: 1,
      days: 7,
      type: "statutory" as const,
      description: "Employee resignation - 1 week notice required",
    };
  }

  // Employer dismissal - statutory notice periods
  if (lengthOfService < 730) {
    // Less than 2 years
    return {
      weeks: 1,
      days: 7,
      type: "statutory" as const,
      description: "Less than 2 years service - 1 week notice",
    };
  }

  const yearsOfService = Math.floor(lengthOfService / 365);
  const noticeWeeks = Math.min(yearsOfService, 12); // Capped at 12 weeks

  return {
    weeks: noticeWeeks,
    days: noticeWeeks * 7,
    type: "statutory" as const,
    description: `${yearsOfService} years service - ${noticeWeeks} weeks notice`,
  };
}

// Calculate final pay during notice period
function calculateFinalPay(
  noticeWeeks: number,
  weeklyHours: number,
  hourlyRate: number,
  weeklyWage: number,
  payFrequency: "weekly" | "monthly"
) {
  const totalGrossPay = noticeWeeks * weeklyWage;
  const weeklyPay = weeklyWage;
  const dailyPay = weeklyWage / 5; // Assuming 5 working days per week
  const hourlyPay = hourlyRate;

  return {
    totalGrossPay,
    weeklyPay,
    dailyPay,
    hourlyPay,
  };
}

export default function NoticePeriodCalculatorPage() {
  const [inputs, setInputs] = useState<NoticePeriodInputs>({
    employmentStartDate: "",
    endDate: "",
    isResignation: true,
    hasContractualNotice: false,
    contractualNoticePeriod: 0,
    contractualNoticeUnit: "weeks",
    weeklyHours: 0,
    weeklyWage: 0,
    hourlyRate: 0,
    payFrequency: "weekly",
  });

  const [results, setResults] = useState<NoticePeriodResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate employment start date
    if (!inputs.employmentStartDate) {
      newErrors.employmentStartDate = "Please enter your employment start date";
    }

    // Validate end date if provided
    if (inputs.endDate && inputs.employmentStartDate) {
      const start = new Date(inputs.employmentStartDate);
      const end = new Date(inputs.endDate);
      if (start >= end) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    // Validate weekly hours
    if (!inputs.weeklyHours || inputs.weeklyHours <= 0) {
      newErrors.weeklyHours = "Please enter your weekly hours";
    } else if (inputs.weeklyHours > 168) {
      newErrors.weeklyHours = "Weekly hours cannot exceed 168 hours";
    }

    // Validate weekly wage or hourly rate
    if (!inputs.weeklyWage && !inputs.hourlyRate) {
      newErrors.weeklyWage = "Please enter either weekly wage or hourly rate";
    } else if (inputs.weeklyWage && inputs.weeklyWage <= 0) {
      newErrors.weeklyWage = "Weekly wage must be greater than 0";
    } else if (inputs.hourlyRate && inputs.hourlyRate <= 0) {
      newErrors.hourlyRate = "Hourly rate must be greater than 0";
    }

    // Validate contractual notice if provided
    if (
      inputs.hasContractualNotice &&
      (!inputs.contractualNoticePeriod || inputs.contractualNoticePeriod <= 0)
    ) {
      newErrors.contractualNoticePeriod =
        "Please enter a valid contractual notice period";
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

    // Calculate length of service
    const lengthOfService = calculateLengthOfService(
      inputs.employmentStartDate,
      inputs.endDate
    );

    // Determine notice period
    let noticePeriod;
    if (inputs.hasContractualNotice) {
      const weeks =
        inputs.contractualNoticeUnit === "weeks"
          ? inputs.contractualNoticePeriod
          : inputs.contractualNoticePeriod / 7;
      noticePeriod = {
        weeks,
        days: weeks * 7,
        type: "contractual" as const,
        description: `Contractual notice - ${inputs.contractualNoticePeriod} ${inputs.contractualNoticeUnit}`,
      };
    } else {
      noticePeriod = calculateStatutoryNotice(
        lengthOfService.totalDays,
        inputs.isResignation
      );
    }

    // Calculate final pay
    const finalPay = calculateFinalPay(
      noticePeriod.weeks,
      inputs.weeklyHours,
      inputs.hourlyRate,
      inputs.weeklyWage,
      inputs.payFrequency
    );

    // Generate statutory text
    const statutoryText =
      noticePeriod.type === "statutory"
        ? `You are entitled to ${noticePeriod.weeks} week${
            noticePeriod.weeks !== 1 ? "s" : ""
          } statutory notice under UK law.`
        : `Your contractual notice period of ${inputs.contractualNoticePeriod} ${inputs.contractualNoticeUnit} applies.`;

    const calculatedResults: NoticePeriodResults = {
      lengthOfService,
      noticePeriod,
      finalPay,
      statutoryText,
    };

    setResults(calculatedResults);

    // Scroll to results
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

    const resultsText = `Notice Period Calculation Results:

Length of Service: ${results.lengthOfService.years} years, ${
      results.lengthOfService.months
    } months, ${results.lengthOfService.days} days
Notice Period: ${results.noticePeriod.weeks} weeks (${
      results.noticePeriod.days
    } days)
Notice Type: ${
      results.noticePeriod.type === "statutory" ? "Statutory" : "Contractual"
    }
Description: ${results.noticePeriod.description}

Final Pay During Notice Period:
Total Gross Pay: £${results.finalPay.totalGrossPay.toFixed(2)}
Weekly Pay: £${results.finalPay.weeklyPay.toFixed(2)}
Daily Pay: £${results.finalPay.dailyPay.toFixed(2)}
Hourly Pay: £${results.finalPay.hourlyPay.toFixed(2)}

${results.statutoryText}

Calculated using Notice Period Calculator UK - https://proratacalculator.co.uk/notice-period-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof NoticePeriodInputs,
    value: string | number | boolean
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setShowErrors(false);
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UK Notice Period Calculator 2025",
            description:
              "Free UK notice period calculator 2025. Calculate statutory notice periods, pro-rata pay for part-time employees, resignation vs dismissal notice. Instant results with UK employment law compliance.",
            url: "https://proratacalculator.co.uk/notice-period-calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            creator: {
              "@type": "Organization",
              name: "Pro Rata Calculator UK",
              url: "https://proratacalculator.co.uk",
            },
            featureList: [
              "Statutory notice period calculation",
              "Contractual notice period support",
              "Pro-rata pay calculations",
              "Part-time employee support",
              "UK employment law compliance",
              "Instant results",
            ],
            screenshot: "https://proratacalculator.co.uk/screenshot.png",
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I leave immediately without giving notice?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, if you've been employed for less than 1 month. Otherwise, you must give at least 1 week's notice unless your contract specifies otherwise. Leaving without proper notice may breach your contract and could affect future references.",
                },
              },
              {
                "@type": "Question",
                name: "Do I get paid for holidays during my notice period?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you're entitled to accrued holiday pay. Any untaken holiday during your notice period must be paid out. This is calculated pro-rata based on your working hours and the proportion of the holiday year you've worked.",
                },
              },
              {
                "@type": "Question",
                name: "How is notice calculated for part-time employees?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Notice periods are the same regardless of hours worked. A part-time employee gets the same notice as a full-time employee. However, final pay during notice is calculated pro-rata based on your actual working hours and weekly wage.",
                },
              },
            ],
          }),
        }}
      />

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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full mb-6">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">UK Employment Law</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Notice Period Calculator UK 2025
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto mb-6">
                <strong>Free UK notice period calculator 2025</strong> -
                Calculate statutory notice periods, pro-rata pay for part-time
                employees, resignation vs dismissal notice.
                <strong>
                  Instant results with UK employment law compliance.
                </strong>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-secondary">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Statutory & Contractual Notice</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Pro-Rata Pay Calculations</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>UK Employment Law 2025</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Results</span>
                </span>
              </div>
            </motion.div>

            {/* Results Section */}
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
                      Your Notice Period Results
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

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Length of Service */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Length of Service</span>
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">Years:</span>
                          <span className="font-semibold text-primary-text">
                            {results.lengthOfService.years}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Months:
                          </span>
                          <span className="font-semibold text-primary-text">
                            {results.lengthOfService.months}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">Days:</span>
                          <span className="font-semibold text-primary-text">
                            {results.lengthOfService.days}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2">
                          <span className="text-primary-secondary">
                            Total Days:
                          </span>
                          <span className="font-semibold text-primary-text">
                            {results.lengthOfService.totalDays}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notice Period */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>Notice Period</span>
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">Weeks:</span>
                          <span className="font-semibold text-primary-text">
                            {results.noticePeriod.weeks}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">Days:</span>
                          <span className="font-semibold text-primary-text">
                            {results.noticePeriod.days}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">Type:</span>
                          <span
                            className={`font-semibold ${
                              results.noticePeriod.type === "statutory"
                                ? "text-blue-500"
                                : "text-purple-500"
                            }`}
                          >
                            {results.noticePeriod.type === "statutory"
                              ? "Statutory"
                              : "Contractual"}
                          </span>
                        </div>
                        <div className="text-xs text-primary-secondary mt-2 p-2 bg-white/5 rounded">
                          {results.noticePeriod.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Pay */}
                  <div className="mt-4 bg-card-background rounded-lg p-4 border border-white/10">
                    <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-green-500" />
                      <span>Final Pay During Notice Period</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-primary-secondary">
                          Total Gross Pay
                        </p>
                        <p className="font-semibold text-primary-text">
                          £{results.finalPay.totalGrossPay.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">Weekly Pay</p>
                        <p className="font-semibold text-primary-text">
                          £{results.finalPay.weeklyPay.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">Daily Pay</p>
                        <p className="font-semibold text-primary-text">
                          £{results.finalPay.dailyPay.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">Hourly Pay</p>
                        <p className="font-semibold text-primary-text">
                          £{results.finalPay.hourlyPay.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Statutory Text */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Scale className="w-4 h-4 text-primary-highlight mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-primary-text">
                        {results.statutoryText}
                      </p>
                    </div>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Notice Period
                    </h2>
                    <p className="text-primary-secondary text-sm">
                      Enter your employment details below
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
                  {/* Employment Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      />
                      {showErrors && errors.employmentStartDate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.employmentStartDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        End Date (Optional)
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
                      />
                      {showErrors && errors.endDate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.endDate}</span>
                        </div>
                      )}
                      <p className="text-xs text-primary-secondary mt-1">
                        Leave blank to use today's date
                      </p>
                    </div>
                  </div>

                  {/* Resignation vs Dismissal */}
                  <div className="bg-card-background rounded-lg p-3 border border-white/10">
                    <label className="block text-primary-text font-medium mb-2 text-sm">
                      Is this a resignation or dismissal?
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleInputChange("isResignation", true)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                          inputs.isResignation
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "bg-card-background text-primary-secondary border border-primary-secondary"
                        }`}
                      >
                        Employee Resigning
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange("isResignation", false)
                        }
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                          !inputs.isResignation
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "bg-card-background text-primary-secondary border border-primary-secondary"
                        }`}
                      >
                        Employer Ending Contract
                      </button>
                    </div>
                  </div>

                  {/* Contractual Notice */}
                  <div className="bg-card-background rounded-lg p-3 border border-white/10">
                    <label className="block text-primary-text font-medium mb-2 text-sm">
                      Do you have a contractual notice period?
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange("hasContractualNotice", true)
                        }
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                          inputs.hasContractualNotice
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "bg-card-background text-primary-secondary border border-primary-secondary"
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange("hasContractualNotice", false)
                        }
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                          !inputs.hasContractualNotice
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "bg-card-background text-primary-secondary border border-primary-secondary"
                        }`}
                      >
                        No (Use Statutory)
                      </button>
                    </div>

                    {inputs.hasContractualNotice && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-primary-text font-medium mb-1 text-sm">
                            Notice Period
                          </label>
                          <input
                            type="number"
                            value={inputs.contractualNoticePeriod || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "contractualNoticePeriod",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className={`input-field w-full text-sm ${
                              showErrors && errors.contractualNoticePeriod
                                ? "border-red-500"
                                : ""
                            }`}
                            placeholder="2"
                            min="0"
                            step="0.5"
                          />
                          {showErrors && errors.contractualNoticePeriod && (
                            <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              <span>{errors.contractualNoticePeriod}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-primary-text font-medium mb-1 text-sm">
                            Unit
                          </label>
                          <select
                            value={inputs.contractualNoticeUnit}
                            onChange={(e) =>
                              handleInputChange(
                                "contractualNoticeUnit",
                                e.target.value as "weeks" | "days"
                              )
                            }
                            className="input-field w-full text-sm"
                          >
                            <option value="weeks">Weeks</option>
                            <option value="days">Days</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Working Hours and Pay */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Weekly Hours Worked *
                      </label>
                      <input
                        type="number"
                        value={inputs.weeklyHours || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "weeklyHours",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.weeklyHours
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="18"
                        min="0"
                        max="168"
                        step="0.5"
                      />
                      {showErrors && errors.weeklyHours && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.weeklyHours}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Pay Frequency
                      </label>
                      <select
                        value={inputs.payFrequency}
                        onChange={(e) =>
                          handleInputChange(
                            "payFrequency",
                            e.target.value as "weekly" | "monthly"
                          )
                        }
                        className="input-field w-full text-sm"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  {/* Pay Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Weekly Wage (£)
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.weeklyWage || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "weeklyWage",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.weeklyWage
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="216"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {showErrors && errors.weeklyWage && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.weeklyWage}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Hourly Rate (£)
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.hourlyRate || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "hourlyRate",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.hourlyRate
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="12"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {showErrors && errors.hourlyRate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.hourlyRate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Notice Period & Final Pay</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Comprehensive UK Notice Period Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="my-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  Complete Guide to UK Notice Periods 2025
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Everything you need to know about UK notice periods, statutory
                  requirements, and pro-rata pay calculations for part-time
                  employees.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Statutory Notice Periods */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-primary-highlight" />
                    <span>UK Statutory Notice Periods 2025</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Less than 1 month employment
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Notice required:</strong> None (can leave
                        immediately)
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Applies to both resignation and dismissal. No statutory
                        notice period applies.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        1 month to 2 years employment
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Dismissal:</strong> 1 week notice
                      </p>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Resignation:</strong> 1 week notice
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Minimum statutory notice period for both employer and
                        employee.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        2+ years employment
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Dismissal:</strong> 1 week per year of service
                        (max 12 weeks)
                      </p>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Resignation:</strong> 1 week notice (regardless
                        of length of service)
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Notice period capped at 12 weeks maximum for dismissals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pro-Rata Pay During Notice */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                    <PoundSterling className="w-5 h-5 text-primary-highlight" />
                    <span>Pro-Rata Pay During Notice Period</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Part-time employees
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        Notice periods are the same as full-time employees, but
                        pay is calculated pro-rata.
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Example: 20 hours/week employee gets same notice as 37.5
                        hours/week employee, but final pay reflects actual
                        working hours.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Calculation method
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Formula:</strong> Notice weeks × Weekly wage =
                        Total gross pay
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Based on your actual weekly hours and hourly rate or
                        weekly wage.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Additional entitlements
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        You're also entitled to accrued holiday pay during your
                        notice period.
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Holiday pay is calculated pro-rata based on your working
                        hours and proportion of holiday year worked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contractual vs Statutory Notice */}
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20 mb-12">
                <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary-highlight" />
                  <span>Contractual vs Statutory Notice Periods</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary-text mb-3">
                      Contractual Notice
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Specified in your employment contract</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Can be longer than statutory minimum</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cannot be less than statutory minimum</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Overrides statutory notice periods</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-text mb-3">
                      Statutory Notice
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Legal minimum under UK employment law</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Applies when no contractual notice specified
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Based on length of service</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Different for resignation vs dismissal</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How to Use Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  How to Use the UK Notice Period Calculator
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Follow these simple steps to calculate your notice period and
                  final pay using our comprehensive UK employment law
                  calculator.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Step-by-Step Guide */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Enter Employment Dates
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Input your employment start date (required) and end
                          date (optional). If you leave the end date blank,
                          we'll use today's date. This determines your length of
                          service for statutory notice calculations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Select Resignation or Dismissal
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Choose whether you're resigning (employee leaving) or
                          being dismissed (employer ending contract). This
                          affects the notice period calculation as UK law treats
                          these differently.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Contractual Notice (Optional)
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          If your employment contract specifies a notice period,
                          select "Yes" and enter the details. Contractual notice
                          overrides statutory minimums but cannot be less than
                          statutory requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Enter Pay Information
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Input your weekly hours worked and either your weekly
                          wage or hourly rate. This calculates your pro-rata
                          final pay during the notice period. Choose your pay
                          frequency (weekly/monthly) for additional context.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Calculate Results
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Click "Calculate Notice Period & Final Pay" to see
                          your results. The calculator will show your length of
                          service, notice period, final pay breakdown, and legal
                          entitlements under UK employment law.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features and Benefits */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-primary-highlight" />
                      <span>Key Features</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>UK Employment Law Compliant</strong> - Based
                          on current statutory requirements
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Pro-Rata Calculations</strong> - Perfect for
                          part-time and irregular workers
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Contractual Support</strong> - Handles both
                          statutory and contractual notice
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Instant Results</strong> - No waiting,
                          immediate calculations
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Comprehensive Breakdown</strong> - Length of
                          service, notice period, final pay
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Copy Results</strong> - Easy sharing and
                          record keeping
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Info className="w-5 h-5 text-primary-highlight" />
                      <span>Who Should Use This Calculator?</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Employees resigning</strong> - Check your
                          notice requirements
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Employers dismissing</strong> - Calculate
                          required notice periods
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Part-time workers</strong> - Understand
                          pro-rata entitlements
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>HR professionals</strong> - Verify notice
                          period calculations
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Employment advisors</strong> - Support client
                          calculations
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      <span>Important Notes</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          This calculator provides estimates based on UK
                          statutory minimums
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Individual circumstances may affect actual
                          entitlements
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Consult with HR or legal professionals for complex
                          situations
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Rates and calculations are current for 2025 UK
                          employment law
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comprehensive FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-primary-text text-center mb-8">
                Frequently Asked Questions About UK Notice Periods
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Can I leave immediately without giving notice?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Yes, if you've been employed for less than 1 month.
                    </strong>
                    Otherwise, you must give at least 1 week's notice unless
                    your contract specifies otherwise. Leaving without proper
                    notice may breach your contract and could affect future
                    references.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Do I get paid for holidays during my notice period?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Yes, you're entitled to accrued holiday pay.
                    </strong>
                    Any untaken holiday during your notice period must be paid
                    out. This is calculated pro-rata based on your working hours
                    and the proportion of the holiday year you've worked.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What if my contract requires longer notice than statutory?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Contractual notice overrides statutory minimums.
                    </strong>
                    If your contract requires 4 weeks notice but you've only
                    worked 6 months, you must give 4 weeks notice (contractual)
                    rather than 1 week (statutory). Contractual notice cannot be
                    less than statutory.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How is notice calculated for part-time employees?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Notice periods are the same regardless of hours worked.
                    </strong>
                    A part-time employee gets the same notice as a full-time
                    employee. However, final pay during notice is calculated
                    pro-rata based on your actual working hours and weekly wage.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What's the difference between resignation and dismissal
                    notice?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Resignation:</strong> Always 1 week notice (if
                    employed &gt; 1 month).
                    <strong>Dismissal:</strong> 1 week for 1-2 years service,
                    then 1 week per year (max 12 weeks). The employer must give
                    more notice for longer-serving employees, but employees only
                    need 1 week regardless of service length.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Can my employer pay me instead of working notice?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Yes, this is called "payment in lieu of notice" (PILON).
                    </strong>
                    Your employer can pay you your notice period wages and end
                    employment immediately. This must be specified in your
                    contract or agreed mutually. You'll receive your normal pay
                    for the notice period.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What if I'm on sick leave during my notice period?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>You're still entitled to notice pay.</strong>
                    If you're on sick leave during your notice period, you
                    should receive your normal notice pay. If you're dismissed
                    while on sick leave, normal notice periods still apply
                    unless it's gross misconduct.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How do I calculate my final pay during notice?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Formula:</strong> Notice weeks × Weekly wage = Total
                    gross pay. For part-time workers, use your actual weekly
                    wage based on hours worked. Include any overtime, bonuses,
                    or commission you normally receive. Holiday pay is
                    calculated separately and added to your final payment.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Legal Considerations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  Legal Considerations & Resources
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Important information about UK employment law and where to
                  find additional help.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-primary-highlight" />
                    <span>Legal Disclaimer</span>
                  </h3>
                  <ul className="space-y-3 text-sm text-primary-secondary">
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>
                        This calculator is based on UK statutory minimums
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Contractual terms override statutory requirements
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Individual circumstances may affect entitlements
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>
                        Seek professional advice for complex situations
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary-highlight" />
                    <span>Official Resources</span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <a
                      href="https://www.gov.uk/notice-periods"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>GOV.UK Notice Periods</span>
                    </a>
                    <a
                      href="https://www.gov.uk/employment-contracts-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>Employment Contracts</span>
                    </a>
                    <a
                      href="https://www.acas.org.uk/working-differently/notice-periods"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>ACAS Notice Periods</span>
                    </a>
                    <a
                      href="https://www.citizensadvice.org.uk/work/leaving-a-job/notice-periods/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>Citizens Advice</span>
                    </a>
                  </div>
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
