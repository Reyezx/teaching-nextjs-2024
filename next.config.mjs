/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "website.com",
        "localhost:3000",
        "https://crispy-space-tribble-69w9pjvg7gg34g69-3000.app.github.dev/",
      ],
    },
  },
};

export default nextConfig;
