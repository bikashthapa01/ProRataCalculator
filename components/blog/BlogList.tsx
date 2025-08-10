"use client";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import type { BlogPost, BlogPageInfo } from "@/lib/types/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="text-center py-16">
        <div className="bg-[#18192a] border border-[#7c53ff]/20 rounded-[24px] p-12">
          <h3 className="text-2xl font-bold text-[#F5F7FA] mb-4">
            No posts found
          </h3>
          <p className="text-[#B1B3C7] text-lg mb-8">
            Try adjusting your search or browse our categories for more content.
          </p>
          <Link
            href="/blog"
            className="bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-3 rounded-[9999px] font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg"
          >
            View All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pageInfo && (pageInfo.hasNextPage || pageInfo.hasPreviousPage) && (
        <div className="flex items-center justify-center gap-4">
          {pageInfo.hasPreviousPage && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#18192a] border border-[#7c53ff]/20 text-[#F5F7FA] rounded-[9999px] hover:bg-[#7c53ff]/10 hover:border-[#7c53ff]/40 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
          )}

          <span className="px-6 py-3 bg-[#18192a] border border-[#7c53ff]/20 text-[#B1B3C7] rounded-[9999px]">
            Page {currentPage}
          </span>

          {pageInfo.hasNextPage && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#18192a] border border-[#7c53ff]/20 text-[#F5F7FA] rounded-[9999px] hover:bg-[#7c53ff]/10 hover:border-[#7c53ff]/40 transition-all duration-300"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
