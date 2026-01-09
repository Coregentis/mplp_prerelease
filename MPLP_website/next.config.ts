import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // 301 Permanent Redirects for Standards cluster and deprecated pages
  // Per DGP Website Alignment Pass - all paths must map to 7 semantic anchors
  async redirects() {
    return [
      // Standards section → merge into References/FAQ
      {
        source: '/standards/positioning',
        destination: '/references',
        permanent: true,
      },
      {
        source: '/standards/protocol-evaluation',
        destination: '/references',
        permanent: true,
      },
      {
        source: '/standards/regulatory-positioning',
        destination: '/references',
        permanent: true,
      },
      {
        source: '/standards/what-mplp-is-not',
        destination: '/faq',
        permanent: true,
      },
      // Enterprise page → redirect to References (protocol site, not marketing)
      {
        source: '/enterprise',
        destination: '/references',
        permanent: true,
      },
      // Adoption page → merge into References
      {
        source: '/adoption',
        destination: '/references',
        permanent: true,
      },
      // Governance root → redirect to overview
      {
        source: '/governance',
        destination: '/governance/overview',
        permanent: true,
      },
      // WG-05: Compliance → Conformance (terminology governance rename)
      {
        source: '/compliance',
        destination: '/conformance',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy-Report-Only',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; frame-ancestors 'none'; connect-src 'self';",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  // Prevent trailing slash redirect chains (P0 SEO fix)
  trailingSlash: false,
};

export default withBundleAnalyzer(nextConfig);
