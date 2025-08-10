"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("search", searchTerm.trim());
      params.delete("page"); // Reset to first page
      router.push(`/blog?${params.toString()}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSearch}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#B1B3C7]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blog posts..."
          className="w-full pl-12 pr-12 py-4 bg-[#18192a]/80 backdrop-blur-md border border-[#7c53ff]/20 rounded-[9999px] text-[#F5F7FA] placeholder-[#B1B3C7] focus:outline-none focus:ring-2 focus:ring-[#7c53ff]/50 focus:border-[#7c53ff]/40 transition-all duration-300 shadow-lg"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#B1B3C7] hover:text-[#F5F7FA] transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full bg-gradient-to-r from-[#7c53ff] to-[#2c2470] text-white py-4 px-8 rounded-[9999px] font-semibold hover:from-[#6a45e6] hover:to-[#251d5f] transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Search Posts
      </motion.button>
    </motion.form>
  );
}
