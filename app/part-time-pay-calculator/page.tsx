"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Clock,
  Calendar,
  PoundSterling,
  Info,
  AlertCircle,
  CheckCircle,
  Copy,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PartTimePayInputs {
  hourlyRate: number;
  weeklyHours: number;
  workWeeksPerYear: number;
}

interface PartTimePayResults {
  weeklyPay: number;
  monthlyPay: number;
  annualPay: number;
}

interface ValidationErrors {
  hourlyRate?: string;
  weeklyHours?: string;
  workWeeksPerYear?: string;
}

export default function PartTimePayCalculatorPage() {
  const [inputs, setInputs] = useState<PartTimePayInputs>({
    hourlyRate: 0,
    weeklyHours: 0,
    workWeeksPerYear: 52,
  });

  const [results, setResults] = useState<PartTimePayResults | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!inputs.hourlyRate || inputs.hourlyRate <= 0) {
      newErrors.hourlyRate = "Please enter a valid hourly rate";
    } else if (inputs.hourlyRate > 1000) {
      newErrors.hourlyRate =
        "Hourly rate seems too high. Please check and try again.";
    }

    if (!inputs.weeklyHours || inputs.weeklyHours <= 0) {
      newErrors.weeklyHours = "Please enter your weekly hours";
    } else if (inputs.weeklyHours > 168) {
      newErrors.weeklyHours = "Weekly hours cannot exceed 168 hours";
    }

    if (!inputs.workWeeksPerYear || inputs.workWeeksPerYear <= 0) {
      newErrors.workWeeksPerYear = "Please enter valid work weeks per year";
    } else if (inputs.workWeeksPerYear > 52) {
      newErrors.workWeeksPerYear = "Work weeks cannot exceed 52 weeks";
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

    // Calculate results
    const weeklyPay = inputs.hourlyRate * inputs.weeklyHours;
    const annualPay = weeklyPay * inputs.workWeeksPerYear;
    const monthlyPay = annualPay / 12;

    setResults({
      weeklyPay,
      monthlyPay,
      annualPay,
    });
  };

  const handleInputChange = (
    field: keyof PartTimePayInputs,
    value: string | number
  ) => {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
    setShowErrors(false);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultsText = `Part-Time Pay Calculator Results:

Hourly Rate: ${formatCurrency(inputs.hourlyRate)}
Weekly Hours: ${inputs.weeklyHours}
Work Weeks per Year: ${inputs.workWeeksPerYear}

Weekly Pay: ${formatCurrency(results.weeklyPay)}
Monthly Pay: ${formatCurrency(results.monthlyPay)}
Annual Pay: ${formatCurrency(results.annualPay)}

Calculated using Pro Rata Calculator UK - https://proratacalculator.co.uk/part-time-pay-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const isFormValid = useMemo(() => {
    if (!inputs.hourlyRate || inputs.hourlyRate <= 0 || inputs.hourlyRate > 1000) return false;
    if (!inputs.weeklyHours || inputs.weeklyHours <= 0 || inputs.weeklyHours > 168) return false;
    if (!inputs.workWeeksPerYear || inputs.workWeeksPerYear <= 0 || inputs.workWeeksPerYear > 52) return false;
    return true;
  }, [inputs]);

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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6">
                <Calculator className="w-5 h-5" />
                <span className="font-semibold">Part-Time Pay Calculator</span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Part-Time Pay Calculator UK
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Calculate your part-time earnings with our simple and accurate
                calculator. Enter your hourly rate and weekly hours to get
                instant estimates of your weekly, monthly, and annual gross pay.
              </p>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect rounded-card p-6 card-shadow border border-white/20 mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-primary-text">
                      Your Part-Time Pay Results
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

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Weekly Pay */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-text">
                            Weekly Pay
                          </h3>
                          <p className="text-primary-secondary text-sm">
                            Per week
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-blue-500">
                        {formatCurrency(results.weeklyPay)}
                      </p>
                    </div>

                    {/* Monthly Pay */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-text">
                            Monthly Pay
                          </h3>
                          <p className="text-primary-secondary text-sm">
                            Per month
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-500">
                        {formatCurrency(results.monthlyPay)}
                      </p>
                    </div>

                    {/* Annual Pay */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-text">
                            Annual Pay
                          </h3>
                          <p className="text-primary-secondary text-sm">
                            Per year
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-purple-500">
                        {formatCurrency(results.annualPay)}
                      </p>
                    </div>
                  </div>

                  {/* Calculation Summary */}
                  <div className="mt-6 p-4 bg-card-background rounded-lg border border-white/10">
                    <h4 className="font-semibold text-primary-text mb-3">
                      Calculation Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-primary-secondary">Hourly Rate</p>
                        <p className="font-semibold text-primary-text">
                          {formatCurrency(inputs.hourlyRate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">Weekly Hours</p>
                        <p className="font-semibold text-primary-text">
                          {inputs.weeklyHours} hours
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">
                          Work Weeks per Year
                        </p>
                        <p className="font-semibold text-primary-text">
                          {inputs.workWeeksPerYear} weeks
                        </p>
                      </div>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Part-Time Pay
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
                  className="space-y-6"
                >
                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Hourly Rate */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2">
                        Hourly Rate (£)
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.hourlyRate || ""}
                          onChange={(e) =>
                            handleInputChange("hourlyRate", e.target.value)
                          }
                          className={`input-field w-full pl-8 ${
                            showErrors && errors.hourlyRate
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="12.50"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {showErrors && errors.hourlyRate && (
                        <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.hourlyRate}</span>
                        </div>
                      )}
                    </div>

                    {/* Weekly Hours */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2">
                        Weekly Hours
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.weeklyHours || ""}
                          onChange={(e) =>
                            handleInputChange("weeklyHours", e.target.value)
                          }
                          className={`input-field w-full pl-8 ${
                            showErrors && errors.weeklyHours
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="20"
                          min="0"
                          max="168"
                          step="0.5"
                        />
                      </div>
                      {showErrors && errors.weeklyHours && (
                        <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.weeklyHours}</span>
                        </div>
                      )}
                    </div>

                    {/* Work Weeks per Year */}
                    <div className="bg-card-background rounded-lg p-4 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2">
                        Work Weeks per Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.workWeeksPerYear}
                          onChange={(e) =>
                            handleInputChange(
                              "workWeeksPerYear",
                              e.target.value
                            )
                          }
                          className={`input-field w-full pl-8 ${
                            showErrors && errors.workWeeksPerYear
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="52"
                          min="1"
                          max="52"
                          step="1"
                        />
                      </div>
                      {showErrors && errors.workWeeksPerYear && (
                        <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.workWeeksPerYear}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-5 h-5" />
                      <span>Calculate Part-Time Pay</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-effect rounded-card p-6 card-shadow my-8"
            >
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-primary-highlight flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-text mb-2">
                    How the Part-Time Pay Calculator Works
                  </h3>
                  <p className="text-primary-secondary text-sm mb-4">
                    This calculator estimates your gross pay based on your
                    hourly rate and working hours. The calculations are:
                  </p>
                  <ul className="text-primary-secondary text-sm space-y-1">
                    <li>
                      • <strong>Weekly Pay:</strong> Hourly Rate × Weekly Hours
                    </li>
                    <li>
                      • <strong>Monthly Pay:</strong> (Weekly Pay × Work Weeks
                      per Year) ÷ 12
                    </li>
                    <li>
                      • <strong>Annual Pay:</strong> Weekly Pay × Work Weeks per
                      Year
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-effect rounded-card p-6 card-shadow"
            >
              <div className="text-center">
                <p className="text-primary-secondary text-sm">
                  <strong>Note:</strong> This calculator estimates gross pay. It
                  does not deduct tax, NI, or pension contributions. To
                  calculate after-tax take-home pay, try our{" "}
                  <a
                    href="https://freetaxcalculator.co.uk/tools/income-tax-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-highlight hover:text-primary-text underline"
                  >
                    Income Tax Calculator
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

