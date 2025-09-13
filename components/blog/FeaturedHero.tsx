"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/types/blog";

interface FeaturedHeroProps {
  post: BlogPost;
}

export default function FeaturedHero({ post }: FeaturedHeroProps) {
  const featuredImage = post.featuredImage?.node;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[24px] bg-card border border-[#7c53ff]/10 shadow-card"
    >
      <div className="relative h-[260px] sm:h-[340px] lg:h-[480px]">
        {featuredImage && (
          <Image
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || post.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-cover"
            unoptimized
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111221] via-[#111221]/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end p-6 sm:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c53ff]/20 border border-[#7c53ff]/30 text-[#9B7FFF] text-xs sm:text-sm mb-3">
              Featured
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-[1.5rem] sm:text-[2rem] lg:text-[2.75rem] font-bold text-primary-text leading-tight mb-3 sm:mb-4">
                {post.title}
              </h2>
            </Link>
            <p className="hidden sm:block text-secondary-text max-w-2xl line-clamp-2">
              {post.excerpt.replace(/<[^>]*>/g, "").slice(0, 180)}...
            </p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-from to-accent-to text-white px-6 py-3 rounded-button font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg"
              >
                Read article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
