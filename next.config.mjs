/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["website.com", "localhost:3000"]
    }
  }
}

export default nextConfig;
