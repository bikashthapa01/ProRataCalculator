import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

interface BlogPostSitemap {
  slug: string;
  date: string;
  modified?: string;
  seo?: {
    canonicalUrl?: string;
  };
}

interface CategorySitemap {
  slug: string;
  count: number;
}

async function getBlogPosts(): Promise<BlogPostSitemap[]> {
  try {
    const response = await fetch(
      "https://cms.proratacalculator.co.uk/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetAllBlogPosts {
            posts(first: 100) {
              nodes {
                slug
                date
                modified
                seo {
                  canonicalUrl
                }
              }
            }
          }
        `,
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch blog posts for sitemap");
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return [];
    }

    return data.data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

async function getBlogCategories(): Promise<CategorySitemap[]> {
  try {
    const response = await fetch(
      "https://cms.proratacalculator.co.uk/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetCategories {
            categories {
              nodes {
                slug
                count
              }
            }
          }
        `,
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch categories for sitemap");
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return [];
    }

    return data.data?.categories?.nodes || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://proratacalculator.co.uk";
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic tool pages
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog posts from CMS
  const blogPosts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Blog categories from CMS
  const categories = await getBlogCategories();
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => category.count > 0) // Only include categories with posts
    .map((category) => ({
      url: `${baseUrl}/blog?category=${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticPages, ...toolPages, ...blogPages, ...categoryPages];
}
