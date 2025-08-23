"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calculator,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Users,
  Target,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  // Calculator Usage - General
  {
    id: "how-to-use",
    question: "How do I use the pro rata calculator?",
    answer:
      "Enter your full-time salary, select the frequency (yearly, monthly, etc.), choose whether to calculate by hours worked or percentage, input your working hours or percentage, and click 'Calculate'. The calculator will show your pro rata salary for different time periods.",
    category: "Calculator Usage",
    tags: ["calculator", "how to use", "instructions", "guide"],
  },
  {
    id: "what-is-pro-rata",
    question: "What is pro rata salary?",
    answer:
      "Pro rata salary is a proportional salary calculated based on the amount of work you do compared to a full-time position. For example, if you work 20 hours per week instead of 40, your pro rata salary would be 50% of the full-time salary.",
    category: "Calculator Usage",
    tags: ["pro rata", "salary", "definition", "explanation"],
  },
  {
    id: "accuracy",
    question: "How accurate are the calculators?",
    answer:
      "Our calculators follow UK employment law, HMRC guidelines, and GOV.UK official rates for 2025/26. All calculations use the latest statutory rates and rules. However, results are estimates and should be verified with your employer or HR department for official calculations. For comprehensive tax calculations and detailed breakdowns, you can also use our partner's advanced UK tax calculator.",
    category: "Calculator Usage",
    tags: ["accuracy", "hmrc", "uk law", "estimates", "2025"],
  },
  {
    id: "data-storage",
    question: "Is my data stored when I use the calculators?",
    answer:
      "No, we don't store any of your personal information or calculation inputs. All calculations are processed in real-time in your browser and are not saved to our servers. Your privacy is completely protected.",
    category: "Calculator Usage",
    tags: ["privacy", "data", "storage", "security"],
  },
  {
    id: "which-calculator",
    question: "Which calculator should I use?",
    answer:
      "Choose based on your situation: Pro Rata Salary for part-time pay, Holiday Calculator for leave entitlement, Redundancy for payment calculations, Maternity/Paternity Pay for family leave, Sick Pay for SSP, Bonus for pro rata bonuses, or Term-Time Only for school contracts.",
    category: "Calculator Usage",
    tags: ["calculator selection", "which tool", "guide", "comparison"],
  },

  // Statutory Pay Calculators
  {
    id: "maternity-pay-calculator",
    question: "How does the Maternity Pay Calculator work?",
    answer:
      "Enter your average weekly earnings, employment start date, and baby's due date. The calculator checks eligibility (26+ weeks employed, £125+ weekly earnings) and calculates SMP: 90% of earnings for 6 weeks, then £187.18/week (or 90% if lower) for 33 weeks.",
    category: "Statutory Pay",
    tags: ["maternity pay", "smp", "pregnancy", "family leave", "2025 rates"],
  },
  {
    id: "paternity-pay-calculator",
    question: "How does the Paternity Pay Calculator work?",
    answer:
      "Input your average weekly earnings, employment start date, baby's due date, and weeks of leave (1 or 2). The calculator determines SPP eligibility and rate: lower of £187.18/week or 90% of your earnings, using 2025/26 rates.",
    category: "Statutory Pay",
    tags: ["paternity pay", "spp", "fathers", "family leave", "2025 rates"],
  },
  {
    id: "sick-pay-calculator",
    question: "How does the Sick Pay Calculator work?",
    answer:
      "Enter your working days per week, consecutive sick days, and average weekly pay. The calculator determines SSP eligibility (employee status, £125+ weekly, 4+ consecutive days) and calculates payment at £116.75/week for qualifying days only.",
    category: "Statutory Pay",
    tags: ["sick pay", "ssp", "illness", "statutory", "2025 rates"],
  },
  {
    id: "ssp-part-time",
    question: "How is Sick Pay calculated for part-time workers?",
    answer:
      "SSP for part-time workers is based on your 'qualifying days' (normal working days). You only receive SSP for days you would normally work. The daily rate is the weekly SSP (£116.75) divided by your qualifying days per week.",
    category: "Statutory Pay",
    tags: ["sick pay", "part-time", "qualifying days", "ssp calculation"],
  },

  // Education & Term-Time
  {
    id: "term-time-calculator",
    question: "How does the Term-Time Only Salary Calculator work?",
    answer:
      "Enter your FTE salary, contracted hours, term weeks (typically 39), and paid holiday weeks (typically 5.6). The calculator applies both an hours factor (part-time reduction) and TTO factor (reduced working year) to determine your annual salary.",
    category: "Education & Schools",
    tags: [
      "term time only",
      "tto",
      "school jobs",
      "education",
      "teaching assistant",
    ],
  },
  {
    id: "tto-vs-part-time",
    question: "What's the difference between Term-Time Only and part-time?",
    answer:
      "Part-time reduces hours but works full year. Term-Time Only works only during school terms (39 weeks) plus paid holidays. TTO contracts apply both hour and time reductions, typically resulting in 85.8% of full-year equivalent for time factor alone.",
    category: "Education & Schools",
    tags: ["term time", "part-time", "difference", "school contracts"],
  },
  {
    id: "school-holidays-pay",
    question: "Do I get paid during school holidays on a TTO contract?",
    answer:
      "Yes, if your employer spreads pay over 12 months. You receive the same monthly amount year-round. Some employers pay only during worked weeks plus holiday weeks. Your contract determines which method applies.",
    category: "Education & Schools",
    tags: ["school holidays", "tto pay", "spread pay", "monthly salary"],
  },

  // Redundancy & Bonuses
  {
    id: "redundancy-calculator",
    question: "How does the Redundancy Pay Calculator work?",
    answer:
      "Enter your age, years of service, and weekly pay. The calculator uses UK statutory redundancy rules: 0.5 weeks pay (under 22), 1 week (22-40), 1.5 weeks (41+) per year served, capped at 20 years and £643 weekly pay (2025 rates).",
    category: "Redundancy & Bonuses",
    tags: ["redundancy pay", "statutory", "job loss", "2025 rates"],
  },
  {
    id: "bonus-calculator",
    question: "How does the Bonus Calculator work?",
    answer:
      "Enter your full bonus amount, full-time hours, actual hours, and employment dates. The calculator applies part-time factor (actual/full-time hours) and partial-year factor (days employed/bonus period) to determine your pro rata bonus entitlement.",
    category: "Redundancy & Bonuses",
    tags: ["bonus calculation", "part-time bonus", "pro rata", "partial year"],
  },
  {
    id: "bonus-part-time",
    question: "How are bonuses calculated for part-time workers?",
    answer:
      "Part-time bonuses are typically pro-rated based on hours worked. If you work 20 hours instead of 37.5 (53.3%), your bonus would be 53.3% of the full-time amount. Some employers may have different policies.",
    category: "Redundancy & Bonuses",
    tags: ["part-time bonus", "pro rata bonus", "hours calculation"],
  },

  // Holiday Entitlement
  {
    id: "holiday-calculator",
    question: "How does the Holiday Calculator work?",
    answer:
      "Enter your working days per week and employment details. The calculator determines your statutory holiday entitlement (5.6 weeks or 28 days minimum) and any additional company holidays, all pro-rated for part-time workers.",
    category: "Holiday Entitlement",
    tags: ["holiday entitlement", "annual leave", "part-time", "statutory"],
  },
  {
    id: "holiday-part-time",
    question: "How is holiday calculated for part-time workers?",
    answer:
      "Part-time holiday is pro-rated based on days worked. If you work 3 days per week, you get 3/5 of full-time entitlement. For 5.6 weeks statutory: 5.6 × 3 = 16.8 days holiday per year.",
    category: "Holiday Entitlement",
    tags: ["part-time holiday", "pro rata", "days calculation"],
  },

  // UK Employment Law
  {
    id: "uk-compliance",
    question: "Are the calculators compliant with UK employment law?",
    answer:
      "Yes, all our calculators follow UK employment law principles, HMRC guidelines, and GOV.UK official rates. They're designed to provide accurate calculations based on current 2025/26 statutory rates and regulations. For additional tax compliance tools and detailed HMRC guidance, explore our partner's comprehensive tax calculator suite.",
    category: "UK Employment Law",
    tags: ["uk law", "hmrc", "compliance", "employment", "2025"],
  },
  {
    id: "statutory-rates-2025",
    question: "What are the 2025/26 statutory rates?",
    answer:
      "2025/26 rates: SMP/SPP £187.18/week cap, SSP £116.75/week, minimum earnings £125/week, redundancy pay cap £643/week. All calculators use these current rates automatically.",
    category: "UK Employment Law",
    tags: ["2025 rates", "statutory pay", "smp", "spp", "ssp", "redundancy"],
  },
  {
    id: "minimum-wage",
    question: "Do the calculators consider minimum wage requirements?",
    answer:
      "The calculators provide proportional salary calculations. You should ensure that your pro rata salary meets or exceeds the UK minimum wage requirements (£11.44/hour for 21+, April 2025) for your age and working hours.",
    category: "UK Employment Law",
    tags: ["minimum wage", "uk law", "requirements", "salary", "2025"],
  },
  {
    id: "employment-rights",
    question: "What employment rights apply to part-time workers?",
    answer:
      "Part-time workers have the same employment rights as full-time workers, including pro rata pay, holiday entitlement, sick pay, maternity/paternity pay, and redundancy pay. All our calculators respect these equal treatment principles.",
    category: "UK Employment Law",
    tags: ["employment rights", "part-time", "equal treatment", "uk law"],
  },
  {
    id: "zero-hours",
    question: "Can I use these calculators for zero-hours contracts?",
    answer:
      "Some calculators apply to zero-hours contracts: Holiday Calculator (for accrued leave), Sick Pay Calculator (if you meet SSP criteria), and Redundancy Calculator (after 2+ years service). Statutory pay depends on average earnings and continuity.",
    category: "UK Employment Law",
    tags: ["zero hours", "contracts", "statutory pay", "rights"],
  },

  // Part-time Work
  {
    id: "part-time-calculations",
    question: "How do I calculate salary for part-time work?",
    answer:
      "For part-time work, enter your full-time equivalent salary, select your working frequency, and input your actual working hours. The calculator will show your proportional salary for the hours you work.",
    category: "Part-time Work",
    tags: ["part-time", "salary", "hours", "calculation"],
  },
  {
    id: "reduced-hours",
    question: "What if I work reduced hours?",
    answer:
      "Reduced hours work is calculated the same way as part-time work. Enter your original full-time salary and your new working hours to see your adjusted pro rata salary.",
    category: "Part-time Work",
    tags: ["reduced hours", "salary adjustment", "calculation"],
  },
  {
    id: "flexible-working",
    question: "Can I use this for flexible working arrangements?",
    answer:
      "Yes, the calculator works for any flexible working arrangement. Simply input your full-time equivalent salary and your actual working hours or percentage to get your pro rata calculations.",
    category: "Part-time Work",
    tags: ["flexible working", "arrangements", "calculation"],
  },
  {
    id: "compressed-hours",
    question: "How do I calculate pay for compressed hours?",
    answer:
      "For compressed hours (full-time hours worked over fewer days), use the Pro Rata Salary Calculator with your actual weekly hours. Your salary remains the same, but holiday and sick pay calculations may change based on working days per week.",
    category: "Part-time Work",
    tags: ["compressed hours", "full time", "fewer days", "salary"],
  },
  {
    id: "job-share",
    question: "How does job sharing affect my pay calculation?",
    answer:
      "In a job share, use the Pro Rata Salary Calculator based on your share of the full-time hours. For example, if you work 2.5 days out of 5, enter 50% or your actual weekly hours to calculate your share of the salary.",
    category: "Part-time Work",
    tags: ["job share", "shared role", "percentage", "split position"],
  },

  // Business Use
  {
    id: "business-use",
    question: "Can businesses use these calculators?",
    answer:
      "Absolutely! HR departments and employers can use our calculators to determine appropriate statutory payments, pro rata salaries, redundancy pay, and holiday entitlements. All calculators follow UK employment law and current 2025/26 rates.",
    category: "Business Use",
    tags: ["business", "employers", "hr", "statutory payments", "2025"],
  },
  {
    id: "payroll-departments",
    question: "Are these calculators suitable for payroll departments?",
    answer:
      "Yes, payroll departments can use these calculators for quick calculations and verification. However, always use your official payroll software for final calculations and ensure compliance with your specific company policies and collective agreements.",
    category: "Business Use",
    tags: ["payroll", "hr departments", "verification", "compliance"],
  },
  {
    id: "contractor-pay",
    question: "How do I calculate pay for contractors?",
    answer:
      "Use the Pro Rata Salary Calculator for contractors working reduced hours. For statutory benefits, note that genuine contractors typically aren't entitled to SMP, SPP, SSP, or redundancy pay unless they meet employee criteria.",
    category: "Business Use",
    tags: ["contractors", "rates", "business", "statutory rights"],
  },
  {
    id: "school-hr",
    question: "Can schools use the Term-Time Only calculator for HR?",
    answer:
      "Yes, the TTO calculator is perfect for school HR departments calculating support staff, teaching assistant, and administrative roles. It handles the complex interaction between part-time hours and term-time working patterns.",
    category: "Business Use",
    tags: [
      "schools",
      "hr",
      "term time",
      "teaching assistants",
      "support staff",
    ],
  },
  {
    id: "maternity-cover",
    question: "How do I calculate pay for maternity cover staff?",
    answer:
      "Use the Pro Rata Salary Calculator for cover staff working different hours. For the person on maternity leave, use the Maternity Pay Calculator to determine their SMP entitlement during leave.",
    category: "Business Use",
    tags: ["maternity cover", "temporary staff", "smp", "cover arrangements"],
  },

  // Technical Support
  {
    id: "browser-compatibility",
    question: "Which browsers are supported?",
    answer:
      "Our calculator works on all modern browsers including Chrome, Firefox, Safari, and Edge. It's also mobile-friendly and works on smartphones and tablets.",
    category: "Technical Support",
    tags: ["browsers", "compatibility", "mobile", "technical"],
  },
  {
    id: "mobile-use",
    question: "Can I use the calculator on my phone?",
    answer:
      "Yes! Our calculator is fully responsive and works perfectly on mobile devices. You can calculate pro rata salaries on your smartphone or tablet.",
    category: "Technical Support",
    tags: ["mobile", "phone", "tablet", "responsive"],
  },
  {
    id: "no-registration",
    question: "Do I need to register to use the calculator?",
    answer:
      "No registration is required! Our calculator is completely free to use without any sign-up or account creation needed.",
    category: "Technical Support",
    tags: ["registration", "free", "no signup", "account"],
  },

  // Contact & Support
  {
    id: "contact-support",
    question: "How can I get help if I have questions?",
    answer:
      "You can contact us through our contact page, email us at contact@proratacalculator.co.uk, or check our FAQ section for common questions. We aim to respond within 24-48 hours.",
    category: "Contact & Support",
    tags: ["contact", "support", "help", "questions"],
  },
  {
    id: "feedback",
    question: "How can I provide feedback?",
    answer:
      "We welcome feedback! You can use our contact form, email us directly, or let us know if you find any issues with the calculator. Your feedback helps us improve our service.",
    category: "Contact & Support",
    tags: ["feedback", "improvements", "contact", "suggestions"],
  },
  {
    id: "bug-reports",
    question: "What if I find a bug or error?",
    answer:
      "If you encounter any issues with the calculator, please report them to us via our contact form or email. Include details about what happened and we'll investigate and fix any problems.",
    category: "Contact & Support",
    tags: ["bugs", "errors", "reports", "technical issues"],
  },
];

