"use client";

import { useEffect, useState } from "react";
import BlogList from "@/components/blog/BlogList";
import { BlogService } from "@/lib/services/blog-service";
import type { BlogPost, BlogPageInfo } from "@/lib/types/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pageInfo, setPageInfo] = useState<BlogPageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 12;

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postsData = await BlogService.getBlogPosts(postsPerPage).catch(
          () => BlogService.getMockData()
        );

        if (!postsData || !postsData.posts) {
          throw new Error("Invalid posts data structure received");
        }

        setPosts(postsData.posts.nodes || []);
        setPageInfo(postsData.posts.pageInfo || null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load blog data";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [postsPerPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111221] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7C53FF] mx-auto"></div>
          <p className="mt-6 text-[#B1B3C7] text-lg">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#111221] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#18192a] border border-red-500/20 text-red-400 px-8 py-6 rounded-[24px] mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Unable to load blog posts
            </h2>
            <p className="text-[#B1B3C7]">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white px-8 py-3 rounded-[9999px] font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111221] px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      <div className="max-w-7xl mx-auto">
        <BlogList posts={posts} pageInfo={pageInfo} currentPage={1} />
      </div>
    </div>
  );
}
