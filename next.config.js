/** @type {import('next').NextConfig} */

const withSvgr = require("next-svgr");
 
module.exports = withSvgr({
});
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      }
    ]
  }
}

module.exports = withSvgr(nextConfig) 
