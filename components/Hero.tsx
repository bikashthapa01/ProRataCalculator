"use client";

import { motion } from "framer-motion";
import { ArrowDown, Calculator, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-from/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-to/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 glass-effect px-6 py-3 rounded-full"
          >
            <Calculator className="w-5 h-5 text-primary-highlight" />
            <span className="text-primary-secondary font-medium">
              Free UK Pro Rata Calculator 2025
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-heading-lg md:text-heading-lg lg:text-heading-lg font-bold text-balance"
          >
            Calculate Your{" "}
            <span className="gradient-text">Pro Rata Salary</span>
            <br />
            in Seconds
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-primary-secondary max-w-3xl mx-auto text-balance"
          >
            Work out your pro rata salary, pay, and holiday entitlement for
            part-time, reduced hours, or temporary work. Accurate calculations
            for UK employment law compliance in 2025.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-secondary"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-from rounded-full"></div>
              <span>Instant calculations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-from rounded-full"></div>
              <span>UK compliant 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-from rounded-full"></div>
              <span>100% free</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#calculator"
              className="button-primary flex items-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate Pro Rata</span>
            </a>
            <a
              href="#how-it-works"
              className="button-secondary flex items-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Learn How It Works</span>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-primary-secondary text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>No registration required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Data stays private</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>HMRC compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-primary-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
