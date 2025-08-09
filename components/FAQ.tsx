"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ExternalLink,
  Mail,
  Calculator,
} from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    id: "what-is-pro-rata",
    question: "What is pro rata salary?",
    answer:
      "Pro rata salary is a proportional salary calculated based on the amount of work you do compared to a full-time position. For example, if you work 20 hours per week instead of 40, your pro rata salary would be 50% of the full-time salary.",
  },
  {
    id: "how-to-calculate",
    question: "How do I calculate pro rata salary?",
    answer:
      "Enter your full-time salary, select the frequency (yearly, monthly, etc.), choose whether to calculate by hours worked or percentage, input your working hours or percentage, and click 'Calculate'. Our calculator will show your pro rata salary for different time periods.",
  },
  {
    id: "accuracy",
    question: "How accurate is the calculator?",
    answer:
      "Our calculator follows UK employment law and HMRC guidelines for accurate results. However, the results are estimates and should be verified with your employer or HR department for official calculations.",
  },
  {
    id: "part-time",
    question: "Can I use this for part-time work?",
    answer:
      "Yes! Our calculator is perfect for part-time work calculations. Simply enter your full-time equivalent salary and your actual working hours to get your proportional salary.",
  },
  {
    id: "holiday-entitlement",
    question: "How does pro rata affect holiday entitlement?",
    answer:
      "Pro rata holiday entitlement is calculated based on your working hours. For example, if you work part-time, your holiday entitlement will be proportionally reduced. Our calculator helps you understand these calculations.",
  },
  {
    id: "data-privacy",
    question: "Is my data secure when using the calculator?",
    answer:
      "Yes, we don't store any of your personal information or calculation inputs. All calculations are processed in real-time and are not saved to our servers. Your privacy is protected.",
  },
  {
    id: "uk-compliance",
    question: "Is the calculator compliant with UK employment law?",
    answer:
      "Yes, our calculator follows UK employment law principles and HMRC guidelines. It's designed to provide accurate calculations for UK employees and employers.",
  },
  {
    id: "business-use",
    question: "Can businesses use this calculator?",
    answer:
      "Absolutely! Employers can use our calculator to determine appropriate pro rata salaries for part-time employees, contractors, or temporary workers. It's useful for HR departments and business owners.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-section px-8" id="faq">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-sm font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-primary-secondary text-lg max-w-3xl mx-auto">
            Find answers to common questions about pro rata calculations, UK
            employment law, and our calculator.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatePresence>
            {faqData.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-card card-shadow"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-primary-bg/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-primary-text">
                    {item.question}
                  </h3>
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

        {/* View All FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Link
            href="/faq"
            className="button-primary inline-flex items-center space-x-2"
          >
            <span>View All FAQ</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Still Have Questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect rounded-card p-8 card-shadow"
        >
          <h3 className="text-2xl font-bold text-primary-text mb-6 text-center">
            Still Have Questions?
          </h3>
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
                Ready to calculate your pro rata salary? Use our free calculator
                now.
              </p>
              <a href="/" className="button-primary">
                Use Calculator
              </a>
            </div>
          </div>
        </motion.div>

        {/* Schema.org FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
