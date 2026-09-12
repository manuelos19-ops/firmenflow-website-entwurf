import type { NextConfig } from "next";

// 'unsafe-eval' wird nur für React-Refresh/HMR im Dev-Server gebraucht
const devScriptSources = process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'";

const cspHeader = `
  default-src 'self';
  script-src 'self' ${devScriptSources} 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/google-business-360",
        destination: "/lokalpraesenz-360",
        permanent: true,
      },
      {
        source: "/linktree",
        destination: "/links",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
