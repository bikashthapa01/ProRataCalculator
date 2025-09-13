"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className = "", animate = true }: SkeletonProps) {
  return (
    <div
      className={`bg-gradient-to-r from-[#2c2470]/20 via-[#7c53ff]/10 to-[#2c2470]/20 rounded ${
        animate ? "animate-pulse" : ""
      } ${className}`}
    />
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-3xl border border-[#7c53ff]/20 shadow-2xl overflow-hidden w-full backdrop-blur-sm">
      {/* Featured Image Skeleton */}
      <div className="aspect-video bg-gradient-to-r from-[#2c2470]/20 via-[#7c53ff]/10 to-[#2c2470]/20 animate-pulse" />

      <div className="p-8 lg:p-12 max-w-4xl mx-auto">
        {/* Categories Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-8 w-3/4" />
        </div>

        {/* Meta Information Skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6 mb-2" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-2xl border border-[#7c53ff]/20 shadow-xl overflow-hidden backdrop-blur-sm"
        >
          {/* Image Skeleton */}
          <div className="aspect-video bg-gradient-to-r from-[#2c2470]/20 via-[#7c53ff]/10 to-[#2c2470]/20 animate-pulse" />

          <div className="p-6">
            {/* Category Skeleton */}
            <Skeleton className="h-6 w-20 rounded-full mb-4" />

            {/* Title Skeleton */}
            <div className="mb-4">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>

            {/* Excerpt Skeleton */}
            <div className="mb-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Meta Skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function AuthorCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-2xl border border-[#7c53ff]/20 p-6 lg:p-8 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar Skeleton */}
        <div className="flex-shrink-0">
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>

        {/* Author Info Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>

          {/* Description Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Stats Skeleton */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
