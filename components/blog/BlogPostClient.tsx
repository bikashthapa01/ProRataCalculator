"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  BookOpen,
  Clock,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorCard from "@/components/blog/AuthorCard";
import {
  BlogPostSkeleton,
  AuthorCardSkeleton,
} from "@/components/blog/SkeletonLoader";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost } from "@/lib/types/blog";
import { useEffect, useState } from "react";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingTime, setReadingTime] = useState<number>(0);

  // Calculate reading time based on content
  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
          url: window.location.href,
        });
      } catch {
        // Fallback to copy URL
        navigator.clipboard.writeText(window.location.href);
        setShowShareMenu(false);
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      setShowShareMenu(false);
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await BlogService.getBlogPost(slug);
        setPost(postData);

        if (postData?.content) {
          setReadingTime(calculateReadingTime(postData.content));
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load blog post";
        setError(message);
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
      <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
        <Header />
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <nav className="flex items-center space-x-2 text-sm text-[#B1B3C7] mb-4">
              <Link href="/" className="hover:text-[#9B7FFF] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-[#9B7FFF] transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#9B7FFF]">Loading...</span>
            </nav>

            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#9B7FFF] hover:text-[#7c53ff] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Skeleton */}
          <BlogPostSkeleton />

          {/* Author Skeleton */}
          <div className="mt-12">
            <AuthorCardSkeleton />
          </div>

          {/* Related Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 w-full"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                  More Articles
                </span>
              </h2>
              <p className="text-[#B1B3C7] text-lg">
                Explore more insights on UK employment law and salary
                calculations
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-3xl border border-[#7c53ff]/20 p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Discover More Content
                </h3>
                <p className="text-[#B1B3C7] mb-6 max-w-2xl mx-auto">
                  Stay updated with the latest employment law changes, salary
                  calculation guides, and pro rata insights for UK workers.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  View All Articles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
        <Header />
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 text-red-300 px-8 py-8 rounded-2xl mb-8 backdrop-blur-sm">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
                <p className="text-[#B1B3C7]">
                  {error || "The requested article could not be found."}
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const featuredImage = post.featuredImage?.node;
  const author = post.author?.node;
  const categories = post.categories?.nodes || [];

  return (
    <>
      {/* Schema.org JSON-LD for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description:
              post.seo?.description ||
              post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
            image: featuredImage
              ? featuredImage.sourceUrl
              : post.seo?.openGraph?.image?.secureUrl ||
                "https://proratacalculator.co.uk/blog-og-image.jpg",
            datePublished: new Date(post.date).toISOString(),
            dateModified: (() => {
              if (!post.modified || post.modified === post.date) {
                return new Date(post.date).toISOString();
              }
              const modified = new Date(post.modified);
              return isNaN(modified.getTime())
                ? new Date(post.date).toISOString()
                : modified.toISOString();
            })(),
            author: {
              "@type": "Person",
              name: author?.name || "Pro Rata Calculator UK",
              url: author?.url || "https://proratacalculator.co.uk/about",
              description: author?.description,
              image: author?.avatar?.url,
            },
            publisher: {
              "@type": "Organization",
              name: "Pro Rata Calculator UK",
              url: "https://proratacalculator.co.uk",
              logo: {
                "@type": "ImageObject",
                url: "https://proratacalculator.co.uk/logo.png",
                width: 200,
                height: 200,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://proratacalculator.co.uk/blog/${slug}`,
            },
            articleSection:
              categories.map((cat) => cat.name).join(", ") || "Employment Law",
            keywords: post.seo?.focusKeywords || [
              "pro rata calculator",
              "UK employment law",
              "salary calculations",
            ],
            wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
            timeRequired: `PT${readingTime}M`,
            inLanguage: "en-GB",
            isAccessibleForFree: true,
            genre: "Educational",
            about: {
              "@type": "Thing",
              name: "UK Employment Law",
              description:
                "Pro rata calculations and employment law in the United Kingdom",
            },
            mentions: categories.map((cat) => ({
              "@type": "Thing",
              name: cat.name,
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
        <Header />
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <nav className="flex items-center space-x-2 text-sm text-[#B1B3C7] mb-4">
              <Link href="/" className="hover:text-[#9B7FFF] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-[#9B7FFF] transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#9B7FFF]">{post.title}</span>
            </nav>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-3xl border border-[#7c53ff]/20 shadow-2xl overflow-hidden w-full backdrop-blur-sm"
          >
            <div className="p-8 lg:p-12 max-w-7xl mx-auto">
              {/* Title and Share Button */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight flex-1">
                  <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                    {post.title}
                  </span>
                </h1>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 rounded-full bg-[#7c53ff]/10 hover:bg-[#7c53ff]/20 border border-[#7c53ff]/30 text-[#9B7FFF] hover:text-[#7c53ff] transition-all duration-300 hover:scale-110"
                    aria-label="Share article"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 bg-[#18192a] border border-[#7c53ff]/30 rounded-xl p-2 shadow-xl backdrop-blur-sm z-10"
                      >
                        <button
                          onClick={handleShare}
                          className="w-full px-4 py-2 text-sm text-[#B1B3C7] hover:text-white hover:bg-[#7c53ff]/10 rounded-lg transition-colors text-left"
                        >
                          Share Article
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#B1B3C7] mb-8">
                {author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#9B7FFF]" />
                    <span className="text-white font-medium">
                      {author.firstName && author.lastName
                        ? `${author.firstName} ${author.lastName}`
                        : author.name}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#9B7FFF]" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                {readingTime > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#9B7FFF]" />
                    <span>{readingTime} min read</span>
                  </div>
                )}

                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#9B7FFF]" />
                    <span>{categories.map((cat) => cat.name).join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="bg-gradient-to-r from-[#7c53ff]/5 to-[#2c2470]/5 border-l-4 border-[#7c53ff] p-6 rounded-r-xl mb-8">
                  <div
                    className="text-lg text-[#B1B3C7] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <div
                  className="text-[#E5E7EB] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </motion.article>

          {/* Author Information */}
          {author && (
            <div className="mt-12">
              <AuthorCard
                author={author}
                postDate={post.date}
                readingTime={readingTime}
              />
            </div>
          )}

          {/* Related Posts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 w-full"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                  More Articles
                </span>
              </h2>
              <p className="text-[#B1B3C7] text-lg">
                Explore more insights on UK employment law and salary
                calculations
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#18192a] to-[#1a1b2e] rounded-3xl border border-[#7c53ff]/20 p-8 lg:p-12 shadow-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Discover More Content
                </h3>
                <p className="text-[#B1B3C7] mb-6 max-w-2xl mx-auto">
                  Stay updated with the latest employment law changes, salary
                  calculation guides, and pro rata insights for UK workers.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  View All Articles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
