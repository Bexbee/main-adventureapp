import type { NextConfig } from "next";
// @ts-expect-error - next-pwa has no types for ESM import here
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

// Workbox-style runtime caching configuration
const runtimeCaching = [
  {
    urlPattern: /^https?:\/\/.+\.(?:js|css)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "static-resources",
      expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
    },
  },
  {
    urlPattern: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp|ico)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "images",
      expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
    },
  },
  {
    urlPattern: /^https?:\/\/.*\.(?:woff2?|ttf|otf)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "fonts",
      expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 365 },
    },
  },
  {
    urlPattern: /\/data\/.*\.json$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "apacks-data",
      expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
    },
  },
  {
    urlPattern: /^https?:\/\/.+/,
    handler: "NetworkFirst",
    options: {
      cacheName: "pages",
      networkTimeoutSeconds: 5,
      expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
    },
  },
];

const withPWAInit = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
  runtimeCaching,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWAInit(nextConfig);
