"use client";

import { motion } from "framer-motion";
import { Calculator, Clock, Users, TrendingUp } from "lucide-react";

const examples = [
  {
    title: "Part-Time Work",
    description: "Working 20 hours per week instead of 37.5 hours",
    scenario: {
      fullTimeSalary: 30000,
      fullTimeHours: 37.5,
      actualHours: 20,
      frequency: "yearly" as const,
    },
    result: {
      percentage: 53.3,
      yearly: 15990,
      monthly: 1333,
      weekly: 307,
    },
  },
  {
    title: "Reduced Hours",
    description: "Working 30 hours per week instead of 40 hours",
    scenario: {
      fullTimeSalary: 40000,
      fullTimeHours: 40,
      actualHours: 30,
      frequency: "yearly" as const,
    },
    result: {
      percentage: 75,
      yearly: 30000,
      monthly: 2500,
      weekly: 577,
    },
  },
  {
    title: "Temporary Contract",
    description: "Working 25 hours per week on a 6-month contract",
    scenario: {
      fullTimeSalary: 35000,
      fullTimeHours: 37.5,
      actualHours: 25,
      frequency: "yearly" as const,
    },
    result: {
      percentage: 66.7,
      yearly: 23345,
      monthly: 1945,
      weekly: 449,
    },
  },
];

export default function Examples() {
  return (
    <section id="examples" className="py-section px-8">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-sm font-bold mb-4">
            Pro Rata <span className="gradient-text">Examples</span> & Scenarios
          </h2>
          <p className="text-primary-secondary text-lg max-w-2xl mx-auto">
            See how pro rata calculations work in real-world scenarios. These
            examples show common UK employment situations and their
            corresponding salary calculations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-card p-8 card-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-text">
                  {example.title}
                </h3>
              </div>

              <p className="text-primary-secondary mb-6">
                {example.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">
                    Full-time salary:
                  </span>
                  <span className="text-primary-text font-medium">
                    £{example.scenario.fullTimeSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">
                    Full-time hours:
                  </span>
                  <span className="text-primary-text font-medium">
                    {example.scenario.fullTimeHours}h/week
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">Your hours:</span>
                  <span className="text-primary-text font-medium">
                    {example.scenario.actualHours}h/week
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold gradient-text">
                    {example.result.percentage}%
                  </div>
                  <div className="text-primary-secondary text-sm">
                    of full-time equivalent
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm text-primary-secondary">Yearly</div>
                    <div className="font-semibold text-primary-text">
                      £{example.result.yearly.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-secondary">
                      Monthly
                    </div>
                    <div className="font-semibold text-primary-text">
                      £{example.result.monthly.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary-secondary">Weekly</div>
                    <div className="font-semibold text-primary-text">
                      £{example.result.weekly.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-effect rounded-card p-8 card-shadow"
        >
          <h3 className="text-2xl font-bold text-primary-text mb-6">
            Understanding Pro Rata Calculations
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary-highlight" />
                <span>How It's Calculated</span>
              </h4>
              <ul className="space-y-2 text-primary-secondary text-sm">
                <li>
                  • Pro rata = (Your hours ÷ Full-time hours) × Full-time salary
                </li>
                <li>• Percentage = (Your hours ÷ Full-time hours) × 100</li>
                <li>• All calculations are based on weekly hours</li>
                <li>• Results are rounded to the nearest pound</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-text mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-highlight" />
                <span>Common Use Cases</span>
              </h4>
              <ul className="space-y-2 text-primary-secondary text-sm">
                <li>• Part-time employment arrangements</li>
                <li>• Reduced hours during probation periods</li>
                <li>• Temporary or contract work</li>
                <li>• Job sharing scenarios</li>
                <li>• Flexible working patterns</li>
                <li>• Return to work after maternity/paternity leave</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
