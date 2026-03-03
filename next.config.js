/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  // Optimizaciones para alto tráfico
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Cache de páginas estáticas
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
