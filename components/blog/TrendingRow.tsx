"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/types/blog";

interface TrendingRowProps {
  posts: BlogPost[];
}

export default function TrendingRow({ posts }: TrendingRowProps) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.slice(0, 3).map((post, idx) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="rounded-2xl overflow-hidden border border-[#7c53ff]/10 bg-card hover:border-[#7c53ff]/30 transition-colors group"
        >
          <div className="relative h-40">
            {post.featuredImage?.node && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-white font-semibold leading-snug line-clamp-2 group-hover:text-[#9B7FFF] transition-colors">
                {post.title}
              </h3>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
