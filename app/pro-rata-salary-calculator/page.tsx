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
  ChevronDown,
  Percent,
  Users,
  AlertCircle,
  FileText,
  MapPin,
  CreditCard,
  Banknote,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  calculateProRata,
  formatCurrency,
  formatPercentage,
  type ProRataInputs,
  type ProRataResults,
} from "@/lib/utils";
import {
  calculateUKTax,
  formatCurrency as formatTaxCurrency,
  type TaxCalculation,
  type ScottishTaxCalculation,
  type TaxYear,
  getAvailableTaxYears,
  getDefaultTaxYear,
} from "@/lib/tax-calculator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ValidationErrors {
  fullTimeSalary?: string;
  actualHours?: string;
  percentage?: string;
  startDate?: string;
  endDate?: string;
}

interface SalaryBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  icon: React.ReactNode;
  description: string;
  color?: string;
}

interface TakeHomeBreakdown {
  label: string;
  value: number;
  formattedValue: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function ProRataSalaryCalculatorPage() {
  const [inputs, setInputs] = useState<ProRataInputs>({
    fullTimeSalary: 0,
    fullTimeHours: 37.5,
    actualHours: 0,
    frequency: "yearly",
  });

  const [results, setResults] = useState<ProRataResults | null>(null);
  const [taxResults, setTaxResults] = useState<
    TaxCalculation | ScottishTaxCalculation | null
  >(null);
  const [copied, setCopied] = useState(false);
  const [calculationType, setCalculationType] = useState<
    "hours" | "percentage"
  >("hours");
  const [percentageValue, setPercentageValue] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateFields, setShowDateFields] = useState(false);
  const [isScotland, setIsScotland] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedTaxYear, setSelectedTaxYear] = useState<TaxYear>(
    getDefaultTaxYear()
  );

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Get available tax years
  const availableTaxYears = getAvailableTaxYears();

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

    // Validate dates if provided
    if (showDateFields) {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
          newErrors.endDate = "End date must be after start date";
        }
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

    const calculationInputs = {
      ...inputs,
      actualHours:
        calculationType === "hours"
          ? inputs.actualHours
          : (percentageValue / 100) * inputs.fullTimeHours,
    };

    const calculatedResults = calculateProRata(calculationInputs);
    setResults(calculatedResults);

    // Calculate take-home pay with selected tax year
    const taxCalculation = calculateUKTax(
      calculatedResults.yearly,
      isScotland,
      selectedTaxYear
    );
    setTaxResults(taxCalculation);

    // Scroll to results after a short delay to ensure the results are rendered
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
    if (!results || !taxResults) return;

    const resultsText = `Pro Rata Salary Calculation Results:
    
Annual Salary: ${formatCurrency(results.yearly)}
Monthly Salary: ${formatCurrency(results.monthly)}
Weekly Salary: ${formatCurrency(results.weekly)}
Daily Rate: ${formatCurrency(results.daily)}
Hourly Rate: ${formatCurrency(results.hourly)}
Percentage: ${formatPercentage(results.percentage)}

Take-Home Pay (${isScotland ? "Scottish" : "UK"} Tax - ${selectedTaxYear}):
Annual Take-Home: ${formatTaxCurrency(taxResults.takeHomePay)}
Monthly Take-Home: ${formatTaxCurrency(taxResults.takeHomePay / 12)}
Weekly Take-Home: ${formatTaxCurrency(taxResults.takeHomePay / 52)}
Effective Tax Rate: ${formatPercentage(taxResults.effectiveTaxRate)}

Calculated using Pro Rata Calculator UK - https://proratacalculator.co.uk/pro-rata-salary-calculator`;

    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy results:", err);
    }
  };

  const handleInputChange = (
    field: keyof ProRataInputs,
    value: string | number
  ) => {
    if (field === "frequency") {
      setInputs((prev) => ({ ...prev, [field]: value as any }));
    } else {
      const numValue =
        typeof value === "string" ? parseFloat(value) || 0 : value;
      setInputs((prev) => ({ ...prev, [field]: numValue }));
    }
    setShowErrors(false);
  };

  const handlePercentageChange = (value: number) => {
    setPercentageValue(value);
    setShowErrors(false);
  };

  const handleCalculationTypeChange = (type: "hours" | "percentage") => {
    setCalculationType(type);
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
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full mb-6">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">
                  {selectedTaxYear} Tax Year
                </span>
              </div>
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Pro Rata Salary Calculator
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Calculate your true part-time or partial-year salary with
                accurate take-home pay calculations. Includes latest{" "}
                {selectedTaxYear} UK and Scottish tax rates, National Insurance,
                and real-time results.
              </p>
            </motion.div>

            {/* Compact Results Table - Only shown when results exist */}
            <AnimatePresence>
              {results && taxResults && (
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
                      Your Pro Rata Results
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

                  {/* Compact Results Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-primary-secondary font-medium">
                            Breakdown
                          </th>
                          <th className="text-right py-2 text-primary-secondary font-medium">
                            Pro Rata Amount
                          </th>
                          <th className="text-right py-2 text-primary-secondary font-medium">
                            Take-Home Pay
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-primary-text">
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">Annual</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-blue-500">
                            {formatCurrency(results.yearly)}
                          </td>
                          <td className="text-right py-3 font-semibold text-emerald-500">
                            {formatTaxCurrency(taxResults.takeHomePay)}
                          </td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-500" />
                              <span className="font-medium">Monthly</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-green-500">
                            {formatCurrency(results.monthly)}
                          </td>
                          <td className="text-right py-3 font-semibold text-emerald-500">
                            {formatTaxCurrency(taxResults.takeHomePay / 12)}
                          </td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="font-medium">Weekly</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-purple-500">
                            {formatCurrency(results.weekly)}
                          </td>
                          <td className="text-right py-3 font-semibold text-emerald-500">
                            {formatTaxCurrency(taxResults.takeHomePay / 52)}
                          </td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-orange-500" />
                              <span className="font-medium">Daily</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-orange-500">
                            {formatCurrency(results.daily)}
                          </td>
                          <td className="text-right py-3 font-semibold text-emerald-500">
                            {formatTaxCurrency(taxResults.takeHomePay / 365)}
                          </td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-red-500" />
                              <span className="font-medium">Hourly</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-red-500">
                            {formatCurrency(results.hourly)}
                          </td>
                          <td className="text-right py-3 font-semibold text-emerald-500">
                            {formatTaxCurrency(
                              taxResults.takeHomePay / 52 / inputs.actualHours
                            )}
                          </td>
                        </tr>
                        <tr className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <Percent className="w-4 h-4 text-indigo-500" />
                              <span className="font-medium">Percentage</span>
                            </div>
                          </td>
                          <td className="text-right py-3 font-semibold text-indigo-500">
                            {formatPercentage(results.percentage)}
                          </td>
                          <td className="text-right py-3 font-semibold text-indigo-500">
                            {formatPercentage(taxResults.effectiveTaxRate)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Tax Summary */}
                  <div className="mt-4 p-4 bg-card-background rounded-lg border border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-primary-secondary">Income Tax</p>
                        <p className="font-semibold text-primary-text">
                          {formatTaxCurrency(taxResults.incomeTax)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">
                          National Insurance
                        </p>
                        <p className="font-semibold text-primary-text">
                          {formatTaxCurrency(taxResults.nationalInsurance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">
                          Personal Allowance
                        </p>
                        <p className="font-semibold text-primary-text">
                          {formatTaxCurrency(taxResults.personalAllowance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-primary-secondary">Tax Location</p>
                        <p className="font-semibold text-primary-text">
                          {isScotland ? "Scotland" : "Rest of UK"} (
                          {selectedTaxYear})
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Tax Information with Natural Backlinks */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
                        <h4 className="font-semibold text-primary-text mb-2 flex items-center space-x-2">
                          <Info className="w-4 h-4 text-primary-highlight" />
                          <span>Need More Detailed Tax Calculations?</span>
                        </h4>
                        <p className="text-primary-secondary text-xs mb-3">
                          For comprehensive tax analysis, detailed breakdowns,
                          and additional tax scenarios, explore our partner's
                          advanced tax tools:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <a
                            href="https://freetaxcalculator.co.uk/income-tax-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>Income Tax Calculator</span>
                          </a>
                          <a
                            href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>NI Calculator</span>
                          </a>
                          <a
                            href="https://freetaxcalculator.co.uk/tools/tax-code-checker/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>Tax Code Checker</span>
                          </a>
                          <a
                            href="https://freetaxcalculator.co.uk/tools/gross-salary-calculator/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors"
                          >
                            <Calculator className="w-3 h-3" />
                            <span>Gross Salary Calculator</span>
                          </a>
                        </div>
                      </div>
                    </div>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary-text">
                      Calculate Your Pro Rata Salary
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
                  {/* First Row - Tax Year and Full-Time Salary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tax Year Selection */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Tax Year
                      </label>
                      <select
                        value={selectedTaxYear}
                        onChange={(e) =>
                          setSelectedTaxYear(e.target.value as TaxYear)
                        }
                        className="input-field w-full text-sm"
                      >
                        {availableTaxYears.map((year) => (
                          <option key={year} value={year}>
                            {year} Tax Year
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full-Time Salary */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        {frequencyInfo.label}
                      </label>
                      <div className="relative">
                        <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-secondary" />
                        <input
                          type="number"
                          value={inputs.fullTimeSalary || ""}
                          onChange={(e) =>
                            handleInputChange("fullTimeSalary", e.target.value)
                          }
                          className={`input-field w-full pl-8 text-sm ${
                            showErrors && errors.fullTimeSalary
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder={frequencyInfo.placeholder}
                          min="0"
                          step="100"
                        />
                      </div>
                      {showErrors && errors.fullTimeSalary && (
                        <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.fullTimeSalary}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Second Row - Frequency and Full-Time Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Frequency Selection */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-1 text-sm">
                        Salary Frequency
                      </label>
                      <select
                        value={inputs.frequency}
                        onChange={(e) =>
                          handleInputChange("frequency", e.target.value)
                        }
                        className="input-field w-full text-sm"
                      >
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                      </select>
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
                          handleInputChange("fullTimeHours", e.target.value)
                        }
                        className="input-field w-full text-sm"
                        placeholder="37.5"
                        min="1"
                        max="168"
                        step="0.5"
                      />
                    </div>
                  </div>

                  {/* Third Row - Calculation Type and Hours/Percentage */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Calculation Type Toggle */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Calculate by:
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleCalculationTypeChange("hours")}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            calculationType === "hours"
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Hours Worked
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleCalculationTypeChange("percentage")
                          }
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            calculationType === "percentage"
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          Percentage
                        </button>
                      </div>
                    </div>

                    {/* Hours or Percentage Input */}
                    {calculationType === "hours" ? (
                      <div className="bg-card-background rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Your Weekly Hours
                        </label>
                        <input
                          type="number"
                          value={inputs.actualHours || ""}
                          onChange={(e) =>
                            handleInputChange("actualHours", e.target.value)
                          }
                          className={`input-field w-full text-sm ${
                            showErrors && errors.actualHours
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="20"
                          min="0"
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
                    ) : (
                      <div className="bg-card-background rounded-lg p-3 border border-white/10">
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Percentage of Full-Time
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={percentageValue}
                            onChange={(e) =>
                              handlePercentageChange(parseInt(e.target.value))
                            }
                            className="w-full h-2 bg-primary-secondary rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between text-xs text-primary-secondary mt-1">
                            <span>1%</span>
                            <span className="font-medium text-primary-highlight">
                              {percentageValue}%
                            </span>
                            <span>100%</span>
                          </div>
                        </div>
                        {showErrors && errors.percentage && (
                          <div className="flex items-center space-x-2 mt-1 text-red-400 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.percentage}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Fourth Row - Tax Location and Optional Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tax Location */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <label className="block text-primary-text font-medium mb-2 text-sm">
                        Tax Location
                      </label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsScotland(false)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            !isScotland
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          <MapPin className="w-3 h-3 inline mr-1" />
                          Rest of UK
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsScotland(true)}
                          className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
                            isScotland
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                              : "bg-card-background text-primary-secondary border border-primary-secondary"
                          }`}
                        >
                          <MapPin className="w-3 h-3 inline mr-1" />
                          Scotland
                        </button>
                      </div>
                    </div>

                    {/* Optional Date Fields */}
                    <div className="bg-card-background rounded-lg p-3 border border-white/10">
                      <button
                        type="button"
                        onClick={() => setShowDateFields(!showDateFields)}
                        className="flex items-center space-x-2 text-primary-highlight hover:text-primary-text transition-colors text-sm"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>
                          {showDateFields ? "Hide" : "Add"} Start/End Dates
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showDateFields ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Date Fields - Conditional */}
                  {showDateFields && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-card-background rounded-lg border border-white/10">
                      <div>
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="input-field w-full text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-primary-text font-medium mb-1 text-sm">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
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
                      </div>
                    </div>
                  )}

                  {/* Calculate Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        !isFormValid ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Pro Rata Salary & Take-Home Pay</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-effect rounded-card p-6 card-shadow my-8"
            >
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-primary-highlight flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-text mb-2">
                    What is Pro Rata?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Pro rata means "in proportion" in Latin. For example, if you
                    work 20 hours per week instead of the full-time 37.5 hours,
                    your salary would be pro rata - meaning you'd receive 53.3%
                    of the full-time salary. This calculator helps you determine
                    your exact pro rata pay for part-time work, job sharing, or
                    partial-year employment in the UK.
                  </p>
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
                    How accurate is this calculator?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Our calculator follows UK employment law and HMRC guidelines
                    for accurate pro rata calculations. It accounts for standard
                    working patterns and UK tax year considerations. For
                    comprehensive tax calculations and to verify your specific
                    tax situation, you can also use our partner's{" "}
                    <a
                      href="https://freetaxcalculator.co.uk/tax-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-highlight hover:text-primary-text underline"
                    >
                      advanced UK tax calculator
                    </a>
                    .
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Can I use this for part-time work?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    Yes! This calculator is specifically designed for part-time
                    work, job sharing, and any situation where you work fewer
                    hours than the full-time equivalent.
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    What about holiday pay?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    This calculator shows your basic pro rata salary. Holiday
                    pay is typically calculated separately and may vary based on
                    your employment contract. For detailed holiday entitlement
                    calculations, check out our{" "}
                    <a
                      href="https://freetaxcalculator.co.uk/holiday-pay-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-highlight hover:text-primary-text underline"
                    >
                      holiday pay calculator
                    </a>
                    .
                  </p>
                </div>
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <h3 className="font-semibold text-primary-text mb-2">
                    Is this suitable for contractors?
                  </h3>
                  <p className="text-primary-secondary text-sm">
                    While primarily designed for employees, contractors can use
                    this to estimate equivalent rates when comparing full-time
                    vs part-time opportunities.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Tools Section - Enhanced with Natural Backlinks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  Related Tax & Employment Calculators
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Explore our partner's comprehensive suite of UK tax and
                  employment calculators for complete financial planning.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tax Calculators */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Tax Calculators
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href="https://freetaxcalculator.co.uk/income-tax-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Income Tax Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • National Insurance Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/tax-code-checker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Tax Code Checker
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/gross-salary-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Gross Salary Calculator
                    </a>
                  </div>
                </div>

                {/* Employment Calculators */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Employment Tools
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href="https://freetaxcalculator.co.uk/tools/after-tax/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • After Tax Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/inheritance-tax-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Inheritance Tax Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/road-tax-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Road Tax Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/capital-gains-tax-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Capital Gains Tax Calculator
                    </a>
                  </div>
                </div>

                {/* Business & Self-Employed */}
                <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary-text">
                      Business Tools
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <a
                      href="https://freetaxcalculator.co.uk/tools/income-tax-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Income Tax Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/ni-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • NI Calculator
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/tax-code-checker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Tax Code Checker
                    </a>
                    <a
                      href="https://freetaxcalculator.co.uk/tools/gross-salary-calculator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-highlight hover:text-primary-text transition-colors"
                    >
                      • Gross Salary Calculator
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How to Use Section - SEO Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary-text mb-4">
                  How to Use the Pro-Rata Salary Calculator
                </h2>
                <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                  Follow these simple steps to calculate your pro rata salary
                  and take-home pay using our UK calculator.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Step-by-Step Guide */}
                <div className="space-y-6">
                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Select Tax Year
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Choose the relevant tax year (2025/26 or 2024/25) from
                          the dropdown menu. This ensures your calculations use
                          the correct tax rates and National Insurance
                          contributions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Enter Full-Time Salary
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Input the full-time equivalent salary for your role.
                          You can enter this as yearly, monthly, weekly, or
                          daily amounts using the frequency selector.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Set Working Hours
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Specify the full-time weekly hours (usually 37.5 or
                          40) and your actual working hours. Alternatively, use
                          the percentage slider to indicate your part-time
                          percentage.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Choose Tax Location
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Select whether you're based in Scotland or the rest of
                          the UK. This affects your income tax rates as Scotland
                          has different tax bands and rates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        5
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-text mb-2">
                          Calculate Results
                        </h3>
                        <p className="text-primary-secondary text-sm">
                          Click "Calculate Pro Rata Salary & Take-Home Pay" to
                          see your results. The calculator will show your pro
                          rata salary breakdown and take-home pay after tax
                          deductions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features and Tips */}
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
                          Accurate UK and Scottish tax calculations for 2025/26
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>National Insurance contributions included</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Multiple salary frequency options (yearly, monthly,
                          weekly, daily)
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Flexible calculation methods (hours or percentage)
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Comprehensive results breakdown with take-home pay
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Copy results functionality for easy sharing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
                    <h3 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                      <Info className="w-5 h-5 text-primary-highlight" />
                      <span>Pro Tips</span>
                    </h3>
                    <ul className="space-y-3 text-sm text-primary-secondary">
                      <li className="flex items-start space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Use the percentage slider for quick calculations when
                          you know your part-time percentage
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Compare different scenarios by adjusting hours or
                          percentages
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Check both UK and Scottish rates if you're considering
                          relocation
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Use the copy function to save your results for future
                          reference
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Consider using the date fields for partial-year
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
                          This calculator provides estimates based on standard
                          tax rates
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Individual circumstances may affect actual tax
                          liability
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Consult with a tax professional for complex situations
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Rates are updated for the 2025/26 tax year</span>
                      </li>
                    </ul>
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
