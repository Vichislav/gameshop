/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Предупреждения ESLint не блокируют production build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
