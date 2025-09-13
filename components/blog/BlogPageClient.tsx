"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, TrendingUp, Users, BookOpen } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogListSkeleton } from "@/components/blog/SkeletonLoader";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost, BlogPageInfo } from "@/lib/types/blog";

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pageInfo, setPageInfo] = useState<BlogPageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 12;

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postsData = await BlogService.getBlogPosts(postsPerPage);

        if (!postsData || !postsData.posts) {
          setPosts([]);
          setPageInfo(null);
          return;
        }

        const posts = postsData.posts.nodes || [];
        setPosts(posts);
        setPageInfo(postsData.posts.pageInfo || null);

        // If we have no posts, don't treat it as an error
        if (posts.length === 0) {
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load blog data";
        setError(message);
        setPosts([]); // Clear posts on error
        setPageInfo(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [postsPerPage]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
        <Header />
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c53ff]/5 to-[#2c2470]/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-6 py-3 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Latest Updates</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                  Pro Rata Calculator Blog
                </span>
              </h1>

              <p className="text-xl text-[#B1B3C7] max-w-3xl mx-auto mb-8 leading-relaxed">
                Expert insights on UK employment law, salary calculations, and
                pro rata work. Stay updated with the latest employment news and
                practical guides.
              </p>

              {/* Search and Filter Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9B7FFF] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#18192a]/50 border border-[#7c53ff]/20 rounded-xl px-12 py-4 text-white placeholder-[#9B7FFF] focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent backdrop-blur-sm"
                  />
                  <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9B7FFF] w-5 h-5" />
                </div>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Loading...</p>
                    <p className="text-[#B1B3C7] text-sm">Articles Published</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">2025</p>
                    <p className="text-[#B1B3C7] text-sm">Latest Updates</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">UK</p>
                    <p className="text-[#B1B3C7] text-sm">Employment Focus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <BlogListSkeleton />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-500/30 text-red-300 px-8 py-8 rounded-2xl mb-8 backdrop-blur-sm">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Unable to load blog posts
            </h2>
            <p className="text-[#B1B3C7]">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111221] via-[#18192a] to-[#111221]">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7c53ff]/5 to-[#2c2470]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-6 py-3 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Latest Updates</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#7c53ff] via-[#9B7FFF] to-[#2c2470] bg-clip-text text-transparent">
                Pro Rata Calculator Blog
              </span>
            </h1>

            <p className="text-xl text-[#B1B3C7] max-w-3xl mx-auto mb-8 leading-relaxed">
              Expert insights on UK employment law, salary calculations, and pro
              rata work. Stay updated with the latest employment news and
              practical guides.
            </p>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9B7FFF] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#18192a]/50 border border-[#7c53ff]/20 rounded-xl px-12 py-4 text-white placeholder-[#9B7FFF] focus:outline-none focus:ring-2 focus:ring-[#7c53ff] focus:border-transparent backdrop-blur-sm"
                />
                <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9B7FFF] w-5 h-5" />
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#7c53ff] to-[#9B7FFF] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {posts.length || 0}
                  </p>
                  <p className="text-[#B1B3C7] text-sm">Articles Published</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2025</p>
                  <p className="text-[#B1B3C7] text-sm">Latest Updates</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 card-shadow border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">UK</p>
                  <p className="text-[#B1B3C7] text-sm">Employment Focus</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <BlogList posts={filteredPosts} pageInfo={pageInfo} currentPage={1} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
