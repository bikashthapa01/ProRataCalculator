"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Mail,
  Shield,
  FileText,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-primary-border">
      <div className="max-w-container mx-auto px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-primary-text">
                  Pro Rata Calculator
                </div>
                <div className="text-sm text-primary-secondary">UK 2025</div>
              </div>
            </Link>
            <p className="text-primary-secondary mb-6 max-w-md">
              Free UK pro rata calculator for accurate salary calculations.
              HMRC-compliant calculations for part-time, reduced hours, and
              temporary work arrangements.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:contact@proratacalculator.co.uk"
                className="flex items-center space-x-2 text-primary-secondary hover:text-primary-highlight transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">Contact</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-primary-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-primary-text mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-primary-secondary hover:text-primary-highlight transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-primary-border mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-primary-secondary text-sm">
              © 2025 Pro Rata Calculator UK. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-primary-secondary">
              <span>HMRC Compliant</span>
              <span>UK Employment Law</span>
              <span>Free to Use</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
