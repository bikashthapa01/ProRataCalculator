import type { Metadata } from "next";
import { BlogService } from "@/lib/services/blog-service";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { cleanCanonicalUrl } from "@/lib/utils/canonical-url";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await BlogService.getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Pro Rata Calculator Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const featuredImage = post.featuredImage?.node;
  const seo = post.seo;
  const author = post.author?.node;
  const categories = post.categories?.nodes || [];

  // Format dates properly with validation
  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = (() => {
    if (!post.modified || post.modified === post.date) {
      return publishedDate;
    }
    const modified = new Date(post.modified);
    return isNaN(modified.getTime()) ? publishedDate : modified.toISOString();
  })();

  // Create article section from categories
  const articleSection =
    categories.map((cat) => cat.name).join(", ") || "Employment Law";

  return {
    title: seo?.title || post.title,
    description:
      seo?.description || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
    keywords: seo?.focusKeywords
      ? [seo.focusKeywords]
      : [
          "pro rata calculator",
          "UK employment law",
          "salary calculations",
          "employment guide",
          "pro rata work",
          ...categories.map((cat) => cat.name),
        ],
    authors: [
      {
        name: author?.name || "Pro Rata Calculator UK",
        url: author?.url || "https://proratacalculator.co.uk/about",
      },
    ],
    creator: "Pro Rata Calculator UK",
    publisher: "Pro Rata Calculator UK",
    metadataBase: new URL("https://proratacalculator.co.uk"),
    alternates: {
      canonical: cleanCanonicalUrl(seo?.canonicalUrl || "", slug),
    },
    openGraph: {
      title: seo?.title || post.title,
      description:
        seo?.description || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
      url: cleanCanonicalUrl(seo?.canonicalUrl || "", slug),
      siteName: "Pro Rata Calculator UK",
      locale: "en_GB",
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [author?.name || "Pro Rata Calculator UK"],
      section: articleSection,
      tags: categories.map((cat) => cat.name),
      images: [
        {
          url:
            featuredImage?.sourceUrl ||
            seo?.openGraph?.image?.secureUrl ||
            "https://proratacalculator.co.uk/blog-og-image.jpg",
          width: 1200,
          height: 630,
          alt: featuredImage?.altText || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.title || post.title,
      description:
        seo?.description || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
      creator: author?.name || "@ProRataCalcUK",
      images: [
        featuredImage?.sourceUrl ||
          seo?.openGraph?.image?.secureUrl ||
          "https://proratacalculator.co.uk/blog-og-image.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "GB",
      "geo.placename": "United Kingdom",
      "application-name": "Pro Rata Calculator UK",
      "article:published_time": publishedDate,
      "article:modified_time": modifiedDate,
      "article:author": author?.name || "Pro Rata Calculator UK",
      "article:section": articleSection,
      "article:tag": categories.map((cat) => cat.name).join(","),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
