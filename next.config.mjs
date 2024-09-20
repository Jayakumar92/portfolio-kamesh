/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Allow 'http' for localhost
        hostname: "localhost",
        port: "8000", // Optional: specify the port if needed
      },
    ],
  },
}

export default nextConfig
