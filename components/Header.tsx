"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calculator } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary-border">
      <div className="max-w-container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-lg text-primary-text">
              Pro Rata Calculator
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-primary-text hover:text-primary-highlight transition-colors font-medium"
            >
              Calculator
            </Link>
            <Link
              href="/pro-rata-salary-calculator"
              className="text-primary-text hover:text-primary-highlight transition-colors font-medium"
            >
              Salary Calculator
            </Link>
            <Link
              href="/about"
              className="text-primary-text hover:text-primary-highlight transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-primary-text hover:text-primary-highlight transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-primary-text hover:text-primary-highlight transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-primary-text hover:text-primary-highlight transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-primary-border"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="/"
                  className="block text-primary-text hover:text-primary-highlight transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Calculator
                </Link>
                <Link
                  href="/pro-rata-salary-calculator"
                  className="block text-primary-text hover:text-primary-highlight transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Salary Calculator
                </Link>
                <Link
                  href="/about"
                  className="block text-primary-text hover:text-primary-highlight transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className="block text-primary-text hover:text-primary-highlight transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="block text-primary-text hover:text-primary-highlight transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
