/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
  },
  eslint: {
    dirs: ['src', '__tests__', 'pages', 'components', 'lib', 'utils'], // Include test directories
    ignoreDuringBuilds: false, // Keep ESLint checks during builds
  },
}

export default nextConfig
