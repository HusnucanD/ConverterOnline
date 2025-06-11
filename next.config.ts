import type { NextConfig } from "next";

// const contentSecurityPolicy: string = `
//   script-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net;
//   frame-src  https://*.google.com https://*.doubleclick.net;
// `
//   .replace(/\s{2,}/g, " ")
//   .trim();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: "https://converter.online",
    NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-9905948103459578",
    NEXT_PUBLIC_GA_ID: "G-1G9JX0BDCE",
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: contentSecurityPolicy,
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
