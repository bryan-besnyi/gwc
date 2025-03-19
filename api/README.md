# API Routes in This Project

This project uses both Next.js API routes and Python serverless functions, giving you flexibility in how you implement your backend.

## API Structure

### Python API Endpoints
- `/api/hello` - The original Python endpoint
- `/api/python-hello` - A clearly named Python endpoint

### Next.js API Endpoints
- `/api/nextjs-hello` - A Next.js API route that works alongside the Python endpoints

## How it works

### In Development
- The original Flask server (`server.py`) in the root directory runs on port 5000
- The Next.js application uses rewrite rules to forward specific Python API routes to the Flask server
- Next.js API routes work normally without interference
- Run both servers together with `npm run dev:all`

### In Production (Vercel)
- The serverless Python functions in this `/api` directory are deployed with the `@vercel/python` builder
- Next.js API routes are bundled with the application
- Routing is handled by Vercel according to the configuration in `vercel.json`

## Testing All APIs

You can use the test page at `/test` to try out both API systems.

## Local Testing

To test the serverless functions locally, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

## Development

When adding new endpoints:
- For Python API endpoints, create a new `.py` file in the `/api` directory
- For Next.js API endpoints, create a new route file in the `/app/api` directory
- Update the rewrite rules in `next.config.ts` if needed 