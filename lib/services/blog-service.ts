import { client } from "../graphql-client";
import {
  GET_BLOG_POSTS,
  GET_BLOG_POST,
  GET_CATEGORIES,
  GET_TAGS,
  GET_BLOG_SEARCH,
  GET_FEATURED_POSTS,
} from "../graphql/queries";
import type {
  BlogPost,
  BlogCategory,
  BlogTag,
  BlogPostsResponse,
} from "../types/blog";

export class BlogService {
  static async healthCheck(): Promise<boolean> {
    try {
      console.log("Performing health check on WordPress CMS...");

      const response = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "{ posts { nodes { id title } } }",
          }),
          signal: AbortSignal.timeout(5000), // 5 second timeout
        }
      );

      console.log("Health check response status:", response.status);
      console.log(
        "Health check response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        console.error(
          "Health check failed:",
          response.status,
          response.statusText
        );
        return false;
      }

      const data = await response.json();
      console.log("Health check response data:", data);
      console.log(
        "Health check data structure:",
        JSON.stringify(data, null, 2)
      );

      const isValid = !!(data && data.data && data.data.posts);
      console.log("Health check result:", isValid);

      return isValid;
    } catch (error) {
      console.error(
        "Direct fetch health check failed, trying Apollo client:",
        error
      );

      // Fallback to Apollo client health check
      try {
        console.log("Trying simple query test as fallback...");
        const simpleQueryWorks = await this.testSimpleQuery();
        if (simpleQueryWorks) {
          console.log("Simple query works, trying Apollo client...");
          return await this.testConnection();
        }
        return false;
      } catch (apolloError) {
        console.error("Apollo client health check also failed:", apolloError);
        return false;
      }
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const { data } = await client.query({
        query: GET_BLOG_POSTS,
        variables: { first: 1 },
        fetchPolicy: "network-only",
      });

      console.log("Connection test successful:", data);
      return !!(data && data.posts);
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }

  static async testSimpleQuery(): Promise<boolean> {
    try {
      console.log("Testing simple GraphQL query...");

      const response = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "{ __schema { types { name } } }",
          }),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        console.error(
          "Simple query test failed:",
          response.status,
          response.statusText
        );
        return false;
      }

      const data = await response.json();
      console.log("Simple query response:", data);

      return !!(data && data.data);
    } catch (error) {
      console.error("Simple query test error:", error);
      return false;
    }
  }

  static async checkWordPressStatus(): Promise<{
    accessible: boolean;
    status?: number;
    error?: string;
  }> {
    try {
      console.log("Checking WordPress CMS GraphQL endpoint...");
      console.log("Current environment:", process.env.NODE_ENV);
      console.log(
        "GraphQL endpoint:",
        "https://cms.proratacalculator.co.uk/graphql"
      );

      // Check GraphQL endpoint directly with a minimal query
      const graphqlResponse = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "{ posts { nodes { id } } }",
          }),
          signal: AbortSignal.timeout(5000),
        }
      );

      console.log("GraphQL endpoint status:", graphqlResponse.status);

      if (!graphqlResponse.ok) {
        return { accessible: false, status: graphqlResponse.status };
      }

      const data = await graphqlResponse.json();
      console.log("GraphQL test response:", data);

      return { accessible: !!(data && data.data && data.data.posts) };
    } catch (error) {
      console.error("WordPress GraphQL status check error:", error);

      // Check if it's a CORS issue by attempting a simple query
      if (error instanceof Error && error.message.includes("CORS")) {
        return {
          accessible: false,
          error: "CORS policy blocked the request",
        };
      }

      return {
        accessible: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static async testMinimalQueries(): Promise<{
    basic: boolean;
    posts: boolean;
    error?: string;
  }> {
    try {
      console.log("Testing minimal GraphQL queries...");

      // Test 1: Basic introspection
      const basicResponse = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "{ __typename }",
          }),
          signal: AbortSignal.timeout(5000),
        }
      );

      const basicData = await basicResponse.json();
      console.log("Basic query response:", basicData);
      const basicWorks = !!(basicData && basicData.data);

      // Test 2: Minimal posts query
      const postsResponse = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "{ posts { nodes { id } } }",
          }),
          signal: AbortSignal.timeout(5000),
        }
      );

      const postsData = await postsResponse.json();
      console.log("Posts query response:", postsData);
      const postsWorks = !!(
        postsData &&
        postsData.data &&
        postsData.data.posts
      );

      return { basic: basicWorks, posts: postsWorks };
    } catch (error) {
      console.error("Minimal queries test error:", error);
      return {
        basic: false,
        posts: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static async testGraphQLSchema(): Promise<{
    available: boolean;
    types?: string[];
    error?: string;
  }> {
    try {
      console.log("Testing GraphQL schema...");

      const response = await fetch(
        "https://cms.proratacalculator.co.uk/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query IntrospectionQuery {
              __schema {
                types {
                  name
                  kind
                  description
                }
              }
            }
          `,
          }),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        return { available: false, error: `HTTP ${response.status}` };
      }

      const data = await response.json();
      console.log("Schema introspection response:", data);

      if (data.errors) {
        return {
          available: false,
          error: `GraphQL errors: ${data.errors
            .map((e: { message: string }) => e.message)
            .join(", ")}`,
        };
      }

      if (data.data && data.data.__schema && data.data.__schema.types) {
        const types = data.data.__schema.types
          .filter((t: { name: string; kind: string }) => t.kind === "OBJECT")
          .map((t: { name: string }) => t.name);

        console.log("Available GraphQL types:", types);
        return { available: true, types };
      }

      return { available: false, error: "No schema data found" };
    } catch (error) {
      console.error("Schema test error:", error);
      return {
        available: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  static getMockData(): BlogPostsResponse {
    return {
      posts: {
        nodes: [
          {
            id: "mock-1",
            title: "Sample Blog Post",
            content:
              "This is a sample blog post content that appears when the blog service is unavailable.",
            excerpt: "Sample blog post excerpt...",
            slug: "sample-post",
            date: new Date().toISOString(),
            modified: new Date().toISOString(),
            author: {
              node: {
                name: "Admin",
              },
            },
            featuredImage: null,
            categories: {
              nodes: [],
            },
            tags: {
              nodes: [],
            },
            seo: {
              title: "Sample Blog Post",
            },
          },
        ],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "",
          endCursor: "",
        },
      },
    };
  }

  static async getBlogPosts(
    first: number = 10,
    after?: string,
    categorySlug?: string,
    search?: string,
    retries: number = 2
  ): Promise<BlogPostsResponse> {
    try {
      console.log("Attempting to fetch blog posts with variables:", {
        first,
        after,
        categorySlug,
        search,
      });
      const result = await client.query({
        query: GET_BLOG_POSTS,
        variables: {
          first,
          after,
          categoryName: categorySlug || undefined,
          search,
        },
        fetchPolicy: "cache-first",
      });

      // Log full Apollo result for visibility
      console.log("Apollo query result keys:", Object.keys(result));
      if (result.errors && result.errors.length > 0) {
        console.error(
          "Apollo GraphQL errors:",
          result.errors.map((e: { message?: string }) => e.message || String(e))
        );
        // Return safe fallback to avoid UI crash
        return BlogService.getMockData();
      }

      const data = result.data as BlogPostsResponse | undefined;

      // Add debugging to see what's actually returned
      console.log("GraphQL response data:", data);
      console.log("Data type:", typeof data);
      if (data) {
        console.log("Data keys:", Object.keys(data as object));
      } else {
        console.log("Data keys: data is null/undefined");
      }

      // Ensure we always return a valid shape
      if (!data || !data.posts) {
        console.error("GraphQL response missing posts field:", data);
        console.error("Returning mock data fallback to maintain UI stability");
        return BlogService.getMockData();
      }

      return data;
    } catch (error) {
      console.error(
        `Error fetching blog posts (attempt ${3 - retries}):`,
        error
      );

      // Retry on network errors
      if (
        retries > 0 &&
        error instanceof Error &&
        (error.message.includes("Network") || error.message.includes("timeout"))
      ) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
        return this.getBlogPosts(
          first,
          after,
          categorySlug,
          search,
          retries - 1
        );
      }

      // Final fallback to prevent crashes
      console.warn("All retries failed. Returning mock data for posts.");
      return BlogService.getMockData();
    }
  }

  static async getBlogPost(slug: string): Promise<BlogPost> {
    try {
      const { data } = await client.query({
        query: GET_BLOG_POST,
        variables: { slug },
        fetchPolicy: "cache-first",
      });
      return data.post;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw new Error("Failed to fetch blog post");
    }
  }

  static async getCategories(): Promise<BlogCategory[]> {
    try {
      const { data } = await client.query({
        query: GET_CATEGORIES,
        fetchPolicy: "cache-first",
      });

      return data.categories.nodes;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }

  static async getTags(): Promise<BlogTag[]> {
    try {
      const { data } = await client.query({
        query: GET_TAGS,
        fetchPolicy: "cache-first",
      });
      return data.tags.nodes;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw new Error("Failed to fetch tags");
    }
  }

  static async searchBlogPosts(
    search: string,
    first: number = 10
  ): Promise<BlogPost[]> {
    try {
      const { data } = await client.query({
        query: GET_BLOG_SEARCH,
        variables: { search, first },
        fetchPolicy: "network-only", // Always fresh results for search
      });
      return data.posts.nodes;
    } catch (error) {
      console.error("Error searching blog posts:", error);
      throw new Error("Failed to search blog posts");
    }
  }

  static async getFeaturedPosts(first: number = 3): Promise<BlogPost[]> {
    try {
      const { data } = await client.query({
        query: GET_FEATURED_POSTS,
        variables: { first },
        fetchPolicy: "cache-first",
      });
      return data.posts.nodes;
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      throw new Error("Failed to fetch featured posts");
    }
  }
}
