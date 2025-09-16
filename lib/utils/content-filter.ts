// Content filtering utility for headless CMS integration
// Transforms content from cms.proratacalculator.co.uk to proratacalculator.co.uk

import { cleanCanonicalUrl } from "./canonical-url";

export interface ContentFilterOptions {
  sourceUrl: string;
  targetUrl: string;
  preserveLinks?: boolean;
  updateImages?: boolean;
  updateInternalLinks?: boolean;
}

export class ContentFilter {
  private sourceDomain: string;
  private targetDomain: string;
  private options: ContentFilterOptions;

  constructor(options: ContentFilterOptions) {
    this.sourceDomain = new URL(options.sourceUrl).hostname;
    this.targetDomain = new URL(options.targetUrl).hostname;
    this.options = options;
  }

  /**
   * Filter and transform content from headless CMS
   */
  filterContent(content: string): string {
    let filteredContent = content;

    // Update internal links
    if (this.options.updateInternalLinks !== false) {
      filteredContent = this.updateInternalLinks(filteredContent);
    }

    // Update image URLs
    if (this.options.updateImages !== false) {
      filteredContent = this.updateImageUrls(filteredContent);
    }

    // Update any remaining CMS URLs
    filteredContent = this.updateCmsUrls(filteredContent);

    return filteredContent;
  }

  /**
   * Update internal links to point to main site
   */
  private updateInternalLinks(content: string): string {
    const linkRegex =
      /href=["']([^"']*cms\.proratacalculator\.co\.uk[^"']*)["']/g;

    return content.replace(linkRegex, (match, url) => {
      try {
        const parsedUrl = new URL(url);
        const newPath = parsedUrl.pathname.replace(
          "/term-time-vs-full-time-salary/",
          "/blog/term-time-vs-full-time-salary"
        );
        const newUrl = `https://proratacalculator.co.uk${newPath}`;
        return match.replace(url, newUrl);
      } catch {
        return match;
      }
    });
  }

  /**
   * Update image URLs to preserve original CMS domain
   */
  private updateImageUrls(content: string): string {
    // For images, we want to keep the original CMS URLs
    // This method now ensures images use the original CMS domain
    const imgRegex = /src=["']([^"']*proratacalculator\.co\.uk[^"']*)["']/g;

    return content.replace(imgRegex, (match, url) => {
      try {
        const parsedUrl = new URL(url);
        // Convert main domain image URLs back to CMS domain
        if (parsedUrl.hostname === "proratacalculator.co.uk") {
          const newUrl = `https://cms.proratacalculator.co.uk${parsedUrl.pathname}`;
          return match.replace(url, newUrl);
        }
        return match;
      } catch {
        return match;
      }
    });
  }

  /**
   * Update any remaining CMS URLs, but preserve image URLs
   */
  private updateCmsUrls(content: string): string {
    // Don't convert CMS URLs to main domain URLs for images
    // This ensures images keep their original CMS URLs
    return content;
  }

  /**
   * Filter SEO data from Rank Math
   */
  filterSeoData(seoData: any, slug?: string): any {
    if (!seoData) return seoData;

    const filteredSeo = { ...seoData };

    // Update canonical URL using the new cleaning function
    if (filteredSeo.canonical && slug) {
      filteredSeo.canonical = cleanCanonicalUrl(filteredSeo.canonical, slug);
    }

    // Keep OpenGraph image URLs as original CMS URLs
    if (filteredSeo.opengraphImage?.sourceUrl) {
      // Don't modify image URLs - keep them as CMS URLs
    }

    // Keep Twitter image URLs as original CMS URLs
    if (filteredSeo.twitterImage?.sourceUrl) {
      // Don't modify image URLs - keep them as CMS URLs
    }

    // Update breadcrumb URLs (but not image URLs)
    if (filteredSeo.breadcrumbs) {
      filteredSeo.breadcrumbs = filteredSeo.breadcrumbs.map(
        (breadcrumb: any) => ({
          ...breadcrumb,
          url: breadcrumb.url?.replace(
            "cms.proratacalculator.co.uk",
            "proratacalculator.co.uk"
          ),
        })
      );
    }

    return filteredSeo;
  }

  /**
   * Filter featured image data - preserve original CMS URLs
   */
  filterFeaturedImage(imageData: any): any {
    if (!imageData?.node) return imageData;

    // Don't modify featured image URLs - keep them as original CMS URLs
    return imageData;
  }

  /**
   * Filter entire blog post data
   */
  filterBlogPost(postData: any, slug?: string): any {
    if (!postData) return postData;

    const filteredPost = { ...postData };

    // Filter content
    if (filteredPost.content) {
      filteredPost.content = this.filterContent(filteredPost.content);
    }

    // Filter excerpt
    if (filteredPost.excerpt) {
      filteredPost.excerpt = this.filterContent(filteredPost.excerpt);
    }

    // Filter SEO data
    if (filteredPost.seo) {
      filteredPost.seo = this.filterSeoData(filteredPost.seo, slug);
    }

    // Filter featured image
    if (filteredPost.featuredImage) {
      filteredPost.featuredImage = this.filterFeaturedImage(
        filteredPost.featuredImage
      );
    }

    // Filter author URL
    if (filteredPost.author?.node?.url) {
      filteredPost.author.node.url = this.filterAuthorUrl(
        filteredPost.author.node.url
      );
    }

    return filteredPost;
  }

  /**
   * Clean author URL to remove Cloudways URL
   */
  private filterAuthorUrl(authorUrl: string): string | null {
    if (!authorUrl) return null;

    try {
      const url = new URL(authorUrl);

      // Remove Cloudways URLs
      if (url.hostname.includes("cloudwaysapps.com")) {
        return null; // Don't show external Cloudways URLs
      }

      // Convert CMS domain to main domain for internal author pages
      if (url.hostname === "cms.proratacalculator.co.uk") {
        return `https://proratacalculator.co.uk${url.pathname}`;
      }

      return authorUrl;
    } catch {
      return null;
    }
  }
}

// Specific filter for term-time vs full-time salary post
export const termTimeSalaryFilter = new ContentFilter({
  sourceUrl:
    "https://cms.proratacalculator.co.uk/term-time-vs-full-time-salary/",
  targetUrl:
    "https://proratacalculator.co.uk/blog/term-time-vs-full-time-salary",
  updateInternalLinks: true,
  updateImages: true,
});

// Export utility functions
export function filterTermTimeSalaryContent(content: string): string {
  return termTimeSalaryFilter.filterContent(content);
}

export function filterTermTimeSalaryPost(postData: any, slug?: string): any {
  return termTimeSalaryFilter.filterBlogPost(postData, slug);
}

/**
 * Clean author URL to remove Cloudways URLs and convert CMS URLs
 */
export function cleanAuthorUrl(
  authorUrl: string | null | undefined
): string | null {
  if (!authorUrl) return null;

  try {
    const url = new URL(authorUrl);

    // Remove Cloudways URLs
    if (url.hostname.includes("cloudwaysapps.com")) {
      return null; // Don't show external Cloudways URLs
    }

    // Convert CMS domain to main domain for internal author pages
    if (url.hostname === "cms.proratacalculator.co.uk") {
      return `https://proratacalculator.co.uk${url.pathname}`;
    }

    return authorUrl;
  } catch {
    return null;
  }
}
