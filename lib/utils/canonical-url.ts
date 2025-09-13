// Utility function to clean and normalize canonical URLs
export function cleanCanonicalUrl(url: string, slug: string): string {
  if (!url) {
    return `https://proratacalculator.co.uk/blog/${slug}`;
  }

  try {
    // Parse the URL
    const parsedUrl = new URL(url);

    // Convert CMS domain to main domain
    if (parsedUrl.hostname === "cms.proratacalculator.co.uk") {
      parsedUrl.hostname = "proratacalculator.co.uk";
    }

    // Ensure it's HTTPS
    parsedUrl.protocol = "https:";

    // Clean up the path
    let path = parsedUrl.pathname;

    // Remove trailing slash
    if (path.endsWith("/") && path !== "/") {
      path = path.slice(0, -1);
    }

    // Ensure blog posts have /blog/ in the path
    if (slug && !path.includes("/blog/")) {
      // If it's a direct post path (e.g., /term-time-vs-full-time-salary), add /blog/
      if (path === `/${slug}`) {
        path = `/blog/${slug}`;
      }
      // If it's a post path without /blog/, insert it
      else if (path.includes(`/${slug}`) && !path.includes("/blog/")) {
        path = path.replace(`/${slug}`, `/blog/${slug}`);
      }
    }

    // Reconstruct the URL
    parsedUrl.pathname = path;

    return parsedUrl.toString();
  } catch {
    // If URL parsing fails, return a clean default
    return `https://proratacalculator.co.uk/blog/${slug}`;
  }
}
