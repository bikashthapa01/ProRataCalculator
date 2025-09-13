"use client";

import { motion } from "framer-motion";
import { User, Globe, Calendar, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types/blog";

interface AuthorCardProps {
  author: BlogPost["author"]["node"];
  postDate: string;
  readingTime: number;
}

export default function AuthorCard({
  author,
  postDate,
  readingTime,
}: AuthorCardProps) {
  const displayName =
    author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-2xl border border-[#7c53ff]/20 p-6 lg:p-8 shadow-xl backdrop-blur-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          {author.avatar?.url ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#7c53ff]/30">
              <Image
                src={author.avatar.url}
                alt={`${displayName} avatar`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] flex items-center justify-center border-2 border-[#7c53ff]/30">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Author Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h3 className="text-xl font-bold text-white">{displayName}</h3>
            {author.url && (
              <Link
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#9B7FFF] hover:text-[#7c53ff] transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                Visit Profile
              </Link>
            )}
          </div>

          {/* Author Description */}
          {author.description && (
            <p className="text-[#B1B3C7] text-sm leading-relaxed mb-4">
              {author.description}
            </p>
          )}

          {/* Article Stats */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#9B7FFF]">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                Published{" "}
                {new Date(postDate).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {readingTime > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span>{readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Bio Footer */}
      {author.description && (
        <div className="mt-6 pt-4 border-t border-[#7c53ff]/20">
          <div className="flex items-center gap-2 text-sm text-[#B1B3C7]">
            <User className="w-4 h-4 text-[#9B7FFF]" />
            <span>About the author</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
