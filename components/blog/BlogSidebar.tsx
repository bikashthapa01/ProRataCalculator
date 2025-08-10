"use client";

import { motion } from "framer-motion";
import { FolderOpen, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { BlogCategory, BlogPost } from "@/lib/types/blog";

interface BlogSidebarProps {
  categories: BlogCategory[];
  recentPosts?: BlogPost[];
}

export default function BlogSidebar({
  categories,
  recentPosts,
}: BlogSidebarProps) {
  return (
    <div className="space-y-8 lg:sticky lg:top-24">
      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#18192a] rounded-2xl p-6 border border-[#2c2470]/30"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-400" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?category=${category.slug}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-[#2c2470]/20 transition-colors group"
            >
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-gray-500 bg-[#2c2470]/30 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#18192a] rounded-2xl p-6 border border-[#2c2470]/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Posts
          </h3>
          <div className="space-y-4">
            {recentPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start gap-3">
                  {post.featuredImage?.node && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-[#2c2470]/30 to-[#1a1a2e]/50 rounded-2xl p-6 border border-[#2c2470]/30"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Stay Updated
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          Get the latest updates on pro rata calculations and UK employment law.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-[#18192a] border border-[#2c2470]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#2c2470]/60 focus:ring-2 focus:ring-[#2c2470]/20 transition-all duration-300"
          />
          <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
