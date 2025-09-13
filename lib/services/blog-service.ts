import type {
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogPostsResponse,
} from "../types/blog";
import { filterTermTimeSalaryPost } from "../utils/content-filter";

export class BlogService {
  static async getBlogPosts(
    first: number = 10,
    after?: string,
    categorySlug?: string,
    search?: string,
    retries: number = 2
  ): Promise<BlogPostsResponse> {
    try {
      // Use direct fetch for WordPress CMS
      const response = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query GetBlogPosts($first: Int) {
              posts(first: $first) {
                nodes {
                  id
                  title
                  slug
                  date
                  excerpt
                  content
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  seo {
                    title
                    description
                    focusKeywords
                    openGraph {
                      title
                      description
                      image {
                        secureUrl
                      }
                    }
                    canonicalUrl
                    breadcrumbTitle
                  }
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
            }
          `,
            variables: { first },
          }),
        }
      );

      if (!response.ok) {
        // Check for CORS issues
        if (response.status === 0 || response.statusText === "") {
          throw new Error(
            "CORS Error: WordPress site may not allow requests from localhost. Please check CORS settings on your WordPress site."
          );
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      if (!data.data?.posts?.nodes) {
        throw new Error("No posts found in response");
      }

      // Apply content filtering to all posts
      const filteredData = {
        ...data.data,
        posts: {
          ...data.data.posts,
          nodes: data.data.posts.nodes.map((post: BlogPost) => {
            if (post.slug === "term-time-vs-full-time-salary") {
              return filterTermTimeSalaryPost(post);
            }
            return post;
          }),
        },
      };

      return filteredData;
    } catch (error) {
      console.error(`Error fetching blog posts:`, error);

      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes("CORS")) {
          throw new Error(
            "CORS Error: Your WordPress site is blocking requests from localhost. Please install and configure the WPGraphQL-CORS plugin on your WordPress site to allow localhost requests."
          );
        }

        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          throw new Error(
            "Network Error: Unable to connect to WordPress CMS. Please check your internet connection and ensure the WordPress site is accessible."
          );
        }

        if (error.message.includes("timeout")) {
          throw new Error(
            "Timeout Error: WordPress CMS is taking too long to respond. The site may be slow or unavailable."
          );
        }
      }

      // Retry on network errors
      if (
        retries > 0 &&
        error instanceof Error &&
        (error.message.includes("Network") || error.message.includes("timeout"))
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        return this.getBlogPosts(
          first,
          after,
          categorySlug,
          search,
          retries - 1
        );
      }

      // Final fallback - throw error instead of returning mock data
      throw new Error(
        "Failed to connect to WordPress CMS. Please check your connection and try again."
      );
    }
  }

  static async getBlogPost(slug: string): Promise<BlogPost> {
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
            query GetBlogPost($slug: ID!) {
              post(id: $slug, idType: SLUG) {
                id
                title
                content
                excerpt
                slug
                date
                modified
                author {
                  node {
                    id
                    name
                    firstName
                    lastName
                    description
                    avatar {
                      url
                    }
                    url
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                categories {
                  nodes {
                    id
                    name
                    slug
                    count
                    description
                  }
                }
                tags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                seo {
                  title
                  description
                  focusKeywords
                  openGraph {
                    title
                    description
                    image {
                      secureUrl
                    }
                  }
                  canonicalUrl
                  breadcrumbTitle
                }
              }
            }
          `,
            variables: { slug },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      if (!data.data?.post) {
        throw new Error(`Post with slug "${slug}" not found`);
      }

      let post = data.data.post;

      // Apply content filtering for specific posts
      if (slug === "term-time-vs-full-time-salary") {
        post = filterTermTimeSalaryPost(post);
      }

      return post;
    } catch {
      throw new Error("Failed to fetch blog post");
    }
  }

  static async getCategories(): Promise<BlogCategory[]> {
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
                  id
                  name
                  slug
                  count
                  description
                  seo {
                    title
                    description
                    focusKeywords
                    openGraph {
                      title
                      description
                      image {
                        secureUrl
                      }
                    }
                    canonicalUrl
                    breadcrumbTitle
                  }
                }
              }
            }
          `,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      return data.data.categories.nodes;
    } catch {
      throw new Error("Failed to fetch categories");
    }
  }

  static async getTags(): Promise<BlogTag[]> {
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
            query GetTags {
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
            }
          `,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      return data.data.tags.nodes;
    } catch {
      throw new Error("Failed to fetch tags");
    }
  }

  static async searchBlogPosts(
    search: string,
    first: number = 10
  ): Promise<BlogPost[]> {
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
            query GetBlogSearch($search: String!, $first: Int) {
              posts(first: $first, where: { search: $search }) {
                nodes {
                  id
                  title
                  content
                  excerpt
                  slug
                  date
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  seo {
                    title
                    description
                    focusKeywords
                    openGraph {
                      title
                      description
                      image {
                        secureUrl
                      }
                    }
                    canonicalUrl
                    breadcrumbTitle
                  }
                }
              }
            }
          `,
            variables: { search, first },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      return data.data.posts.nodes;
    } catch {
      throw new Error("Failed to search blog posts");
    }
  }

  static async getFeaturedPosts(first: number = 3): Promise<BlogPost[]> {
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
            query GetFeaturedPosts($first: Int) {
              posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
                nodes {
                  id
                  title
                  content
                  excerpt
                  slug
                  date
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  seo {
                    title
                    description
                    focusKeywords
                    openGraph {
                      title
                      description
                      image {
                        secureUrl
                      }
                    }
                    canonicalUrl
                    breadcrumbTitle
                  }
                }
              }
            }
          `,
            variables: { first },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(
          `GraphQL errors: ${data.errors
            .map((e: { message?: string }) => e.message || String(e))
            .join(", ")}`
        );
      }

      return data.data.posts.nodes;
    } catch {
      throw new Error("Failed to fetch featured posts");
    }
  }
}
