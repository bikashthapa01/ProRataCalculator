"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { BlogPost } from "@/lib/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const featuredImage = post.featuredImage?.node;
  const author = post.author?.node;
  const categories = post.categories?.nodes || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group bg-[#18192a] border border-[#7c53ff]/10 rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(45,37,102,0.15)] hover:border-[#7c53ff]/30 hover:shadow-[0_16px_48px_rgba(45,37,102,0.25)] transition-all duration-300"
    >
      {/* Featured Image */}
      <div className="relative aspect-video overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2c2470]/40 to-[#7c53ff]/20 flex items-center justify-center">
            <Tag className="w-8 h-8 text-[#9B7FFF]" />
          </div>
        )}

        {categories.length > 0 && (
          <div className="absolute top-3 left-3">
            <Link
              href={`/blog?category=${categories[0].slug}`}
              className="px-3 py-1 rounded-full bg-[#111221]/80 backdrop-blur-sm border border-white/10 text-xs text-[#F5F7FA] hover:bg-[#111221]/90"
            >
              {categories[0].name}
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#B1B3C7] mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
            </span>
          </div>
          {author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {author.name}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-[#F5F7FA] mb-4 group-hover:text-[#9B7FFF] transition-colors duration-300 leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-[#B1B3C7] mb-6 leading-relaxed line-clamp-3">
          {post.excerpt
            .replace(/<[^>]*>/g, "")
            .replace(/&[^;]+;/g, " ")
            .slice(0, 160)}
          ...
        </p>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-4 h-4 text-[#7c53ff]" />
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="px-3 py-1 bg-[#7c53ff]/10 text-[#9B7FFF] text-sm rounded-full hover:bg-[#7c53ff]/20 transition-colors duration-300 border border-[#7c53ff]/20"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Read More Button */}
        <Link href={`/blog/${post.slug}`}>
          <div className="inline-flex items-center gap-2 text-[#9B7FFF] hover:text-[#7c53ff] font-semibold transition-colors duration-300 group-hover:gap-3">
            Read More
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
          </div>
        </Link>
      </div>
    </motion.article>
  );
}
