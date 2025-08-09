/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Image optimization
  images: {
    domains: ["proratacalculator.co.uk"],
    formats: ["image/webp", "image/avif"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // SEO-friendly redirects
  async redirects() {
    return [
      {
        source: "/calculator",
        destination: "/pro-rata-salary-calculator",
        permanent: true,
      },
      {
        source: "/salary",
        destination: "/pro-rata-salary-calculator",
        permanent: true,
      },
      {
        source: "/maternity",
        destination: "/pro-rata-maternity-pay-calculator",
        permanent: true,
      },
      {
        source: "/paternity",
        destination: "/pro-rata-paternity-pay-calculator",
        permanent: true,
      },
      {
        source: "/ssp",
        destination: "/pro-rata-sick-pay-calculator",
        permanent: true,
      },
      {
        source: "/sick-pay",
        destination: "/pro-rata-sick-pay-calculator",
        permanent: true,
      },
      {
        source: "/redundancy",
        destination: "/pro-rata-redundancy-pay-calculator",
        permanent: true,
      },
      {
        source: "/bonus",
        destination: "/pro-rata-bonus-calculator",
        permanent: true,
      },
      {
        source: "/holiday",
        destination: "/pro-rata-holiday-calculator",
        permanent: true,
      },
      {
        source: "/term-time",
        destination: "/term-time-only-salary-calculator",
        permanent: true,
      },
      {
        source: "/tto",
        destination: "/term-time-only-salary-calculator",
        permanent: true,
      },
    ];
  },

  // ESLint configuration for production
  eslint: {
    // Disable ESLint during production builds to avoid blocking deployment
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },

  // Compiler options for production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