const categories = [
  "Calculator Usage",
  "Statutory Pay",
  "Education & Schools",
  "Redundancy & Bonuses",
  "Holiday Entitlement",
  "UK Employment Law",
  "Part-time Work",
  "Business Use",
  "Technical Support",
  "Contact & Support",
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const filteredFAQ = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-section px-8">
          <div className="max-w-container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-heading-lg font-bold mb-4">
                <span className="gradient-text">
                  Frequently Asked Questions
                </span>
              </h1>
              <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
                Find answers to common questions about our UK salary
                calculators, including pro rata pay, statutory payments,
                term-time contracts, redundancy, bonuses, and UK employment law
                for 2025.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-card p-8 card-shadow mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-secondary w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field w-full pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-64">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-primary-secondary text-sm">
                {filteredFAQ.length} question
                {filteredFAQ.length !== 1 ? "s" : ""} found
              </div>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFAQ.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-effect rounded-card card-shadow"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-bg/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary-text mb-2">
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-primary-secondary">
                          <span className="bg-primary-highlight/10 text-primary-highlight px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <span>{item.tags.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="w-5 h-5 text-primary-highlight flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary-highlight flex-shrink-0 ml-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openItems.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p className="text-primary-secondary leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredFAQ.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-effect rounded-card p-8 card-shadow text-center"
              >
                <HelpCircle className="w-16 h-16 text-primary-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-text mb-2">
                  No questions found
                </h3>
                <p className="text-primary-secondary mb-6">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="button-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Additional Resources Section - Enhanced with Natural Backlinks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">
                Additional Tax & Employment Resources
              </h2>
              <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Tax Resources */}
                  <div>
                    <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                      <Calculator className="w-5 h-5 text-green-500" />
                      <span>Tax Calculators</span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      <a
                        href="https://freetaxcalculator.co.uk/income-tax-calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Income Tax Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        National Insurance Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tax-code-calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Tax Code Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/p60-calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        P60 Calculator
                      </a>
                    </div>
                  </div>

                  {/* Employment Resources */}
                  <div>
                    <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span>Employment Tools</span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      <a
                        href="https://freetaxcalculator.co.uk/tools/after-tax/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        After Tax Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/inheritance-tax-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Inheritance Tax Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/road-tax-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Road Tax Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/capital-gains-tax-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Capital Gains Tax Calculator
                      </a>
                    </div>
                  </div>

                  {/* Business Resources */}
                  <div>
                    <h3 className="font-semibold text-primary-text mb-3 flex items-center space-x-2">
                      <Target className="w-5 h-5 text-purple-500" />
                      <span>Business Tools</span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      <a
                        href="https://freetaxcalculator.co.uk/tools/income-tax-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Income Tax Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/ni-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        NI Calculator
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/tax-code-checker/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Tax Code Checker
                      </a>
                      <a
                        href="https://freetaxcalculator.co.uk/tools/gross-salary-calculator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary-highlight hover:text-primary-text transition-colors"
                      >
                        Gross Salary Calculator
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-primary-secondary text-sm mb-3">
                    For comprehensive tax planning and detailed financial
                    calculations, explore our partner's complete suite of UK tax
                    and business tools.
                  </p>
                  <a
                    href="https://freetaxcalculator.co.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Visit Free Tax Calculator</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">
                Still Have Questions?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center flex flex-col items-center justify-center  glass-effect p-8 card-shadow rounded-card">
                  <Mail className="w-12 h-12 text-primary-highlight mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Contact Us
                  </h3>
                  <p className="text-primary-secondary mb-4">
                    Can't find what you're looking for? Get in touch with our
                    support team.
                  </p>
                  <a href="/contact" className="button-primary">
                    Contact Support
                  </a>
                </div>
                <div className="text-center flex flex-col items-center justify-center glass-effect p-8 card-shadow rounded-card">
                  <Calculator className="w-12 h-12 text-primary-highlight mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-primary-text mb-2">
                    Try Calculator
                  </h3>
                  <p className="text-primary-secondary mb-4">
                    Ready to calculate your salary, benefits, or statutory pay?
                    Choose from our complete range of UK calculators.
                  </p>
                  <a href="/contact" className="button-primary">
                    View All Calculators
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
