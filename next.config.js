/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '',
  },
}