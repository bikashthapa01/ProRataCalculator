"use client";

import { useState, useEffect } from "react";
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
  ChevronDown,
  Percent,
  Users,
  AlertCircle,
} from "lucide-react";
import {
  calculateProRata,
  formatCurrency,
  formatPercentage,
  type ProRataInputs,
  type ProRataResults,
} from "@/lib/utils";

interface ValidationErrors {
  fullTimeSalary?: string;
  actualHours?: string;
  percentage?: string;
}

export default function ProRataCalculator() {
  const [inputs, setInputs] = useState<ProRataInputs>({
    fullTimeSalary: 0,
    fullTimeHours: 37.5,
    actualHours: 0,
    frequency: "yearly",
  });

  const [results, setResults] = useState<ProRataResults | null>(null);
  const [copied, setCopied] = useState(false);
  const [calculationType, setCalculationType] = useState<
    "hours" | "percentage"
  >("hours");
  const [percentageValue, setPercentageValue] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  // Get placeholder and label based on frequency
  const getFrequencyInfo = () => {
    switch (inputs.frequency) {
      case "yearly":
        return { placeholder: "30000", label: "Full-Time Annual Salary" };
      case "monthly":
        return { placeholder: "2500", label: "Full-Time Monthly Salary" };
      case "weekly":
        return { placeholder: "577", label: "Full-Time Weekly Salary" };
      case "daily":
        return { placeholder: "115", label: "Full-Time Daily Rate" };
      default:
        return { placeholder: "30000", label: "Full-Time Salary" };
    }
  };

  const frequencyInfo = getFrequencyInfo();

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate full-time salary
    if (!inputs.fullTimeSalary || inputs.fullTimeSalary <= 0) {
      newErrors.fullTimeSalary = "Please enter a valid salary amount";
    } else if (inputs.fullTimeSalary > 1000000) {
      newErrors.fullTimeSalary =
        "Salary amount seems too high. Please check and try again.";
    }

    // Validate actual hours or percentage
    if (calculationType === "hours") {
      if (!inputs.actualHours || inputs.actualHours <= 0) {
        newErrors.actualHours = "Please enter your working hours";
      } else if (inputs.actualHours > inputs.fullTimeHours) {
        newErrors.actualHours = `Working hours cannot exceed full-time hours (${inputs.fullTimeHours})`;
      } else if (inputs.actualHours > 168) {
        newErrors.actualHours =
          "Working hours cannot exceed 168 hours per week";
      }
    } else {
      if (percentageValue <= 0 || percentageValue > 100) {
        newErrors.percentage = "Percentage must be between 1% and 100%";
      }
    }

    return newErrors;
  };

  // Update validation when inputs change (only if user has interacted)
  useEffect(() => {
    // This effect is no longer needed as errors are only shown on Calculate click
    // setIsFormValid(
    //   Object.keys(newErrors).length === 0 &&
    //     inputs.fullTimeSalary > 0 &&
    //     (calculationType === "hours"
    //       ? inputs.actualHours > 0
    //       : percentageValue > 0)
    // );
  }, [inputs, calculationType, percentageValue]);

  const handleCalculate = () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    setShowErrors(true);
    if (Object.keys(newErrors).length > 0) return;

    let calculatedResults;

    if (calculationType === "percentage") {
      // Calculate based on percentage
      const actualHoursFromPercentage =
        (percentageValue / 100) * inputs.fullTimeHours;
      const inputsWithPercentage = {
        ...inputs,
        actualHours: actualHoursFromPercentage,
      };
      calculatedResults = calculateProRata(inputsWithPercentage);
    } else {
      // Calculate based on hours
      calculatedResults = calculateProRata(inputs);
    }

    setResults(calculatedResults);
  };

  const handleCopyResults = async () => {
    if (!results) return;

    const resultText = `Pro Rata Salary Results (2025):
Yearly: ${formatCurrency(results.yearly)}
Monthly: ${formatCurrency(results.monthly)}
Weekly: ${formatCurrency(results.weekly)}
Daily: ${formatCurrency(results.daily)}
Hourly: ${formatCurrency(results.hourly)}
Percentage: ${formatPercentage(results.percentage)}`;

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results");
    }
  };

  const handleInputChange = (
    field: keyof ProRataInputs,
    value: string | number
  ) => {
    // hide errors while editing
    setShowErrors(false);
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "frequency"
          ? value
          : typeof value === "string"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handlePercentageChange = (value: number) => {
    setShowErrors(false);
    setPercentageValue(value);
  };

  const handleCalculationTypeChange = (type: "hours" | "percentage") => {
    setShowErrors(false);
    setCalculationType(type);
  };

  const frequencyOptions = [
    { value: "yearly", label: "Yearly (Annual)" },
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" },
    { value: "daily", label: "Daily" },
  ];

  return (
    <section
      id="calculator"
      className="min-h-screen flex items-center justify-center py-section px-8 mt-16"
    >
      <div className="max-w-container mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-heading-lg font-bold mb-4">
            Calculate Your{" "}
            <span className="gradient-text">Pro Rata Salary</span>
          </h1>
          <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
            Enter your full-time salary and work pattern to calculate your pro
            rata equivalent. Perfect for part-time, reduced hours, or temporary
            work arrangements. Updated for 2025 UK employment standards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-card p-8 card-shadow"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="w-6 h-6 text-primary-highlight" />
              <h3 className="text-xl font-semibold text-primary-text">
                Calculator Inputs
              </h3>
            </div>

            <div className="space-y-6">
              {/* Full Time Salary */}
              <div>
                <label className="block text-primary-text font-medium mb-3">
                  {frequencyInfo.label}
                </label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-secondary" />
                  <input
                    type="number"
                    value={inputs.fullTimeSalary || ""}
                    onChange={(e) =>
                      handleInputChange("fullTimeSalary", e.target.value)
                    }
                    className={`input-field w-full pl-10 ${
                      showErrors && errors.fullTimeSalary
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder={frequencyInfo.placeholder}
                    min="0"
                    step="100"
                  />
                </div>
                {showErrors && errors.fullTimeSalary && (
                  <div className="flex items-center space-x-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.fullTimeSalary}</span>
                  </div>
                )}
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-primary-text font-medium mb-3">
                  Salary Frequency
                </label>
                <div className="relative">
                  <select
                    value={inputs.frequency}
                    onChange={(e) =>
                      handleInputChange("frequency", e.target.value)
                    }
                    className="input-field w-full appearance-none pr-10"
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-secondary pointer-events-none" />
                </div>
              </div>

              {/* Full Time Hours */}
              <div>
                <label className="block text-primary-text font-medium mb-3">
                  Full-Time Hours per Week: {inputs.fullTimeHours}
                </label>
                <input
                  type="range"
                  min="20"
                  max="50"
                  step="0.5"
                  value={inputs.fullTimeHours}
                  onChange={(e) =>
                    handleInputChange("fullTimeHours", e.target.value)
                  }
                  className="w-full h-2 slider-track rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #7c53ff 0%, #7c53ff ${
                      ((inputs.fullTimeHours - 20) / 30) * 100
                    }%, #2c2470 ${
                      ((inputs.fullTimeHours - 20) / 30) * 100
                    }%, #2c2470 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-primary-secondary mt-1">
                  <span>20h</span>
                  <span>50h</span>
                </div>
              </div>

              {/* Calculation Type */}
              <div>
                <label className="block text-primary-text font-medium mb-3">
                  Calculation Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCalculationTypeChange("hours")}
                    className={`p-3 rounded-card border transition-all duration-300 text-left ${
                      calculationType === "hours"
                        ? "border-accent-from bg-accent-from/10 text-primary-text"
                        : "border-white/10 bg-card text-primary-secondary hover:border-accent-from/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">By Hours</span>
                    </div>
                    <div className="text-sm opacity-75 mt-1">
                      Enter your actual working hours
                    </div>
                  </button>
                  <button
                    onClick={() => handleCalculationTypeChange("percentage")}
                    className={`p-3 rounded-card border transition-all duration-300 text-left ${
                      calculationType === "percentage"
                        ? "border-accent-from bg-accent-from/10 text-primary-text"
                        : "border-white/10 bg-card text-primary-secondary hover:border-accent-from/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Percent className="w-4 h-4" />
                      <span className="font-medium">By Percentage</span>
                    </div>
                    <div className="text-sm opacity-75 mt-1">
                      Enter percentage of full-time
                    </div>
                  </button>
                </div>
              </div>

              {/* Actual Hours or Percentage */}
              {calculationType === "hours" ? (
                <div>
                  <label className="block text-primary-text font-medium mb-3">
                    Your Hours per Week: {inputs.actualHours}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={inputs.fullTimeHours}
                    step="0.5"
                    value={inputs.actualHours}
                    onChange={(e) =>
                      handleInputChange("actualHours", e.target.value)
                    }
                    className="w-full h-2 slider-track rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7c53ff 0%, #7c53ff ${
                        ((inputs.actualHours - 1) /
                          (inputs.fullTimeHours - 1)) *
                        100
                      }%, #2c2470 ${
                        ((inputs.actualHours - 1) /
                          (inputs.fullTimeHours - 1)) *
                        100
                      }%, #2c2470 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-primary-secondary mt-1">
                    <span>1h</span>
                    <span>{inputs.fullTimeHours}h</span>
                  </div>
                  {showErrors && errors.actualHours && (
                    <div className="flex items-center space-x-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.actualHours}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-primary-text font-medium mb-3">
                    Percentage of Full-Time: {percentageValue}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.1"
                    value={percentageValue}
                    onChange={(e) =>
                      handlePercentageChange(parseFloat(e.target.value))
                    }
                    className="w-full h-2 slider-track rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7c53ff 0%, #7c53ff ${percentageValue}%, #2c2470 ${percentageValue}%, #2c2470 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-primary-secondary mt-1">
                    <span>1%</span>
                    <span>100%</span>
                  </div>
                  {showErrors && errors.percentage && (
                    <div className="flex items-center space-x-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.percentage}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="button-primary w-full py-3 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Pro Rata Salary</span>
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-card p-8 card-shadow"
          >
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary-highlight" />
              <h3 className="text-xl font-semibold text-primary-text">
                Your Results
              </h3>
            </div>

            <AnimatePresence>
              {results ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Percentage */}
                  <div className="text-center p-6 gradient-bg rounded-card">
                    <div className="text-3xl font-bold text-white mb-2">
                      {formatPercentage(results.percentage)}
                    </div>
                    <div className="text-white/80">of full-time equivalent</div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-effect rounded-card p-4 text-center">
                      <div className="text-sm text-primary-secondary mb-1">
                        Yearly
                      </div>
                      <div className="text-xl font-bold text-primary-text">
                        {formatCurrency(results.yearly)}
                      </div>
                    </div>
                    <div className="glass-effect rounded-card p-4 text-center">
                      <div className="text-sm text-primary-secondary mb-1">
                        Monthly
                      </div>
                      <div className="text-xl font-bold text-primary-text">
                        {formatCurrency(results.monthly)}
                      </div>
                    </div>
                    <div className="glass-effect rounded-card p-4 text-center">
                      <div className="text-sm text-primary-secondary mb-1">
                        Weekly
                      </div>
                      <div className="text-xl font-bold text-primary-text">
                        {formatCurrency(results.weekly)}
                      </div>
                    </div>
                    <div className="glass-effect rounded-card p-4 text-center">
                      <div className="text-sm text-primary-secondary mb-1">
                        Daily
                      </div>
                      <div className="text-xl font-bold text-primary-text">
                        {formatCurrency(results.daily)}
                      </div>
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div className="glass-effect rounded-card p-4 text-center">
                    <div className="text-sm text-primary-secondary mb-1">
                      Hourly Rate
                    </div>
                    <div className="text-2xl font-bold text-primary-text">
                      {formatCurrency(results.hourly)}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="glass-effect rounded-card p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-primary-highlight flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-primary-secondary text-sm">
                          {results.explanation}
                        </p>
                        <div className="text-xs text-primary-secondary opacity-75">
                          <strong>Calculation:</strong> (
                          {calculationType === "hours"
                            ? inputs.actualHours
                            : (
                                (percentageValue / 100) *
                                inputs.fullTimeHours
                              ).toFixed(1)}
                          h ÷ {inputs.fullTimeHours}h) ×{" "}
                          {formatCurrency(inputs.fullTimeSalary)} ={" "}
                          {formatCurrency(results.yearly)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="glass-effect rounded-card p-4">
                    <h4 className="font-semibold text-primary-text mb-3">
                      What This Means
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-secondary">
                      <div>
                        <div className="font-medium text-primary-text mb-1">
                          Your Pro Rata Salary
                        </div>
                        <p>
                          You'll receive {formatPercentage(results.percentage)}{" "}
                          of the full-time salary, which is{" "}
                          {formatCurrency(results.yearly)} per year.
                        </p>
                      </div>
                      <div>
                        <div className="font-medium text-primary-text mb-1">
                          Hourly Rate
                        </div>
                        <p>
                          Your effective hourly rate is{" "}
                          {formatCurrency(results.hourly)} based on your working
                          pattern.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Copy Results Button */}
                  <button
                    onClick={handleCopyResults}
                    className="button-secondary w-full flex items-center justify-center space-x-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy Results</span>
                      </>
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Calculator className="w-16 h-16 text-primary-secondary mx-auto mb-4" />
                  <p className="text-primary-secondary">
                    Enter your details above and click calculate to see your pro
                    rata salary breakdown.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
