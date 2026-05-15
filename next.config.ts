import type {
  NextConfig,
} from "next";

const nextConfig: NextConfig = {

  images: {

    remotePatterns: [

      {
        protocol: "https",
        hostname:
          "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname:
          "s1.pearlcdn.com",
      },

      {
        protocol: "https",
        hostname:
          "iofslrvqmnpxymszbdby.supabase.co",
      },

      {
        protocol: "https",
        hostname:
          "cdn.discordapp.com",
      },

    ],
  },
};

export default nextConfig;