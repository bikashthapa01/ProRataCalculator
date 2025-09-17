"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Copy,
  Target,
  TrendingUp,
  PoundSterling,
  Info,
  CheckCircle,
  AlertCircle,
  FileText,
  Scale,
  ArrowRight,
  Zap,
  BarChart3,
  Percent,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CommissionInputs {
  fullTimeTarget: number;
  actualSales: number;
  fullTimeHours: number;
  partTimeHours: number;
  commissionRate: number;
  commissionPolicy: "strict" | "tiered";
  secondTierRate?: number;
  secondTierThreshold?: number;
  showTaxDeduction: boolean;
  taxRate: number;
}

interface CommissionResults {
  fteRatio: number;
  proRataTarget: number;
  targetAchievement: number;
  commissionEarned: number;
  commissionPolicy: "strict" | "tiered";
  secondTierCommission?: number;
  totalCommission: number;
  postTaxCommission?: number;
  performanceStatus: "exceeded" | "met" | "below";
  comparison: {
    fullTimeCommission: number;
    partTimeCommission: number;
    difference: number;
  };
}

interface ValidationErrors {
  fullTimeTarget?: string;
  actualSales?: string;
  fullTimeHours?: string;
  partTimeHours?: string;
  commissionRate?: string;
  secondTierRate?: string;
  secondTierThreshold?: string;
}

// Calculate FTE ratio
function calculateFTERatio(
  partTimeHours: number,
  fullTimeHours: number
): number {
  return partTimeHours / fullTimeHours;
}

// Calculate pro-rata target
function calculateProRataTarget(
  fullTimeTarget: number,
  fteRatio: number
): number {
  return fullTimeTarget * fteRatio;
}

// Calculate commission based on policy
function calculateCommission(
  actualSales: number,
  proRataTarget: number,
  commissionRate: number,
  policy: "strict" | "tiered",
  secondTierRate?: number,
  secondTierThreshold?: number
): CommissionResults {
  const fteRatio = 1; // Will be calculated separately
  const targetAchievement = (actualSales / proRataTarget) * 100;

  let commissionEarned = 0;
  let secondTierCommission = 0;
  let performanceStatus: "exceeded" | "met" | "below" = "below";

  if (policy === "strict") {
    // Strict policy: only pay commission if target is met
    if (actualSales >= proRataTarget) {
      commissionEarned = actualSales * (commissionRate / 100);
      performanceStatus = actualSales > proRataTarget ? "exceeded" : "met";
    }
  } else {
    // Tiered policy: pay commission on all sales
    commissionEarned = actualSales * (commissionRate / 100);
    performanceStatus = actualSales >= proRataTarget ? "met" : "below";

    // Second tier commission if applicable
    if (
      secondTierRate &&
      secondTierThreshold &&
      actualSales > secondTierThreshold
    ) {
      const excessSales = actualSales - secondTierThreshold;
      secondTierCommission = excessSales * (secondTierRate / 100);
    }
  }

  const totalCommission = commissionEarned + secondTierCommission;

  // Calculate comparison with full-time
  const fullTimeCommission = actualSales * (commissionRate / 100);
  const partTimeCommission = totalCommission;
  const difference = fullTimeCommission - partTimeCommission;

  return {
    fteRatio,
    proRataTarget,
    targetAchievement,
    commissionEarned,
    commissionPolicy: policy,
    secondTierCommission,
    totalCommission,
    performanceStatus,
    comparison: {
      fullTimeCommission,
      partTimeCommission,
      difference,
    },
  };
}

