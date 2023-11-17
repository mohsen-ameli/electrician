/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "echo-power-electric.s3.amazonaws.com" }],
  },
}

module.exports = nextConfig
