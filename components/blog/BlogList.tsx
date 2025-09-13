"use client";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import type { BlogPost, BlogPageInfo } from "@/lib/types/blog";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  RefreshCw,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";

interface BlogListProps {
  posts: BlogPost[];
  pageInfo: BlogPageInfo | null;
  currentPage?: number;
}

export default function BlogList({
  posts,
  pageInfo,
  currentPage = 1,
}: BlogListProps) {
  // Safety check for undefined posts
  if (!posts || posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-[#18192a] to-[#2c2470]/20 rounded-2xl border border-[#7c53ff]/20 shadow-2xl p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c53ff]/5 to-[#2c2470]/5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7c53ff]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#9B7FFF]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-white mb-4">
              No Articles Yet
            </h3>

            {/* Description */}
            <p className="text-[#B1B3C7] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re working on creating valuable content about UK
              employment law, pro rata calculations, and salary guides. Check
              back soon for expert insights and practical calculators.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.location.reload()}
                className="group flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh Page</span>
              </button>

              <Link
                href="/pro-rata-salary-calculator"
                className="group flex items-center space-x-2 bg-gradient-to-r from-[#18192a] to-[#2c2470]/20 border border-[#7c53ff]/20 text-[#F5F7FA] px-6 py-3 rounded-xl font-semibold hover:from-[#7c53ff]/10 hover:to-[#7c53ff]/20 hover:border-[#7c53ff]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Try Our Calculators</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-[#7c53ff]/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#9B7FFF]">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Coming Soon</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Expert Content</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>UK Focus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Latest Articles
            </h2>
            <p className="text-[#B1B3C7]">
              Discover insights on UK employment law and salary calculations
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-[#9B7FFF]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{posts.length || 0} articles</span>
          </div>
        </div>
      </motion.div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="group"
          >
            <div className="h-full">
              <BlogCard post={post} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pageInfo && (pageInfo.hasNextPage || pageInfo.hasPreviousPage) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {pageInfo.hasPreviousPage && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#18192a] to-[#2c2470]/20 border border-[#7c53ff]/20 text-[#F5F7FA] rounded-xl hover:from-[#7c53ff]/10 hover:to-[#7c53ff]/20 hover:border-[#7c53ff]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous
            </Link>
          )}

          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white rounded-lg font-semibold">
              {currentPage}
            </span>
            <span className="text-[#B1B3C7] text-sm">of</span>
            <span className="text-[#B1B3C7] text-sm">many</span>
          </div>

          {pageInfo.hasNextPage && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#18192a] to-[#2c2470]/20 border border-[#7c53ff]/20 text-[#F5F7FA] rounded-xl hover:from-[#7c53ff]/10 hover:to-[#7c53ff]/20 hover:border-[#7c53ff]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
