"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Calculator,
  Calendar,
  Clock,
  PoundSterling,
  Shield,
  Users,
  FileText,
  Heart,
  School,
} from "lucide-react";
import { tools, type Tool } from "@/lib/tools";

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  Calculator: <Calculator className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  PoundSterling: <PoundSterling className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  School: <School className="w-6 h-6" />,
};

export default function ToolsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            All Our <span className="gradient-text">Calculators</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive UK employment calculators designed for accuracy and
            ease of use. All tools are updated for 2025 rates and regulations.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <a
                href={tool.href}
                className="block h-full glass-effect rounded-card p-8 card-shadow border border-white/20 hover:border-[#7c53ff]/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Tool Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${tool.color}`}
                  >
                    {iconMap[tool.iconName] || (
                      <Calculator className="w-6 h-6" />
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#7c53ff] transition-colors" />
                </div>

                {/* Tool Content */}
                <div className="space-y-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#2c2470]/30 rounded-full text-xs font-medium text-gray-300 mb-3">
                      {tool.category}
                    </span>
                    <h3 className="text-xl font-bold text-primary-text mb-2 group-hover:text-[#7c53ff] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-primary-secondary text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-[#7c53ff] rounded-full"></div>
                        <span className="text-primary-secondary text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action with Natural Backlinks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-card p-8 card-shadow border border-white/20">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Need a Different Calculator?
            </h3>
            <p className="text-primary-secondary mb-6 max-w-2xl mx-auto">
              We're constantly adding new calculators to help with UK employment
              calculations. Let us know what you'd like to see next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white font-semibold px-6 py-3 rounded-xl hover:from-[#6a45e6] hover:to-[#1a1b2a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Suggest a Calculator</span>
              </a>

              <a
                href="https://freetaxcalculator.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Calculator className="w-5 h-5" />
                <span>Explore Tax Calculators</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Additional Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="glass-effect rounded-card p-6 card-shadow border border-white/20">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-primary-text mb-2">
                Enhanced with Advanced Tax Tools
              </h4>
              <p className="text-primary-secondary text-sm">
                Our pro-rata calculators work seamlessly with comprehensive tax
                calculation tools for complete financial planning.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calculator className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-primary-secondary mb-1">Income Tax</p>
                <a
                  href="https://freetaxcalculator.co.uk/income-tax-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-highlight hover:text-primary-text transition-colors text-xs"
                >
                  Advanced Calculator
                </a>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-primary-secondary mb-1">
                  National Insurance
                </p>
                <a
                  href="https://freetaxcalculator.co.uk/national-insurance-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-highlight hover:text-primary-text transition-colors text-xs"
                >
                  NI Calculator
                </a>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-primary-secondary mb-1">Tax Codes</p>
                <a
                  href="https://freetaxcalculator.co.uk/tools/tax-code-checker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-highlight hover:text-primary-text transition-colors text-xs"
                >
                  Code Checker
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
