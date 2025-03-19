const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
  experimental: {
    mdxRs: true,
  },
  async rewrites() {
    // In development, only proxy Python API endpoints to Flask server
    // This allows Next.js API routes to work normally while also supporting Python
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/hello',
        destination: 'http://localhost:5000/api/hello' // Python endpoint
      },
      {
        source: '/api/python-hello',
        destination: 'http://localhost:5000/api/hello' // Python endpoint with alternate name
      }
    ] : [];
  }
};

export default nextConfig;
