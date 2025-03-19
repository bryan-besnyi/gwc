# Python API for Next.js Project

This directory contains serverless Python functions that work with Vercel deployment.

## How it works

### In Development
- The original Flask server (`server.py`) in the root directory runs on port 5000
- The Next.js application uses a rewrite rule to forward `/api/*` requests to the Flask server
- Run both servers together with `npm run dev:all`

### In Production (Vercel)
- The serverless functions in this `/api` directory are deployed with the `@vercel/python` builder
- Each `.py` file becomes an API endpoint with the path `/api/filename`
- The routing is handled by Vercel according to the configuration in `vercel.json`

## Available Endpoints

- `/api/hello` - GET and POST endpoint
  - GET: Takes a `name` query parameter (`/api/hello?name=YourName`)
  - POST: Takes a JSON body with a `name` field

## Local Testing

To test the serverless functions locally, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

## Development

When adding new endpoints, simply create a new `.py` file in this directory with the appropriate handler class. 