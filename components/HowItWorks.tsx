"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const steps = [
  {
    icon: Calculator,
    title: "Enter Your Details",
    description:
      "Input your full-time salary, frequency (yearly, monthly, weekly, or daily), and your actual working hours.",
    details:
      "Start with your full-time equivalent salary and select how it's paid. Then specify your actual working hours per week.",
  },
  {
    icon: TrendingUp,
    title: "Instant Calculation",
    description:
      "Our calculator instantly computes your pro rata salary across all time periods.",
    details:
      "Get immediate results showing yearly, monthly, weekly, daily, and hourly rates based on your working pattern.",
  },
  {
    icon: Shield,
    title: "UK Compliant Results",
    description:
      "All calculations follow HMRC guidelines and UK employment law standards.",
    details:
      "Our calculations are based on standard UK employment practices and HMRC guidelines for accurate, compliant results.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get your pro rata calculations in seconds, not minutes.",
  },
  {
    icon: Users,
    title: "Multiple Scenarios",
    description: "Perfect for part-time, temporary, or reduced hours work.",
  },
  {
    icon: BookOpen,
    title: "UK Compliant",
    description: "Follows HMRC guidelines and UK employment law.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-section px-8">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-sm font-bold mb-4">
            How Our <span className="gradient-text">Pro Rata Calculator</span>{" "}
            Works
          </h2>
          <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
            Our UK-compliant pro rata calculator makes it easy to work out your
            proportional salary. Follow these simple steps to get accurate
            results for 2025.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-card p-8 card-shadow text-center"
            >
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-text mb-4">
                {step.title}
              </h3>
              <p className="text-primary-secondary mb-4">{step.description}</p>
              <p className="text-primary-secondary text-sm opacity-75">
                {step.details}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-card p-8 card-shadow"
        >
          <h3 className="text-2xl font-bold text-primary-text text-center mb-8">
            Why Choose Our Pro Rata Calculator?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-text mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-primary-secondary text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* UK Employment Law Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 glass-effect rounded-card p-8 card-shadow"
        >
          <h3 className="text-2xl font-bold text-primary-text mb-6">
            UK Employment Law & Pro Rata Calculations
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary-text mb-4">
                HMRC Guidelines
              </h4>
              <ul className="space-y-2 text-primary-secondary text-sm">
                <li>
                  • Pro rata calculations must be based on actual working hours
                </li>
                <li>
                  • Holiday entitlement is typically proportional to working
                  hours
                </li>
                <li>
                  • Part-time workers have the same rights as full-time workers
                </li>
                <li>• Calculations should include all contractual benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-text mb-4">
                Common Scenarios
              </h4>
              <ul className="space-y-2 text-primary-secondary text-sm">
                <li>• Part-time work arrangements</li>
                <li>• Reduced hours during probation</li>
                <li>• Temporary or contract work</li>
                <li>• Job sharing arrangements</li>
                <li>• Flexible working patterns</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
