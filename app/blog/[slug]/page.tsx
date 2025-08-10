"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost } from "@/lib/types/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await BlogService.getBlogPost(slug);
        setPost(postData);
      } catch (error) {
        console.error("Error loading blog post:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load blog post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111221]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C53FF] mx-auto"></div>
            <p className="mt-4 text-[#B1B3C7]">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#111221]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="text-center">
            <div className="bg-red-900/20 border border-red-500/40 text-red-300 px-4 py-3 rounded mb-6">
              <p className="font-medium">Error loading blog post</p>
              <p className="text-sm">{error || "Post not found"}</p>
            </div>
            <Link
              href="/blog"
              className="bg-[#7C53FF] text-white px-6 py-2 rounded-lg hover:bg-[#6a45e6] transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredImage = post.featuredImage?.node;
  const author = post.author?.node;
  const categories = post.categories?.nodes || [];

  return (
    <div className="min-h-screen bg-[#111221]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#9B7FFF] hover:text-[#7c53ff] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#18192a] rounded-2xl border border-[#7c53ff]/10 shadow-card overflow-hidden"
        >
          {featuredImage && (
            <div className="aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage.sourceUrl}
                alt={featuredImage.altText || post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex items-center gap-6 text-sm text-[#B1B3C7] mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDistanceToNow(new Date(post.date), {
                    addSuffix: true,
                  })}
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
            <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <Tag className="w-4 h-4 text-[#9B7FFF]" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className="px-3 py-1 bg-[#7c53ff]/10 text-[#9B7FFF] text-sm rounded-full hover:bg-[#7c53ff]/20 transition-colors border border-[#7c53ff]/20"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="leading-relaxed"
              />
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
