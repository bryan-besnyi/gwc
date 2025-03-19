const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*' // Proxy to Flask in development
      }
    ] : [];
  }
};

export default nextConfig;