export default function CommissionCalculatorPage() {
  const [inputs, setInputs] = useState<CommissionInputs>({
    fullTimeTarget: 0,
    actualSales: 0,
    fullTimeHours: 40,
    partTimeHours: 0,
    commissionRate: 0,
    commissionPolicy: "strict",
    secondTierRate: 0,
    secondTierThreshold: 0,
    showTaxDeduction: false,
    taxRate: 20,
  });

  const [results, setResults] = useState<CommissionResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate full-time target
    if (!inputs.fullTimeTarget || inputs.fullTimeTarget <= 0) {
      newErrors.fullTimeTarget = "Please enter a valid full-time sales target";
    }

    // Validate actual sales
    if (!inputs.actualSales || inputs.actualSales < 0) {
      newErrors.actualSales = "Please enter actual sales made";
    }

    // Validate full-time hours
    if (!inputs.fullTimeHours || inputs.fullTimeHours <= 0) {
      newErrors.fullTimeHours = "Please enter valid full-time hours";
    } else if (inputs.fullTimeHours > 168) {
      newErrors.fullTimeHours =
        "Full-time hours cannot exceed 168 hours per week";
    }

    // Validate part-time hours
    if (!inputs.partTimeHours || inputs.partTimeHours <= 0) {
      newErrors.partTimeHours = "Please enter valid part-time hours";
    } else if (inputs.partTimeHours > inputs.fullTimeHours) {
      newErrors.partTimeHours = "Part-time hours cannot exceed full-time hours";
    }

    // Validate commission rate
    if (!inputs.commissionRate || inputs.commissionRate <= 0) {
      newErrors.commissionRate = "Please enter a valid commission rate";
    } else if (inputs.commissionRate > 100) {
      newErrors.commissionRate = "Commission rate cannot exceed 100%";
    }

    // Validate second tier if applicable
    if (inputs.commissionPolicy === "tiered" && inputs.secondTierRate) {
      if (inputs.secondTierRate <= 0 || inputs.secondTierRate > 100) {
        newErrors.secondTierRate =
          "Second tier rate must be between 0% and 100%";
      }
      if (inputs.secondTierThreshold && inputs.secondTierThreshold <= 0) {
        newErrors.secondTierThreshold =
          "Second tier threshold must be greater than 0";
      }
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

    // Calculate FTE ratio
    const fteRatio = calculateFTERatio(
      inputs.partTimeHours,
      inputs.fullTimeHours
    );

    // Calculate pro-rata target
    const proRataTarget = calculateProRataTarget(
      inputs.fullTimeTarget,
      fteRatio
    );

    // Calculate commission
    const commissionResults = calculateCommission(
      inputs.actualSales,
      proRataTarget,
      inputs.commissionRate,
      inputs.commissionPolicy,
      inputs.secondTierRate,
      inputs.secondTierThreshold
    );

    // Add FTE ratio and pro-rata target to results
    const finalResults: CommissionResults = {
      ...commissionResults,
      fteRatio,
      proRataTarget,
    };

    // Add post-tax calculation if enabled
    if (inputs.showTaxDeduction) {
      finalResults.postTaxCommission =
        finalResults.totalCommission * (1 - inputs.taxRate / 100);
    }

    setResults(finalResults);

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

    const resultsText = `Part-Time Commission Analysis Results:

PERFORMANCE OVERVIEW:
Target Achievement: ${results.targetAchievement.toFixed(1)}%
FTE Ratio: ${(results.fteRatio * 100).toFixed(1)}%
Commission Policy: ${results.commissionPolicy.toUpperCase()}
Performance Status: ${results.performanceStatus.toUpperCase()}

TARGET ANALYSIS:
Full-Time Target: £${inputs.fullTimeTarget.toFixed(2)}
Pro-Rata Target: £${results.proRataTarget.toFixed(2)}
Actual Sales: £${inputs.actualSales.toFixed(2)}
Hours Worked: ${inputs.partTimeHours}h / ${inputs.fullTimeHours}h

COMMISSION BREAKDOWN:
Commission Rate: ${inputs.commissionRate}%
Base Commission: £${results.commissionEarned.toFixed(2)}
${
  results.secondTierCommission
    ? `Second Tier Commission (${
        inputs.secondTierRate
      }%): £${results.secondTierCommission.toFixed(2)}`
    : ""
}
Total Commission: £${results.totalCommission.toFixed(2)}
${
  results.postTaxCommission
    ? `Post-Tax Commission (${
        inputs.taxRate
      }%): £${results.postTaxCommission.toFixed(2)}`
    : ""
}

KEY INSIGHTS:
- Hourly Commission Rate: £${(
      results.totalCommission / inputs.partTimeHours
    ).toFixed(2)}/hr
- Sales per Hour: £${(inputs.actualSales / inputs.partTimeHours).toFixed(2)}/hr
- Commission Efficiency: ${(
      (results.totalCommission / inputs.actualSales) *
      100
    ).toFixed(1)}%
${
  results.targetAchievement < 100
    ? `- To Reach Target: £${(
        results.proRataTarget - inputs.actualSales
      ).toFixed(2)} more needed`
    : ""
}

RECOMMENDATIONS:
${
  results.targetAchievement < 80
    ? "- Consider focusing on higher-value sales to improve target achievement"
    : ""
}
${
  results.targetAchievement >= 80 && results.targetAchievement < 100
    ? `- You're close to target! Just £${(
        results.proRataTarget - inputs.actualSales
      ).toFixed(2)} more needed`
    : ""
}
${
  results.targetAchievement >= 100
    ? "- Excellent performance! You've exceeded your pro-rata target"
    : ""
}
${
  inputs.commissionPolicy === "strict" && results.targetAchievement < 100
    ? "- Under strict policy, you need to reach target to earn commission"
    : ""
}
${
  inputs.commissionPolicy === "tiered"
    ? "- Tiered policy ensures you earn commission on all sales"
    : ""
}

Calculated using Part-Time Commission Calculator UK - https://proratacalculator.co.uk/commission-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof CommissionInputs,
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
            name: "UK Part-Time Commission Calculator 2025",
            description:
              "Free UK part-time commission calculator 2025. Calculate fair commission for sales workers, adjust targets based on hours worked, pro-rata commission calculations. Instant results for part-time sales staff.",
            url: "https://proratacalculator.co.uk/commission-calculator",
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
              "Pro-rata sales target calculation",
              "Commission policy options",
              "Part-time adjustments",
              "Tax deduction calculations",
              "Performance tracking",
              "Instant results",
            ],
            screenshot: "https://proratacalculator.co.uk/screenshot.png",
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full mb-6">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Sales Commission</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Part-Time Commission Calculator UK 2025
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto mb-6">
                <strong>Free UK part-time commission calculator 2025</strong> -
                Calculate fair commission for sales workers, adjust targets
                based on hours worked, pro-rata commission calculations.
                <strong>Instant results for part-time sales staff.</strong>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-secondary">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Pro-Rata Sales Targets</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Commission Calculations</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Part-Time Adjustments</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Results</span>
                </span>
              </div>
            </motion.div>

            {/* Enhanced Results Section */}
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary-text">
                      Your Commission Analysis
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
                      <span>{copied ? "Copied!" : "Copy Results"}</span>
                    </button>
                  </div>

                  {/* Performance Overview */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-primary-highlight" />
                        <h3 className="font-semibold text-primary-text">
                          Performance Overview
                        </h3>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          results.performanceStatus === "exceeded"
                            ? "bg-green-500/20 text-green-600"
                            : results.performanceStatus === "met"
                            ? "bg-blue-500/20 text-blue-600"
                            : "bg-red-500/20 text-red-600"
                        }`}
                      >
                        {results.performanceStatus.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-primary-secondary">
                          Target Achievement:
                        </span>
                        <div
                          className={`font-bold text-lg ${
                            results.targetAchievement >= 100
                              ? "text-green-500"
                              : results.targetAchievement >= 80
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {results.targetAchievement.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-primary-secondary">
                          FTE Ratio:
                        </span>
                        <div className="font-bold text-lg text-primary-text">
                          {(results.fteRatio * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-primary-secondary">
                          Commission Policy:
                        </span>
                        <div className="font-bold text-lg text-primary-text">
                          {results.commissionPolicy.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <span className="text-primary-secondary">
                          Total Commission:
                        </span>
                        <div className="font-bold text-lg text-green-500">
                          £{results.totalCommission.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    {/* FTE Ratio and Targets */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-blue-500" />
                        <span>Target Analysis</span>
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Full-Time Target:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £{inputs.fullTimeTarget.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Pro-Rata Target:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £{results.proRataTarget.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Actual Sales:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £{inputs.actualSales.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2">
                          <span className="text-primary-secondary">
                            Target Achievement:
                          </span>
                          <span
                            className={`font-semibold ${
                              results.targetAchievement >= 100
                                ? "text-green-500"
                                : results.targetAchievement >= 80
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {results.targetAchievement.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Hours Worked:
                          </span>
                          <span className="font-semibold text-primary-text">
                            {inputs.partTimeHours}h / {inputs.fullTimeHours}h
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Commission Breakdown */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-green-500" />
                        <span>Commission Breakdown</span>
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Commission Rate:
                          </span>
                          <span className="font-semibold text-primary-text">
                            {inputs.commissionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Base Commission:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £{results.commissionEarned.toFixed(2)}
                          </span>
                        </div>
                        {results.secondTierCommission && (
                          <div className="flex justify-between">
                            <span className="text-primary-secondary">
                              Second Tier ({inputs.secondTierRate}%):
                            </span>
                            <span className="font-semibold text-primary-text">
                              £{results.secondTierCommission.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-white/10 pt-2">
                          <span className="text-primary-secondary">
                            Total Commission:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £{results.totalCommission.toFixed(2)}
                          </span>
                        </div>
                        {results.postTaxCommission && (
                          <div className="flex justify-between">
                            <span className="text-primary-secondary">
                              Post-Tax ({inputs.taxRate}%):
                            </span>
                            <span className="font-semibold text-primary-text">
                              £{results.postTaxCommission.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comparison & Insights */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span>Comparison & Insights</span>
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Full-Time Equivalent:
                          </span>
                          <span className="font-semibold text-primary-text">
                            {(results.fteRatio * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Hourly Commission Rate:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £
                            {(
                              results.totalCommission / inputs.partTimeHours
                            ).toFixed(2)}
                            /hr
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-secondary">
                            Sales per Hour:
                          </span>
                          <span className="font-semibold text-primary-text">
                            £
                            {(
                              inputs.actualSales / inputs.partTimeHours
                            ).toFixed(2)}
                            /hr
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2">
                          <span className="text-primary-secondary">
                            Commission Efficiency:
                          </span>
                          <span
                            className={`font-semibold ${
                              (results.totalCommission / inputs.actualSales) *
                                100 >=
                              inputs.commissionRate
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {(
                              (results.totalCommission / inputs.actualSales) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        {results.targetAchievement < 100 && (
                          <div className="flex justify-between">
                            <span className="text-primary-secondary">
                              To Reach Target:
                            </span>
                            <span className="font-semibold text-primary-text">
                              £
                              {(
                                results.proRataTarget - inputs.actualSales
                              ).toFixed(2)}{" "}
                              more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actionable Insights */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-text mb-2 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span>Key Insights</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-primary-secondary">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>
                            You're working{" "}
                            <strong>
                              {(results.fteRatio * 100).toFixed(1)}%
                            </strong>{" "}
                            of full-time hours
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>
                            Your pro-rata target is{" "}
                            <strong>£{results.proRataTarget.toFixed(2)}</strong>{" "}
                            vs full-time target of{" "}
                            <strong>£{inputs.fullTimeTarget.toFixed(2)}</strong>
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>
                            You're earning{" "}
                            <strong>
                              £
                              {(
                                results.totalCommission / inputs.partTimeHours
                              ).toFixed(2)}{" "}
                              per hour
                            </strong>{" "}
                            in commission
                          </span>
                        </li>
                        {results.targetAchievement >= 100 && (
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            <span>
                              <strong>Excellent performance!</strong> You've
                              exceeded your pro-rata target by{" "}
                              <strong>
                                {(results.targetAchievement - 100).toFixed(1)}%
                              </strong>
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-text mb-2 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span>Recommendations</span>
                      </h4>
                      <ul className="space-y-2 text-sm text-primary-secondary">
                        {results.targetAchievement < 80 && (
                          <li className="flex items-start space-x-2">
                            <AlertCircle className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                            <span>
                              Consider focusing on higher-value sales to improve
                              target achievement
                            </span>
                          </li>
                        )}
                        {results.targetAchievement >= 80 &&
                          results.targetAchievement < 100 && (
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                              <span>
                                You're close to target! Just{" "}
                                <strong>
                                  £
                                  {(
                                    results.proRataTarget - inputs.actualSales
                                  ).toFixed(2)}
                                </strong>{" "}
                                more needed
                              </span>
                            </li>
                          )}
                        {inputs.commissionPolicy === "strict" &&
                          results.targetAchievement < 100 && (
                            <li className="flex items-start space-x-2">
                              <AlertCircle className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                              <span>
                                Under strict policy, you need to reach target to
                                earn commission
                              </span>
                            </li>
                          )}
                        {inputs.commissionPolicy === "tiered" && (
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            <span>
                              Tiered policy ensures you earn commission on all
                              sales
                            </span>
                          </li>
                        )}
                      </ul>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Commission
                    </h2>
                    <p className="text-primary-secondary text-sm">
                      Enter your sales details below
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
                  {/* Sales Targets and Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Full-Time Sales Target (£) *
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.fullTimeTarget || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "fullTimeTarget",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.fullTimeTarget
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="10000"
                          min="0"
                          step="100"
                        />
                      </div>
                      {showErrors && errors.fullTimeTarget && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullTimeTarget}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Actual Sales Made (£) *
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.actualSales || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "actualSales",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.actualSales
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="6000"
                          min="0"
                          step="100"
                        />
                      </div>
                      {showErrors && errors.actualSales && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.actualSales}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Full-Time Weekly Hours *
                      </label>
                      <input
                        type="number"
                        value={inputs.fullTimeHours}
                        onChange={(e) =>
                          handleInputChange(
                            "fullTimeHours",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.fullTimeHours
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="40"
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

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Part-Time Weekly Hours *
                      </label>
                      <input
                        type="number"
                        value={inputs.partTimeHours || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "partTimeHours",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={`input-field w-full text-sm ${
                          showErrors && errors.partTimeHours
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder="20"
                        min="1"
                        max={inputs.fullTimeHours}
                        step="0.5"
                      />
                      {showErrors && errors.partTimeHours && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.partTimeHours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Commission Rate and Policy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Commission Rate (%) *
                      </label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.commissionRate || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "commissionRate",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.commissionRate
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="10"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                      {showErrors && errors.commissionRate && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.commissionRate}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Commission Policy
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleInputChange("commissionPolicy", "strict")
                          }
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            inputs.commissionPolicy === "strict"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Strict
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleInputChange("commissionPolicy", "tiered")
                          }
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            inputs.commissionPolicy === "tiered"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Tiered
                        </button>
                      </div>
                      <p className="text-xs text-primary-secondary mt-1">
                        Strict: Commission only if target met. Tiered:
                        Commission on all sales.
                      </p>
                    </div>
                  </div>

                  {/* Second Tier Commission (if tiered) */}
                  {inputs.commissionPolicy === "tiered" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-card-background rounded-lg border border-white/10">
                      <div>
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Second Tier Rate (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                          <input
                            type="number"
                            value={inputs.secondTierRate || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "secondTierRate",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className={`input-field w-full pl-8 text-sm ${
                              showErrors && errors.secondTierRate
                                ? "border-red-500"
                                : ""
                            }`}
                            placeholder="15"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>
                        {showErrors && errors.secondTierRate && (
                          <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.secondTierRate}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Second Tier Threshold (£)
                        </label>
                        <div className="relative">
                          <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                          <input
                            type="number"
                            value={inputs.secondTierThreshold || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "secondTierThreshold",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className={`input-field w-full pl-8 text-sm ${
                              showErrors && errors.secondTierThreshold
                                ? "border-red-500"
                                : ""
                            }`}
                            placeholder="5000"
                            min="0"
                            step="100"
                          />
                        </div>
                        {showErrors && errors.secondTierThreshold && (
                          <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.secondTierThreshold}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tax Deduction Toggle */}
                  <div className="bg-card-background rounded-lg p-3 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="showTaxDeduction"
                        checked={inputs.showTaxDeduction}
                        onChange={(e) =>
                          handleInputChange(
                            "showTaxDeduction",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label
                        htmlFor="showTaxDeduction"
                        className="text-primary-text font-medium text-sm"
                      >
                        Show post-tax commission calculation
                      </label>
                    </div>
                    {inputs.showTaxDeduction && (
                      <div className="mt-3">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Tax Rate (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                          <input
                            type="number"
                            value={inputs.taxRate}
                            onChange={(e) =>
                              handleInputChange(
                                "taxRate",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="input-field w-full pl-8 text-sm"
                            placeholder="20"
                            min="0"
                            max="100"
                            step="0.1"
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
                      className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Commission & Pro-Rata Targets</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Comprehensive Commission Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="my-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  Complete Guide to Part-Time Commission Calculations 2025
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Everything you need to know about calculating fair commission
                  for part-time sales workers, pro-rata targets, and commission
                  policies in the UK.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* FTE Ratio and Pro-Rata Targets */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary-highlight" />
                    <span>FTE Ratio & Pro-Rata Targets</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        What is FTE Ratio?
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>FTE (Full-Time Equivalent) Ratio</strong>{" "}
                        determines what percentage of the full-time target a
                        part-time worker should be expected to meet.
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Formula: Part-Time Hours ÷ Full-Time Hours = FTE Ratio
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Pro-Rata Target Calculation
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>Pro-Rata Target</strong> = Full-Time Target ×
                        FTE Ratio
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Example: £10,000 × 0.5 (20 hours ÷ 40 hours) = £5,000
                        target
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Why Pro-Rata Targets Matter
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        Ensures fair expectations and commission opportunities
                        for part-time workers.
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Prevents discrimination and ensures equal earning
                        potential per hour worked.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Commission Policies */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary-highlight" />
                    <span>Commission Policies Explained</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Strict Policy
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>
                          Commission only paid if target is met or exceeded.
                        </strong>
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Example: 10% commission on £6,000 sales if target
                        (£5,000) is met. No commission if target not reached.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Tiered Policy
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>
                          Commission paid on all sales regardless of target
                          achievement.
                        </strong>
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Example: 10% on all £6,000 sales = £600 commission, even
                        if target not met.
                      </p>
                    </div>
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <h4 className="font-semibold text-primary-text mb-2">
                        Second Tier Commission
                      </h4>
                      <p className="text-primary-secondary text-sm mb-2">
                        <strong>
                          Higher commission rate for sales above a certain
                          threshold.
                        </strong>
                      </p>
                      <p className="text-xs text-primary-secondary">
                        Example: 10% up to £5,000, then 15% on sales above
                        £5,000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Considerations */}
              <div className="glass-effect rounded-card p-6 card-shadow border border-white/20 mb-12">
                <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-primary-highlight" />
                  <span>UK Legal Considerations for Commission</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary-text mb-3">
                      Employment Rights
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Commission must be clearly defined in employment
                          contract
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Part-time workers entitled to same commission rates as
                          full-time
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Commission counts towards National Minimum Wage
                          calculations
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Must receive commission within agreed timeframe
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-text mb-3">
                      Best Practices
                    </h4>
                    <ul className="space-y-2 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Set realistic pro-rata targets based on hours worked
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Provide regular performance reviews and feedback
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Document commission structure clearly</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Consider market rates when setting commission
                          percentages
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
                Frequently Asked Questions About Part-Time Commission
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How do I calculate pro-rata sales targets for part-time
                    workers?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Formula:</strong> Full-Time Target × (Part-Time
                    Hours ÷ Full-Time Hours) = Pro-Rata Target. For example,
                    £10,000 × (20 ÷ 40) = £5,000 target for a 20-hour worker.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What's the difference between strict and tiered commission
                    policies?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Strict:</strong> Commission only paid if target is
                    met.
                    <strong>Tiered:</strong> Commission paid on all sales
                    regardless of target achievement. Choose based on your
                    company's sales culture and employee motivation strategy.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Are part-time workers entitled to the same commission rates
                    as full-time?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Yes, under UK employment law.</strong> Part-time
                    workers must receive the same commission rates as full-time
                    workers. However, targets should be adjusted pro-rata based
                    on hours worked to ensure fairness.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How do I set up second-tier commission rates?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Second-tier commission</strong> offers higher rates
                    for sales above a threshold. For example, 10% up to £5,000,
                    then 15% on sales above £5,000. This incentivizes exceeding
                    targets and rewards high performers.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Should commission count towards National Minimum Wage?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Yes, commission counts towards NMW calculations.
                    </strong>{" "}
                    If base salary plus commission doesn't meet minimum wage
                    requirements, employers must top up pay. This ensures all
                    workers receive fair compensation.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How often should commission be paid to part-time workers?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>
                      Commission should be paid within agreed timeframes
                    </strong>{" "}
                    (usually monthly). Part-time workers have the same rights as
                    full-time workers regarding payment timing. Delays can
                    affect motivation and retention.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What if a part-time worker exceeds their pro-rata target?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Excellent performance should be rewarded!</strong>{" "}
                    Consider second-tier commission rates or bonus structures
                    for exceeding targets. This maintains motivation and
                    recognizes exceptional performance regardless of hours
                    worked.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    How do I ensure commission structures are legally compliant?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    <strong>Key requirements:</strong> Clear documentation in
                    employment contracts, equal treatment for part-time workers,
                    compliance with NMW, and regular reviews. Consult HR or
                    legal professionals for complex structures.
                  </p>
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
