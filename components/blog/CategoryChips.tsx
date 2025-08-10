"use client";
import Link from "next/link";
import type { BlogCategory } from "@/lib/types/blog";

interface CategoryChipsProps {
  categories: BlogCategory[];
  activeSlug?: string | null;
}

export default function CategoryChips({
  categories,
  activeSlug,
}: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-1">
      <div className="inline-flex items-center gap-2 px-1">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-colors ${
            !activeSlug
              ? "bg-[#7c53ff] border-[#7c53ff] text-white"
              : "bg-card border-[#7c53ff]/20 text-secondary-text hover:border-[#7c53ff]/40"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/blog?category=${c.slug}`}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-colors ${
              activeSlug === c.slug
                ? "bg-[#7c53ff] border-[#7c53ff] text-white"
                : "bg-card border-[#7c53ff]/20 text-secondary-text hover:border-[#7c53ff]/40"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
