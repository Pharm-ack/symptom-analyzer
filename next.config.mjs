/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farmui.vercel.app",
        port: "",
      },
    ],
  },
};

export default nextConfig;
