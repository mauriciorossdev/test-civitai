/** @type {import('next').NextConfig} */
//'image.civitai.com'
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.civitai.com",
      },
    ],
  },
};

export default nextConfig;
